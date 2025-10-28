'use client'

import { useAuth } from '@/hooks/useAuth'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { 
  Zap, TrendingUp, Activity, Eye, Loader2, ExternalLink, 
  Target, AlertTriangle, Trophy, Clock, BarChart3, 
  Newspaper, User, Settings, ArrowUpRight, ArrowDownRight,
  Shield, Crosshair, Flame, DollarSign, Globe, Brain
} from 'lucide-react'

interface Alert {
  id: string
  token: string
  impact_score: number
  category: string
  summary: string
  entry_price?: number
  stop_price?: number
  target_price?: number
  created_at: string
}

interface UserTrade {
  id: string
  token: string
  entry_price: number
  current_price: number
  roi: number
  status: string
  created_at: string
  time_active: string
}

interface MarketData {
  btc_price: number
  btc_change: number
  eth_price: number
  eth_change: number
  fear_greed: number
  volume_24h: string
  whale_activity: string
}

interface NewsItem {
  id: string
  title: string
  category: string
  time: string
  icon: string
}

export default function DashboardPage() {
  const { user, loading: authLoading } = useAuth()
  const [alerts, setAlerts] = useState<Alert[]>([])
  const [userTrades, setUserTrades] = useState<UserTrade[]>([])
  const [marketData, setMarketData] = useState<MarketData>({
    btc_price: 68420,
    btc_change: 1.3,
    eth_price: 3245,
    eth_change: 2.1,
    fear_greed: 72,
    volume_24h: '$92.4B',
    whale_activity: 'Whale move: $1.2M → SOL'
  })
  const [news, setNews] = useState<NewsItem[]>([
    { id: '1', title: 'ETF de ETH aprovado pela SEC', category: 'Regulamentação', time: '15min', icon: '⚖️' },
    { id: '2', title: 'Solana ultrapassa $200 com volume recorde', category: 'Mercado', time: '32min', icon: '💰' },
    { id: '3', title: 'Binance lança novo programa de staking IA', category: 'Tecnologia', time: '1h', icon: '🔧' },
    { id: '4', title: 'BlackRock aumenta posição em Bitcoin', category: 'Mercado', time: '2h', icon: '💰' },
    { id: '5', title: 'Nova regulamentação cripto na Europa', category: 'Regulamentação', time: '3h', icon: '⚖️' }
  ])
  const [loading, setLoading] = useState(true)
  const [scanLoading, setScanLoading] = useState(false)
  const [marketMode, setMarketMode] = useState<'CAÇADOR' | 'DEFESA' | 'TEMPESTADE'>('CAÇADOR')
  const [userStats, setUserStats] = useState({
    scans_today: 2,
    scans_limit: 3,
    alerts_followed: 5,
    profitable_alerts: 3,
    success_rate: 60,
    avg_roi: 12.5
  })

  // Se ainda está carregando autenticação, mostrar loading
  if (authLoading) {
    return (
      <div className="min-h-screen bg-[#0b0b0b] text-white flex items-center justify-center">
        <div className="flex items-center space-x-3">
          <Loader2 className="w-8 h-8 animate-spin text-cyan-400" />
          <span className="text-lg">Carregando dashboard...</span>
        </div>
      </div>
    )
  }

  // Se não está autenticado, redirecionar será feito pelo middleware
  if (!user) {
    return (
      <div className="min-h-screen bg-[#0b0b0b] text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Acesso Negado</h1>
          <p className="text-gray-400 mb-4">Você precisa estar logado para acessar o dashboard.</p>
          <a href="/login" className="text-cyan-400 hover:text-cyan-300">
            Fazer Login
          </a>
        </div>
      </div>
    )
  }

  useEffect(() => {
    fetchAlerts()
    fetchUserTrades()
    // Simular atualização de dados em tempo real
    const interval = setInterval(() => {
      updateMarketData()
    }, 30000) // 30 segundos

    return () => clearInterval(interval)
  }, [])

  const fetchAlerts = async () => {
    try {
      const { data, error } = await supabase
        .from('alerts')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(6)

      if (error) throw error
      
      // Adicionar dados mock se não houver alertas
      const mockAlerts = data?.length ? data : [
        {
          id: '1',
          token: 'ASTRA',
          impact_score: 85,
          category: 'ALTA PROBABILIDADE',
          summary: 'Breakout confirmado com volume. Narrativa IA em alta.',
          entry_price: 0.071,
          stop_price: 0.065,
          target_price: 0.083,
          created_at: new Date().toISOString()
        },
        {
          id: '2',
          token: 'NEURAL',
          impact_score: 78,
          category: 'ALTA PROBABILIDADE',
          summary: 'Acumulação de baleias detectada. Resistência rompida.',
          entry_price: 0.245,
          stop_price: 0.220,
          target_price: 0.290,
          created_at: new Date(Date.now() - 1800000).toISOString()
        },
        {
          id: '3',
          token: 'QUANTUM',
          impact_score: 65,
          category: 'ESPECULATIVO ALTO RISCO',
          summary: 'Padrão de reversão formando. Volume baixo.',
          entry_price: 1.45,
          stop_price: 1.30,
          target_price: 1.75,
          created_at: new Date(Date.now() - 3600000).toISOString()
        }
      ]
      
      setAlerts(mockAlerts)
    } catch (error) {
      console.error('Erro ao buscar alertas:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchUserTrades = async () => {
    // Mock data para demonstração
    const mockTrades: UserTrade[] = [
      {
        id: '1',
        token: 'SOL',
        entry_price: 180,
        current_price: 202.5,
        roi: 12.5,
        status: 'Em andamento',
        created_at: new Date(Date.now() - 10800000).toISOString(),
        time_active: '3h'
      },
      {
        id: '2',
        token: 'DOG-AI',
        entry_price: 0.000021,
        current_price: 0.0000196,
        roi: -6.8,
        status: 'Perto do stop',
        created_at: new Date(Date.now() - 18000000).toISOString(),
        time_active: '5h'
      }
    ]
    setUserTrades(mockTrades)
  }

  const updateMarketData = () => {
    // Simular pequenas variações nos preços
    setMarketData(prev => ({
      ...prev,
      btc_price: prev.btc_price + (Math.random() - 0.5) * 100,
      eth_price: prev.eth_price + (Math.random() - 0.5) * 20,
    }))
  }

  const handleFollowAlert = async (alert: Alert) => {
    try {
      // Simular gravação no backend
      const newTrade: UserTrade = {
        id: Date.now().toString(),
        token: alert.token,
        entry_price: alert.entry_price || 0,
        current_price: alert.entry_price || 0,
        roi: 0,
        status: 'Em andamento',
        created_at: new Date().toISOString(),
        time_active: '0min'
      }
      
      setUserTrades(prev => [newTrade, ...prev])
      setUserStats(prev => ({ ...prev, alerts_followed: prev.alerts_followed + 1 }))
      
      alert('✅ Alerta seguido com sucesso! Acompanhe na seção "Minhas Operações".')
    } catch (error) {
      console.error('Erro ao seguir alerta:', error)
    }
  }

  const getExchangeUrl = (token: string) => {
    // Lógica para detectar exchange correta (simplificada)
    const exchanges = [
      { name: 'Binance', url: `https://www.binance.com/en/trade/${token}_USDT` },
      { name: 'MEXC', url: `https://www.mexc.com/exchange/${token}_USDT` },
      { name: 'Gate.io', url: `https://www.gate.io/trade/${token}_USDT` }
    ]
    return exchanges[0] // Retorna Binance por padrão
  }

  const getMarketModeConfig = () => {
    switch (marketMode) {
      case 'CAÇADOR':
        return { color: 'text-green-400 bg-green-400/10 border-green-400/30', icon: '🟢' }
      case 'DEFESA':
        return { color: 'text-red-400 bg-red-400/10 border-red-400/30', icon: '🔴' }
      case 'TEMPESTADE':
        return { color: 'text-orange-400 bg-orange-400/10 border-orange-400/30', icon: '🟠' }
    }
  }

  const getActionColor = (score: number) => {
    if (score >= 80) return { action: 'Comprar leve', color: 'text-green-400', bg: 'bg-green-400/10' }
    if (score >= 60) return { action: 'Observar', color: 'text-yellow-400', bg: 'bg-yellow-400/10' }
    return { action: 'Evitar', color: 'text-red-400', bg: 'bg-red-400/10' }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60))
    
    if (diffInMinutes < 1) return 'agora'
    if (diffInMinutes < 60) return `${diffInMinutes}min`
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h`
    return `${Math.floor(diffInMinutes / 1440)}d`
  }

  const modeConfig = getMarketModeConfig()

  return (
    <div className="min-h-screen bg-[#0b0b0b] text-white">
      {/* Header Inteligente */}
      <div className="border-b border-gray-800 bg-[#0f0f0f]">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div className="mb-4 lg:mb-0">
              <h1 className="text-3xl lg:text-4xl font-bold mb-2 font-inter">
                Radar Cripto 24h — Inteligência em Ação
              </h1>
              <p className="text-gray-400 text-lg mb-4">
                O mercado fala. Eu traduzo e ajo por você.
              </p>
              
              {/* Badge Modo do Mercado */}
              <div className="flex items-center space-x-4 mb-4">
                <div className={`px-4 py-2 rounded-lg border ${modeConfig.color}`}>
                  <span className="font-semibold">
                    {modeConfig.icon} MODO {marketMode}
                  </span>
                </div>
                
                {/* Indicadores Rápidos */}
                <div className="hidden lg:flex items-center space-x-6 text-sm">
                  <div>
                    <span className="text-gray-400">BTC:</span>
                    <span className="ml-1 font-jetbrains">
                      ${marketData.btc_price.toLocaleString()}
                    </span>
                    <span className={`ml-1 ${marketData.btc_change > 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {marketData.btc_change > 0 ? '↑' : '↓'} {Math.abs(marketData.btc_change)}%
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-400">ETH:</span>
                    <span className="ml-1 font-jetbrains">
                      ${marketData.eth_price.toLocaleString()}
                    </span>
                    <span className={`ml-1 ${marketData.eth_change > 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {marketData.eth_change > 0 ? '↑' : '↓'} {Math.abs(marketData.eth_change)}%
                    </span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Info do Usuário */}
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <div className="text-sm text-gray-400">
                  Plano: <span className="text-white font-semibold capitalize">
                    {user?.role || 'Free'}
                  </span>
                </div>
                <div className="text-sm text-gray-400">
                  Varreduras: <span className="text-white font-semibold">
                    {userStats.scans_today}/{userStats.scans_limit} usadas hoje
                  </span>
                </div>
              </div>
              <button className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 rounded-lg font-semibold transition-all duration-300">
                Upgrade de Plano
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Visão do Mercado */}
        <div className="mb-8">
          <div className="bg-[#0f0f0f] border border-gray-800 rounded-xl p-6 mb-6">
            <div className="flex items-center space-x-2 mb-4">
              <Globe className="w-5 h-5 text-cyan-400" />
              <h2 className="text-xl font-semibold">Visão do Mercado</h2>
            </div>
            
            <div className="bg-gradient-to-r from-green-500/10 to-cyan-500/10 border border-green-500/20 rounded-lg p-4 mb-6">
              <p className="text-green-400 font-medium">
                🟢 Mercado em modo CAÇADOR. Baleias comprando altcoins IA. 
                Narrativa dominante: Restaking e Inteligência Artificial.
              </p>
            </div>

            {/* Cards de Dados */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-[#1a1a1a] border border-gray-700 rounded-lg p-4">
                <h3 className="text-gray-400 text-sm mb-2">BTC/ETH</h3>
                <div className="space-y-1">
                  <div className="font-jetbrains">
                    BTC ${marketData.btc_price.toLocaleString()} 
                    <span className="text-green-400 ml-2">↑ {marketData.btc_change}%</span>
                  </div>
                  <div className="font-jetbrains">
                    ETH ${marketData.eth_price.toLocaleString()} 
                    <span className="text-green-400 ml-2">↑ {marketData.eth_change}%</span>
                  </div>
                </div>
              </div>

              <div className="bg-[#1a1a1a] border border-gray-700 rounded-lg p-4">
                <h3 className="text-gray-400 text-sm mb-2">Sentimento (Fear & Greed)</h3>
                <div className="font-jetbrains text-lg">
                  {marketData.fear_greed} — <span className="text-orange-400">Ganância</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
                  <div 
                    className="bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 h-2 rounded-full"
                    style={{ width: `${marketData.fear_greed}%` }}
                  ></div>
                </div>
              </div>

              <div className="bg-[#1a1a1a] border border-gray-700 rounded-lg p-4">
                <h3 className="text-gray-400 text-sm mb-2">Whale Activity</h3>
                <div className="text-sm">
                  <div className="font-jetbrains mb-1">{marketData.whale_activity}</div>
                  <div className="text-gray-400">Volume: {marketData.volume_24h}</div>
                </div>
              </div>

              <div className="bg-[#1a1a1a] border border-gray-700 rounded-lg p-4">
                <h3 className="text-gray-400 text-sm mb-2">Narrativas em Alta</h3>
                <div className="flex flex-wrap gap-1">
                  {['IA', 'DeFi', 'Meme', 'Restaking', 'GameFi'].map((tag) => (
                    <span key={tag} className="px-2 py-1 bg-cyan-500/20 text-cyan-400 text-xs rounded">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Layout Principal: 3 Colunas */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Coluna 1: Oportunidades (6 colunas) */}
          <div className="lg:col-span-6">
            <div className="bg-[#0f0f0f] border border-gray-800 rounded-xl p-6 mb-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-2">
                  <Zap className="w-5 h-5 text-yellow-400" />
                  <h2 className="text-xl font-semibold">Oportunidades em Tempo Real</h2>
                </div>
                <button 
                  onClick={() => fetchAlerts()}
                  className="text-sm text-cyan-400 hover:text-cyan-300 transition-colors"
                >
                  Atualizar
                </button>
              </div>

              <div className="space-y-4">
                {loading ? (
                  <div className="flex items-center justify-center py-8">
                    <Loader2 className="w-6 h-6 animate-spin text-cyan-400" />
                  </div>
                ) : (
                  alerts.map((alert) => {
                    const actionConfig = getActionColor(alert.impact_score)
                    const exchange = getExchangeUrl(alert.token)
                    
                    return (
                      <div key={alert.id} className="bg-[#1a1a1a] border border-gray-700 rounded-lg p-4 hover:border-gray-600 transition-colors">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h3 className="font-jetbrains font-bold text-lg text-white">
                              ${alert.token}
                            </h3>
                            <div className="flex items-center space-x-2 mt-1">
                              <span className="text-sm text-gray-400">Impact Score:</span>
                              <span className="font-jetbrains font-bold text-cyan-400">
                                {alert.impact_score}
                              </span>
                              <span className="text-sm text-gray-400">[Alta Probabilidade]</span>
                            </div>
                          </div>
                          
                          <div className={`px-3 py-1 rounded-lg ${actionConfig.bg}`}>
                            <span className={`text-sm font-semibold ${actionConfig.color}`}>
                              {actionConfig.action}
                            </span>
                          </div>
                        </div>

                        <p className="text-gray-300 text-sm mb-4">{alert.summary}</p>

                        {alert.entry_price && (
                          <div className="grid grid-cols-3 gap-4 mb-4 p-3 bg-[#0f0f0f] rounded-lg">
                            <div>
                              <span className="text-xs text-gray-400 block">Entrada</span>
                              <span className="font-jetbrains text-white">${alert.entry_price}</span>
                            </div>
                            <div>
                              <span className="text-xs text-gray-400 block">Stop</span>
                              <span className="font-jetbrains text-red-400">${alert.stop_price}</span>
                            </div>
                            <div>
                              <span className="text-xs text-gray-400 block">Alvo</span>
                              <span className="font-jetbrains text-green-400">
                                ${alert.target_price} 
                                <span className="text-xs ml-1">
                                  (+{Math.round(((alert.target_price! - alert.entry_price) / alert.entry_price) * 100)}%)
                                </span>
                              </span>
                            </div>
                          </div>
                        )}

                        <div className="flex space-x-3">
                          <a
                            href={exchange.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 px-4 py-2 rounded-lg font-semibold text-center transition-all duration-300 flex items-center justify-center space-x-2"
                          >
                            <ExternalLink className="w-4 h-4" />
                            <span>Negociar Agora</span>
                          </a>
                          
                          <button
                            onClick={() => handleFollowAlert(alert)}
                            className="flex-1 bg-[#2a2a2a] hover:bg-[#3a3a3a] border border-gray-600 px-4 py-2 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2"
                          >
                            <Eye className="w-4 h-4" />
                            <span>Seguir Alerta</span>
                          </button>
                        </div>

                        <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-700">
                          <span className="text-xs text-gray-400">
                            {formatDate(alert.created_at)} atrás
                          </span>
                          <span className="text-xs text-cyan-400">
                            {exchange.name}
                          </span>
                        </div>
                      </div>
                    )
                  })
                )}
              </div>
            </div>

            {/* Minhas Operações */}
            <div className="bg-[#0f0f0f] border border-gray-800 rounded-xl p-6">
              <div className="flex items-center space-x-2 mb-6">
                <BarChart3 className="w-5 h-5 text-green-400" />
                <h2 className="text-xl font-semibold">Minhas Operações</h2>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-700">
                      <th className="text-left py-3 text-gray-400 text-sm">Token</th>
                      <th className="text-left py-3 text-gray-400 text-sm">Entrada</th>
                      <th className="text-left py-3 text-gray-400 text-sm">ROI Atual</th>
                      <th className="text-left py-3 text-gray-400 text-sm">Status</th>
                      <th className="text-left py-3 text-gray-400 text-sm">Tempo</th>
                      <th className="text-left py-3 text-gray-400 text-sm">Ação</th>
                    </tr>
                  </thead>
                  <tbody>
                    {userTrades.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="py-8 text-center text-gray-400">
                          Nenhuma operação ativa. Siga alguns alertas para começar!
                        </td>
                      </tr>
                    ) : (
                      userTrades.map((trade) => (
                        <tr key={trade.id} className="border-b border-gray-700/50">
                          <td className="py-3">
                            <span className="font-jetbrains font-semibold">{trade.token}</span>
                          </td>
                          <td className="py-3 font-jetbrains">${trade.entry_price}</td>
                          <td className="py-3">
                            <span className={`font-jetbrains font-semibold ${
                              trade.roi > 0 ? 'text-green-400' : 'text-red-400'
                            }`}>
                              {trade.roi > 0 ? '+' : ''}{trade.roi}%
                            </span>
                          </td>
                          <td className="py-3">
                            <span className={`px-2 py-1 rounded text-xs ${
                              trade.status === 'Em andamento' 
                                ? 'bg-green-400/10 text-green-400' 
                                : 'bg-red-400/10 text-red-400'
                            }`}>
                              {trade.status === 'Em andamento' ? '🟢' : '🔴'} {trade.status}
                            </span>
                          </td>
                          <td className="py-3 text-gray-400 text-sm">{trade.time_active}</td>
                          <td className="py-3">
                            <button className="text-cyan-400 hover:text-cyan-300 text-sm">
                              Ver Detalhes
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Coluna 2: Notícias (3 colunas) */}
          <div className="lg:col-span-3">
            <div className="bg-[#0f0f0f] border border-gray-800 rounded-xl p-6 mb-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-2">
                  <Newspaper className="w-5 h-5 text-blue-400" />
                  <h2 className="text-xl font-semibold">Últimas Notícias</h2>
                </div>
                <span className="text-xs text-gray-400">Atualização: 30min</span>
              </div>

              <div className="space-y-4">
                {news.map((item) => (
                  <div key={item.id} className="border-b border-gray-700/50 pb-4 last:border-b-0">
                    <div className="flex items-start space-x-3">
                      <span className="text-lg">{item.icon}</span>
                      <div className="flex-1">
                        <h3 className="text-sm font-medium text-white mb-1 leading-tight">
                          {item.title}
                        </h3>
                        <div className="flex items-center space-x-2 text-xs text-gray-400">
                          <span>{item.category}</span>
                          <span>•</span>
                          <span>{item.time}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <button className="w-full mt-4 py-2 text-cyan-400 hover:text-cyan-300 text-sm border border-gray-700 rounded-lg hover:border-gray-600 transition-colors">
                Ver mais notícias
              </button>
            </div>
          </div>

          {/* Coluna 3: Resumo do Usuário (3 colunas) */}
          <div className="lg:col-span-3">
            <div className="bg-[#0f0f0f] border border-gray-800 rounded-xl p-6">
              <div className="flex items-center space-x-2 mb-6">
                <User className="w-5 h-5 text-purple-400" />
                <h2 className="text-xl font-semibold">Resumo do Usuário</h2>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-[#1a1a1a] border border-gray-700 rounded-lg p-3">
                    <div className="text-2xl font-jetbrains font-bold text-cyan-400">
                      {userStats.scans_today}/{userStats.scans_limit}
                    </div>
                    <div className="text-xs text-gray-400">Varreduras hoje</div>
                  </div>
                  
                  <div className="bg-[#1a1a1a] border border-gray-700 rounded-lg p-3">
                    <div className="text-2xl font-jetbrains font-bold text-green-400">
                      {userStats.alerts_followed}
                    </div>
                    <div className="text-xs text-gray-400">Alertas seguidos</div>
                  </div>
                  
                  <div className="bg-[#1a1a1a] border border-gray-700 rounded-lg p-3">
                    <div className="text-2xl font-jetbrains font-bold text-yellow-400">
                      {userStats.success_rate}%
                    </div>
                    <div className="text-xs text-gray-400">Taxa de acerto</div>
                  </div>
                  
                  <div className="bg-[#1a1a1a] border border-gray-700 rounded-lg p-3">
                    <div className="text-2xl font-jetbrains font-bold text-purple-400">
                      +{userStats.avg_roi}%
                    </div>
                    <div className="text-xs text-gray-400">ROI médio</div>
                  </div>
                </div>

                <div className="space-y-3 pt-4 border-t border-gray-700">
                  <button className="w-full py-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-lg font-semibold transition-all duration-300">
                    Gerar relatório semanal (PDF)
                  </button>
                  
                  <button className="w-full py-2 bg-[#2a2a2a] hover:bg-[#3a3a3a] border border-gray-600 rounded-lg font-semibold transition-colors">
                    Ver histórico completo
                  </button>
                  
                  <button className="w-full py-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 rounded-lg font-semibold transition-all duration-300">
                    Upgrade de Plano
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Rodapé */}
      <footer className="border-t border-gray-800 bg-[#0f0f0f] mt-12">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="text-gray-400 text-sm">
              CryptoSageAI © 2025 — O mercado nunca dorme.
            </div>
            <div className="flex items-center space-x-4 text-sm text-gray-400 mt-4 md:mt-0">
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span>Status: ONLINE</span>
              </div>
              <span>•</span>
              <span>Última varredura: há 2 min</span>
              <span>•</span>
              <div className="flex items-center space-x-1">
                <Brain className="w-4 h-4" />
                <span>IA: CryptoSage</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}