import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
export async function middleware(request: NextRequest) {
  const token = request.cookies.get('token');

  // If token exists, prevent it from going to /login or /signup
  if (
    token &&
    (request.nextUrl.pathname === '/login' ||
      request.nextUrl.pathname === '/signup')
  ) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}
