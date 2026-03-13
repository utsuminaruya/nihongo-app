'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, BookOpen, Trophy } from 'lucide-react';

const navItems = [
  { href: '/', icon: Home, label: 'ホーム', labelVi: 'Trang chủ' },
  { href: '/category/A', icon: BookOpen, label: '学習', labelVi: 'Học' },
  { href: '/progress', icon: Trophy, label: '進捗', labelVi: 'Tiến độ' },
];

export function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-[#f0e8df] safe-area-bottom">
      <div className="max-w-lg mx-auto flex">
        {navItems.map(({ href, icon: Icon, label, labelVi }) => {
          const isActive = href === '/' ? pathname === '/' : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={`flex-1 flex flex-col items-center py-2 gap-0.5 transition-colors ${
                isActive
                  ? 'text-[#FF6B35]'
                  : 'text-[#b2aca6] hover:text-[#636e72]'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-[10px] font-medium">{label}</span>
              <span className="text-[8px]">{labelVi}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
