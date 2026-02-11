import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const authPaths = ['/login', '/register'];
  const protectedPaths = ['/dashboard', '/editor', '/orders'];
  
  const { pathname } = request.nextUrl;
  
  const isAuthPath = authPaths.some(path => pathname.startsWith(path));
  const isProtectedPath = protectedPaths.some(path => pathname.startsWith(path));
  
  // Note: Actual auth check is done client-side with Firebase
  // This middleware is for route organization only
  
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
