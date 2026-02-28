"use client";

import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, BookOpen } from "lucide-react";
import { getCourseBySlug } from "@/lib/lesson-data";
import LessonCard from "@/components/lesson/LessonCard";

export default function LevelPage() {
  const t = useTranslations("lessons");
  const params = useParams();
  const locale = params.locale as string;
  const level = params.level as string;
  const course = getCourseBySlug(level);

  // Demo: first 3 lessons unlocked, first 2 completed for JLPT N5
  const getUnlockedCount = (slug: string) => {
    const map: Record<string, number> = {
      "jlpt-n5": 4,
      "jlpt-n4": 2,
      "kaigo-basics": 1,
      "business": 1,
      "daily-life": 3,
    };
    return map[slug] || 1;
  };

  const getCompletedCount = (slug: string) => {
    const map: Record<string, number> = {
      "jlpt-n5": 3,
      "jlpt-n4": 1,
      "kaigo-basics": 0,
      "business": 0,
      "daily-life": 2,
    };
    return map[slug] || 0;
  };

  if (!course) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
        <h1 className="text-2xl font-bold text-navy-800">Course not found</h1>
        <Link
          href={`/${locale}/lessons`}
          className="text-sakura-500 hover:underline mt-4 inline-block"
        >
          {t("backToCourses")}
        </Link>
      </div>
    );
  }

  const unlockedCount = getUnlockedCount(course.slug);
  const completedCount = getCompletedCount(course.slug);

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back button */}
      <Link
        href={`/${locale}/lessons`}
        className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-sakura-500 transition-colors mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        {t("backToCourses")}
      </Link>

      {/* Course header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-sakura-100 rounded-xl flex items-center justify-center">
            <BookOpen className="w-6 h-6 text-sakura-500" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-navy-800">
              {t(course.titleKey)}
            </h1>
            <p className="text-sm text-gray-500">
              {course.descriptionEn} &middot;{" "}
              {t("lessonsCount", { count: course.lessonsCount })}
            </p>
          </div>
        </div>

        {/* Progress overview */}
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="flex justify-between text-sm text-gray-500 mb-2">
            <span>
              {completedCount}/{course.lessonsCount} {t("completed").toLowerCase()}
            </span>
            <span>
              {Math.round((completedCount / course.lessonsCount) * 100)}%
            </span>
          </div>
          <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-sakura-400 to-sakura-600 rounded-full"
              initial={{ width: 0 }}
              animate={{
                width: `${(completedCount / course.lessonsCount) * 100}%`,
              }}
              transition={{ duration: 0.8, delay: 0.3 }}
            />
          </div>
        </div>
      </motion.div>

      {/* Lesson list */}
      <div className="space-y-3">
        {course.lessons.map((lesson, index) => (
          <LessonCard
            key={lesson.id}
            lesson={lesson}
            courseSlug={course.slug}
            locale={locale}
            index={index}
            isLocked={index >= unlockedCount}
            isCompleted={index < completedCount}
          />
        ))}
      </div>
    </div>
  );
}
