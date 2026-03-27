'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, BookOpen, MapPin, Briefcase, MessageCircleQuestion } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavItem {
  href: string;
  icon: React.ReactNode;
  label: string;
  activeIcon: React.ReactNode;
}

export function BottomNavigation({ locale }: { locale: string }) {
  const pathname = usePathname();

  const navItems: NavItem[] = [
    {
      href: `/${locale}/home`,
      icon: <Home className="h-6 w-6" />,
      activeIcon: <Home className="h-6 w-6" fill="currentColor" />,
      label: getNavLabel(locale, 'home'),
    },
    {
      href: `/${locale}/learn`,
      icon: <BookOpen className="h-6 w-6" />,
      activeIcon: <BookOpen className="h-6 w-6" fill="currentColor" />,
      label: getNavLabel(locale, 'learn'),
    },
    {
      href: `/${locale}/life`,
      icon: <MapPin className="h-6 w-6" />,
      activeIcon: <MapPin className="h-6 w-6" fill="currentColor" />,
      label: getNavLabel(locale, 'guide'),
    },
    {
      href: `/${locale}/jobs`,
      icon: <Briefcase className="h-6 w-6" />,
      activeIcon: <Briefcase className="h-6 w-6" fill="currentColor" />,
      label: getNavLabel(locale, 'jobs'),
    },
    {
      href: `/${locale}/ask`,
      icon: <MessageCircleQuestion className="h-6 w-6" />,
      activeIcon: <MessageCircleQuestion className="h-6 w-6" fill="currentColor" />,
      label: getNavLabel(locale, 'ask'),
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-slate-200 bg-white/95 backdrop-blur-sm safe-area-bottom">
      <div className="mx-auto flex max-w-lg items-center justify-around">
        {navItems.map((item) => {
          const isActive = pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex flex-col items-center gap-0.5 px-3 py-2 min-w-[64px] transition-colors',
                isActive ? 'text-blue-600' : 'text-slate-400 hover:text-slate-600'
              )}
            >
              {isActive ? item.activeIcon : item.icon}
              <span className="text-[10px] font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

function getNavLabel(locale: string, key: string): string {
  const labels: Record<string, Record<string, string>> = {
    home: { ja: 'ホーム', vi: 'Trang chủ', en: 'Home', zh: '首页', id: 'Beranda', tl: 'Home', my: 'ပင်မ' },
    learn: { ja: '学習', vi: 'Học tập', en: 'Learn', zh: '学习', id: 'Belajar', tl: 'Aral', my: 'သင်ယူ' },
    guide: { ja: 'ガイド', vi: 'Hướng dẫn', en: 'Guide', zh: '指南', id: 'Panduan', tl: 'Gabay', my: 'လမ်းညွှန်' },
    jobs: { ja: '求人', vi: 'Việc làm', en: 'Jobs', zh: '求职', id: 'Kerja', tl: 'Trabaho', my: 'အလုပ်' },
    ask: { ja: '相談', vi: 'Hỏi đáp', en: 'Q&A', zh: '咨询', id: 'Tanya', tl: 'Tanong', my: 'မေးမြန်း' },
  };
  return labels[key]?.[locale] || labels[key]?.['en'] || key;
}
