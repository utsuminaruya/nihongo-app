"use client";

import { useTranslations } from "next-intl";
import { BookOpen, Clock, Star, ChevronRight } from "lucide-react";

interface Lesson {
  id: string;
  title: string;
  level: string;
  duration: number;
  xp: number;
  progress: number;
  category: string;
  emoji: string;
}

const recommendedLessons: Lesson[] = [
  {
    id: "1",
    title: "Greetings & Self-Introduction",
    level: "N5",
    duration: 15,
    xp: 50,
    progress: 60,
    category: "Grammar",
    emoji: "👋",
  },
  {
    id: "2",
    title: "Hospital Vocabulary",
    level: "N4",
    duration: 20,
    xp: 75,
    progress: 0,
    category: "Vocabulary",
    emoji: "🏥",
  },
  {
    id: "3",
    title: "Te-form Conjugation",
    level: "N4",
    duration: 25,
    xp: 80,
    progress: 0,
    category: "Grammar",
    emoji: "📝",
  },
  {
    id: "4",
    title: "Daily Care Expressions",
    level: "N4",
    duration: 15,
    xp: 60,
    progress: 30,
    category: "Kaigo",
    emoji: "🤝",
  },
];

export default function RecommendedLessons() {
  const t = useTranslations("dashboard");

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-4 sm:p-6">
      <h2 className="text-lg font-bold text-navy-800 mb-4">
        {t("recommendedLessons")}
      </h2>
      <div className="space-y-3">
        {recommendedLessons.map((lesson) => (
          <div
            key={lesson.id}
            className="group flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl border border-gray-100 hover:border-sakura-200 hover:bg-sakura-50/30 transition-all cursor-pointer"
          >
            <div className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center bg-gray-50 rounded-xl text-2xl group-hover:bg-white transition-colors">
              {lesson.emoji}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold bg-navy-800 text-white">
                  {lesson.level}
                </span>
                <span className="text-[10px] sm:text-xs text-gray-400 font-medium uppercase">
                  {lesson.category}
                </span>
              </div>
              <h3 className="text-sm font-semibold text-navy-800 truncate">
                {lesson.title}
              </h3>
              <div className="flex items-center gap-3 mt-1 text-xs text-gray-400">
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {lesson.duration} {t("minutes")}
                </span>
                <span className="flex items-center gap-1">
                  <Star className="w-3 h-3 text-gold-400" />
                  {lesson.xp} XP
                </span>
              </div>
              {lesson.progress > 0 && (
                <div className="mt-2 w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-sakura-500 rounded-full"
                    style={{ width: `${lesson.progress}%` }}
                  />
                </div>
              )}
            </div>

            <div className="flex-shrink-0">
              <button className="flex items-center gap-1 px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors bg-sakura-500 text-white hover:bg-sakura-600">
                {lesson.progress > 0 ? (
                  <>
                    <BookOpen className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">
                      {t("continueLesson")}
                    </span>
                  </>
                ) : (
                  <>
                    <ChevronRight className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">
                      {t("startLesson")}
                    </span>
                  </>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
