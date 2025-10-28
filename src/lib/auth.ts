import { supabase } from './supabase'
import bcrypt from 'bcryptjs'

export async function signUp(email: string, password: string) {
  try {
    // Hash da senha
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    // Inserir usuário na tabela users
    const { data, error } = await supabase
      .from('users')
      .insert([
        {
          email,
          password_hash: passwordHash,
          role: 'free'
        }
      ])
      .select()
      .single()

    if (error) throw error

    return { user: data, error: null }
  } catch (error: any) {
    return { user: null, error: error.message }
  }
}

export async function signIn(email: string, password: string) {
  try {
    // Buscar usuário por email
    const { data: user, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single()

    if (error || !user) {
      throw new Error('Usuário não encontrado')
    }

    // Verificar senha
    const isValidPassword = await bcrypt.compare(password, user.password_hash)
    
    if (!isValidPassword) {
      throw new Error('Senha incorreta')
    }

    // Salvar no localStorage E no cookie
    const userData = {
      id: user.id,
      email: user.email,
      role: user.role,
      user_metadata: { role: user.role }
    }

    if (typeof window !== 'undefined') {
      localStorage.setItem('cryptosage_user', JSON.stringify(userData))
      
      // Salvar no cookie também para o middleware
      document.cookie = `cryptosage_user=${encodeURIComponent(JSON.stringify(userData))}; path=/; max-age=86400; SameSite=Lax`
      
      // Aguardar um pouco para garantir que o cookie foi salvo
      await new Promise(resolve => setTimeout(resolve, 100))
    }

    return { user: userData, error: null }
  } catch (error: any) {
    return { user: null, error: error.message }
  }
}

export function signOut() {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('cryptosage_user')
    // Remover cookie também
    document.cookie = 'cryptosage_user=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT'
    
    // Forçar reload da página para limpar estado
    window.location.href = '/login'
  }
}

export function getCurrentUser() {
  if (typeof window !== 'undefined') {
    try {
      const userStr = localStorage.getItem('cryptosage_user')
      return userStr ? JSON.parse(userStr) : null
    } catch (error) {
      console.error('Erro ao parsear usuário:', error)
      localStorage.removeItem('cryptosage_user')
      return null
    }
  }
  return null
}

export function isAuthenticated() {
  return getCurrentUser() !== null
}

export function isAdmin() {
  const user = getCurrentUser()
  return user?.role === 'admin'
}