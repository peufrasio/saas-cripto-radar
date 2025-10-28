'use client'

import { useAuth } from '@/hooks/useAuth'
import { useState } from 'react'
import { Settings, User, Bell, Shield, Palette, Database, Save } from 'lucide-react'

export default function ConfiguracoesPage() {
  const { user, loading } = useAuth()
  const [activeTab, setActiveTab] = useState('profile')
  const [settings, setSettings] = useState({
    notifications: {
      email: true,
      push: false,
      highImpact: true,
      mediumImpact: true,
      lowImpact: false
    },
    trading: {
      riskLevel: 'medium',
      autoAlerts: true,
      minImpactScore: 60
    },
    display: {
      theme: 'dark',
      language: 'pt-BR',
      timezone: 'America/Sao_Paulo'
    }
  })

  const tabs = [
    { id: 'profile', label: 'Perfil', icon: User },
    { id: 'notifications', label: 'Notificações', icon: Bell },
    { id: 'trading', label: 'Trading', icon: Database },
    { id: 'display', label: 'Exibição', icon: Palette },
    { id: 'security', label: 'Segurança', icon: Shield }
  ]

  const handleSave = () => {
    console.log('Salvando configurações:', settings)
    alert('Configurações salvas com sucesso!')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] pt-16 flex items-center justify-center">
        <div className="text-white text-lg">Carregando configurações...</div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] pt-16 flex items-center justify-center">
        <div className="text-white text-lg">Redirecionando para login...</div>
      </div>
    )
  }

  const renderProfileTab = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-white mb-4">Informações do Perfil</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Email
            </label>
            <input
              type="email"
              value={user?.email || ''}
              disabled
              className="w-full px-3 py-2 bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg text-white disabled:opacity-50"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Plano Atual
            </label>
            <div className="px-3 py-2 bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg">
              <span className="text-white capitalize">
                {user?.role || 'free'}
              </span>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Membro desde
            </label>
            <div className="px-3 py-2 bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg">
              <span className="text-white">
                {user?.created_at ? new Date(user.created_at).toLocaleDateString('pt-BR') : 'Recente'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  const renderNotificationsTab = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-white mb-4">Preferências de Notificação</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <label className="text-white font-medium">Notificações por Email</label>
              <p className="text-sm text-gray-400">Receba alertas importantes por email</p>
            </div>
            <input
              type="checkbox"
              checked={settings.notifications.email}
              onChange={(e) => setSettings({
                ...settings,
                notifications: { ...settings.notifications, email: e.target.checked }
              })}
              className="w-4 h-4 text-green-600 bg-[#1a1a1a] border-[#2a2a2a] rounded focus:ring-green-500"
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <label className="text-white font-medium">Alertas de Alto Impacto</label>
              <p className="text-sm text-gray-400">Impact Score ≥ 80</p>
            </div>
            <input
              type="checkbox"
              checked={settings.notifications.highImpact}
              onChange={(e) => setSettings({
                ...settings,
                notifications: { ...settings.notifications, highImpact: e.target.checked }
              })}
              className="w-4 h-4 text-green-600 bg-[#1a1a1a] border-[#2a2a2a] rounded focus:ring-green-500"
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <label className="text-white font-medium">Alertas de Médio Impacto</label>
              <p className="text-sm text-gray-400">Impact Score 60-79</p>
            </div>
            <input
              type="checkbox"
              checked={settings.notifications.mediumImpact}
              onChange={(e) => setSettings({
                ...settings,
                notifications: { ...settings.notifications, mediumImpact: e.target.checked }
              })}
              className="w-4 h-4 text-green-600 bg-[#1a1a1a] border-[#2a2a2a] rounded focus:ring-green-500"
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <label className="text-white font-medium">Alertas de Baixo Impacto</label>
              <p className="text-sm text-gray-400">Impact Score &lt; 60</p>
            </div>
            <input
              type="checkbox"
              checked={settings.notifications.lowImpact}
              onChange={(e) => setSettings({
                ...settings,
                notifications: { ...settings.notifications, lowImpact: e.target.checked }
              })}
              className="w-4 h-4 text-green-600 bg-[#1a1a1a] border-[#2a2a2a] rounded focus:ring-green-500"
            />
          </div>
        </div>
      </div>
    </div>
  )

  const renderTradingTab = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-white mb-4">Configurações de Trading</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Nível de Risco
            </label>
            <select
              value={settings.trading.riskLevel}
              onChange={(e) => setSettings({
                ...settings,
                trading: { ...settings.trading, riskLevel: e.target.value }
              })}
              className="w-full px-3 py-2 bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg text-white"
            >
              <option value="low">Conservador</option>
              <option value="medium">Moderado</option>
              <option value="high">Agressivo</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Impact Score Mínimo para Alertas
            </label>
            <input
              type="range"
              min="0"
              max="100"
              value={settings.trading.minImpactScore}
              onChange={(e) => setSettings({
                ...settings,
                trading: { ...settings.trading, minImpactScore: parseInt(e.target.value) }
              })}
              className="w-full h-2 bg-[#2a2a2a] rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-sm text-gray-400 mt-1">
              <span>0</span>
              <span className="text-green-400 font-semibold">{settings.trading.minImpactScore}</span>
              <span>100</span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <label className="text-white font-medium">Alertas Automáticos</label>
              <p className="text-sm text-gray-400">Gerar alertas automaticamente baseado na análise</p>
            </div>
            <input
              type="checkbox"
              checked={settings.trading.autoAlerts}
              onChange={(e) => setSettings({
                ...settings,
                trading: { ...settings.trading, autoAlerts: e.target.checked }
              })}
              className="w-4 h-4 text-green-600 bg-[#1a1a1a] border-[#2a2a2a] rounded focus:ring-green-500"
            />
          </div>
        </div>
      </div>
    </div>
  )

  const renderDisplayTab = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-white mb-4">Configurações de Exibição</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Tema
            </label>
            <select
              value={settings.display.theme}
              onChange={(e) => setSettings({
                ...settings,
                display: { ...settings.display, theme: e.target.value }
              })}
              className="w-full px-3 py-2 bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg text-white"
            >
              <option value="dark">Escuro</option>
              <option value="light">Claro</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Idioma
            </label>
            <select
              value={settings.display.language}
              onChange={(e) => setSettings({
                ...settings,
                display: { ...settings.display, language: e.target.value }
              })}
              className="w-full px-3 py-2 bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg text-white"
            >
              <option value="pt-BR">Português (Brasil)</option>
              <option value="en-US">English (US)</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Fuso Horário
            </label>
            <select
              value={settings.display.timezone}
              onChange={(e) => setSettings({
                ...settings,
                display: { ...settings.display, timezone: e.target.value }
              })}
              className="w-full px-3 py-2 bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg text-white"
            >
              <option value="America/Sao_Paulo">São Paulo (GMT-3)</option>
              <option value="America/New_York">New York (GMT-5)</option>
              <option value="Europe/London">London (GMT+0)</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  )

  const renderSecurityTab = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-white mb-4">Configurações de Segurança</h3>
        <div className="space-y-4">
          <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-4">
            <div className="flex items-center space-x-3 mb-3">
              <Shield className="w-5 h-5 text-green-400" />
              <h4 className="text-white font-medium">Autenticação Segura</h4>
            </div>
            <p className="text-gray-400 text-sm mb-4">
              Sua conta está protegida com autenticação segura via Supabase.
            </p>
            <button className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm transition-colors">
              Alterar Senha
            </button>
          </div>
          
          <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-4">
            <h4 className="text-white font-medium mb-3">Sessões Ativas</h4>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-white text-sm">Sessão Atual</p>
                  <p className="text-gray-400 text-xs">Navegador atual</p>
                </div>
                <span className="text-green-400 text-xs">Ativo</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return renderProfileTab()
      case 'notifications':
        return renderNotificationsTab()
      case 'trading':
        return renderTradingTab()
      case 'display':
        return renderDisplayTab()
      case 'security':
        return renderSecurityTab()
      default:
        return renderProfileTab()
    }
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] pt-16">
      <div className="max-w-7xl mx-auto p-4 md:p-6">
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <Settings className="w-8 h-8 text-green-400" />
            <h1 className="text-3xl md:text-4xl font-bold text-white font-jetbrains">
              Configurações
            </h1>
          </div>
          <p className="text-gray-400 text-lg">
            Personalize sua experiência com a CryptoSageAI
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1">
            <div className="bg-[#0f0f0f] border border-[#2a2a2a] rounded-lg p-4">
              <nav className="space-y-2">
                {tabs.map((tab) => {
                  const Icon = tab.icon
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                        activeTab === tab.id
                          ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                          : 'text-gray-400 hover:bg-[#1a1a1a] hover:text-white'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{tab.label}</span>
                    </button>
                  )
                })}
              </nav>
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="bg-[#0f0f0f] border border-[#2a2a2a] rounded-lg p-6">
              {renderTabContent()}
              
              <div className="mt-8 pt-6 border-t border-[#2a2a2a]">
                <button
                  onClick={handleSave}
                  className="flex items-center space-x-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors"
                >
                  <Save className="w-4 h-4" />
                  <span>Salvar Configurações</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}