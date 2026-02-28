import createMiddleware from "next-intl/middleware";
import { type NextRequest } from "next/server";
import { locales, defaultLocale } from "@/i18n/config";
import { updateSession } from "@/lib/supabase/middleware";

const intlMiddleware = createMiddleware({
  locales,
  defaultLocale,
  localePrefix: "as-needed",
});

export async function middleware(request: NextRequest) {
  // Supabaseセッションを更新
  const response = await updateSession(request);

  // next-intlのミドルウェアを適用
  const intlResponse = intlMiddleware(request);

  // next-intl のレスポンスからヘッダーとクッキーをコピー
  if (intlResponse) {
    // Supabaseのクッキーをintlレスポンスにコピー
    response.cookies.getAll().forEach((cookie) => {
      intlResponse.cookies.set(cookie);
    });
    return intlResponse;
  }

  return response;
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|auth|.*\\..*).*)"],
};
