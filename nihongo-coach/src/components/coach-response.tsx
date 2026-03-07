'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, BookOpen, Lightbulb, LayoutGrid, Volume2 } from 'lucide-react';
import { CoachPhraseRow } from './coach-phrase-row';
import { CoachQuiz } from './coach-quiz';
import { CoachMediaflowCta } from './coach-mediflow-cta';
import type { AIResponse } from '@/lib/types';

interface CoachResponseProps {
  response: AIResponse;
  isStreaming: boolean;
  onOpenCueCard: () => void;
}

function SpeakButton({ text }: { text: string }) {
  const [playing, setPlaying] = useState(false);
  const speak = () => {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const utt = new SpeechSynthesisUtterance(text);
    utt.lang = 'ja-JP';
    utt.rate = 0.82;
    setPlaying(true);
    utt.onend = () => setPlaying(false);
    utt.onerror = () => setPlaying(false);
    window.speechSynthesis.speak(utt);
  };
  return (
    <button
      onClick={speak}
      className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-all ${
        playing ? 'bg-[#FF6B35] text-white' : 'bg-[#FFF8F0] text-[#FF6B35] hover:bg-[#FF6B35]/10'
      }`}
    >
      <Volume2 className="w-3.5 h-3.5" />
    </button>
  );
}

export function CoachResponse({ response, isStreaming, onOpenCueCard }: CoachResponseProps) {
  if (isStreaming) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="card-warm p-6 flex flex-col items-center gap-4"
      >
        <div className="flex gap-1.5">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-3 h-3 rounded-full bg-[#FF6B35]"
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 1, delay: i * 0.2 }}
            />
          ))}
        </div>
        <p className="text-sm text-[#636e72]">{"AI\u304c\u65e5\u672c\u8a9e\u3092\u6e96\u5099\u4e2d..."}</p>
      </motion.div>
    );
  }

  const { user_concern, phrases, conversation, quiz, cue_cards, grammar_point, cultural_tip } = response;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-5"
    >
      {/* User concern recap */}
      {user_concern && (
        <div className="card-warm p-4 border-l-4 border-[#FF6B35]">
          <p className="text-xs font-semibold text-[#FF6B35] uppercase tracking-wide mb-1">
            {"Your situation"}
          </p>
          <p className="text-[#2D3436] font-medium text-sm">{user_concern.japanese}</p>
        </div>
      )}

      {/* Phrases */}
      {phrases && phrases.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="flex items-center gap-2 font-bold text-[#004E64]">
              <MessageSquare className="w-4 h-4" />
              <span>{"\ud83d\udde3\ufe0f \u3059\u3050\u4f7f\u3048\u308b\u30d5\u30ec\u30fc\u30ba"}</span>
            </h3>
            {cue_cards && cue_cards.length > 0 && (
              <button
                onClick={onOpenCueCard}
                className="flex items-center gap-1.5 rounded-full bg-[#004E64] text-white text-xs font-semibold px-3 py-1.5 hover:bg-[#003850] transition-colors"
              >
                <LayoutGrid className="w-3 h-3" />
                {"\u30ab\u30f3\u30da"}
              </button>
            )}
          </div>
          <div className="space-y-2">
            {phrases.map((phrase, i) => (
              <CoachPhraseRow key={i} phrase={phrase} index={i} />
            ))}
          </div>
        </div>
      )}

      {/* Conversation */}
      {conversation && conversation.lines && conversation.lines.length > 0 && (
        <div className="space-y-3">
          <div>
            <h3 className="flex items-center gap-2 font-bold text-[#004E64]">
              <BookOpen className="w-4 h-4" />
              <span>{"\ud83d\udcac \u4f1a\u8a71\u30b9\u30af\u30ea\u30d7\u30c8"}</span>
            </h3>
            {conversation.scene && (
              <p className="text-xs text-[#636e72] mt-0.5 italic">{conversation.scene}</p>
            )}
          </div>
          <div className="rounded-2xl bg-[#F5EDE3]/50 border border-[#e8ddd5] p-3 space-y-3">
            {conversation.lines.map((line, i) => {
              const isYou = line.speaker === 'you';
              return (
                <div
                  key={i}
                  className={`flex gap-2 ${isYou ? '' : 'flex-row-reverse'}`}
                >
                  <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                    isYou ? 'bg-[#FF6B35] text-white' : 'bg-[#004E64] text-white'
                  }`}>
                    {isYou ? '\u3042' : '\u4ed6'}
                  </span>
                  <div className={`flex-1 rounded-2xl px-3 py-2 max-w-[85%] ${
                    isYou ? 'bg-[#FF6B35]/10 border border-[#FF6B35]/20 rounded-tl-sm' : 'bg-white border border-[#e8ddd5] rounded-tr-sm'
                  }`}>
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-[#2D3436] text-base leading-snug">
                          {line.japanese}
                        </p>
                        <p className="text-[#636e72] text-xs mt-0.5">{line.furigana}</p>
                        <p className="text-[#2D3436]/70 text-xs mt-0.5">{line.translation}</p>
                      </div>
                      <SpeakButton text={line.japanese} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Grammar point */}
      {grammar_point && grammar_point.pattern && (
        <div className="card-warm p-4 space-y-2">
          <h3 className="flex items-center gap-2 font-bold text-[#004E64]">
            <BookOpen className="w-4 h-4" />
            <span>{"\ud83d\udcda \u6587\u6cd5\u30dd\u30a4\u30f3\u30c8"}</span>
          </h3>
          <div className="bg-[#004E64]/5 rounded-xl px-4 py-3">
            <p className="font-bold text-[#004E64] text-base">{grammar_point.pattern}</p>
            <p className="text-sm text-[#2D3436] mt-1">{grammar_point.explanation}</p>
            {grammar_point.examples && grammar_point.examples.length > 0 && (
              <ul className="mt-2 space-y-1">
                {grammar_point.examples.map((ex, i) => (
                  <li key={i} className="text-sm text-[#636e72] flex items-center gap-2">
                    <span className="text-[#FF6B35]">{"→"}</span>
                    {ex}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}

      {/* Quiz */}
      {quiz && quiz.length > 0 && (
        <div className="space-y-3">
          <h3 className="flex items-center gap-2 font-bold text-[#004E64]">
            <span className="text-base">{"\ud83d\udcdd"}</span>
            <span>{"\u7df4\u7fd2\u30af\u30a4\u30ba"}</span>
          </h3>
          <CoachQuiz quiz={quiz} />
        </div>
      )}

      {/* Cultural tip */}
      {cultural_tip && (
        <div className="card-warm p-4 border-l-4 border-[#FFD166]">
          <h3 className="flex items-center gap-2 font-bold text-[#004E64] mb-2">
            <Lightbulb className="w-4 h-4 text-[#FFD166]" />
            <span>{"\ud83c\udfef \u6587\u5316\u30c1\u30c3\u30d7"}</span>
          </h3>
          <p className="text-sm text-[#2D3436] leading-relaxed">{cultural_tip}</p>
        </div>
      )}

      {/* Mediflow CTA */}
      <CoachMediaflowCta />
    </motion.div>
  );
}
