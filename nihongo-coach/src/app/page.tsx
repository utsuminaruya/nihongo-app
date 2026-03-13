'use client';

import { Header } from '@/components/layout/Header';
import { Navigation } from '@/components/layout/Navigation';
import { CategoryCard } from '@/components/ui/CategoryCard';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { categories, allWords } from '@/lib/data';

export default function HomePage() {
  const totalWords = allWords.length;
  // Phase 1: 進捗はローカルで管理（将来Supabase連携）
  const masteredCount = 0;

  return (
    <div className="min-h-screen bg-[#FFF8F0]">
      <Header />

      <div className="max-w-lg mx-auto px-4 pb-24">
        {/* ヒーロー */}
        <div className="pt-6 pb-2 text-center">
          <h2 className="text-2xl font-bold text-[#004E64] mb-1">
            介護の日本語、聞いて覚えよう
          </h2>
          <p className="text-sm text-[#636e72] mb-1">
            Nghe và học tiếng Nhật điều dưỡng
          </p>
          <p className="text-xs text-[#b2aca6]">
            現場で「本当に困る」40語を厳選
          </p>
        </div>

        {/* 全体進捗 */}
        <div className="card-warm p-4 mt-4 mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold text-[#2D3436]">
              学習進捗 / Tiến độ học
            </span>
            <span className="text-sm font-bold text-[#FF6B35]">
              {masteredCount}/{totalWords}
            </span>
          </div>
          <ProgressBar
            value={(masteredCount / totalWords) * 100}
            showLabel
          />
        </div>

        {/* カテゴリグリッド */}
        <div className="grid grid-cols-2 gap-3">
          {categories.map((cat) => {
            const words = allWords.filter(w => w.category_id === cat.id);
            return (
              <CategoryCard
                key={cat.id}
                category={cat}
                totalWords={words.length}
                masteredCount={0}
                learningCount={0}
              />
            );
          })}
        </div>

        {/* 特徴説明 */}
        <div className="mt-8 space-y-4">
          <h3 className="text-base font-bold text-[#004E64] text-center">
            3つの「きこえない」を解決
          </h3>
          <div className="space-y-3">
            {[
              {
                icon: '🗣️',
                title: 'スタッフの指示',
                titleVi: 'Chỉ thị của nhân viên',
                desc: '省略表現・現場用語・早口の指示',
              },
              {
                icon: '👴',
                title: '利用者の言葉',
                titleVi: 'Lời nói của người sử dụng',
                desc: '高齢者特有の話し方・方言・曖昧表現',
              },
              {
                icon: '💝',
                title: '気持ちの理解',
                titleVi: 'Hiểu cảm xúc',
                desc: '同じ言葉でも文脈で変わる「いいよ」「大丈夫」',
              },
            ].map((item) => (
              <div key={item.title} className="card-warm p-3 flex items-start gap-3">
                <span className="text-2xl">{item.icon}</span>
                <div>
                  <p className="text-sm font-semibold text-[#2D3436]">{item.title}</p>
                  <p className="text-xs text-[#636e72]">{item.titleVi}</p>
                  <p className="text-xs text-[#b2aca6] mt-0.5">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* フッター */}
        <p className="mt-10 text-center text-xs text-[#b2aca6]">
          きこえる介護日本語 by Mediflow
        </p>
      </div>

      <Navigation />
    </div>
  );
}
