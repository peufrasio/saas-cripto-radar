'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'
import { signOut } from '@/lib/auth'
import { Terminal, Activity, Bell, Settings, LogOut } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function Navbar() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleLogout = () => {
    signOut()
  }

  // Evita hidratação mismatch aguardando o componente montar
  if (!mounted || loading) {
    return (
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a] border-b border-[#2a2a2a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Terminal className="w-6 h-6 text-green-400" />
              <span className="text-xl font-bold text-white font-jetbrains">
                CryptoSageAI
              </span>
            </div>
          </div>
        </div>
      </nav>
    )
  }

  // Se não há usuário, não renderiza a navbar completa
  if (!user) {
    return (
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a] border-b border-[#2a2a2a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Terminal className="w-6 h-6 text-green-400" />
              <span className="text-xl font-bold text-white font-jetbrains">
                CryptoSageAI
              </span>
            </div>
          </div>
        </div>
      </nav>
    )
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a] border-b border-[#2a2a2a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <Terminal className="w-6 h-6 text-green-400" />
            <span className="text-xl font-bold text-white font-jetbrains">
              CryptoSageAI
            </span>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              href="/dashboard" 
              className="flex items-center space-x-2 text-gray-300 hover:text-green-400 transition-colors"
            >
              <Activity className="w-4 h-4" />
              <span>Dashboard</span>
            </Link>
            <Link 
              href="/alertas" 
              className="flex items-center space-x-2 text-gray-300 hover:text-green-400 transition-colors"
            >
              <Bell className="w-4 h-4" />
              <span>Alertas</span>
            </Link>
            <Link 
              href="/configuracoes" 
              className="flex items-center space-x-2 text-gray-300 hover:text-green-400 transition-colors"
            >
              <Settings className="w-4 h-4" />
              <span>Configurações</span>
            </Link>
            {user?.role === 'admin' && (
              <Link 
                href="/admin" 
                className="flex items-center space-x-2 text-yellow-400 hover:text-yellow-300 transition-colors"
              >
                <Terminal className="w-4 h-4" />
                <span>Admin</span>
              </Link>
            )}
          </div>

          {/* User Menu */}
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-400 hidden sm:block">
              {user?.email}
            </span>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 text-gray-300 hover:text-red-400 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:block">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}