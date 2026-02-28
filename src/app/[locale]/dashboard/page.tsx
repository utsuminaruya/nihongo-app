"use client";

import { useTranslations } from "next-intl";
import StatsOverview from "@/components/dashboard/StatsOverview";
import WeeklyChart from "@/components/dashboard/WeeklyChart";
import ProgressBars from "@/components/dashboard/ProgressBars";
import RecommendedLessons from "@/components/dashboard/RecommendedLessons";
import RecentActivity from "@/components/dashboard/RecentActivity";

export default function DashboardPage() {
  const t = useTranslations("dashboard");

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Header greeting */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-navy-800">
            {t("todayGoal")} 🎯
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            3 / 5 {t("lessonsCompleted")} &bull; 45 {t("minutesStudied")}
          </p>
        </div>

        {/* Stats cards */}
        <StatsOverview />

        {/* Main content grid */}
        <div className="mt-6 sm:mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left column: Chart + Progress */}
          <div className="lg:col-span-2 space-y-6">
            <WeeklyChart />
            <RecommendedLessons />
          </div>

          {/* Right column: Progress bars + Recent activity */}
          <div className="space-y-6">
            <ProgressBars />
            <RecentActivity />
          </div>
        </div>
      </div>
    </div>
  );
}
