'use client';

import { X, Trash2, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { CATEGORIES } from '@/lib/categories';
import type { HistoryEntry } from '@/lib/types';

interface CoachHistoryProps {
  isOpen: boolean;
  onClose: () => void;
  entries: HistoryEntry[];
  onSelect: (entry: HistoryEntry) => void;
  onDelete: (id: string) => void;
  onClearAll: () => void;
}

function formatTime(ts: number): string {
  const d = new Date(ts);
  const m = d.getMonth() + 1;
  const day = d.getDate();
  const hh = String(d.getHours()).padStart(2, '0');
  const mm = String(d.getMinutes()).padStart(2, '0');
  return `${m}/${day} ${hh}:${mm}`;
}

export function CoachHistory({
  isOpen, onClose, entries, onSelect, onDelete, onClearAll,
}: CoachHistoryProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black"
            onClick={onClose}
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 bottom-0 z-50 w-full max-w-xs bg-[#FFF8F0] border-l border-[#e8ddd5] shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-[#e8ddd5]">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#FF6B35]" />
                <h2 className="font-bold text-[#2D3436]">{"Lịch sử"}</h2>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-white border border-[#e8ddd5] flex items-center justify-center hover:bg-gray-50"
              >
                <X className="w-4 h-4 text-[#636e72]" />
              </button>
            </div>

            {/* List */}
            <div className="flex-1 overflow-y-auto p-3 space-y-2">
              {entries.length === 0 && (
                <p className="text-sm text-[#636e72] text-center py-10">
                  {"Chưa có lịch sử"}
                </p>
              )}
              {entries.map((entry) => {
                const cat = CATEGORIES[entry.category];
                return (
                  <div
                    key={entry.id}
                    className="rounded-xl bg-white border border-[#e8ddd5] p-3 cursor-pointer hover:border-[#FF6B35]/50 transition-all group"
                    onClick={() => { onSelect(entry); onClose(); }}
                  >
                    <div className="flex items-start gap-2">
                      <span className="text-lg mt-0.5">{cat?.icon ?? '📝'}</span>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-[#2D3436] truncate">
                          {entry.userInput}
                        </p>
                        <p className="text-xs text-[#636e72] mt-0.5">
                          {formatTime(entry.timestamp)}
                        </p>
                      </div>
                      <button
                        className="w-7 h-7 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 hover:bg-red-50 transition-all"
                        onClick={(e) => { e.stopPropagation(); onDelete(entry.id); }}
                      >
                        <Trash2 className="w-3.5 h-3.5 text-red-400" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Footer */}
            {entries.length > 0 && (
              <div className="p-3 border-t border-[#e8ddd5]">
                <button
                  onClick={onClearAll}
                  className="w-full flex items-center justify-center gap-2 rounded-xl border border-red-200 bg-red-50 py-2.5 text-sm font-medium text-red-500 hover:bg-red-100 transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  {"Xóa tất cả"}
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
