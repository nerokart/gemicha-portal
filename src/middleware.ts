import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  return NextResponse.next();
}

// Bu ayar, middleware'in HANGİ sayfalarda çalışmayacağını söyler.
// .xml uzantılı dosyaları (sitemap'ler) hariç tutuyoruz ki engellenmesinler!
export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.xml).*)',
  ],
};