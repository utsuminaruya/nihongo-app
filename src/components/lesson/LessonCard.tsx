"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Lock, CheckCircle, BookOpen } from "lucide-react";
import { useTranslations } from "next-intl";
import type { Lesson } from "@/lib/lesson-data";

interface LessonCardProps {
  lesson: Lesson;
  courseSlug: string;
  locale: string;
  index: number;
  isLocked: boolean;
  isCompleted: boolean;
}

export default function LessonCard({
  lesson,
  courseSlug,
  locale,
  index,
  isLocked,
  isCompleted,
}: LessonCardProps) {
  const t = useTranslations("lessons");

  const content = (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.08, duration: 0.3 }}
      className={`relative flex items-center gap-4 p-4 rounded-xl border transition-all duration-200 ${
        isLocked
          ? "bg-gray-50 border-gray-200 opacity-60 cursor-not-allowed"
          : isCompleted
          ? "bg-green-50 border-green-200 hover:shadow-md hover:-translate-y-0.5 cursor-pointer"
          : "bg-white border-gray-200 hover:border-sakura-300 hover:shadow-md hover:-translate-y-0.5 cursor-pointer"
      }`}
    >
      {/* Order number / Status icon */}
      <div
        className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg ${
          isLocked
            ? "bg-gray-200 text-gray-400"
            : isCompleted
            ? "bg-green-500 text-white"
            : "bg-sakura-500 text-white"
        }`}
      >
        {isLocked ? (
          <Lock className="w-5 h-5" />
        ) : isCompleted ? (
          <CheckCircle className="w-6 h-6" />
        ) : (
          lesson.order
        )}
      </div>

      {/* Lesson info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <h3
            className={`font-semibold truncate ${
              isLocked ? "text-gray-400" : "text-navy-800"
            }`}
          >
            {lesson.titleJa}
          </h3>
        </div>
        <p
          className={`text-sm truncate ${
            isLocked ? "text-gray-300" : "text-gray-500"
          }`}
        >
          {lesson.title}
        </p>
        {!isLocked && (
          <div className="flex items-center gap-3 mt-1">
            <span className="text-xs text-gray-400 flex items-center gap-1">
              <BookOpen className="w-3 h-3" />
              {lesson.grammar.length} {t("grammar")}
            </span>
            <span className="text-xs text-gray-400">
              {lesson.vocabulary.length} {t("vocabulary")}
            </span>
            <span className="text-xs text-gold-500 font-medium">
              +{lesson.xpReward} XP
            </span>
          </div>
        )}
      </div>

      {/* Status badge */}
      <div className="flex-shrink-0">
        {isLocked ? (
          <span className="text-xs text-gray-400 font-medium px-3 py-1 bg-gray-100 rounded-full">
            {t("locked")}
          </span>
        ) : isCompleted ? (
          <span className="text-xs text-green-600 font-medium px-3 py-1 bg-green-100 rounded-full">
            {t("completed")}
          </span>
        ) : (
          <span className="text-xs text-sakura-600 font-medium px-3 py-1 bg-sakura-100 rounded-full">
            {t("startLesson")}
          </span>
        )}
      </div>
    </motion.div>
  );

  if (isLocked) {
    return content;
  }

  return (
    <Link href={`/${locale}/lessons/${courseSlug}/${lesson.id}`}>
      {content}
    </Link>
  );
}
