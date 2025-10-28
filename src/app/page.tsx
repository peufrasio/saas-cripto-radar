'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'
import { Terminal, TrendingUp, Shield, Zap } from 'lucide-react'

export default function HomePage() {
  const { isAuthenticated, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && isAuthenticated) {
      router.replace('/dashboard')
    }
  }, [isAuthenticated, loading, router])

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-400"></div>
      </div>
    )
  }

  if (isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-400"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-gray-100">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <div className="flex justify-center items-center space-x-3 mb-8">
              <Terminal className="w-12 h-12 text-green-400" />
              <h1 className="text-5xl font-bold font-jetbrains">
                <span className="text-white">Crypto</span>
                <span className="text-green-400">Sage</span>
                <span className="text-white">AI</span>
              </h1>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Radar Cripto 24h
            </h2>
            
            <p className="text-xl text-gray-400 mb-12 max-w-3xl mx-auto">
              Análise inteligente de criptomoedas em tempo real. 
              Receba alertas precisos e tome decisões informadas no mercado crypto.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => router.push('/register')}
                className="bg-green-500 hover:bg-green-600 text-black font-semibold px-8 py-3 rounded-lg transition-colors"
              >
                Começar Agora
              </button>
              <button
                onClick={() => router.push('/login')}
                className="border border-[#2a2a2a] hover:border-green-400 text-white font-semibold px-8 py-3 rounded-lg transition-colors"
              >
                Fazer Login
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="py-24 bg-[#0f0f0f]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-bold text-white mb-4">
              Recursos Avançados
            </h3>
            <p className="text-gray-400 text-lg">
              Tecnologia de ponta para análise de mercado
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-8 text-center">
              <TrendingUp className="w-12 h-12 text-green-400 mx-auto mb-4" />
              <h4 className="text-xl font-semibold text-white mb-3">
                Análise em Tempo Real
              </h4>
              <p className="text-gray-400">
                Monitoramento 24/7 dos principais tokens com IA avançada
              </p>
            </div>

            <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-8 text-center">
              <Shield className="w-12 h-12 text-blue-400 mx-auto mb-4" />
              <h4 className="text-xl font-semibold text-white mb-3">
                Alertas Inteligentes
              </h4>
              <p className="text-gray-400">
                Notificações precisas baseadas em padrões de mercado
              </p>
            </div>

            <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-8 text-center">
              <Zap className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
              <h4 className="text-xl font-semibold text-white mb-3">
                Decisões Rápidas
              </h4>
              <p className="text-gray-400">
                Interface otimizada para traders profissionais
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}