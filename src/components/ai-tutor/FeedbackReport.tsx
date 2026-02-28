"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import {
  Star,
  TrendingUp,
  BookOpen,
  CheckCircle,
  AlertCircle,
  RotateCcw,
} from "lucide-react";

interface FeedbackData {
  score: number;
  strengths: string[];
  improvements: string[];
  vocabulary: string[];
  grammarPoints: string[];
}

interface FeedbackReportProps {
  feedback: FeedbackData;
  onNewChat: () => void;
}

export default function FeedbackReport({
  feedback,
  onNewChat,
}: FeedbackReportProps) {
  const t = useTranslations("aiTutor");

  const scoreColor =
    feedback.score >= 80
      ? "text-green-500"
      : feedback.score >= 60
      ? "text-gold-500"
      : "text-sakura-500";

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="max-w-2xl mx-auto px-4 py-8"
    >
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-sakura-500 to-sakura-400 px-6 py-5 text-white">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <Star className="w-6 h-6" />
            {t("feedbackTitle")}
          </h2>
        </div>

        <div className="p-6 space-y-6">
          {/* Score */}
          <div className="text-center">
            <p className="text-sm text-gray-500 mb-1">{t("feedbackScore")}</p>
            <p className={`text-5xl font-bold ${scoreColor}`}>
              {feedback.score}
              <span className="text-xl text-gray-400">/100</span>
            </p>
          </div>

          {/* Strengths */}
          <div>
            <h3 className="font-semibold text-navy-800 flex items-center gap-2 mb-3">
              <CheckCircle className="w-5 h-5 text-green-500" />
              {t("feedbackStrengths")}
            </h3>
            <ul className="space-y-2">
              {feedback.strengths.map((item, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2 text-sm text-gray-700 bg-green-50 rounded-lg p-3"
                >
                  <span className="text-green-500 mt-0.5">+</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Improvements */}
          <div>
            <h3 className="font-semibold text-navy-800 flex items-center gap-2 mb-3">
              <AlertCircle className="w-5 h-5 text-gold-500" />
              {t("feedbackImprovements")}
            </h3>
            <ul className="space-y-2">
              {feedback.improvements.map((item, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2 text-sm text-gray-700 bg-gold-50 rounded-lg p-3"
                >
                  <TrendingUp className="w-4 h-4 text-gold-500 mt-0.5 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Vocabulary */}
          {feedback.vocabulary.length > 0 && (
            <div>
              <h3 className="font-semibold text-navy-800 flex items-center gap-2 mb-3">
                <BookOpen className="w-5 h-5 text-sakura-500" />
                {t("feedbackVocabulary")}
              </h3>
              <div className="flex flex-wrap gap-2">
                {feedback.vocabulary.map((word, i) => (
                  <span
                    key={i}
                    className="inline-block px-3 py-1.5 bg-sakura-50 text-sakura-700 text-sm rounded-full font-medium"
                  >
                    {word}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Grammar Points */}
          {feedback.grammarPoints.length > 0 && (
            <div>
              <h3 className="font-semibold text-navy-800 flex items-center gap-2 mb-3">
                <BookOpen className="w-5 h-5 text-navy-500" />
                {t("feedbackGrammar")}
              </h3>
              <div className="flex flex-wrap gap-2">
                {feedback.grammarPoints.map((point, i) => (
                  <span
                    key={i}
                    className="inline-block px-3 py-1.5 bg-navy-50 text-navy-700 text-sm rounded-full font-medium"
                  >
                    {point}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Encouragement */}
          <div className="bg-sakura-50 rounded-xl p-4 text-center">
            <p className="text-sakura-700 font-medium">
              {t("feedbackEncouragement")}
            </p>
          </div>

          {/* New Chat Button */}
          <button
            onClick={onNewChat}
            className="w-full flex items-center justify-center gap-2 bg-sakura-500 hover:bg-sakura-600 text-white font-medium py-3 px-6 rounded-xl transition-colors"
          >
            <RotateCcw className="w-5 h-5" />
            {t("newChat")}
          </button>
        </div>
      </div>
    </motion.div>
  );
}
