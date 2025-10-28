'use client'

import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

interface ProtectedRouteProps {
  children: React.ReactNode
  adminOnly?: boolean
}

export default function ProtectedRoute({ children, adminOnly = false }: ProtectedRouteProps) {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push('/login')
        return
      }

      if (adminOnly && user.role !== 'admin') {
        router.push('/dashboard')
        return
      }
    }
  }, [user, loading, router, adminOnly])

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="text-white font-mono">Carregando...</div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  if (adminOnly && user.role !== 'admin') {
    return null
  }

  return <>{children}</>
}