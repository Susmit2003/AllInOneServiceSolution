
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const secretKey = process.env.JWT_SECRET;
const issuer = process.env.JWT_ISSUER;
const key = new TextEncoder().encode(secretKey!);
const COOKIE_NAME = 'jwt_token';

async function verifyToken(token: string) {
    try {
        await jwtVerify(token, key, { 
            algorithms: ['HS256'],
            issuer: issuer
        });
        return true;
    } catch (e) {
        return false;
    }
}

export async function middleware(request: NextRequest) {
  const token = request.cookies.get(COOKIE_NAME)?.value;
  const { pathname } = request.nextUrl;

  const protectedRoutes = ['/dashboard', '/profile', '/bookings'];
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));

  if (isProtectedRoute) {
    if (!token || !(await verifyToken(token))) {
      // Redirect to login, but preserve the intended destination
      const url = request.nextUrl.clone();
      url.pathname = '/login';
      return NextResponse.redirect(url);
    }
  }

  // If the user is logged in (valid token exists) and tries to access /login, redirect them to the dashboard
  if (pathname === '/login') {
    if (token && (await verifyToken(token))) {
        return NextResponse.redirect(new URL('/dashboard', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  // Match all routes except for API, static files, and image optimization files.
  matcher: [
    '/dashboard/:path*', 
    '/profile/:path*', 
    '/bookings/:path*', 
    '/login'
  ],
};
