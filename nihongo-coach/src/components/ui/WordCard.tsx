'use client';

import Link from 'next/link';
import type { Word, ProgressStatus, Category } from '@/types';

interface WordCardProps {
  word: Word;
  category: Category;
  status?: ProgressStatus;
}

const statusConfig: Record<ProgressStatus, { label: string; labelVi: string; color: string; bg: string }> = {
  not_started: { label: '未学習', labelVi: 'Chưa học', color: '#b2aca6', bg: '#f5ede3' },
  learning: { label: '学習中', labelVi: 'Đang học', color: '#FF6B35', bg: '#FFF0E8' },
  mastered: { label: '習得済', labelVi: 'Đã thuộc', color: '#00b894', bg: '#e6f9f2' },
};

const difficultyStars = (level: number) => {
  return '★'.repeat(level) + '☆'.repeat(3 - level);
};

export function WordCard({ word, category, status = 'not_started' }: WordCardProps) {
  const config = statusConfig[status];
  const href = category.type === 'D' ? `/emotion/${word.id}` : `/learn/${word.id}`;

  return (
    <Link href={href}>
      <div className="card-warm p-4 flex items-center gap-3 hover:shadow-md transition-all active:scale-[0.98]">
        {/* ステータスインジケーター */}
        <div
          className="w-2 h-12 rounded-full shrink-0"
          style={{ backgroundColor: config.color }}
        />

        {/* 内容 */}
        <div className="flex-1 min-w-0">
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-bold text-[#2D3436]">{word.word_ja}</span>
            <span className="text-sm text-[#636e72]">{word.reading}</span>
          </div>
          <p className="text-sm text-[#636e72] truncate">{word.meaning_ja}</p>
          {word.meaning_vi && (
            <p className="text-xs text-[#b2aca6] truncate">{word.meaning_vi}</p>
          )}
        </div>

        {/* 右側情報 */}
        <div className="shrink-0 text-right">
          <span
            className="text-[10px] font-semibold px-2 py-0.5 rounded-full inline-block mb-1"
            style={{ color: config.color, backgroundColor: config.bg }}
          >
            {config.label}
          </span>
          <div className="text-xs text-[#FFD166]">
            {difficultyStars(word.difficulty)}
          </div>
        </div>
      </div>
    </Link>
  );
}
