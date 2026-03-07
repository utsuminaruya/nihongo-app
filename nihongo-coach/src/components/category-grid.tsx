'use client';

import { motion } from 'framer-motion';
import { CATEGORIES, CATEGORY_ORDER } from '@/lib/categories';
import type { CategoryKey, UILanguage } from '@/lib/types';

interface CategoryGridProps {
  selected: CategoryKey | null;
  language: UILanguage;
  onSelect: (key: CategoryKey) => void;
}

export function CategoryGrid({ selected, language, onSelect }: CategoryGridProps) {
  return (
    <div className="grid grid-cols-4 gap-2">
      {CATEGORY_ORDER.map((key) => {
        const cat = CATEGORIES[key];
        const isSelected = selected === key;
        return (
          <motion.button
            key={key}
            whileTap={{ scale: 0.92 }}
            onClick={() => onSelect(key)}
            className={[
              'flex flex-col items-center justify-center gap-1 rounded-xl p-2 text-center transition-all',
              'min-h-[72px] cursor-pointer border-2',
              isSelected
                ? 'border-[#FF6B35] bg-[#FF6B35] text-white shadow-md'
                : 'border-[#f0e8df] bg-white text-[#2D3436] hover:border-[#FF6B35]/50',
            ].join(' ')}
            aria-pressed={isSelected}
          >
            <span className="text-xl leading-none">{cat.icon}</span>
            <span className="text-[10px] font-medium leading-tight line-clamp-2">
              {cat.labels[language]}
            </span>
          </motion.button>
        );
      })}
    </div>
  );
}
