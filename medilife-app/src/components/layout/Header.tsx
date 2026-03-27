'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Bell, Globe, ChevronDown, LogIn } from 'lucide-react';
import { Avatar } from '@/components/ui/Avatar';
import { cn } from '@/lib/utils';
import { LOCALE_NAMES, LOCALE_FLAGS, type Locale } from '@/lib/constants';
import { useUserStore } from '@/stores/userStore';

interface HeaderProps {
  locale: string;
  title?: string;
  showBack?: boolean;
  userName?: string;
  avatarUrl?: string | null;
  unreadCount?: number;
}

export function Header({
  locale,
  title,
  userName,
  avatarUrl,
  unreadCount = 0,
}: HeaderProps) {
  const [showLangMenu, setShowLangMenu] = useState(false);
  const { id: userId } = useUserStore();
  const isLoggedIn = !!userId;

  return (
    <header className="sticky top-0 z-30 border-b border-slate-100 bg-white/95 backdrop-blur-sm">
      <div className="mx-auto flex h-14 max-w-lg items-center justify-between px-4">
        {/* 左: タイトル or ロゴ */}
        <div className="flex items-center gap-2">
          {title ? (
            <h1 className="text-lg font-bold text-slate-800">{title}</h1>
          ) : (
            <Link href={`/${locale}/home`} className="flex items-center gap-1.5">
              <span className="text-xl font-extrabold text-blue-600">Medi</span>
              <span className="text-xl font-extrabold text-emerald-500">Life</span>
            </Link>
          )}
        </div>

        {/* 右: アクション */}
        <div className="flex items-center gap-2">
          {/* 言語切替 */}
          <div className="relative">
            <button
              onClick={() => setShowLangMenu(!showLangMenu)}
              className="flex items-center gap-1 rounded-lg px-2 py-1.5 text-sm text-slate-600 hover:bg-slate-100 transition-colors"
              aria-label="Language"
            >
              <Globe className="h-4 w-4" />
              <span className="text-xs">{LOCALE_FLAGS[locale as Locale]}</span>
              <ChevronDown className="h-3 w-3" />
            </button>

            {showLangMenu && (
              <>
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setShowLangMenu(false)}
                />
                <div className="absolute right-0 top-full z-20 mt-1 w-48 rounded-xl border border-slate-100 bg-white py-1 shadow-lg">
                  {(Object.entries(LOCALE_NAMES) as [Locale, string][]).map(
                    ([code, name]) => (
                      <Link
                        key={code}
                        href={`/${code}/home`}
                        className={cn(
                          'flex items-center gap-2 px-3 py-2 text-sm hover:bg-slate-50 transition-colors',
                          code === locale && 'bg-blue-50 text-blue-600'
                        )}
                        onClick={() => setShowLangMenu(false)}
                      >
                        <span>{LOCALE_FLAGS[code]}</span>
                        <span>{name}</span>
                      </Link>
                    )
                  )}
                </div>
              </>
            )}
          </div>

          {/* 通知 */}
          <Link
            href={`/${locale}/notifications`}
            className="relative rounded-lg p-2 hover:bg-slate-100 transition-colors"
            aria-label="Notifications"
          >
            <Bell className="h-5 w-5 text-slate-600" />
            {unreadCount > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white">
                {unreadCount > 99 ? '99+' : unreadCount}
              </span>
            )}
          </Link>

          {/* プロフィール or ログイン */}
          {isLoggedIn ? (
            <Link
              href={`/${locale}/profile`}
              className="rounded-full"
              aria-label="Profile"
            >
              <Avatar src={avatarUrl} alt={userName} size="sm" />
            </Link>
          ) : (
            <Link
              href={`/${locale}/login`}
              className="flex items-center gap-1 rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-blue-700 transition-colors"
              aria-label="Login"
            >
              <LogIn className="h-3.5 w-3.5" />
              <span>ログイン</span>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
