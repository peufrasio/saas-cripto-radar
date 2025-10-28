'use client'

import { useState } from 'react'
import { Bell, Plus, Filter, Search, AlertTriangle, TrendingUp, TrendingDown } from 'lucide-react'

export default function AlertsPage() {
  const [activeTab, setActiveTab] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')

  const alerts = [
    {
      id: '1',
      token: 'BTC',
      category: 'ALTA PROBABILIDADE',
      impact_score: 85,
      summary: 'Padrão de acumulação detectado em timeframes maiores. Volume crescente indica possível rompimento de resistência.',
      created_at: '2024-01-15T10:30:00Z',
      status: 'active'
    },
    {
      id: '2',
      token: 'ETH',
      category: 'ESPECULATIVO',
      impact_score: 65,
      summary: 'Volume anômalo detectado nas últimas 4 horas. Possível movimento iminente baseado em padrões históricos.',
      created_at: '2024-01-15T09:45:00Z',
      status: 'active'
    },
    {
      id: '3',
      token: 'SOL',
      category: 'EVITAR',
      impact_score: 30,
      summary: 'Sinais de distribuição em grandes carteiras. Pressão vendedora aumentando significativamente.',
      created_at: '2024-01-15T08:15:00Z',
      status: 'triggered'
    },
    {
      id: '4',
      token: 'ADA',
      category: 'ALTA PROBABILIDADE',
      impact_score: 78,
      summary: 'Breakout confirmado acima da resistência de $0.45. Target inicial em $0.52.',
      created_at: '2024-01-15T07:20:00Z',
      status: 'triggered'
    },
    {
      id: '5',
      token: 'MATIC',
      category: 'ESPECULATIVO',
      impact_score: 55,
      summary: 'Formação de triângulo ascendente. Aguardando confirmação de volume para entrada.',
      created_at: '2024-01-15T06:30:00Z',
      status: 'active'
    }
  ]

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'ALTA PROBABILIDADE':
        return 'text-green-400 bg-green-400/10 border-green-400/20'
      case 'ESPECULATIVO':
        return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20'
      case 'EVITAR':
        return 'text-red-400 bg-red-400/10 border-red-400/20'
      default:
        return 'text-gray-400 bg-gray-400/10 border-gray-400/20'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'text-blue-400 bg-blue-400/10'
      case 'triggered':
        return 'text-green-400 bg-green-400/10'
      default:
        return 'text-gray-400 bg-gray-400/10'
    }
  }

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const hours = Math.floor(diff / (1000 * 60 * 60))
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
    
    if (hours > 0) {
      return `${hours}h atrás`
    } else {
      return `${minutes}min atrás`
    }
  }

  const filteredAlerts = alerts.filter(alert => {
    const matchesSearch = alert.token.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         alert.summary.toLowerCase().includes(searchTerm.toLowerCase())
    
    if (activeTab === 'all') return matchesSearch
    if (activeTab === 'high') return matchesSearch && alert.category === 'ALTA PROBABILIDADE'
    if (activeTab === 'speculative') return matchesSearch && alert.category === 'ESPECULATIVO'
    if (activeTab === 'avoid') return matchesSearch && alert.category === 'EVITAR'
    
    return matchesSearch
  })

  return (
    <div className="min-h-screen bg-[#0a0a0a] p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">
              Alertas de Trading
            </h1>
            <p className="text-gray-400">
              Monitore oportunidades em tempo real
            </p>
          </div>
          <button className="mt-4 sm:mt-0 bg-green-500 hover:bg-green-600 text-black font-semibold px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
            <Plus className="w-4 h-4" />
            <span>Novo Alerta</span>
          </button>
        </div>

        {/* Filters */}
        <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-6 mb-6">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Buscar por token ou descrição..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-[#0a0a0a] border border-[#2a2a2a] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-green-400 transition-colors"
                />
              </div>
            </div>

            {/* Category Tabs */}
            <div className="flex space-x-2">
              <button
                onClick={() => setActiveTab('all')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeTab === 'all' 
                    ? 'bg-green-500 text-black' 
                    : 'bg-[#2a2a2a] text-gray-300 hover:bg-[#3a3a3a]'
                }`}
              >
                Todos
              </button>
              <button
                onClick={() => setActiveTab('high')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeTab === 'high' 
                    ? 'bg-green-500 text-black' 
                    : 'bg-[#2a2a2a] text-gray-300 hover:bg-[#3a3a3a]'
                }`}
              >
                Alta Prob.
              </button>
              <button
                onClick={() => setActiveTab('speculative')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeTab === 'speculative' 
                    ? 'bg-green-500 text-black' 
                    : 'bg-[#2a2a2a] text-gray-300 hover:bg-[#3a3a3a]'
                }`}
              >
                Especulativo
              </button>
              <button
                onClick={() => setActiveTab('avoid')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeTab === 'avoid' 
                    ? 'bg-green-500 text-black' 
                    : 'bg-[#2a2a2a] text-gray-300 hover:bg-[#3a3a3a]'
                }`}
              >
                Evitar
              </button>
            </div>
          </div>
        </div>

        {/* Alerts List */}
        <div className="space-y-4">
          {filteredAlerts.map((alert) => (
            <div key={alert.id} className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-6 hover:bg-[#1f1f1f] transition-colors">
              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-3">
                    <span className="text-2xl font-bold text-white font-jetbrains">
                      {alert.token}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getCategoryColor(alert.category)}`}>
                      {alert.category}
                    </span>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(alert.status)}`}>
                      {alert.status === 'active' ? 'Ativo' : 'Disparado'}
                    </span>
                  </div>
                  <p className="text-gray-300 mb-3">{alert.summary}</p>
                  <div className="flex items-center space-x-4 text-sm text-gray-400">
                    <span>{formatTime(alert.created_at)}</span>
                    <span className="flex items-center space-x-1">
                      <span>Impact Score:</span>
                      <span className={`font-jetbrains font-semibold ${
                        alert.impact_score >= 70 ? 'text-green-400' : 
                        alert.impact_score >= 50 ? 'text-yellow-400' : 'text-red-400'
                      }`}>
                        {alert.impact_score}%
                      </span>
                    </span>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  {alert.impact_score >= 70 ? (
                    <TrendingUp className="w-8 h-8 text-green-400" />
                  ) : alert.impact_score >= 50 ? (
                    <AlertTriangle className="w-8 h-8 text-yellow-400" />
                  ) : (
                    <TrendingDown className="w-8 h-8 text-red-400" />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredAlerts.length === 0 && (
          <div className="text-center py-12">
            <Bell className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-400 mb-2">
              Nenhum alerta encontrado
            </h3>
            <p className="text-gray-500">
              Tente ajustar os filtros ou criar um novo alerta
            </p>
          </div>
        )}
      </div>
    </div>
  )
}