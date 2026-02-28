"use client";

import { useTranslations } from "next-intl";
import type { JlptLevel } from "@/types";

interface LevelProgress {
  level: JlptLevel;
  progress: number;
  totalLessons: number;
  completedLessons: number;
  color: string;
  bgColor: string;
}

const levelProgressData: LevelProgress[] = [
  {
    level: "N5",
    progress: 85,
    totalLessons: 40,
    completedLessons: 34,
    color: "bg-emerald-500",
    bgColor: "bg-emerald-100",
  },
  {
    level: "N4",
    progress: 42,
    totalLessons: 50,
    completedLessons: 21,
    color: "bg-blue-500",
    bgColor: "bg-blue-100",
  },
  {
    level: "N3",
    progress: 15,
    totalLessons: 60,
    completedLessons: 9,
    color: "bg-purple-500",
    bgColor: "bg-purple-100",
  },
  {
    level: "N2",
    progress: 0,
    totalLessons: 70,
    completedLessons: 0,
    color: "bg-orange-500",
    bgColor: "bg-orange-100",
  },
  {
    level: "N1",
    progress: 0,
    totalLessons: 80,
    completedLessons: 0,
    color: "bg-red-500",
    bgColor: "bg-red-100",
  },
];

export default function ProgressBars() {
  const t = useTranslations("dashboard");

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-4 sm:p-6">
      <h2 className="text-lg font-bold text-navy-800 mb-4">
        {t("jlptProgress")}
      </h2>
      <div className="space-y-4">
        {levelProgressData.map((item) => (
          <div key={item.level}>
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center gap-2">
                <span
                  className={`inline-flex items-center justify-center w-10 h-6 rounded-md text-xs font-bold text-white ${item.color}`}
                >
                  {item.level}
                </span>
                <span className="text-sm text-gray-600">
                  {item.completedLessons} / {item.totalLessons}
                </span>
              </div>
              <span className="text-sm font-semibold text-navy-800">
                {item.progress}%
              </span>
            </div>
            <div
              className={`w-full h-3 ${item.bgColor} rounded-full overflow-hidden`}
            >
              <div
                className={`h-full ${item.color} rounded-full transition-all duration-700 ease-out`}
                style={{ width: `${item.progress}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
