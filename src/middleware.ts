import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Rotas que precisam de autenticação
  const protectedRoutes = ['/dashboard', '/alertas', '/configuracoes', '/admin']
  const adminRoutes = ['/admin']
  
  // Verificar se é uma rota protegida
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route))
  const isAdminRoute = adminRoutes.some(route => pathname.startsWith(route))

  if (isProtectedRoute) {
    // Verificar se tem token de usuário
    const userCookie = request.cookies.get('cryptosage_user')
    
    if (!userCookie || !userCookie.value) {
      return NextResponse.redirect(new URL('/login', request.url))
    }

    // Para rotas admin, verificar se é admin
    if (isAdminRoute) {
      try {
        const user = JSON.parse(decodeURIComponent(userCookie.value))
        if (user.role !== 'admin') {
          return NextResponse.redirect(new URL('/dashboard', request.url))
        }
      } catch {
        return NextResponse.redirect(new URL('/login', request.url))
      }
    }
  }

  // Redirecionar usuários logados das páginas de auth
  if (pathname === '/login' || pathname === '/register') {
    const userCookie = request.cookies.get('cryptosage_user')
    if (userCookie && userCookie.value) {
      try {
        JSON.parse(decodeURIComponent(userCookie.value))
        return NextResponse.redirect(new URL('/dashboard', request.url))
      } catch {
        // Cookie inválido, continuar para login
      }
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}