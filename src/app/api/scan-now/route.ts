import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase';
import { analyzeSnapshot } from '@/lib/crypto-sage';

// Mock data de mercado
const getMockMarketData = () => ({
  btc_usd: 68420,
  eth_usd: 3245,
  fear_greed: 72,
  volume_global_24h_usd: 92400000000,
  whale_activity_usd: 1200000,
  top_tokens: [
    {
      symbol: "ASTRA",
      price: 0.071,
      volume_24h: 12500000,
      change_24h_pct: 42.5,
      liquidity_usd: 12000000,
      age_hours: 3,
      narrative: "IA + parceria infra",
      vsr: 2.4,
      whale_inflow_usd: 450000
    },
    {
      symbol: "DOG-AI",
      price: 0.000021,
      volume_24h: 3100000,
      change_24h_pct: 138.0,
      liquidity_usd: 92000,
      age_hours: 4,
      narrative: "meme IA",
      vsr: 2.9,
      whale_inflow_usd: 40000
    }
  ]
});

// Verificar limites por plano
const checkDailyLimits = async (supabase: any, userId: string, userRole: string) => {
  const today = new Date().toISOString().split('T')[0];
  
  // Contar scans de hoje
  const { data: scans, error } = await supabase
    .from('alerts')
    .select('id')
    .eq('user_id', userId)
    .gte('created_at', `${today}T00:00:00.000Z`)
    .lt('created_at', `${today}T23:59:59.999Z`);

  if (error) {
    console.error('Erro ao verificar limites:', error);
    return { allowed: true, count: 0 };
  }

  const count = scans?.length || 0;
  
  // Definir limites por plano
  const limits = {
    free: 3,
    pro: 50,
    elite: Infinity
  };

  const limit = limits[userRole as keyof typeof limits] || limits.free;
  const allowed = count < limit;

  return { allowed, count, limit };
};

export async function POST(request: NextRequest) {
  try {
    // Verificar autenticação
    const supabase = createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json(
        { error: 'Não autorizado' },
        { status: 401 }
      );
    }

    // Buscar dados do usuário
    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('role')
      .eq('id', user.id)
      .single();

    if (userError || !userData) {
      return NextResponse.json(
        { error: 'Usuário não encontrado' },
        { status: 404 }
      );
    }

    // Verificar limites diários
    const { allowed, count, limit } = await checkDailyLimits(supabase, user.id, userData.role);
    
    if (!allowed) {
      return NextResponse.json(
        { 
          error: 'Limite diário atingido no seu plano. Faça upgrade para continuar recebendo varreduras ao vivo.',
          current_usage: count,
          limit: limit
        },
        { status: 429 }
      );
    }

    // Coletar dados de mercado (mock)
    const marketSnapshot = getMockMarketData();

    // Analisar com CryptoSageAI
    const analysis = await analyzeSnapshot(marketSnapshot);

    // Salvar alerta no banco
    const { data: alert, error: alertError } = await supabase
      .from('alerts')
      .insert({
        user_id: user.id,
        token: analysis.token,
        impact_score: analysis.impact_score,
        category: analysis.category,
        summary: analysis.summary,
        created_at: new Date().toISOString()
      })
      .select()
      .single();

    if (alertError) {
      console.error('Erro ao salvar alerta:', alertError);
      return NextResponse.json(
        { error: 'Erro interno do servidor' },
        { status: 500 }
      );
    }

    // Retornar resposta
    return NextResponse.json({
      alert,
      tactical_text: analysis.tactical_text,
      usage: {
        current: count + 1,
        limit: limit === Infinity ? 'Ilimitado' : limit
      }
    });

  } catch (error) {
    console.error('Erro na rota scan-now:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}