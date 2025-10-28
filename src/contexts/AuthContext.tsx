'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import bcrypt from 'bcryptjs'

interface User {
  id: string
  email: string
  role: 'free' | 'pro' | 'elite' | 'admin'
}

interface AuthContextType {
  user: User | null
  loading: boolean
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
  register: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Verificar se há usuário logado no localStorage
    const savedUser = localStorage.getItem('cryptosage_user')
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
    setLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    try {
      // Buscar usuário no banco
      const { data: userData, error } = await supabase
        .from('users')
        .select('*')
        .eq('email', email)
        .single()

      if (error || !userData) {
        return { success: false, error: 'Email ou senha incorretos' }
      }

      // Verificar senha
      const isValidPassword = await bcrypt.compare(password, userData.password_hash)
      if (!isValidPassword) {
        return { success: false, error: 'Email ou senha incorretos' }
      }

      const user = {
        id: userData.id,
        email: userData.email,
        role: userData.role
      }

      setUser(user)
      localStorage.setItem('cryptosage_user', JSON.stringify(user))
      
      return { success: true }
    } catch (error) {
      return { success: false, error: 'Erro interno do servidor' }
    }
  }

  const register = async (email: string, password: string) => {
    try {
      // Verificar se email já existe
      const { data: existingUser } = await supabase
        .from('users')
        .select('email')
        .eq('email', email)
        .single()

      if (existingUser) {
        return { success: false, error: 'Email já cadastrado' }
      }

      // Hash da senha
      const passwordHash = await bcrypt.hash(password, 10)

      // Criar usuário
      const { data: newUser, error } = await supabase
        .from('users')
        .insert({
          email,
          password_hash: passwordHash,
          role: 'free'
        })
        .select()
        .single()

      if (error || !newUser) {
        return { success: false, error: 'Erro ao criar conta' }
      }

      const user = {
        id: newUser.id,
        email: newUser.email,
        role: newUser.role
      }

      setUser(user)
      localStorage.setItem('cryptosage_user', JSON.stringify(user))
      
      return { success: true }
    } catch (error) {
      return { success: false, error: 'Erro interno do servidor' }
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('cryptosage_user')
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}