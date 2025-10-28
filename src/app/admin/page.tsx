'use client'

import { useState, useEffect } from 'react'
import { 
  Users, 
  CreditCard, 
  Bell, 
  TrendingUp, 
  Newspaper, 
  Bot,
  Activity,
  DollarSign,
  Eye,
  AlertTriangle
} from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts'

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    activeUsers: 1284,
    paidPlans: 67,
    alertsSent: 3210,
    successRate: 74,
    newsUpdated: 12,
    aiSessions: 3
  })

  // Dados mock para os gráficos
  const weeklyUsers = [
    { week: 'Sem 1', users: 120 },
    { week: 'Sem 2', users: 180 },
    { week: 'Sem 3', users: 240 },
    { week: 'Sem 4', users: 320 },
    { week: 'Sem 5', users: 280 },
    { week: 'Sem 6', users: 380 },
    { week: 'Sem 7', users: 420 }
  ]

  const roiEvolution = [
    { month: 'Jan', roi: 65 },
    { month: 'Fev', roi: 68 },
    { month: 'Mar', roi: 72 },
    { month: 'Abr', roi: 70 },
    { month: 'Mai', roi: 74 },
    { month: 'Jun', roi: 78 }
  ]

  const planDistribution = [
    { name: 'Free', value: 33, color: '#64748b' },
    { name: 'Pro', value: 45, color: '#0ea5e9' },
    { name: 'Elite', value: 22, color: '#06b6d4' }
  ]

  const engagementHours = [
    { hour: '00h', engagement: 15 },
    { hour: '06h', engagement: 25 },
    { hour: '12h', engagement: 85 },
    { hour: '18h', engagement: 95 },
    { hour: '24h', engagement: 45 }
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Dashboard Administrativo</h1>
          <p className="text-gray-400 mt-2">Visão geral da saúde da plataforma CryptoSageAI</p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="px-4 py-2 bg-green-500/20 text-green-400 rounded-lg border border-green-500/30">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium">Sistema Operacional</span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
        <div className="bg-[#1e293b] rounded-xl p-6 border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Usuários Ativos</p>
              <p className="text-2xl font-bold text-white">{stats.activeUsers.toLocaleString()}</p>
              <p className="text-green-400 text-sm mt-1">+12% vs ontem</p>
            </div>
            <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-blue-400" />
            </div>
          </div>
        </div>

        <div className="bg-[#1e293b] rounded-xl p-6 border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Planos Pagos</p>
              <p className="text-2xl font-bold text-white">{stats.paidPlans}%</p>
              <p className="text-green-400 text-sm mt-1">+5% vs mês passado</p>
            </div>
            <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
              <CreditCard className="w-6 h-6 text-green-400" />
            </div>
          </div>
        </div>

        <div className="bg-[#1e293b] rounded-xl p-6 border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Alertas Enviados</p>
              <p className="text-2xl font-bold text-white">{stats.alertsSent.toLocaleString()}</p>
              <p className="text-blue-400 text-sm mt-1">Hoje</p>
            </div>
            <div className="w-12 h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center">
              <Bell className="w-6 h-6 text-yellow-400" />
            </div>
          </div>
        </div>

        <div className="bg-[#1e293b] rounded-xl p-6 border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Taxa de Sucesso IA</p>
              <p className="text-2xl font-bold text-white">{stats.successRate}%</p>
              <p className="text-green-400 text-sm mt-1">ROI positivo</p>
            </div>
            <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-purple-400" />
            </div>
          </div>
        </div>

        <div className="bg-[#1e293b] rounded-xl p-6 border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Notícias Atualizadas</p>
              <p className="text-2xl font-bold text-white">{stats.newsUpdated}</p>
              <p className="text-blue-400 text-sm mt-1">Sincronizações hoje</p>
            </div>
            <div className="w-12 h-12 bg-cyan-500/20 rounded-lg flex items-center justify-center">
              <Newspaper className="w-6 h-6 text-cyan-400" />
            </div>
          </div>
        </div>

        <div className="bg-[#1e293b] rounded-xl p-6 border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Sessões da IA</p>
              <p className="text-2xl font-bold text-white">{stats.aiSessions} min</p>
              <p className="text-gray-400 text-sm mt-1">Tempo médio</p>
            </div>
            <div className="w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center">
              <Bot className="w-6 h-6 text-orange-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Novos Usuários por Semana */}
        <div className="bg-[#1e293b] rounded-xl p-6 border border-gray-700">
          <h3 className="text-lg font-semibold text-white mb-4">Novos Usuários por Semana</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={weeklyUsers}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="week" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1e293b', 
                  border: '1px solid #374151',
                  borderRadius: '8px',
                  color: '#fff'
                }} 
              />
              <Bar dataKey="users" fill="#0ea5e9" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Evolução do ROI */}
        <div className="bg-[#1e293b] rounded-xl p-6 border border-gray-700">
          <h3 className="text-lg font-semibold text-white mb-4">Evolução do ROI Médio Global</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={roiEvolution}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="month" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1e293b', 
                  border: '1px solid #374151',
                  borderRadius: '8px',
                  color: '#fff'
                }} 
              />
              <Line 
                type="monotone" 
                dataKey="roi" 
                stroke="#10b981" 
                strokeWidth={3}
                dot={{ fill: '#10b981', strokeWidth: 2, r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Distribuição de Planos */}
        <div className="bg-[#1e293b] rounded-xl p-6 border border-gray-700">
          <h3 className="text-lg font-semibold text-white mb-4">Distribuição de Planos</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={planDistribution}
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {planDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1e293b', 
                  border: '1px solid #374151',
                  borderRadius: '8px',
                  color: '#fff'
                }} 
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex justify-center space-x-4 mt-4">
            {planDistribution.map((item, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                <span className="text-sm text-gray-400">{item.name} ({item.value}%)</span>
              </div>
            ))}
          </div>
        </div>

        {/* Engajamento por Horário */}
        <div className="bg-[#1e293b] rounded-xl p-6 border border-gray-700">
          <h3 className="text-lg font-semibold text-white mb-4">Engajamento por Horário</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={engagementHours}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="hour" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1e293b', 
                  border: '1px solid #374151',
                  borderRadius: '8px',
                  color: '#fff'
                }} 
              />
              <Bar dataKey="engagement" fill="#06b6d4" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Status do Sistema */}
        <div className="bg-[#1e293b] rounded-xl p-6 border border-gray-700">
          <h3 className="text-lg font-semibold text-white mb-4">Status do Sistema</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-400">API CoinGecko</span>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-green-400 text-sm">Online</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-400">API CryptoPanic</span>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-green-400 text-sm">Online</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-400">IA Engine</span>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-green-400 text-sm">Ativo</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Database</span>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-green-400 text-sm">Conectado</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Notificações</span>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                <span className="text-yellow-400 text-sm">Limitado</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-[#1e293b] rounded-xl p-6 border border-gray-700">
        <h3 className="text-lg font-semibold text-white mb-4">Ações Rápidas</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <button className="flex items-center space-x-3 p-4 bg-blue-500/20 hover:bg-blue-500/30 rounded-lg border border-blue-500/30 transition-colors">
            <Bot className="w-5 h-5 text-blue-400" />
            <span className="text-white">Forçar Varredura IA</span>
          </button>
          <button className="flex items-center space-x-3 p-4 bg-green-500/20 hover:bg-green-500/30 rounded-lg border border-green-500/30 transition-colors">
            <Newspaper className="w-5 h-5 text-green-400" />
            <span className="text-white">Atualizar Notícias</span>
          </button>
          <button className="flex items-center space-x-3 p-4 bg-purple-500/20 hover:bg-purple-500/30 rounded-lg border border-purple-500/30 transition-colors">
            <Users className="w-5 h-5 text-purple-400" />
            <span className="text-white">Relatório Usuários</span>
          </button>
          <button className="flex items-center space-x-3 p-4 bg-orange-500/20 hover:bg-orange-500/30 rounded-lg border border-orange-500/30 transition-colors">
            <DollarSign className="w-5 h-5 text-orange-400" />
            <span className="text-white">Relatório Financeiro</span>
          </button>
        </div>
      </div>
    </div>
  )
}