"use client";

import { useState } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { Menu, X, Globe, User, LogOut, ChevronDown } from "lucide-react";
import { localeNames, type Locale } from "@/i18n/config";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

interface HeaderProps {
  locale: string;
}

export default function Header({ locale }: HeaderProps) {
  const t = useTranslations("common");
  const { authUser, profile, isLoading, signOut } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const isLoggedIn = !!authUser;

  const navItems = [
    { href: `/${locale}/dashboard`, label: t("dashboard") },
    { href: `/${locale}/lessons`, label: t("lessons") },
    { href: `/${locale}/ai-tutor`, label: t("aiTutor") },
    { href: `/${locale}/mock-exam`, label: t("mockExam") },
    { href: `/${locale}/pricing`, label: t("pricing") },
  ];

  function switchLocale(newLocale: Locale) {
    const segments = pathname.split("/");
    segments[1] = newLocale;
    router.push(segments.join("/"));
    setIsLangMenuOpen(false);
  }

  async function handleSignOut() {
    await signOut();
    setIsUserMenuOpen(false);
    router.push(`/${locale}`);
  }

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* ロゴ */}
          <Link
            href={`/${locale}`}
            className="flex items-center gap-2 font-bold text-xl"
          >
            <span className="text-sakura-500">NihonGO!</span>
          </Link>

          {/* デスクトップナビ */}
          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm font-medium transition-colors ${
                  pathname.startsWith(item.href)
                    ? "text-sakura-500"
                    : "text-navy-800 hover:text-sakura-500"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* 右側アクション */}
          <div className="flex items-center gap-3">
            {/* 言語切替 */}
            <div className="relative">
              <button
                onClick={() => {
                  setIsLangMenuOpen(!isLangMenuOpen);
                  setIsUserMenuOpen(false);
                }}
                className="flex items-center gap-1 text-sm text-navy-800 hover:text-sakura-500 transition-colors p-2"
                aria-label={t("language")}
              >
                <Globe className="w-4 h-4" />
                <span className="hidden sm:inline">
                  {localeNames[locale as Locale]}
                </span>
              </button>
              {isLangMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
                  {Object.entries(localeNames).map(([code, name]) => (
                    <button
                      key={code}
                      onClick={() => switchLocale(code as Locale)}
                      className={`block w-full text-left px-4 py-2 text-sm hover:bg-sakura-50 transition-colors ${
                        locale === code
                          ? "text-sakura-500 font-medium"
                          : "text-navy-800"
                      }`}
                    >
                      {name}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* 認証状態によるUI切替 */}
            {!isLoading && (
              <>
                {isLoggedIn ? (
                  /* ログイン済み: ユーザーメニュー */
                  <div className="relative">
                    <button
                      onClick={() => {
                        setIsUserMenuOpen(!isUserMenuOpen);
                        setIsLangMenuOpen(false);
                      }}
                      className="flex items-center gap-2 text-sm font-medium text-navy-800 hover:text-sakura-500 transition-colors p-2"
                    >
                      <div className="w-8 h-8 bg-sakura-100 rounded-full flex items-center justify-center">
                        <User className="w-4 h-4 text-sakura-500" />
                      </div>
                      <span className="hidden sm:inline">
                        {profile?.name || authUser?.email?.split("@")[0]}
                      </span>
                      <ChevronDown className="w-3 h-3 hidden sm:block" />
                    </button>
                    {isUserMenuOpen && (
                      <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
                        <div className="px-4 py-2 border-b border-gray-100">
                          <p className="text-sm font-medium text-navy-800 truncate">
                            {profile?.name || "ユーザー"}
                          </p>
                          <p className="text-xs text-gray-400 truncate">
                            {authUser?.email}
                          </p>
                          {profile && (
                            <span className="inline-block mt-1 px-2 py-0.5 bg-sakura-50 text-sakura-600 text-xs font-medium rounded">
                              {profile.currentLevel}
                            </span>
                          )}
                        </div>
                        <Link
                          href={`/${locale}/profile`}
                          onClick={() => setIsUserMenuOpen(false)}
                          className="flex items-center gap-2 px-4 py-2 text-sm text-navy-800 hover:bg-sakura-50 transition-colors"
                        >
                          <User className="w-4 h-4" />
                          {t("profile")}
                        </Link>
                        <Link
                          href={`/${locale}/settings`}
                          onClick={() => setIsUserMenuOpen(false)}
                          className="flex items-center gap-2 px-4 py-2 text-sm text-navy-800 hover:bg-sakura-50 transition-colors"
                        >
                          {t("settings")}
                        </Link>
                        <button
                          onClick={handleSignOut}
                          className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                        >
                          <LogOut className="w-4 h-4" />
                          {t("logout")}
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  /* 未ログイン: ログイン/サインアップボタン */
                  <>
                    <Link
                      href={`/${locale}/login`}
                      className="hidden sm:inline-flex items-center gap-1 text-sm font-medium text-navy-800 hover:text-sakura-500 transition-colors"
                    >
                      <User className="w-4 h-4" />
                      {t("login")}
                    </Link>
                    <Link
                      href={`/${locale}/signup`}
                      className="hidden sm:inline-flex items-center px-4 py-2 bg-sakura-500 text-white text-sm font-medium rounded-lg hover:bg-sakura-600 transition-colors"
                    >
                      {t("signup")}
                    </Link>
                  </>
                )}
              </>
            )}

            {/* モバイルメニュートグル */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-navy-800"
              aria-label="Menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* モバイルメニュー */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white">
          <div className="px-4 py-3 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`block py-2 text-sm font-medium ${
                  pathname.startsWith(item.href)
                    ? "text-sakura-500"
                    : "text-navy-800 hover:text-sakura-500"
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <div className="pt-2 border-t border-gray-100">
              {isLoggedIn ? (
                <div className="space-y-2">
                  <Link
                    href={`/${locale}/profile`}
                    className="block py-2 text-sm font-medium text-navy-800"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {t("profile")}
                  </Link>
                  <button
                    onClick={() => {
                      handleSignOut();
                      setIsMobileMenuOpen(false);
                    }}
                    className="block w-full text-left py-2 text-sm font-medium text-red-600"
                  >
                    {t("logout")}
                  </button>
                </div>
              ) : (
                <div className="flex gap-2">
                  <Link
                    href={`/${locale}/login`}
                    className="flex-1 text-center py-2 text-sm font-medium text-navy-800 border border-gray-300 rounded-lg"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {t("login")}
                  </Link>
                  <Link
                    href={`/${locale}/signup`}
                    className="flex-1 text-center py-2 text-sm font-medium text-white bg-sakura-500 rounded-lg"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {t("signup")}
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
