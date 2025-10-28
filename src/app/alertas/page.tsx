'use client'

import { useAuth } from '@/hooks/useAuth'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { Bell, TrendingUp, AlertTriangle, CheckCircle, Clock } from 'lucide-react'

interface Alert {
  id: string
  token: string
  impact_score: number
  category: string
  summary: string
  created_at: string
}

export default function AlertasPage() {
  const { user } = useAuth()
  const [alerts, setAlerts] = useState<Alert[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<string>('all')

  useEffect(() => {
    fetchAlerts()
  }, [])

  const fetchAlerts = async () => {
    try {
      const { data, error } = await supabase
        .from('alerts')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setAlerts(data || [])
    } catch (error) {
      console.error('Erro ao buscar alertas:', error)
    } finally {
      setLoading(false)
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'ALTA PROBABILIDADE':
        return 'text-green-400 bg-green-400/10 border-green-400/30'
      case 'ESPECULATIVO':
        return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/30'
      case 'EVITAR':
        return 'text-red-400 bg-red-400/10 border-red-400/30'
      default:
        return 'text-gray-400 bg-gray-400/10 border-gray-400/30'
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'ALTA PROBABILIDADE':
        return <CheckCircle className="w-4 h-4" />
      case 'ESPECULATIVO':
        return <Clock className="w-4 h-4" />
      case 'EVITAR':
        return <AlertTriangle className="w-4 h-4" />
      default:
        return <Bell className="w-4 h-4" />
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getImpactColor = (score: number) => {
    if (score >= 80) return 'text-green-400'
    if (score >= 60) return 'text-yellow-400'
    if (score >= 40) return 'text-orange-400'
    return 'text-red-400'
  }

  const filteredAlerts = alerts.filter(alert => {
    if (filter === 'all') return true
    return alert.category === filter
  })

  return (
    <div className="min-h-screen bg-[#0a0a0a] pt-16">
      <div className="max-w-7xl mx-auto p-4 md:p-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <Bell className="w-8 h-8 text-green-400" />
            <h1 className="text-3xl md:text-4xl font-bold text-white font-jetbrains">
              Central de Alertas
            </h1>
          </div>
          <p className="text-gray-400 text-lg">
            Monitore todos os sinais e oportunidades detectadas pela CryptoSageAI
          </p>
        </div>

        {/* Filtros */}
        <div className="mb-6">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filter === 'all'
                  ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                  : 'bg-[#1a1a1a] text-gray-400 border border-[#2a2a2a] hover:bg-[#2a2a2a]'
              }`}
            >
              Todos ({alerts.length})
            </button>
            <button
              onClick={() => setFilter('ALTA PROBABILIDADE')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filter === 'ALTA PROBABILIDADE'
                  ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                  : 'bg-[#1a1a1a] text-gray-400 border border-[#2a2a2a] hover:bg-[#2a2a2a]'
              }`}
            >
              Alta Probabilidade ({alerts.filter(a => a.category === 'ALTA PROBABILIDADE').length})
            </button>
            <button
              onClick={() => setFilter('ESPECULATIVO')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filter === 'ESPECULATIVO'
                  ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                  : 'bg-[#1a1a1a] text-gray-400 border border-[#2a2a2a] hover:bg-[#2a2a2a]'
              }`}
            >
              Especulativo ({alerts.filter(a => a.category === 'ESPECULATIVO').length})
            </button>
            <button
              onClick={() => setFilter('EVITAR')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filter === 'EVITAR'
                  ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                  : 'bg-[#1a1a1a] text-gray-400 border border-[#2a2a2a] hover:bg-[#2a2a2a]'
              }`}
            >
              Evitar ({alerts.filter(a => a.category === 'EVITAR').length})
            </button>
          </div>
        </div>

        {/* Lista de Alertas */}
        <div className="space-y-4">
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-400 mx-auto mb-4"></div>
              <p className="text-gray-400">Carregando alertas...</p>
            </div>
          ) : filteredAlerts.length === 0 ? (
            <div className="text-center py-12">
              <Bell className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400 text-lg">
                {filter === 'all' 
                  ? 'Nenhum alerta encontrado. Mercado silencioso ou em modo defesa.'
                  : `Nenhum alerta na categoria "${filter}".`
                }
              </p>
            </div>
          ) : (
            filteredAlerts.map((alert) => (
              <div
                key={alert.id}
                className="bg-[#0f0f0f] border border-[#2a2a2a] rounded-lg p-6 hover:bg-[#1a1a1a] transition-colors"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                  <div className="flex items-center space-x-3 mb-2 md:mb-0">
                    <div className={`p-2 rounded-lg border ${getCategoryColor(alert.category)}`}>
                      {getCategoryIcon(alert.category)}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white font-jetbrains">
                        {alert.token}
                      </h3>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 rounded text-xs font-medium border ${getCategoryColor(alert.category)}`}>
                          {alert.category}
                        </span>
                        <span className="text-gray-400 text-sm">
                          {formatDate(alert.created_at)}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-400 mb-1">Impact Score</div>
                    <div className={`text-2xl font-bold font-jetbrains ${getImpactColor(alert.impact_score)}`}>
                      {alert.impact_score}
                    </div>
                  </div>
                </div>
                
                <div className="bg-[#1a1a1a] rounded-lg p-4 border-l-4 border-green-500">
                  <p className="text-gray-300 leading-relaxed">
                    {alert.summary}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}