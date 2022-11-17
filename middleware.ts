
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { RedirectItem } from 'data/RedirectItem';

export async function middleware(request: NextRequest) {
  const source = request.nextUrl.pathname ?? '';
  const origin = request.nextUrl.origin;
  try {
    const response = await fetch(`${origin}/api/redirect-by-path`, {
      method: 'POST',
      body: JSON.stringify({
        source: source
      })
    });
    const data = await response.json() as { redirect: RedirectItem };

    const redirect = data.redirect;
    if (redirect) {
      return NextResponse.redirect(`${origin}${redirect.destination}`, {
        status: redirect.statusCode,
      })
    }
  } catch (error) {
    console.log(error)
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|favicon.ico).*)',
  ],
}
