'use client'

import { useState } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { Users, Activity, Settings, Database, Shield, TrendingUp } from 'lucide-react'

export default function AdminPage() {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState('overview')

  // Mock data para demonstração
  const stats = [
    { title: 'Usuários Totais', value: '1,247', change: '+12%', icon: Users },
    { title: 'Alertas Gerados', value: '8,432', change: '+23%', icon: Activity },
    { title: 'Precisão IA', value: '94.2%', change: '+1.1%', icon: TrendingUp },
    { title: 'Uptime Sistema', value: '99.9%', change: '0%', icon: Shield }
  ]

  const recentUsers = [
    { email: 'user1@example.com', role: 'free', created: '2024-01-15', status: 'active' },
    { email: 'user2@example.com', role: 'pro', created: '2024-01-14', status: 'active' },
    { email: 'user3@example.com', role: 'elite', created: '2024-01-13', status: 'inactive' },
    { email: 'user4@example.com', role: 'free', created: '2024-01-12', status: 'active' }
  ]

  const systemLogs = [
    { timestamp: '2024-01-15 10:30:00', level: 'INFO', message: 'Sistema de alertas executado com sucesso' },
    { timestamp: '2024-01-15 10:25:00', level: 'WARNING', message: 'Alta latência detectada na API externa' },
    { timestamp: '2024-01-15 10:20:00', level: 'INFO', message: 'Backup automático concluído' },
    { timestamp: '2024-01-15 10:15:00', level: 'ERROR', message: 'Falha temporária na conexão com exchange' }
  ]

  if (user?.role !== 'admin') {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="text-center">
          <Shield className="w-16 h-16 text-red-400 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-white mb-2">Acesso Negado</h1>
          <p className="text-gray-400">Você não tem permissão para acessar esta página.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-[#1a1a1a] border-r border-[#2a2a2a] min-h-screen">
          <div className="p-6">
            <h2 className="text-xl font-bold text-white mb-6">Admin Panel</h2>
            <nav className="space-y-2">
              <button
                onClick={() => setActiveTab('overview')}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                  activeTab === 'overview' ? 'bg-green-500 text-black' : 'text-gray-300 hover:bg-[#2a2a2a]'
                }`}
              >
                <Activity className="w-5 h-5" />
                <span>Visão Geral</span>
              </button>
              <button
                onClick={() => setActiveTab('users')}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                  activeTab === 'users' ? 'bg-green-500 text-black' : 'text-gray-300 hover:bg-[#2a2a2a]'
                }`}
              >
                <Users className="w-5 h-5" />
                <span>Usuários</span>
              </button>
              <button
                onClick={() => setActiveTab('system')}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                  activeTab === 'system' ? 'bg-green-500 text-black' : 'text-gray-300 hover:bg-[#2a2a2a]'
                }`}
              >
                <Database className="w-5 h-5" />
                <span>Sistema</span>
              </button>
              <button
                onClick={() => setActiveTab('settings')}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                  activeTab === 'settings' ? 'bg-green-500 text-black' : 'text-gray-300 hover:bg-[#2a2a2a]'
                }`}
              >
                <Settings className="w-5 h-5" />
                <span>Configurações</span>
              </button>
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div>
              <h1 className="text-3xl font-bold text-white mb-8">Visão Geral do Sistema</h1>
              
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {stats.map((stat, index) => (
                  <div key={index} className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                      <stat.icon className="w-8 h-8 text-green-400" />
                      <span className="text-sm text-green-400">{stat.change}</span>
                    </div>
                    <h3 className="text-2xl font-bold text-white font-jetbrains mb-1">
                      {stat.value}
                    </h3>
                    <p className="text-gray-400 text-sm">{stat.title}</p>
                  </div>
                ))}
              </div>

              {/* System Status */}
              <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-6">
                <h2 className="text-xl font-semibold text-white mb-4">Status do Sistema</h2>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">API Principal</span>
                    <span className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      <span className="text-green-400">Online</span>
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Banco de Dados</span>
                    <span className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      <span className="text-green-400">Online</span>
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Sistema de Alertas</span>
                    <span className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                      <span className="text-yellow-400">Degradado</span>
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Exchanges APIs</span>
                    <span className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      <span className="text-green-400">Online</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Users Tab */}
          {activeTab === 'users' && (
            <div>
              <h1 className="text-3xl font-bold text-white mb-8">Gerenciamento de Usuários</h1>
              
              <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg">
                <div className="p-6 border-b border-[#2a2a2a]">
                  <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold text-white">Usuários Recentes</h2>
                    <button className="bg-green-500 hover:bg-green-600 text-black font-semibold px-4 py-2 rounded-lg transition-colors">
                      Adicionar Usuário
                    </button>
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-[#0a0a0a]">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                          E-mail
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                          Plano
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                          Criado em
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                          Ações
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#2a2a2a]">
                      {recentUsers.map((user, index) => (
                        <tr key={index} className="hover:bg-[#1f1f1f]">
                          <td className="px-6 py-4 whitespace-nowrap text-white">
                            {user.email}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 py-1 rounded text-xs font-medium ${
                              user.role === 'elite' ? 'bg-purple-400/10 text-purple-400' :
                              user.role === 'pro' ? 'bg-blue-400/10 text-blue-400' :
                              'bg-gray-400/10 text-gray-400'
                            }`}>
                              {user.role.toUpperCase()}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-gray-300">
                            {user.created}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 py-1 rounded text-xs font-medium ${
                              user.status === 'active' ? 'bg-green-400/10 text-green-400' : 'bg-red-400/10 text-red-400'
                            }`}>
                              {user.status === 'active' ? 'Ativo' : 'Inativo'}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            <button className="text-green-400 hover:text-green-300 mr-3">
                              Editar
                            </button>
                            <button className="text-red-400 hover:text-red-300">
                              Suspender
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* System Tab */}
          {activeTab === 'system' && (
            <div>
              <h1 className="text-3xl font-bold text-white mb-8">Logs do Sistema</h1>
              
              <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg">
                <div className="p-6 border-b border-[#2a2a2a]">
                  <h2 className="text-xl font-semibold text-white">Logs Recentes</h2>
                </div>
                <div className="p-6">
                  <div className="space-y-3">
                    {systemLogs.map((log, index) => (
                      <div key={index} className="flex items-start space-x-4 p-3 bg-[#0a0a0a] rounded-lg">
                        <span className="text-xs text-gray-400 font-jetbrains min-w-[140px]">
                          {log.timestamp}
                        </span>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          log.level === 'ERROR' ? 'bg-red-400/10 text-red-400' :
                          log.level === 'WARNING' ? 'bg-yellow-400/10 text-yellow-400' :
                          'bg-green-400/10 text-green-400'
                        }`}>
                          {log.level}
                        </span>
                        <span className="text-gray-300 flex-1">{log.message}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Settings Tab */}
          {activeTab === 'settings' && (
            <div>
              <h1 className="text-3xl font-bold text-white mb-8">Configurações do Sistema</h1>
              
              <div className="space-y-6">
                <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-6">
                  <h2 className="text-xl font-semibold text-white mb-4">Configurações da IA</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Threshold de Confiança
                      </label>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        defaultValue="75"
                        className="w-full"
                      />
                      <div className="flex justify-between text-xs text-gray-400 mt-1">
                        <span>0%</span>
                        <span>75%</span>
                        <span>100%</span>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Frequência de Análise (minutos)
                      </label>
                      <select className="w-full px-4 py-2 bg-[#0a0a0a] border border-[#2a2a2a] rounded-lg text-white">
                        <option value="5">5 minutos</option>
                        <option value="15">15 minutos</option>
                        <option value="30">30 minutos</option>
                        <option value="60">1 hora</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-6">
                  <h2 className="text-xl font-semibold text-white mb-4">Manutenção</h2>
                  <div className="space-y-4">
                    <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg transition-colors">
                      Executar Backup Manual
                    </button>
                    <button className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-4 py-2 rounded-lg transition-colors">
                      Limpar Cache
                    </button>
                    <button className="bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded-lg transition-colors">
                      Reiniciar Sistema
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}