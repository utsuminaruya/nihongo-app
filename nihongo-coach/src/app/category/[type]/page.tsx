'use client';

import { use } from 'react';
import { Header } from '@/components/layout/Header';
import { Navigation } from '@/components/layout/Navigation';
import { WordCard } from '@/components/ui/WordCard';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { getCategoryByType, getWordsByCategory } from '@/lib/data';
import { notFound } from 'next/navigation';

interface Props {
  params: Promise<{ type: string }>;
}

export default function CategoryPage({ params }: Props) {
  const { type } = use(params);
  const category = getCategoryByType(type);
  const words = getWordsByCategory(type);

  if (!category) {
    notFound();
  }

  const masteredCount = 0;
  const learningCount = 0;
  const progress = words.length > 0 ? (masteredCount / words.length) * 100 : 0;

  return (
    <div className="min-h-screen bg-[#FFF8F0]">
      <Header
        title={`${category.icon} ${category.name_ja}`}
        showBack
        backHref="/"
      />

      <div className="max-w-lg mx-auto px-4 pb-24">
        {/* カテゴリ概要 */}
        <div className="card-warm p-4 mt-4 mb-4">
          <div className="flex items-center justify-between mb-1">
            <div>
              <h2 className="text-lg font-bold text-[#2D3436]">
                {category.name_ja}
              </h2>
              <p className="text-xs text-[#636e72]">{category.name_vi}</p>
            </div>
            <span className="text-sm font-bold text-[#FF6B35]">
              {words.length}語
            </span>
          </div>
          <p className="text-xs text-[#b2aca6] mb-3">{category.description}</p>
          <ProgressBar value={progress} showLabel />
          <div className="flex justify-between mt-2 text-[10px] text-[#636e72]">
            <span>習得: {masteredCount}</span>
            <span>学習中: {learningCount}</span>
            <span>未学習: {words.length - masteredCount - learningCount}</span>
          </div>
        </div>

        {/* タイプ別の説明 */}
        {category.type === 'D' && (
          <div className="bg-[#FCE4EC] rounded-xl p-3 mb-4 border border-[#F8BBD0]">
            <p className="text-xs text-[#E91E63] font-semibold mb-1">
              💝 文脈依存語について
            </p>
            <p className="text-[10px] text-[#636e72]">
              同じ言葉でも、声のトーンや場面によって意味が変わります。
              各パターンの違いを聞き比べて、文脈から意味を読み取る力を身につけましょう。
            </p>
            <p className="text-[10px] text-[#b2aca6] mt-1">
              Cùng một từ nhưng ý nghĩa thay đổi tùy theo ngữ cảnh và giọng nói.
            </p>
          </div>
        )}

        {category.type === 'C' && (
          <div className="bg-[#FFF8E1] rounded-xl p-3 mb-4 border border-[#FFE082]">
            <p className="text-xs text-[#F57F17] font-semibold mb-1">
              ⚡ 省略表現について
            </p>
            <p className="text-[10px] text-[#636e72]">
              介護現場では、正式な用語を短く省略して使います。
              初めて聞くと分からない略語を覚えましょう。
            </p>
            <p className="text-[10px] text-[#b2aca6] mt-1">
              Trong thực tế, thuật ngữ thường được viết tắt. Hãy ghi nhớ các từ viết tắt này.
            </p>
          </div>
        )}

        {/* 単語リスト */}
        <div className="space-y-2">
          {words.map((word) => (
            <WordCard
              key={word.id}
              word={word}
              category={category}
              status="not_started"
            />
          ))}
        </div>
      </div>

      <Navigation />
    </div>
  );
}
