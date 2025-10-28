import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Rotas que precisam de autenticação
  const protectedRoutes = ['/dashboard', '/alerts', '/settings', '/admin']
  
  // Rotas que só admin pode acessar
  const adminRoutes = ['/admin']
  
  // Rotas públicas (não precisam de autenticação)
  const publicRoutes = ['/login', '/register', '/']

  // Verificar se é uma rota protegida
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route))
  const isAdminRoute = adminRoutes.some(route => pathname.startsWith(route))
  const isPublicRoute = publicRoutes.includes(pathname)

  // Obter dados do usuário do cookie
  const userCookie = request.cookies.get('cryptosage_user')
  let user = null

  if (userCookie) {
    try {
      user = JSON.parse(decodeURIComponent(userCookie.value))
    } catch (error) {
      console.error('Erro ao parsear cookie do usuário:', error)
    }
  }

  // Se é uma rota protegida e não está logado
  if (isProtectedRoute && !user) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // Se é uma rota admin e não é admin
  if (isAdminRoute && (!user || user.role !== 'admin')) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  // Se está logado e tentando acessar login/register, redirecionar para dashboard
  if (user && (pathname === '/login' || pathname === '/register')) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  // Se está na raiz e logado, redirecionar para dashboard
  if (user && pathname === '/') {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  // IMPORTANTE: Permitir acesso ao dashboard para TODOS os usuários autenticados
  // independente do plano (free, pro, elite)
  if (pathname === '/dashboard' && user) {
    return NextResponse.next()
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}