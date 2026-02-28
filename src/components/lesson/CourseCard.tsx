"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { BookOpen, Heart, Briefcase, Coffee, ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import type { Course } from "@/lib/lesson-data";

interface CourseCardProps {
  course: Course;
  locale: string;
  index: number;
  completedLessons?: number;
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  BookOpen,
  Heart,
  Briefcase,
  Coffee,
};

const colorMap: Record<string, { bg: string; border: string; icon: string; badge: string; progress: string }> = {
  sakura: {
    bg: "bg-sakura-50",
    border: "border-sakura-200",
    icon: "bg-sakura-500",
    badge: "bg-sakura-100 text-sakura-700",
    progress: "bg-sakura-500",
  },
  navy: {
    bg: "bg-navy-50",
    border: "border-navy-200",
    icon: "bg-navy-600",
    badge: "bg-navy-100 text-navy-700",
    progress: "bg-navy-600",
  },
  rose: {
    bg: "bg-rose-50",
    border: "border-rose-200",
    icon: "bg-rose-500",
    badge: "bg-rose-100 text-rose-700",
    progress: "bg-rose-500",
  },
  gold: {
    bg: "bg-gold-50",
    border: "border-gold-200",
    icon: "bg-gold-500",
    badge: "bg-gold-100 text-gold-700",
    progress: "bg-gold-500",
  },
};

export default function CourseCard({ course, locale, index, completedLessons = 0 }: CourseCardProps) {
  const t = useTranslations("lessons");
  const IconComponent = iconMap[course.icon] || BookOpen;
  const colors = colorMap[course.color] || colorMap.sakura;
  const progressPercent = Math.round((completedLessons / course.lessonsCount) * 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
    >
      <Link href={`/${locale}/lessons/${course.slug}`}>
        <div
          className={`group relative overflow-hidden rounded-2xl border ${colors.border} ${colors.bg} p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer`}
        >
          {/* Icon */}
          <div
            className={`w-14 h-14 ${colors.icon} rounded-xl flex items-center justify-center mb-4 shadow-md group-hover:scale-110 transition-transform`}
          >
            <IconComponent className="w-7 h-7 text-white" />
          </div>

          {/* Title */}
          <h3 className="text-lg font-bold text-navy-800 mb-1">
            {t(course.titleKey)}
          </h3>
          <p className="text-sm text-gray-500 mb-1">
            {course.descriptionEn}
          </p>

          {/* Lesson count badge */}
          <span
            className={`inline-block text-xs font-medium px-2.5 py-1 rounded-full ${colors.badge} mb-4`}
          >
            {t("lessonsCount", { count: course.lessonsCount })}
          </span>

          {/* Progress bar */}
          <div className="mt-2">
            <div className="flex justify-between text-xs text-gray-500 mb-1">
              <span>
                {completedLessons}/{course.lessonsCount}
              </span>
              <span>{progressPercent}%</span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <motion.div
                className={`h-full ${colors.progress} rounded-full`}
                initial={{ width: 0 }}
                animate={{ width: `${progressPercent}%` }}
                transition={{ delay: index * 0.1 + 0.3, duration: 0.8, ease: "easeOut" }}
              />
            </div>
          </div>

          {/* Arrow indicator */}
          <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
            <ArrowRight className="w-5 h-5 text-gray-400" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
