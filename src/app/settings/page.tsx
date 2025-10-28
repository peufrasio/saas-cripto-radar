'use client'

import { useState } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { Settings, User, Bell, Shield, Palette, Database } from 'lucide-react'

export default function SettingsPage() {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState('profile')

  const tabs = [
    { id: 'profile', label: 'Perfil', icon: User },
    { id: 'notifications', label: 'Notificações', icon: Bell },
    { id: 'security', label: 'Segurança', icon: Shield },
    { id: 'preferences', label: 'Preferências', icon: Palette },
    { id: 'data', label: 'Dados', icon: Database }
  ]

  return (
    <div className="min-h-screen bg-[#0a0a0a] p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            Configurações
          </h1>
          <p className="text-gray-400">
            Gerencie suas preferências e configurações da conta
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-4">
              <nav className="space-y-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                      activeTab === tab.id
                        ? 'bg-green-500 text-black'
                        : 'text-gray-300 hover:bg-[#2a2a2a]'
                    }`}
                  >
                    <tab.icon className="w-5 h-5" />
                    <span>{tab.label}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Content */}
          <div className="lg:col-span-3">
            <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg">
              {/* Profile Tab */}
              {activeTab === 'profile' && (
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-white mb-6">Informações do Perfil</h2>
                  
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        E-mail
                      </label>
                      <input
                        type="email"
                        value={user?.email || ''}
                        disabled
                        className="w-full px-4 py-3 bg-[#0a0a0a] border border-[#2a2a2a] rounded-lg text-gray-400 cursor-not-allowed"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        O e-mail não pode ser alterado
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Plano Atual
                      </label>
                      <div className="flex items-center space-x-3">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          user?.role === 'admin' ? 'bg-yellow-400/10 text-yellow-400 border border-yellow-400/20' :
                          user?.role === 'elite' ? 'bg-purple-400/10 text-purple-400 border border-purple-400/20' :
                          user?.role === 'pro' ? 'bg-blue-400/10 text-blue-400 border border-blue-400/20' :
                          'bg-gray-400/10 text-gray-400 border border-gray-400/20'
                        }`}>
                          {user?.role?.toUpperCase()}
                        </span>
                        {user?.role === 'free' && (
                          <button className="bg-green-500 hover:bg-green-600 text-black font-semibold px-4 py-2 rounded-lg transition-colors">
                            Fazer Upgrade
                          </button>
                        )}
                      </div>
                    </div>

                    <div className="pt-4 border-t border-[#2a2a2a]">
                      <button className="bg-green-500 hover:bg-green-600 text-black font-semibold px-6 py-3 rounded-lg transition-colors">
                        Salvar Alterações
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Notifications Tab */}
              {activeTab === 'notifications' && (
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-white mb-6">Configurações de Notificação</h2>
                  
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-white font-medium">Alertas de Trading</h3>
                        <p className="text-gray-400 text-sm">Receber notificações de novos alertas</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-white font-medium">E-mail Diário</h3>
                        <p className="text-gray-400 text-sm">Resumo diário das análises</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-white font-medium">Notificações Push</h3>
                        <p className="text-gray-400 text-sm">Alertas instantâneos no navegador</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {/* Security Tab */}
              {activeTab === 'security' && (
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-white mb-6">Segurança</h2>
                  
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-white font-medium mb-3">Alterar Senha</h3>
                      <div className="space-y-4">
                        <input
                          type="password"
                          placeholder="Senha atual"
                          className="w-full px-4 py-3 bg-[#0a0a0a] border border-[#2a2a2a] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-green-400 transition-colors"
                        />
                        <input
                          type="password"
                          placeholder="Nova senha"
                          className="w-full px-4 py-3 bg-[#0a0a0a] border border-[#2a2a2a] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-green-400 transition-colors"
                        />
                        <input
                          type="password"
                          placeholder="Confirmar nova senha"
                          className="w-full px-4 py-3 bg-[#0a0a0a] border border-[#2a2a2a] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-green-400 transition-colors"
                        />
                        <button className="bg-green-500 hover:bg-green-600 text-black font-semibold px-6 py-3 rounded-lg transition-colors">
                          Alterar Senha
                        </button>
                      </div>
                    </div>

                    <div className="pt-6 border-t border-[#2a2a2a]">
                      <h3 className="text-white font-medium mb-3">Sessões Ativas</h3>
                      <div className="bg-[#0a0a0a] border border-[#2a2a2a] rounded-lg p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-white">Sessão atual</p>
                            <p className="text-gray-400 text-sm">Chrome • São Paulo, Brasil</p>
                          </div>
                          <span className="text-green-400 text-sm">Ativo agora</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Preferences Tab */}
              {activeTab === 'preferences' && (
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-white mb-6">Preferências</h2>
                  
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Fuso Horário
                      </label>
                      <select className="w-full px-4 py-3 bg-[#0a0a0a] border border-[#2a2a2a] rounded-lg text-white focus:outline-none focus:border-green-400 transition-colors">
                        <option value="America/Sao_Paulo">São Paulo (GMT-3)</option>
                        <option value="America/New_York">Nova York (GMT-5)</option>
                        <option value="Europe/London">Londres (GMT+0)</option>
                        <option value="Asia/Tokyo">Tóquio (GMT+9)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Moeda Padrão
                      </label>
                      <select className="w-full px-4 py-3 bg-[#0a0a0a] border border-[#2a2a2a] rounded-lg text-white focus:outline-none focus:border-green-400 transition-colors">
                        <option value="BRL">Real Brasileiro (BRL)</option>
                        <option value="USD">Dólar Americano (USD)</option>
                        <option value="EUR">Euro (EUR)</option>
                        <option value="BTC">Bitcoin (BTC)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Tema
                      </label>
                      <div className="grid grid-cols-3 gap-3">
                        <div className="bg-[#0a0a0a] border-2 border-green-400 rounded-lg p-3 text-center cursor-pointer">
                          <div className="w-full h-8 bg-[#0a0a0a] rounded mb-2"></div>
                          <span className="text-sm text-green-400">Escuro</span>
                        </div>
                        <div className="bg-gray-100 border-2 border-[#2a2a2a] rounded-lg p-3 text-center cursor-pointer">
                          <div className="w-full h-8 bg-white rounded mb-2"></div>
                          <span className="text-sm text-gray-600">Claro</span>
                        </div>
                        <div className="bg-gradient-to-br from-[#0a0a0a] to-gray-800 border-2 border-[#2a2a2a] rounded-lg p-3 text-center cursor-pointer">
                          <div className="w-full h-8 bg-gradient-to-r from-[#0a0a0a] to-gray-700 rounded mb-2"></div>
                          <span className="text-sm text-gray-400">Auto</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Data Tab */}
              {activeTab === 'data' && (
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-white mb-6">Gerenciamento de Dados</h2>
                  
                  <div className="space-y-6">
                    <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
                      <h3 className="text-yellow-400 font-medium mb-2">Exportar Dados</h3>
                      <p className="text-gray-300 text-sm mb-4">
                        Baixe uma cópia de todos os seus dados, incluindo alertas e configurações.
                      </p>
                      <button className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-4 py-2 rounded-lg transition-colors">
                        Exportar Dados
                      </button>
                    </div>

                    <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
                      <h3 className="text-red-400 font-medium mb-2">Excluir Conta</h3>
                      <p className="text-gray-300 text-sm mb-4">
                        Esta ação é irreversível. Todos os seus dados serão permanentemente removidos.
                      </p>
                      <button className="bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded-lg transition-colors">
                        Excluir Conta
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}