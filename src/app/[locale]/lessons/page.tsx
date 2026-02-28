"use client";

import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { BookOpen } from "lucide-react";
import { courses } from "@/lib/lesson-data";
import CourseCard from "@/components/lesson/CourseCard";

export default function LessonsPage() {
  const t = useTranslations("lessons");
  const params = useParams();
  const locale = params.locale as string;

  // Mock completed lessons per course (demo purposes)
  const completedMap: Record<string, number> = {
    "jlpt-n5": 3,
    "jlpt-n4": 1,
    "kaigo-basics": 0,
    "business": 0,
    "daily-life": 2,
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 bg-sakura-100 rounded-xl flex items-center justify-center">
            <BookOpen className="w-5 h-5 text-sakura-500" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-navy-800">
              {t("allCourses")}
            </h1>
            <p className="text-sm text-gray-500">
              {courses.length} {t("courses").toLowerCase()}
            </p>
          </div>
        </div>
      </div>

      {/* Course grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course, index) => (
          <CourseCard
            key={course.id}
            course={course}
            locale={locale}
            index={index}
            completedLessons={completedMap[course.id] || 0}
          />
        ))}
      </div>
    </div>
  );
}
