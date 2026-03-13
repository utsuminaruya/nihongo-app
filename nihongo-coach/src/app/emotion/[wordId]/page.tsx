'use client';

import { use, useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Navigation } from '@/components/layout/Navigation';
import { AudioPlayer } from '@/components/ui/AudioPlayer';
import { getWordById, getPatternsByWordId, getAdjacentWords, categories } from '@/lib/data';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Props {
  params: Promise<{ wordId: string }>;
}

const patternColors = [
  { bg: '#FFF0E8', border: '#FFD0B5', text: '#FF6B35' },
  { bg: '#E8F4F8', border: '#B5D8E8', text: '#004E64' },
  { bg: '#FFF8E1', border: '#FFE082', text: '#F57F17' },
  { bg: '#FCE4EC', border: '#F8BBD0', text: '#E91E63' },
  { bg: '#E8F5E9', border: '#A5D6A7', text: '#2E7D32' },
];

export default function EmotionPage({ params }: Props) {
  const { wordId } = use(params);
  const id = parseInt(wordId, 10);
  const word = getWordById(id);
  const [activePattern, setActivePattern] = useState<number>(0);

  if (!word) notFound();

  const cat = categories.find(c => c.id === word.category_id);
  if (!cat || cat.type !== 'D') notFound();

  const patterns = getPatternsByWordId(id);
  const { prev, next } = getAdjacentWords(id);
  const backHref = `/category/${cat.type}`;

  const currentPattern = patterns[activePattern];

  return (
    <div className="min-h-screen bg-[#FFF8F0]">
      <Header title={`${cat.icon} ${cat.name_ja}`} showBack backHref={backHref} />

      <div className="max-w-lg mx-auto px-4 pb-28">

        {/* メインカード */}
        <div className="card-warm p-6 mt-4 text-center">
          <p className="text-xs text-[#636e72] mb-2">
            同じ言葉、違う意味 / Cùng từ, khác nghĩa
          </p>

          {/* 単語 */}
          <h1 className="text-5xl font-black text-[#2D3436] mb-2 leading-tight">
            「{word.word_ja}」
          </h1>

          <p className="text-base text-[#636e72] mb-2">{word.reading}</p>

          <div className="bg-[#FCE4EC] rounded-xl px-4 py-2 inline-block mt-1">
            <p className="text-sm font-semibold text-[#E91E63]">
              {patterns.length}通りの意味があります
            </p>
            <p className="text-xs text-[#636e72]">
              Có {patterns.length} ý nghĩa khác nhau
            </p>
          </div>
        </div>

        {/* パターンタブ */}
        <div className="mt-4">
          <h3 className="text-xs font-bold text-[#636e72] uppercase tracking-wide mb-2 px-1">
            パターンを選ぶ / Chọn mẫu câu
          </h3>
          <div className="flex flex-wrap gap-2">
            {patterns.map((pattern, i) => {
              const color = patternColors[i % patternColors.length];
              return (
                <button
                  key={i}
                  onClick={() => setActivePattern(i)}
                  className="px-3 py-1.5 rounded-full text-sm font-semibold transition-all border-2"
                  style={{
                    backgroundColor: activePattern === i ? color.text : 'white',
                    borderColor: color.border,
                    color: activePattern === i ? 'white' : color.text,
                  }}
                >
                  {pattern.pattern_name}
                </button>
              );
            })}
          </div>
        </div>

        {/* 選択中のパターン詳細 */}
        {currentPattern && (
          <div
            className="rounded-2xl p-5 mt-4 border-2"
            style={{
              backgroundColor: patternColors[activePattern % patternColors.length].bg,
              borderColor: patternColors[activePattern % patternColors.length].border,
            }}
          >
            {/* パターン名 */}
            <div className="flex items-center justify-between mb-3">
              <h4
                className="text-lg font-black"
                style={{ color: patternColors[activePattern % patternColors.length].text }}
              >
                {currentPattern.pattern_name}
              </h4>
              {currentPattern.voice_tone && (
                <span className="text-xs font-semibold bg-white/70 px-2 py-1 rounded-full text-[#636e72]">
                  声のトーン: {currentPattern.voice_tone}
                </span>
              )}
            </div>

            {/* シーン */}
            <div className="bg-white/60 rounded-xl p-3 mb-3">
              <p className="text-[10px] font-bold text-[#636e72] mb-1">場面 / Tình huống</p>
              <p className="text-sm font-medium text-[#2D3436] leading-relaxed">
                {currentPattern.scene}
              </p>
            </div>

            {/* 意味 */}
            <div className="bg-white/60 rounded-xl p-3 mb-4">
              <p className="text-[10px] font-bold text-[#636e72] mb-1">意味 / Ý nghĩa</p>
              <p
                className="text-xl font-black"
                style={{ color: patternColors[activePattern % patternColors.length].text }}
              >
                {currentPattern.meaning}
              </p>
            </div>

            {/* 音声 */}
            <AudioPlayer
              label={`「${word.word_ja}」（${currentPattern.pattern_name}）を聞く`}
              labelVi={`Nghe "${word.word_ja}" theo ngữ cảnh ${currentPattern.pattern_name}`}
              icon="🔊"
              audioUrl={currentPattern.audio_url}
            />
          </div>
        )}

        {/* 声のトーンのヒント */}
        <div className="card-warm p-4 mt-3">
          <h3 className="text-xs font-bold text-[#004E64] uppercase tracking-wide mb-3">
            💡 声のトーンで聞き分けるコツ
          </h3>
          <div className="space-y-2">
            {patterns.map((pattern, i) => (
              <div key={i} className="flex items-start gap-3">
                <span
                  className="text-xs font-bold px-2 py-0.5 rounded-full text-white shrink-0 mt-0.5"
                  style={{ backgroundColor: patternColors[i % patternColors.length].text }}
                >
                  {pattern.pattern_name}
                </span>
                <div className="flex-1">
                  <span className="text-xs text-[#636e72]">{pattern.meaning}</span>
                  {pattern.voice_tone && (
                    <span className="text-xs text-[#FF6B35] ml-2">→ {pattern.voice_tone}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
          <p className="text-[10px] text-[#b2aca6] mt-3 text-center">
            ※ 全パターンの音声比較はPhase 2で追加予定
          </p>
        </div>

        {/* 前後ナビゲーション（タイプDのみ） */}
        <div className="flex gap-2 mt-4">
          {prev ? (
            <Link
              href={`/emotion/${prev.id}`}
              className="flex-1 flex items-center gap-2 card-warm p-3 hover:shadow-md transition-all"
            >
              <ChevronLeft className="w-4 h-4 text-[#636e72] shrink-0" />
              <div className="min-w-0">
                <p className="text-[10px] text-[#b2aca6]">前の単語</p>
                <p className="text-sm font-semibold text-[#2D3436] truncate">
                  「{prev.word_ja}」
                </p>
              </div>
            </Link>
          ) : (
            <div className="flex-1" />
          )}

          {next ? (
            <Link
              href={`/emotion/${next.id}`}
              className="flex-1 flex items-center justify-end gap-2 card-warm p-3 hover:shadow-md transition-all text-right"
            >
              <div className="min-w-0">
                <p className="text-[10px] text-[#b2aca6]">次の単語</p>
                <p className="text-sm font-semibold text-[#2D3436] truncate">
                  「{next.word_ja}」
                </p>
              </div>
              <ChevronRight className="w-4 h-4 text-[#636e72] shrink-0" />
            </Link>
          ) : (
            <div className="flex-1" />
          )}
        </div>

        <Link
          href={backHref}
          className="block text-center mt-4 text-sm text-[#E91E63] font-semibold py-3"
        >
          {cat.name_ja}の一覧に戻る
        </Link>
      </div>

      <Navigation />
    </div>
  );
}
