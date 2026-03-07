'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle } from 'lucide-react';
import type { QuizItem } from '@/lib/types';

interface CoachQuizProps {
  quiz: QuizItem[];
}

interface QuizState {
  selected: number | null;
  revealed: boolean;
}

export function CoachQuiz({ quiz }: CoachQuizProps) {
  const [states, setStates] = useState<QuizState[]>(
    quiz.map(() => ({ selected: null, revealed: false }))
  );

  if (!quiz || quiz.length === 0) return null;

  const handleSelect = (qi: number, oi: number) => {
    if (states[qi].revealed) return;
    setStates((prev) =>
      prev.map((s, i) => (i === qi ? { selected: oi, revealed: true } : s))
    );
  };

  return (
    <div className="space-y-4">
      {quiz.map((item, qi) => {
        const state = states[qi];
        return (
          <div key={qi} className="card-warm p-4 space-y-3">
            <p className="font-semibold text-[#2D3436] text-sm leading-relaxed">
              {`Q${qi + 1}: ${item.question}`}
            </p>
            <div className="space-y-2">
              {item.options.map((opt, oi) => {
                const isSelected = state.selected === oi;
                const isCorrect = oi === item.correct_index;
                let bg = 'bg-[#FFF8F0] border-[#e8ddd5]';
                if (state.revealed) {
                  if (isCorrect) bg = 'bg-green-50 border-green-400';
                  else if (isSelected && !isCorrect) bg = 'bg-red-50 border-red-400';
                } else if (isSelected) {
                  bg = 'bg-[#FFD166]/30 border-[#FFD166]';
                }

                return (
                  <motion.button
                    key={oi}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleSelect(qi, oi)}
                    className={`w-full flex items-center gap-3 rounded-lg border-2 px-4 py-3 text-left text-sm transition-all ${bg}`}
                  >
                    <span className="text-base font-bold text-[#004E64] w-5 shrink-0">
                      {String.fromCharCode(65 + oi)}
                    </span>
                    <span className="flex-1">{opt}</span>
                    {state.revealed && isCorrect && (
                      <CheckCircle className="w-4 h-4 text-green-500 shrink-0" />
                    )}
                    {state.revealed && isSelected && !isCorrect && (
                      <XCircle className="w-4 h-4 text-red-500 shrink-0" />
                    )}
                  </motion.button>
                );
              })}
            </div>
            <AnimatePresence>
              {state.revealed && (
                <motion.div
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`rounded-lg px-3 py-2 text-sm ${
                    state.selected === item.correct_index
                      ? 'bg-green-50 text-green-700'
                      : 'bg-red-50 text-red-700'
                  }`}
                >
                  {state.selected === item.correct_index ? (
                    <span className="font-semibold">{"✓ "}</span>
                  ) : (
                    <span className="font-semibold">{"✗ "}</span>
                  )}
                  {item.explanation}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
