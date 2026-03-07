'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Loader2 } from 'lucide-react';
import { CoachHeader } from '@/components/coach-header';
import { CoachResponse } from '@/components/coach-response';
import { CoachCueCard } from '@/components/coach-cue-card';
import { CoachHistory } from '@/components/coach-history';
import { CategoryGrid } from '@/components/category-grid';
import { LANGUAGES, LANGUAGE_ORDER } from '@/lib/languages';
import type { UILanguage, CategoryKey, JlptLevel, AIResponse, HistoryEntry } from '@/lib/types';

const HISTORY_KEY = 'nihongo_coach_v2_history';
const LEVELS: JlptLevel[] = ['N5', 'N4', 'N3'];

function uid() {
  return Math.random().toString(36).slice(2, 10);
}

function loadHistory(): HistoryEntry[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(HISTORY_KEY);
    return raw ? (JSON.parse(raw) as HistoryEntry[]) : [];
  } catch {
    return [];
  }
}

// Animated catchphrase hook
function useCatchphrase() {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % LANGUAGE_ORDER.length), 3200);
    return () => clearInterval(t);
  }, []);
  return LANGUAGE_ORDER[idx];
}

export default function HomePage() {
  const [language, setLanguage] = useState<UILanguage>('vi');
  const [category, setCategory] = useState<CategoryKey | null>(null);
  const [level, setLevel] = useState<JlptLevel>('N4');
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState<AIResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showCueCard, setShowCueCard] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const catchphraseLang = useCatchphrase();
  const langCfg = LANGUAGES[language];

  useEffect(() => {
    setHistory(loadHistory());
  }, []);

  useEffect(() => {
    if (history.length > 0) {
      localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
    }
  }, [history]);

  const handleSubmit = useCallback(async () => {
    if (!userInput.trim() || isLoading) return;

    setIsLoading(true);
    setResponse(null);
    setError(null);

    try {
      const res = await fetch('/api/coach', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userInput: userInput.trim(),
          category: category ?? 'daily',
          level,
          language,
        }),
      });

      if (!res.ok) {
        const d = await res.json().catch(() => ({}));
        throw new Error(d.error || `Error ${res.status}`);
      }

      const reader = res.body?.getReader();
      if (!reader) throw new Error('No stream available.');

      const decoder = new TextDecoder();
      let accumulated = '';
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        accumulated += decoder.decode(value, { stream: true });
      }

      const parsed = JSON.parse(accumulated) as AIResponse;
      if (!parsed.phrases) throw new Error('Invalid AI response format.');

      setResponse(parsed);

      const entry: HistoryEntry = {
        id: uid(),
        timestamp: Date.now(),
        userInput: userInput.trim(),
        category: category ?? 'daily',
        language,
        response: parsed,
      };
      setHistory((prev) => [entry, ...prev].slice(0, 50));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error.');
    } finally {
      setIsLoading(false);
    }
  }, [userInput, category, level, language, isLoading]);

  const handleCategorySelect = (key: CategoryKey) => {
    setCategory((prev) => (prev === key ? null : key));
    textareaRef.current?.focus();
  };

  const handleSelectHistory = (entry: HistoryEntry) => {
    setUserInput(entry.userInput);
    setCategory(entry.category);
    setLanguage(entry.language);
    setResponse(entry.response);
    setError(null);
  };

  const catchphraseCfg = LANGUAGES[catchphraseLang];

  return (
    <div className="min-h-screen bg-[#FFF8F0]">
      {/* Header */}
      <CoachHeader
        language={language}
        onLanguageChange={setLanguage}
        onToggleHistory={() => setShowHistory(true)}
        historyCount={history.length}
      />

      <div className="max-w-lg mx-auto px-4 pb-20">
        {/* Hero catchphrase */}
        <div className="pt-6 pb-4 text-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={catchphraseLang}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.4 }}
              className="space-y-1"
            >
              <span className="text-2xl">{catchphraseCfg.flag}</span>
              <p className="text-[#004E64] font-semibold text-base leading-snug">
                {catchphraseCfg.catchphrase}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Input card */}
        <div className="card-warm p-4 space-y-4">
          {/* Category grid */}
          <div>
            <p className="text-xs font-semibold text-[#636e72] uppercase tracking-wide mb-2">
              {"\u30ab\u30c6\u30b4\u30ea\u30fc"}
            </p>
            <CategoryGrid
              selected={category}
              language={language}
              onSelect={handleCategorySelect}
            />
          </div>

          {/* Textarea */}
          <div>
            <textarea
              ref={textareaRef}
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit();
                }
              }}
              placeholder={langCfg.placeholder}
              rows={3}
              disabled={isLoading}
              className="w-full rounded-xl border-2 border-[#e8ddd5] bg-[#FFF8F0] px-4 py-3 text-[#2D3436] placeholder-[#b2aca6] text-base leading-relaxed resize-none focus:outline-none focus:border-[#FF6B35] transition-colors disabled:opacity-60"
            />
          </div>

          {/* Level selector */}
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold text-[#636e72] uppercase tracking-wide shrink-0">
              {"JLPT"}
            </span>
            <div className="flex gap-2">
              {LEVELS.map((lv) => (
                <button
                  key={lv}
                  onClick={() => setLevel(lv)}
                  className={`rounded-full px-3 py-1 text-sm font-semibold transition-all ${
                    level === lv
                      ? 'bg-[#004E64] text-white'
                      : 'bg-white border border-[#e8ddd5] text-[#636e72] hover:border-[#004E64]/50'
                  }`}
                >
                  {lv}
                </button>
              ))}
            </div>
          </div>

          {/* Submit button */}
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={handleSubmit}
            disabled={isLoading || !userInput.trim()}
            className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>{"AI\u304c\u6e96\u5099\u4e2d..."}</span>
              </>
            ) : (
              <>
                <Send className="w-5 h-5" />
                <span>{langCfg.helpButton}</span>
              </>
            )}
          </motion.button>
        </div>

        {/* Error */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600"
            >
              {error}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Response */}
        <AnimatePresence>
          {(isLoading || response) && (
            <div className="mt-5">
              <CoachResponse
                response={response!}
                isStreaming={isLoading}
                onOpenCueCard={() => setShowCueCard(true)}
              />
            </div>
          )}
        </AnimatePresence>

        {/* Footer */}
        <p className="mt-10 text-center text-xs text-[#b2aca6]">
          {"NihonGo! by Mediflow"}
        </p>
      </div>

      {/* Cue Card overlay */}
      {showCueCard && response?.cue_cards && response.cue_cards.length > 0 && (
        <CoachCueCard
          cards={response.cue_cards}
          onClose={() => setShowCueCard(false)}
        />
      )}

      {/* History panel */}
      <CoachHistory
        isOpen={showHistory}
        onClose={() => setShowHistory(false)}
        entries={history}
        onSelect={handleSelectHistory}
        onDelete={(id) => setHistory((prev) => prev.filter((e) => e.id !== id))}
        onClearAll={() => setHistory([])}
      />
    </div>
  );
}
