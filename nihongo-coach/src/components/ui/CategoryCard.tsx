'use client';

import Link from 'next/link';
import { ProgressBar } from './ProgressBar';
import type { Category } from '@/types';

interface CategoryCardProps {
  category: Category;
  totalWords: number;
  masteredCount: number;
  learningCount: number;
}

const typeColors: Record<string, { bg: string; border: string; accent: string }> = {
  A: { bg: '#FFF0E8', border: '#FFD0B5', accent: '#FF6B35' },
  B: { bg: '#E8F4F8', border: '#B5D8E8', accent: '#004E64' },
  C: { bg: '#FFF8E1', border: '#FFE082', accent: '#F57F17' },
  D: { bg: '#FCE4EC', border: '#F8BBD0', accent: '#E91E63' },
};

export function CategoryCard({ category, totalWords, masteredCount, learningCount }: CategoryCardProps) {
  const colors = typeColors[category.type] || typeColors.A;
  const progress = totalWords > 0 ? (masteredCount / totalWords) * 100 : 0;

  return (
    <Link href={`/category/${category.type}`}>
      <div
        className="rounded-2xl p-4 transition-all hover:scale-[1.02] hover:shadow-lg active:scale-[0.98] cursor-pointer"
        style={{
          backgroundColor: colors.bg,
          border: `2px solid ${colors.border}`,
        }}
      >
        <div className="flex items-start justify-between mb-3">
          <span className="text-3xl">{category.icon}</span>
          <span
            className="text-xs font-bold px-2 py-0.5 rounded-full text-white"
            style={{ backgroundColor: colors.accent }}
          >
            {totalWords}語
          </span>
        </div>

        <h3 className="text-base font-bold text-[#2D3436] mb-1">
          {category.name_ja}
        </h3>
        <p className="text-xs text-[#636e72] mb-1">
          {category.name_vi}
        </p>
        <p className="text-[10px] text-[#b2aca6] mb-3 line-clamp-2">
          {category.description}
        </p>

        <ProgressBar value={progress} color={colors.accent} />

        <div className="flex justify-between mt-2 text-[10px] text-[#636e72]">
          <span>習得: {masteredCount}</span>
          <span>学習中: {learningCount}</span>
          <span>未学習: {totalWords - masteredCount - learningCount}</span>
        </div>
      </div>
    </Link>
  );
}
