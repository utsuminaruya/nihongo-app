"use client";

import { useTranslations } from "next-intl";
import { Flame, Zap, Trophy, BookOpen } from "lucide-react";

const stats = [
  {
    key: "totalXp" as const,
    value: "2,450",
    icon: Zap,
    color: "text-gold-400",
    bgColor: "bg-gold-50",
    borderColor: "border-gold-200",
  },
  {
    key: "streak" as const,
    value: "12",
    icon: Flame,
    color: "text-orange-500",
    bgColor: "bg-orange-50",
    borderColor: "border-orange-200",
  },
  {
    key: "currentLevel" as const,
    value: "N4",
    icon: Trophy,
    color: "text-sakura-500",
    bgColor: "bg-sakura-50",
    borderColor: "border-sakura-200",
  },
  {
    key: "lessonsCompleted" as const,
    value: "3 / 5",
    icon: BookOpen,
    color: "text-emerald-500",
    bgColor: "bg-emerald-50",
    borderColor: "border-emerald-200",
  },
];

export default function StatsOverview() {
  const t = useTranslations("dashboard");

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <div
            key={stat.key}
            className={`relative overflow-hidden rounded-2xl border ${stat.borderColor} ${stat.bgColor} p-4 sm:p-6 transition-transform hover:scale-[1.02]`}
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs sm:text-sm font-medium text-gray-500">
                  {t(stat.key)}
                </p>
                <p className="mt-1 text-2xl sm:text-3xl font-bold text-navy-800">
                  {stat.value}
                </p>
              </div>
              <div
                className={`flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-xl ${stat.bgColor}`}
              >
                <Icon className={`w-5 h-5 sm:w-6 sm:h-6 ${stat.color}`} />
              </div>
            </div>
            {stat.key === "streak" && (
              <div className="mt-2 flex items-center gap-1">
                {[...Array(7)].map((_, i) => (
                  <div
                    key={i}
                    className={`w-3 h-3 sm:w-4 sm:h-4 rounded-full ${
                      i < 5
                        ? "bg-orange-400"
                        : "bg-orange-200"
                    }`}
                  />
                ))}
              </div>
            )}
            {stat.key === "lessonsCompleted" && (
              <div className="mt-2">
                <div className="w-full h-2 bg-emerald-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-emerald-500 rounded-full transition-all duration-500"
                    style={{ width: "60%" }}
                  />
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
