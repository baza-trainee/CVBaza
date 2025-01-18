/* eslint-disable import/order */
import type { NextRequest } from "next/server";
import createMiddleware from "next-intl/middleware";

// Create the next-intl middleware
const intlMiddleware = createMiddleware({
  locales: ["en", "ua"],
  defaultLocale: "ua",
  localePrefix: "always",
});

export default function middleware(request: NextRequest) {
  return intlMiddleware(request);
}

export const config = {
  matcher: [
    // Match all pathnames except for
    // - API routes
    // - Static files
    // - Internal Next.js paths
    "/((?!api|_next|_vercel|.*\\..*).*)",
    "/",
  ],
};
