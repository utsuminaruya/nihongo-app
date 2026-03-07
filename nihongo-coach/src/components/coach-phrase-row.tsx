'use client';

import { useState } from 'react';
import { Volume2 } from 'lucide-react';
import type { Phrase } from '@/lib/types';

interface CoachPhraseRowProps {
  phrase: Phrase;
  index: number;
}

const POLITENESS_LABELS: Record<string, { label: string; cls: string }> = {
  polite: { label: '\u4e01\u5be7', cls: 'bg-[#004E64] text-white' },
  casual: { label: '\u30ab\u30b8\u30e5\u30a2\u30eb', cls: 'bg-[#FFD166] text-[#2D3436]' },
  formal: { label: '\u30d5\u30a9\u30fc\u30de\u30eb', cls: 'bg-[#2D3436] text-white' },
};

export function CoachPhraseRow({ phrase, index }: CoachPhraseRowProps) {
  const [playing, setPlaying] = useState(false);

  const speak = (slow = false) => {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const utt = new SpeechSynthesisUtterance(phrase.japanese);
    utt.lang = 'ja-JP';
    utt.rate = slow ? 0.6 : 0.82;
    setPlaying(true);
    utt.onend = () => setPlaying(false);
    utt.onerror = () => setPlaying(false);
    window.speechSynthesis.speak(utt);
  };

  const politeness = POLITENESS_LABELS[phrase.politeness] || POLITENESS_LABELS.polite;

  return (
    <div className="flex items-start gap-3 rounded-xl bg-white border border-[#f0e8df] p-4">
      <span className="flex-shrink-0 w-7 h-7 rounded-full bg-[#FF6B35] text-white text-xs font-bold flex items-center justify-center mt-0.5">
        {index + 1}
      </span>
      <div className="flex-1 min-w-0 space-y-1">
        <div className="flex items-start gap-2 flex-wrap">
          <span className="text-[#2D3436] font-bold text-xl leading-snug">
            {phrase.japanese}
          </span>
          <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold shrink-0 ${politeness.cls}`}>
            {politeness.label}
          </span>
        </div>
        <p className="text-[#636e72] text-sm">{phrase.furigana}</p>
        <p className="text-[#2D3436] text-sm font-medium">{phrase.translation}</p>
        {phrase.situation && (
          <p className="text-[#636e72] text-xs italic">{phrase.situation}</p>
        )}
      </div>
      <button
        onClick={() => speak(false)}
        onContextMenu={(e) => { e.preventDefault(); speak(true); }}
        className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all ${
          playing
            ? 'bg-[#FF6B35] text-white scale-105'
            : 'bg-[#FFF8F0] text-[#FF6B35] hover:bg-[#FF6B35]/10'
        }`}
        aria-label={`Play: ${phrase.japanese}`}
      >
        <Volume2 className="w-4 h-4" />
      </button>
    </div>
  );
}
