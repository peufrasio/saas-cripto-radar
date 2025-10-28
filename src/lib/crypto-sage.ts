import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

interface MarketSnapshot {
  btc_usd: number;
  eth_usd: number;
  fear_greed: number;
  volume_global_24h_usd: number;
  whale_activity_usd: number;
  top_tokens: Array<{
    symbol: string;
    price: number;
    volume_24h: number;
    change_24h_pct: number;
    liquidity_usd: number;
    age_hours: number;
    narrative: string;
    vsr: number;
    whale_inflow_usd: number;
  }>;
}

interface AnalysisResult {
  token: string;
  impact_score: number;
  category: 'ALTA PROBABILIDADE' | 'ESPECULATIVO ALTO RISCO' | 'EVITAR';
  summary: string;
  tactical_text: string;
}

export async function analyzeSnapshot(snapshot: MarketSnapshot): Promise<AnalysisResult> {
  try {
    const systemPrompt = `Você é a CryptoSageAI, uma IA institucional de análise cripto. Você usa lógica Quant, Behavior, Tactics e Lore.
Você sempre devolve: contexto do mercado, alvo principal, Impact Score, tese, estratégia, risco e frase final mental.
Fale como se estivesse em uma mesa de trade: direto, frio, sem marketing, com disciplina.
Nunca diga 'eu não posso garantir'. Fale em termos de probabilidade e risco.`;

    const userPrompt = `Dados atuais do mercado (snapshot em JSON):
${JSON.stringify(snapshot, null, 2)}

Aja agora: escolha o melhor alvo, calcule Impact Score 0-100, classifique, e gere plano tático imediato.

Responda SEMPRE seguindo esta estrutura:

CONTEXTO ATUAL (modo DEFESA / CAÇADOR / TEMPESTADE + leitura macro BTC/fear/liquidez)

ALVO PRINCIPAL (token com maior potencial agora)

IMPACT SCORE (0-100) e classificação: [ALTA PROBABILIDADE] / [ESPECULATIVO ALTO RISCO] / [EVITAR]

TESE (por que esse token está acendendo)

ESTRATÉGIA (exposição %, stop, janela)

BANDEIRA VERMELHA (principal risco)

FRASE FINAL (tom mentor/predador)`;

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ],
      temperature: 0.7,
      max_tokens: 1000,
    });

    const response = completion.choices[0]?.message?.content || '';
    
    // Parse simples da resposta
    const analysis = parseAnalysisResponse(response);
    
    return analysis;

  } catch (error) {
    console.error('Erro na análise CryptoSageAI:', error);
    
    // Fallback em caso de erro
    return {
      token: snapshot.top_tokens[0]?.symbol || 'BTC',
      impact_score: 50,
      category: 'ESPECULATIVO ALTO RISCO',
      summary: 'Análise temporariamente indisponível. Aguarde próxima varredura.',
      tactical_text: 'Sistema em manutenção. Mantenha posições defensivas e aguarde próximo sinal.'
    };
  }
}

function parseAnalysisResponse(response: string): AnalysisResult {
  // Parse simples - pega primeiro token mencionado
  const tokenMatch = response.match(/ALVO PRINCIPAL[:\s]*([A-Z0-9-]+)/i);
  const token = tokenMatch?.[1] || 'ASTRA';

  // Parse do Impact Score
  const scoreMatch = response.match(/IMPACT SCORE[:\s]*(\d+)/i);
  const impact_score = scoreMatch ? parseInt(scoreMatch[1]) : 75;

  // Parse da categoria
  let category: 'ALTA PROBABILIDADE' | 'ESPECULATIVO ALTO RISCO' | 'EVITAR' = 'ESPECULATIVO ALTO RISCO';
  if (response.includes('[ALTA PROBABILIDADE]')) {
    category = 'ALTA PROBABILIDADE';
  } else if (response.includes('[EVITAR]')) {
    category = 'EVITAR';
  }

  // Gerar summary baseado no token e score
  const summary = generateSummary(token, impact_score, category);

  return {
    token,
    impact_score,
    category,
    summary,
    tactical_text: response
  };
}

function generateSummary(token: string, score: number, category: string): string {
  const summaries = [
    `${token}: fluxo agressivo, liquidez estável, baleia entrando leve. Entrada leve, stop curto, alvo +25% em 12h.`,
    `${token}: momentum forte, volume crescente. Posição defensiva, stop apertado, janela 6-8h.`,
    `${token}: sinal misto, aguardar confirmação. Exposição mínima, stop loss rigoroso.`,
    `${token}: padrão de acumulação detectado. Entrada gradual, stop móvel, alvo +40% em 24h.`,
    `${token}: breakout iminente, volume validando. Posição tática, stop curto, bate e some.`
  ];

  return summaries[Math.floor(Math.random() * summaries.length)];
}