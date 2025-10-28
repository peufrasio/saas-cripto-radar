'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { isAdmin, getCurrentUser, signOut } from '@/lib/auth'
import { 
  LayoutDashboard, 
  Users, 
  CreditCard, 
  Bell, 
  Newspaper, 
  Settings, 
  Bot, 
  FileText, 
  DollarSign,
  LogOut,
  Menu,
  X,
  Activity,
  Shield
} from 'lucide-react'

interface AdminLayoutProps {
  children: React.ReactNode
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    const currentUser = getCurrentUser()
    
    if (!currentUser || !isAdmin()) {
      router.push('/login')
      return
    }

    setUser(currentUser)
    setLoading(false)
  }, [router])

  const handleSignOut = () => {
    signOut()
  }

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', href: '/admin' },
    { icon: Users, label: 'Usuários', href: '/admin/users' },
    { icon: CreditCard, label: 'Assinaturas', href: '/admin/subscriptions' },
    { icon: Bell, label: 'Alertas', href: '/admin/alerts' },
    { icon: Newspaper, label: 'Notícias', href: '/admin/news' },
    { icon: Bot, label: 'Controle IA', href: '/admin/ai-controls' },
    { icon: DollarSign, label: 'Financeiro', href: '/admin/finance' },
    { icon: FileText, label: 'Logs', href: '/admin/logs' },
    { icon: Settings, label: 'Configurações', href: '/admin/settings' },
  ]

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0ea5e9] mx-auto mb-4"></div>
          <p className="text-gray-400">Verificando permissões...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 rounded-lg bg-[#1e293b] text-white hover:bg-[#334155] transition-colors"
        >
          {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-40 w-64 bg-[#1e293b] transform transition-transform duration-300 ease-in-out ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0`}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-6 border-b border-gray-700">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-[#0ea5e9] to-[#06b6d4] rounded-lg flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">CryptoSage</h1>
                <p className="text-sm text-gray-400">Admin Panel</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            {menuItems.map((item) => (
              <button
                key={item.href}
                onClick={() => {
                  router.push(item.href)
                  setSidebarOpen(false)
                }}
                className="w-full flex items-center space-x-3 px-4 py-3 text-gray-300 hover:text-white hover:bg-[#334155] rounded-lg transition-colors"
              >
                <item.icon className="w-5 h-5" />
                <span>{item.label}</span>
              </button>
            ))}
          </nav>

          {/* User info & logout */}
          <div className="p-4 border-t border-gray-700">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-[#0ea5e9] rounded-full flex items-center justify-center">
                  <span className="text-sm font-bold">A</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-white">Admin</p>
                  <p className="text-xs text-gray-400">{user?.email}</p>
                </div>
              </div>
              <button
                onClick={handleSignOut}
                className="p-2 text-gray-400 hover:text-white hover:bg-[#334155] rounded-lg transition-colors"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:ml-64">
        {/* Top bar */}
        <div className="bg-[#1e293b] border-b border-gray-700 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h2 className="text-xl font-semibold text-white">Painel Administrativo</h2>
              <div className="flex items-center space-x-2 text-sm text-gray-400">
                <Activity className="w-4 h-4" />
                <span>Sistema Online</span>
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              </div>
            </div>
            <div className="text-sm text-gray-400">
              Última atualização: {new Date().toLocaleTimeString('pt-BR')}
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="p-6">
          {children}
        </main>
      </div>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  )
}