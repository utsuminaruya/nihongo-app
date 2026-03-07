'use client';

import { History } from 'lucide-react';
import { motion } from 'framer-motion';
import { LANGUAGES, LANGUAGE_ORDER } from '@/lib/languages';
import type { UILanguage } from '@/lib/types';

interface CoachHeaderProps {
  language: UILanguage;
  onLanguageChange: (lang: UILanguage) => void;
  onToggleHistory: () => void;
  historyCount: number;
}

export function CoachHeader({
  language,
  onLanguageChange,
  onToggleHistory,
  historyCount,
}: CoachHeaderProps) {
  return (
    <div className="sticky top-0 z-20 bg-[#FFF8F0]/95 backdrop-blur-sm border-b border-[#e8ddd5] px-4 py-3">
      <div className="max-w-lg mx-auto flex items-center justify-between gap-3">
        {/* Logo */}
        <div className="flex items-center gap-1.5">
          <span className="text-2xl font-black tracking-tight">
            <span className="text-[#FF6B35]">{"NihonGo"}</span>
            <span className="text-[#004E64]">{"!"}</span>
          </span>
        </div>

        {/* Language flags */}
        <div className="flex items-center gap-1 flex-1 justify-center overflow-x-auto scrollbar-hide">
          {LANGUAGE_ORDER.map((lang) => {
            const cfg = LANGUAGES[lang];
            const isActive = lang === language;
            return (
              <motion.button
                key={lang}
                whileTap={{ scale: 0.88 }}
                onClick={() => onLanguageChange(lang)}
                className={`flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium transition-all whitespace-nowrap ${
                  isActive
                    ? 'bg-[#FF6B35] text-white shadow-sm'
                    : 'bg-white/80 text-[#636e72] hover:bg-white border border-[#e8ddd5]'
                }`}
              >
                <span className="text-sm leading-none">{cfg.flag}</span>
                {isActive && (
                  <span className="text-[10px] font-semibold">{cfg.name}</span>
                )}
              </motion.button>
            );
          })}
        </div>

        {/* History */}
        <button
          onClick={onToggleHistory}
          className="relative flex-shrink-0 w-9 h-9 rounded-full bg-white border border-[#e8ddd5] flex items-center justify-center hover:bg-[#FFF8F0] transition-colors"
        >
          <History className="w-4 h-4 text-[#636e72]" />
          {historyCount > 0 && (
            <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-[#FF6B35] text-white text-[9px] font-bold flex items-center justify-center">
              {historyCount > 9 ? '9+' : historyCount}
            </span>
          )}
        </button>
      </div>
    </div>
  );
}
