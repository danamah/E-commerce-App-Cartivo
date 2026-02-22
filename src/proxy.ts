import createMiddleware from "next-intl/middleware";
import { routing } from "@/i18n/routing";
import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

const intlMiddleware = createMiddleware(routing);

export default async function proxy(request: NextRequest) {
  const token = await getToken({ req: request });
  const { pathname } = request.nextUrl;
  const locales = routing.locales.join("|");
  const pathnameWithoutLocale = pathname.replace(
    new RegExp(`^\\/(${locales})`),
    ""
  );
  const publicPages = ["/login", "/register"];
  const protectedPages = ["/wishlist", "/checkout"];
  const isAuthPage = publicPages.includes(pathnameWithoutLocale);
  const isProtectedPage = protectedPages.includes(pathnameWithoutLocale);
  if (token && isAuthPage) {
    return NextResponse.redirect(
      new URL(`/${routing.defaultLocale}`, request.url)
    );
  }
  if (!token && isProtectedPage) {
    return NextResponse.redirect(
      new URL(`/${routing.defaultLocale}/login`, request.url)
    );
  }
  return intlMiddleware(request);
}
export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"]
};




// export const config = {
//   matcher: ['/((?!api|_next|.*\\..*).*)']
// };
