'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

interface HeaderProps {
  title?: string;
  showBack?: boolean;
  backHref?: string;
}

export function Header({ title, showBack = false, backHref = '/' }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-[#f0e8df]">
      <div className="max-w-lg mx-auto px-4 h-14 flex items-center gap-3">
        {showBack && (
          <Link
            href={backHref}
            className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-[#f5ede3] transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-[#004E64]" />
          </Link>
        )}
        {title ? (
          <h1 className="text-lg font-bold text-[#004E64] truncate">{title}</h1>
        ) : (
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">👂</span>
            <div>
              <h1 className="text-base font-bold text-[#004E64] leading-tight">
                きこえる介護日本語
              </h1>
              <p className="text-[10px] text-[#636e72] leading-tight">
                Kikoeru Kaigo Nihongo
              </p>
            </div>
          </Link>
        )}
      </div>
    </header>
  );
}
