'use client';

import { use } from 'react';
import { Header } from '@/components/layout/Header';
import { Navigation } from '@/components/layout/Navigation';
import { AudioPlayer } from '@/components/ui/AudioPlayer';
import { getWordById, getAdjacentWords, categories } from '@/lib/data';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Props {
  params: Promise<{ wordId: string }>;
}

const difficultyLabel = (level: number) => {
  const labels = ['', '初級 / Cơ bản', '中級 / Trung cấp', '上級 / Nâng cao'];
  return labels[level] ?? '';
};

const difficultyColor = (level: number) => {
  return level === 1 ? '#00b894' : level === 2 ? '#FF6B35' : '#E91E63';
};

export default function LearnPage({ params }: Props) {
  const { wordId } = use(params);
  const id = parseInt(wordId, 10);
  const word = getWordById(id);

  if (!word) notFound();

  const cat = categories.find(c => c.id === word.category_id);
  if (!cat) notFound();

  const { prev, next } = getAdjacentWords(id);
  const backHref = `/category/${cat.type}`;

  return (
    <div className="min-h-screen bg-[#FFF8F0]">
      <Header title={`${cat.icon} ${cat.name_ja}`} showBack backHref={backHref} />

      <div className="max-w-lg mx-auto px-4 pb-28">

        {/* メインカード */}
        <div className="card-warm p-6 mt-4 text-center">
          {/* 難易度バッジ */}
          <span
            className="inline-block text-xs font-semibold px-3 py-1 rounded-full text-white mb-4"
            style={{ backgroundColor: difficultyColor(word.difficulty) }}
          >
            {difficultyLabel(word.difficulty)}
          </span>

          {/* 単語 */}
          <h1 className="text-5xl font-black text-[#2D3436] mb-2 leading-tight">
            {word.word_ja}
          </h1>

          {/* 読み方 */}
          <p className="text-xl text-[#636e72] mb-4">
            {word.reading}
          </p>

          {/* 区切り線 */}
          <div className="border-t border-[#f0e8df] my-4" />

          {/* 意味 */}
          <div className="space-y-1 mb-6">
            <p className="text-lg font-semibold text-[#004E64]">
              {word.meaning_ja}
            </p>
            {word.meaning_vi && (
              <p className="text-base text-[#636e72]">{word.meaning_vi}</p>
            )}
            {word.meaning_en && (
              <p className="text-sm text-[#b2aca6]">{word.meaning_en}</p>
            )}
          </div>
        </div>

        {/* 使われる場面 */}
        {word.scene && (
          <div className="card-warm p-4 mt-3">
            <h3 className="text-xs font-bold text-[#FF6B35] uppercase tracking-wide mb-2">
              📍 使われる場面 / Tình huống sử dụng
            </h3>
            <p className="text-sm text-[#2D3436] leading-relaxed">{word.scene}</p>
          </div>
        )}

        {/* 例文 */}
        {word.example_sentence && (
          <div className="card-warm p-4 mt-3">
            <h3 className="text-xs font-bold text-[#004E64] uppercase tracking-wide mb-2">
              💬 例文 / Ví dụ
            </h3>
            <p className="text-sm font-medium text-[#2D3436] leading-relaxed">
              {word.example_sentence}
            </p>
          </div>
        )}

        {/* 音声（Phase 2で有効化） */}
        <div className="card-warm p-4 mt-3">
          <h3 className="text-xs font-bold text-[#636e72] uppercase tracking-wide mb-3">
            🔊 音声で聞く / Nghe phát âm
          </h3>
          <div className="space-y-2">
            <AudioPlayer
              label="標準速度"
              labelVi="Tốc độ chuẩn"
              icon="🗣️"
              audioUrl={word.audio_url_standard}
            />
            <AudioPlayer
              label="ゆっくり"
              labelVi="Chậm hơn"
              icon="🐢"
              audioUrl={word.audio_url_standard}
            />
            {cat.type === 'A' || cat.type === 'B' ? (
              <AudioPlayer
                label="高齢者の話し方"
                labelVi="Giọng người cao tuổi"
                icon="👴"
                audioUrl={word.audio_url_elderly}
              />
            ) : null}
          </div>
          <p className="text-[10px] text-[#b2aca6] mt-3 text-center">
            ※ 音声機能はPhase 2で追加予定 / Tính năng âm thanh sẽ ra mắt ở Phase 2
          </p>
        </div>

        {/* 前後ナビゲーション */}
        <div className="flex gap-2 mt-4">
          {prev ? (
            <Link
              href={`/learn/${prev.id}`}
              className="flex-1 flex items-center gap-2 card-warm p-3 hover:shadow-md transition-all"
            >
              <ChevronLeft className="w-4 h-4 text-[#636e72] shrink-0" />
              <div className="min-w-0">
                <p className="text-[10px] text-[#b2aca6]">前の単語</p>
                <p className="text-sm font-semibold text-[#2D3436] truncate">{prev.word_ja}</p>
              </div>
            </Link>
          ) : (
            <div className="flex-1" />
          )}

          {next ? (
            <Link
              href={`/learn/${next.id}`}
              className="flex-1 flex items-center justify-end gap-2 card-warm p-3 hover:shadow-md transition-all text-right"
            >
              <div className="min-w-0">
                <p className="text-[10px] text-[#b2aca6]">次の単語</p>
                <p className="text-sm font-semibold text-[#2D3436] truncate">{next.word_ja}</p>
              </div>
              <ChevronRight className="w-4 h-4 text-[#636e72] shrink-0" />
            </Link>
          ) : (
            <div className="flex-1" />
          )}
        </div>

        {/* カテゴリに戻るボタン */}
        <Link
          href={backHref}
          className="block text-center mt-4 text-sm text-[#FF6B35] font-semibold py-3"
        >
          {cat.name_ja}の一覧に戻る
        </Link>
      </div>

      <Navigation />
    </div>
  );
}
