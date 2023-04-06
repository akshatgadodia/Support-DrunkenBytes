import { NextResponse } from "next/server";

export default function middleware(req) {
  const { pathname } = req.nextUrl
  if (pathname.startsWith('/_next') || pathname.startsWith('/favicon.ico') || pathname.startsWith('/images')) {
    return NextResponse.next()
  }
  const role = req.cookies.get("db_s_userRole");
  if (role === undefined && !req.url.includes('/login')) {
    return NextResponse.redirect(new URL('/login', req.url))
  }
  return NextResponse.next()
}