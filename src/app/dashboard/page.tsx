'use client'

import { useAuth } from '@/hooks/useAuth'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { Zap, TrendingUp, Activity, Eye, Loader2 } from 'lucide-react'

interface Alert {
  id: string
  token: string
  impact_score: number
  category: string
  summary: string
  created_at: string
}

export default function DashboardPage() {
  const { user } = useAuth()
  const [alerts, setAlerts] = useState<Alert[]>([])
  const [loading, setLoading] = useState(true)
  const [scanLoading, setScanLoading] = useState(false)
  const [tacticalText, setTacticalText] = useState(`
    <div class="mb-3 p-3 bg-[#1a1a1a] rounded border-l-2 border-orange-500">
      Fluxo comprador firme em mid caps. Baleias testando terreno, sem dump agressivo.
    </div>
    
    <div class="mb-3 p-3 bg-[#1a1a1a] rounded border-l-2 border-green-500">
      <strong>Recomendação:</strong> Entrada leve. Stop curto. Bate e some.
    </div>
    
    <div class="p-3 bg-[#1a1a1a] rounded border-l-2 border-red-500 italic">
      "Ganhar é fácil. Sobreviver é difícil."
    </div>
  `)
  const [lastUpdate, setLastUpdate] = useState('2 min atrás')

  useEffect(() => {
    fetchAlerts()
  }, [])

  const fetchAlerts = async () => {
    try {
      const { data, error } = await supabase
        .from('alerts')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(10)

      if (error) throw error
      setAlerts(data || [])
    } catch (error) {
      console.error('Erro ao buscar alertas:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleScanNow = async () => {
    setScanLoading(true)
    try {
      const response = await fetch('/api/scan-now', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Erro na varredura')
      }

      // Atualizar tactical text
      setTacticalText(formatTacticalText(data.tactical_text))
      setLastUpdate('agora')

      // Atualizar lista de alertas
      await fetchAlerts()

      // Mostrar feedback de sucesso
      alert(`✅ Varredura concluída! Token: ${data.alert.token} | Score: ${data.alert.impact_score}`)

    } catch (error: any) {
      console.error('Erro na varredura:', error)
      alert(`❌ Erro: ${error.message}`)
    } finally {
      setScanLoading(false)
    }
  }

  const formatTacticalText = (text: string) => {
    // Formatar o texto da IA para HTML com estilo CryptoSageAI
    const lines = text.split('\n').filter(line => line.trim())
    let formattedText = ''
    
    lines.forEach(line => {
      if (line.includes('CONTEXTO ATUAL') || line.includes('ALVO PRINCIPAL')) {
        formattedText += `<div class="mb-3 p-3 bg-[#1a1a1a] rounded border-l-2 border-orange-500">${line}</div>`
      } else if (line.includes('ESTRATÉGIA') || line.includes('TESE')) {
        formattedText += `<div class="mb-3 p-3 bg-[#1a1a1a] rounded border-l-2 border-green-500"><strong>Recomendação:</strong> ${line}</div>`
      } else if (line.includes('FRASE FINAL') || line.includes('"')) {
        formattedText += `<div class="p-3 bg-[#1a1a1a] rounded border-l-2 border-red-500 italic">${line}</div>`
      }
    })

    return formattedText || text
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'ALTA PROBABILIDADE':
        return 'text-green-400 bg-green-400/10 border-green-400/30'
      case 'ESPECULATIVO ALTO RISCO':
        return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/30'
      case 'EVITAR':
        return 'text-red-400 bg-red-400/10 border-red-400/30'
      default:
        return 'text-gray-400 bg-gray-400/10 border-gray-400/30'
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60))
    
    if (diffInMinutes < 1) return 'agora'
    if (diffInMinutes < 60) return `${diffInMinutes}min atrás`
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h atrás`
    return `${Math.floor(diffInMinutes / 1440)}d atrás`
  }

  const getImpactColor = (score: number) => {
    if (score >= 80) return 'text-green-400'
    if (score >= 60) return 'text-yellow-400'
    if (score >= 40) return 'text-orange-400'
    return 'text-red-400'
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-2 font-jetbrains">
                CryptoSageAI
              </h1>
              <p className="text-gray-400 text-lg mb-4">
                O mercado fala. Eu traduzo.
              </p>
              <div className="flex items-center space-x-4">
                <div className="px-3 py-1 bg-orange-500/20 border border-orange-500/30 rounded-lg">
                  <span className="text-orange-400 font-semibold text-sm">MODO CAÇADOR</span>
                </div>
                {user && (
                  <div className="text-sm text-gray-400">
                    Plano: <span className="text-white capitalize">{user.user_metadata?.role || 'free'}</span>
                  </div>
                )}
              </div>
            </div>
            <button 
              onClick={handleScanNow}
              disabled={scanLoading}
              className="mt-4 md:mt-0 px-4 py-2 bg-[#1e1e1e] border border-[#3a3a3a] hover:bg-[#2a2a2a] disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg transition-colors"
            >
              <div className="flex items-center space-x-2">
                {scanLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Zap className="w-4 h-4" />
                )}
                <div className="text-left">
                  <div className="text-sm font-semibold">
                    {scanLoading ? 'Analisando...' : 'Forçar Varredura Agora'}
                  </div>
                  <div className="text-xs text-gray-400">uso avançado</div>
                </div>
              </div>
            </button>
          </div>
        </div>

        {/* Cards de Resumo */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {/* Card 1: BTC/ETH */}
          <div className="bg-[#0f0f0f] border border-[#2a2a2a] rounded-lg p-6">
            <h3 className="text-gray-400 text-sm mb-3">BTC / ETH</h3>
            <div className="space-y-2">
              <div className="text-white font-jetbrains text-lg">BTC: $68,420</div>
              <div className="text-white font-jetbrains text-lg">ETH: $3,245</div>
            </div>
            <p className="text-gray-500 text-xs mt-3">Tendência: estável / leve alta</p>
          </div>

          {/* Card 2: Fear & Greed */}
          <div className="bg-[#0f0f0f] border border-[#2a2a2a] rounded-lg p-6">
            <h3 className="text-gray-400 text-sm mb-3">Fear & Greed</h3>
            <div className="text-white font-jetbrains text-lg mb-2">Índice: 72 (Ganância)</div>
            <p className="text-gray-500 text-xs">Apetite por risco elevado</p>
          </div>

          {/* Card 3: Volume Global */}
          <div className="bg-[#0f0f0f] border border-[#2a2a2a] rounded-lg p-6">
            <h3 className="text-gray-400 text-sm mb-3">Volume Global 24h</h3>
            <div className="text-white font-jetbrains text-lg mb-2">$92.4B</div>
            <p className="text-gray-500 text-xs">Liquidez saudável</p>
          </div>

          {/* Card 4: Leitura de Baleias */}
          <div className="bg-[#0f0f0f] border border-[#2a2a2a] rounded-lg p-6">
            <h3 className="text-gray-400 text-sm mb-3">Última leitura de baleias</h3>
            <div className="text-white font-jetbrains text-sm mb-2">Entrada $1.2M em altcoins mid cap</div>
            <p className="text-gray-500 text-xs">Pressão compradora institucional moderada</p>
          </div>
        </div>

        {/* Layout Principal: Alertas + Leitura Tática */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Tabela de Alertas */}
          <div className="lg:col-span-2">
            <div className="bg-[#0f0f0f] border border-[#2a2a2a] rounded-lg">
              <div className="p-6 border-b border-[#2a2a2a]">
                <h2 className="text-xl font-semibold text-white mb-1">Últimos Alertas da CryptoSageAI</h2>
                <p className="text-gray-400 text-sm">Chamadas recentes com maior Impact Score</p>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-[#2a2a2a]">
                      <th className="text-left p-4 text-gray-400 text-sm font-medium">Token</th>
                      <th className="text-left p-4 text-gray-400 text-sm font-medium">Impact Score</th>
                      <th className="text-left p-4 text-gray-400 text-sm font-medium">Categoria</th>
                      <th className="text-left p-4 text-gray-400 text-sm font-medium">Resumo</th>
                      <th className="text-left p-4 text-gray-400 text-sm font-medium">Timestamp</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loading ? (
                      <tr>
                        <td colSpan={5} className="p-8 text-center text-gray-400">
                          Carregando alertas...
                        </td>
                      </tr>
                    ) : alerts.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="p-8 text-center text-gray-400">
                          Nenhum alerta ativo. Mercado silencioso ou em modo defesa.
                        </td>
                      </tr>
                    ) : (
                      alerts.map((alert) => (
                        <tr key={alert.id} className="border-b border-[#2a2a2a] hover:bg-[#1a1a1a] transition-colors">
                          <td className="p-4">
                            <span className="text-white font-jetbrains font-semibold">{alert.token}</span>
                          </td>
                          <td className="p-4">
                            <span className={`font-jetbrains font-semibold ${getImpactColor(alert.impact_score)}`}>
                              {alert.impact_score}
                            </span>
                          </td>
                          <td className="p-4">
                            <span className={`px-2 py-1 rounded text-xs font-medium border ${getCategoryColor(alert.category)}`}>
                              {alert.category}
                            </span>
                          </td>
                          <td className="p-4 text-gray-300 text-sm max-w-xs truncate">
                            {alert.summary}
                          </td>
                          <td className="p-4 text-gray-400 text-sm">
                            {formatDate(alert.created_at)}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Card Leitura Tática Atual */}
          <div className="lg:col-span-1">
            <div className="bg-[#111111] border border-[#2a2a2a] rounded-lg p-6">
              <div className="flex items-center space-x-2 mb-4">
                <Eye className="w-5 h-5 text-gray-400" />
                <h3 className="text-gray-300 font-semibold">Leitura Tática Atual</h3>
              </div>
              
              <div className="space-y-4">
                <div 
                  className="text-white text-sm leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: tacticalText }}
                />
              </div>
              
              <div className="mt-6 pt-4 border-t border-[#2a2a2a]">
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>Última atualização</span>
                  <span>{lastUpdate}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}