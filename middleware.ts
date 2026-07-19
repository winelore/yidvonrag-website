import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Note: avoid importing `jose` inside middleware (Edge runtime) because it
// may depend on Node/browser APIs not available in Edge bundles. Implement a
// minimal HS256 JWT verifier using the Web Crypto API here so middleware can
// run in the Edge runtime without pulling in `jose`.

async function verifyJwtHs256(token: string): Promise<Record<string, any> | null> {
  try {
    const parts = token.split('.')
    if (parts.length !== 3) return null
    const [headerB64, payloadB64, sigB64] = parts

    const headerJson = JSON.parse(new TextDecoder().decode(base64urlToUint8Array(headerB64)))
    if (headerJson.alg !== 'HS256') return null

    const data = new TextEncoder().encode(`${headerB64}.${payloadB64}`)
    const signature = base64urlToUint8Array(sigB64)

    const secret = (process.env.JWT_SECRET || 'super-secret-key-for-development-only')
    const keyData = new TextEncoder().encode(secret)

    // import the key for HMAC-SHA256
    const cryptoKey = await crypto.subtle.importKey('raw', keyData, { name: 'HMAC', hash: 'SHA-256' }, false, ['verify'])
    const valid = await crypto.subtle.verify('HMAC', cryptoKey, signature, data)
    if (!valid) return null

    const payload = JSON.parse(new TextDecoder().decode(base64urlToUint8Array(payloadB64)))
    return payload
  } catch {
    return null
  }
}

function base64urlToUint8Array(b64url: string) {
  let s = b64url.replace(/-/g, '+').replace(/_/g, '/')
  const pad = s.length % 4
  if (pad === 2) s += '=='
  else if (pad === 3) s += '='
  else if (pad !== 0) s += '===='
  // atob should be available in Edge runtime
  const binary = (globalThis as any).atob(s)
  const len = binary.length
  const bytes = new Uint8Array(len)
  for (let i = 0; i < len; i++) bytes[i] = binary.charCodeAt(i)
  return bytes
}

const protectedRoutes = ['/admin']
const publicRoutes = ['/admin/login']

export async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname
  const isProtectedRoute = protectedRoutes.some((route) => path === route || path.startsWith(route + '/')) && !publicRoutes.includes(path)

  if (isProtectedRoute) {
    const cookie = req.cookies.get('session')?.value
    const session = cookie ? await verifyJwtHs256(cookie) : null

    if (!session) {
      return NextResponse.redirect(new URL('/admin/login', req.nextUrl))
    }
  }

  // If going to login while authenticated, redirect to admin
  if (publicRoutes.includes(path)) {
    const cookie = req.cookies.get('session')?.value
    const session = cookie ? await verifyJwtHs256(cookie) : null

    if (session) {
      return NextResponse.redirect(new URL('/admin', req.nextUrl))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
