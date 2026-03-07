'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Volume2 } from 'lucide-react';
import type { CueCard } from '@/lib/types';

interface CoachCueCardProps {
  cards: CueCard[];
  onClose: () => void;
}

export function CoachCueCard({ cards, onClose }: CoachCueCardProps) {
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState(0);

  if (!cards || cards.length === 0) return null;

  const go = (d: number) => {
    const next = Math.max(0, Math.min(cards.length - 1, index + d));
    if (next === index) return;
    setDir(d);
    setIndex(next);
  };

  const speak = () => {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const utt = new SpeechSynthesisUtterance(cards[index].japanese);
    utt.lang = 'ja-JP';
    utt.rate = 0.75;
    window.speechSynthesis.speak(utt);
  };

  const card = cards[index];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
      {/* Close */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 w-11 h-11 flex items-center justify-center rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200"
      >
        <X className="w-5 h-5" />
      </button>

      {/* Progress dots */}
      <div className="absolute top-5 left-1/2 -translate-x-1/2 flex gap-2 items-center">
        {cards.map((_, i) => (
          <button
            key={i}
            onClick={() => { setDir(i > index ? 1 : -1); setIndex(i); }}
            className={`h-2 rounded-full transition-all ${
              i === index ? 'bg-[#FF6B35] w-6' : 'bg-gray-300 w-2'
            }`}
          />
        ))}
      </div>

      {/* Card content */}
      <div className="w-full max-w-sm px-8 text-center">
        <AnimatePresence mode="wait" custom={dir}>
          <motion.div
            key={index}
            custom={dir}
            initial={{ x: dir * 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: dir * -100, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 280, damping: 28 }}
            className="space-y-5"
          >
            {card.context && (
              <p className="text-sm text-gray-500 bg-gray-50 rounded-xl px-4 py-2">
                {card.context}
              </p>
            )}
            <p className="text-5xl font-bold text-[#2D3436] leading-tight tracking-wide">
              {card.japanese}
            </p>
            <p className="text-lg text-gray-400">{card.furigana}</p>
          </motion.div>
        </AnimatePresence>

        <button
          onClick={speak}
          className="mt-10 w-16 h-16 rounded-full bg-[#FF6B35] text-white flex items-center justify-center mx-auto shadow-lg hover:bg-[#e85d25] active:scale-95 transition-all"
        >
          <Volume2 className="w-7 h-7" />
        </button>
      </div>

      {/* Nav */}
      {index > 0 && (
        <button
          onClick={() => go(-1)}
          className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
      )}
      {index < cards.length - 1 && (
        <button
          onClick={() => go(1)}
          className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      )}

      <p className="absolute bottom-6 left-1/2 -translate-x-1/2 text-xs text-gray-400">
        {`${index + 1} / ${cards.length}`}
      </p>
    </div>
  );
}
