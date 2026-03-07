'use client';

import { motion } from 'framer-motion';
import { MessageCircle, Search } from 'lucide-react';

export function CoachMediaflowCta() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl border-2 border-[#FFD166] bg-gradient-to-br from-[#FFF8F0] to-[#FFF3E0] p-5 space-y-3"
    >
      <div className="flex items-start gap-3">
        <span className="text-2xl">{"💡"}</span>
        <div>
          <p className="font-bold text-[#004E64] text-base">
            {"日本語がもっと上手になりたい？"}
          </p>
          <p className="text-sm text-[#2D3436]/80 mt-0.5">
            {"Mediflow\u3067\u306f\u4ecb\u8b77\u306e\u4ed5\u4e8b\u3092\u63a2\u3057\u306a\u304c\u3089\u65e5\u672c\u8a9e\u3082\u4e0a\u9054\u3067\u304d\u307e\u3059\uff01"}
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <a
          href="https://lin.ee/xUocVyI"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 rounded-full bg-[#06C755] px-4 py-3 text-white font-bold text-sm transition-all hover:bg-[#05b34c] active:scale-95"
        >
          <MessageCircle className="w-4 h-4" />
          {"LINE\u3067\u76f8\u8ac7\u3059\u308b \ud83d\udcac"}
        </a>
        <a
          href="https://mediflow.co.jp"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 rounded-full border-2 border-[#004E64] px-4 py-3 text-[#004E64] font-bold text-sm transition-all hover:bg-[#004E64] hover:text-white active:scale-95"
        >
          <Search className="w-4 h-4" />
          {"\u6c42\u4eba\u3092\u898b\u308b \ud83d\udd0d"}
        </a>
      </div>
    </motion.div>
  );
}
