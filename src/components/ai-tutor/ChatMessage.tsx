"use client";

import { motion } from "framer-motion";
import { Bot, User } from "lucide-react";
import { useTranslations } from "next-intl";

interface ChatMessageProps {
  role: "user" | "assistant";
  content: string;
  isStreaming?: boolean;
}

/**
 * Parse text with furigana notation: 漢字（かんじ） -> <ruby>漢字<rp>(</rp><rt>かんじ</rt><rp>)</rp></ruby>
 * Also handles **bold** markers.
 */
function parseContent(text: string): string {
  // First, convert **text** to <strong>text</strong>
  let parsed = text.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");

  // Convert furigana notation: kanji（reading） or kanji(reading)
  // Match kanji characters followed by parenthetical reading
  parsed = parsed.replace(
    /([\u4e00-\u9faf\u3400-\u4dbf]+)（([^）]+)）/g,
    "<ruby>$1<rp>(</rp><rt>$2</rt><rp>)</rp></ruby>"
  );
  parsed = parsed.replace(
    /([\u4e00-\u9faf\u3400-\u4dbf]+)\(([^)]+)\)/g,
    "<ruby>$1<rp>(</rp><rt>$2</rt><rp>)</rp></ruby>"
  );

  // Convert newlines to <br>
  parsed = parsed.replace(/\n/g, "<br />");

  return parsed;
}

export default function ChatMessage({
  role,
  content,
  isStreaming = false,
}: ChatMessageProps) {
  const t = useTranslations("aiTutor");
  const isAssistant = role === "assistant";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex gap-3 ${isAssistant ? "justify-start" : "justify-end"}`}
    >
      {isAssistant && (
        <div className="flex-shrink-0 w-9 h-9 rounded-full bg-sakura-100 flex items-center justify-center">
          <Bot className="w-5 h-5 text-sakura-600" />
        </div>
      )}

      <div
        className={`max-w-[80%] sm:max-w-[70%] rounded-2xl px-4 py-3 ${
          isAssistant
            ? "bg-gray-100 text-navy-800 rounded-tl-sm"
            : "bg-sakura-500 text-white rounded-tr-sm"
        }`}
      >
        {isAssistant && (
          <p className="text-xs font-medium text-sakura-600 mb-1">
            {t("sakuraSensei")}
          </p>
        )}
        <div
          className={`text-sm leading-relaxed ${
            isAssistant ? "text-navy-800" : "text-white"
          }`}
          dangerouslySetInnerHTML={{ __html: parseContent(content) }}
        />
        {isStreaming && (
          <span className="inline-block w-2 h-4 bg-sakura-400 animate-pulse ml-0.5 rounded-sm" />
        )}
      </div>

      {!isAssistant && (
        <div className="flex-shrink-0 w-9 h-9 rounded-full bg-navy-100 flex items-center justify-center">
          <User className="w-5 h-5 text-navy-600" />
        </div>
      )}
    </motion.div>
  );
}
