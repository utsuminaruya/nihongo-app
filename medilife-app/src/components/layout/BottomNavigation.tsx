'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavItem {
  href: string;
  id: string;
  label: string;
  icon: (active: boolean) => React.ReactNode;
}

const BLUE = '#0A5FFF';
const INK5 = '#AEAEB2';

function HomeIcon({ active }: { active: boolean }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill={active ? BLUE : 'none'} stroke={active ? BLUE : INK5} strokeWidth={active ? 2 : 1.6} strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5z"/>
      <polyline points="9 21 9 12 15 12 15 21"/>
    </svg>
  );
}
function BookIcon({ active }: { active: boolean }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={active ? BLUE : INK5} strokeWidth={active ? 2 : 1.6} strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
    </svg>
  );
}
function MapPinIcon({ active }: { active: boolean }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill={active ? BLUE : 'none'} stroke={active ? BLUE : INK5} strokeWidth={active ? 2 : 1.6} strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z"/>
      <circle cx="12" cy="10" r="3" fill={active ? 'white' : 'none'}/>
    </svg>
  );
}
function BriefcaseIcon({ active }: { active: boolean }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={active ? BLUE : INK5} strokeWidth={active ? 2 : 1.6} strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="7" width="20" height="14" rx="2"/>
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
    </svg>
  );
}
function ChatIcon({ active }: { active: boolean }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill={active ? BLUE : 'none'} stroke={active ? BLUE : INK5} strokeWidth={active ? 2 : 1.6} strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
    </svg>
  );
}

export function BottomNavigation({ locale }: { locale: string }) {
  const pathname = usePathname();

  const navItems: NavItem[] = [
    {
      href: `/${locale}/home`,
      id: 'home',
      label: getNavLabel(locale, 'home'),
      icon: (active) => <HomeIcon active={active} />,
    },
    {
      href: `/${locale}/learn`,
      id: 'learn',
      label: getNavLabel(locale, 'learn'),
      icon: (active) => <BookIcon active={active} />,
    },
    {
      href: `/${locale}/life`,
      id: 'guide',
      label: getNavLabel(locale, 'guide'),
      icon: (active) => <MapPinIcon active={active} />,
    },
    {
      href: `/${locale}/jobs`,
      id: 'jobs',
      label: getNavLabel(locale, 'jobs'),
      icon: (active) => <BriefcaseIcon active={active} />,
    },
    {
      href: `/${locale}/ask`,
      id: 'ask',
      label: getNavLabel(locale, 'ask'),
      icon: (active) => <ChatIcon active={active} />,
    },
  ];

  return (
    <nav style={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      height: 84,
      background: 'rgba(249,249,251,0.88)',
      backdropFilter: 'blur(28px) saturate(180%)',
      WebkitBackdropFilter: 'blur(28px) saturate(180%)',
      borderTop: '0.5px solid rgba(60,60,67,0.12)',
      display: 'flex',
      justifyContent: 'center',
      zIndex: 40,
    }}>
      <div style={{ display: 'flex', width: '100%', maxWidth: 512 }}>
        {navItems.map((item) => {
          const isActive = pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 4,
                textDecoration: 'none',
                paddingBottom: 16,
                paddingTop: 8,
                transition: 'transform 0.18s cubic-bezier(0.34,1.56,0.64,1)',
                transform: isActive ? 'scale(1.06)' : 'scale(1)',
                WebkitTapHighlightColor: 'transparent',
              }}
            >
              {item.icon(isActive)}
              <span style={{
                fontSize: 9.5,
                fontWeight: isActive ? 600 : 400,
                color: isActive ? BLUE : INK5,
                letterSpacing: '0.01em',
                transition: 'color 0.2s',
                fontFamily: 'Noto Sans JP, sans-serif',
              }}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

function getNavLabel(locale: string, key: string): string {
  const labels: Record<string, Record<string, string>> = {
    home:  { ja: 'ホーム', vi: 'Trang chủ', en: 'Home',  zh: '首页', id: 'Beranda', tl: 'Home',   my: 'ပင်မ' },
    learn: { ja: '学習',   vi: 'Học tập',   en: 'Learn', zh: '学习', id: 'Belajar', tl: 'Aral',   my: 'သင်ယူ' },
    guide: { ja: 'ガイド', vi: 'Hướng dẫn', en: 'Guide', zh: '指南', id: 'Panduan', tl: 'Gabay',  my: 'လမ်းညွှန်' },
    jobs:  { ja: '求人',   vi: 'Việc làm',  en: 'Jobs',  zh: '求职', id: 'Kerja',   tl: 'Trabaho',my: 'အလုပ်' },
    ask:   { ja: 'AI相談', vi: 'AI Tư vấn', en: 'AI',    zh: 'AI咨询',id: 'AI',     tl: 'AI',     my: 'AI' },
  };
  return labels[key]?.[locale] || labels[key]?.['en'] || key;
}
