import { NextRequest, NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";

const locales = ["en", "ua"];
const defaultLocale = "en";
const middleware = createMiddleware({
  locales,
  defaultLocale,
  localePrefix: "always",
});
export default async function middlewareHandler(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const pathnameHasValidLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );
  if (pathnameHasValidLocale) {
    const response = middleware(request);
    return response;
  }
  const localeWithoutSlash = locales.find((locale) => pathname.startsWith(`/${locale}`));
  if (localeWithoutSlash) {
    return NextResponse.redirect(
      new URL(pathname.replace(`/${localeWithoutSlash}`, `/${localeWithoutSlash}/`), request.url)
    );
  }
  return NextResponse.redirect(new URL(`/${defaultLocale}${pathname}`, request.url));
}
export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)", "/"],
};
