import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const PROTECTED_PATHS = ['/calendar', '/dashboard', '/upload', '/results']

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })
  const { data } = await supabase.auth.getSession()

  const isProtected = PROTECTED_PATHS.some(path => req.nextUrl.pathname.startsWith(path))
  if (isProtected && !data.session) {
    return NextResponse.redirect(new URL('/login', req.url))
  }

  return res
}