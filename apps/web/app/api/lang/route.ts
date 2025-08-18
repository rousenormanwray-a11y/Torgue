import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const data = await req.formData().catch(() => null);
  const lang = (data?.get('lang') as string) || 'english';
  const res = NextResponse.redirect(new URL('/', req.url));
  res.cookies.set('lang', lang, { path: '/', maxAge: 60 * 60 * 24 * 365 });
  return res;
}

