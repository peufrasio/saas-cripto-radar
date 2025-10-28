'use client'

import { useState, useEffect } from 'react'
import { getCurrentUser } from '@/lib/auth'

export function useAuth() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (mounted) {
      const checkAuth = () => {
        try {
          const currentUser = getCurrentUser()
          setUser(currentUser)
        } catch (error) {
          console.error('Erro ao obter usuário:', error)
          setUser(null)
        } finally {
          setLoading(false)
        }
      }

      // Verificar imediatamente
      checkAuth()

      // Escutar mudanças no localStorage
      const handleStorageChange = () => {
        checkAuth()
      }

      window.addEventListener('storage', handleStorageChange)
      
      return () => {
        window.removeEventListener('storage', handleStorageChange)
      }
    }
  }, [mounted])

  const refreshUser = () => {
    if (mounted) {
      try {
        const currentUser = getCurrentUser()
        setUser(currentUser)
      } catch (error) {
        console.error('Erro ao atualizar usuário:', error)
        setUser(null)
      }
    }
  }

  return {
    user,
    loading: !mounted || loading,
    isAuthenticated: mounted && !loading && !!user,
    refreshUser
  }
}