import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { decrypt } from './lib/session'

const protectedRoutes = ['/admin']
const publicRoutes = ['/admin/login']

export async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname
  const isProtectedRoute = protectedRoutes.some((route) => path === route || path.startsWith(route + '/')) && !publicRoutes.includes(path)

  if (isProtectedRoute) {
    const cookie = req.cookies.get('session')?.value
    const session = cookie ? await decrypt(cookie) : null

    if (!session) {
      return NextResponse.redirect(new URL('/admin/login', req.nextUrl))
    }
  }

  // If going to login while authenticated, redirect to admin
  if (publicRoutes.includes(path)) {
    const cookie = req.cookies.get('session')?.value
    const session = cookie ? await decrypt(cookie) : null

    if (session) {
      return NextResponse.redirect(new URL('/admin', req.nextUrl))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
