"use client";

import { useTranslations } from "next-intl";
import {
  BookOpen,
  MessageSquare,
  Award,
  PenTool,
  CheckCircle2,
} from "lucide-react";

interface Activity {
  id: string;
  type: "lesson" | "ai_chat" | "achievement" | "quiz" | "review";
  title: string;
  description: string;
  time: string;
  xp: number;
}

const recentActivities: Activity[] = [
  {
    id: "1",
    type: "lesson",
    title: "Te-form Practice",
    description: "Completed lesson 12 of N4 Grammar",
    time: "2h ago",
    xp: 50,
  },
  {
    id: "2",
    type: "ai_chat",
    title: "Hospital Scenario",
    description: "15 min conversation with AI Tutor",
    time: "4h ago",
    xp: 30,
  },
  {
    id: "3",
    type: "achievement",
    title: "Week Warrior",
    description: "Studied 7 days in a row!",
    time: "1d ago",
    xp: 100,
  },
  {
    id: "4",
    type: "quiz",
    title: "Kanji Quiz N5",
    description: "Score: 92% (23/25 correct)",
    time: "1d ago",
    xp: 45,
  },
  {
    id: "5",
    type: "review",
    title: "Vocabulary Review",
    description: "Reviewed 30 flashcards",
    time: "2d ago",
    xp: 20,
  },
];

const activityIcons: Record<Activity["type"], React.ElementType> = {
  lesson: BookOpen,
  ai_chat: MessageSquare,
  achievement: Award,
  quiz: PenTool,
  review: CheckCircle2,
};

const activityColors: Record<Activity["type"], string> = {
  lesson: "bg-blue-100 text-blue-600",
  ai_chat: "bg-purple-100 text-purple-600",
  achievement: "bg-gold-100 text-gold-700",
  quiz: "bg-emerald-100 text-emerald-600",
  review: "bg-gray-100 text-gray-600",
};

export default function RecentActivity() {
  const t = useTranslations("dashboard");

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-4 sm:p-6">
      <h2 className="text-lg font-bold text-navy-800 mb-4">
        {t("recentActivity")}
      </h2>
      <div className="space-y-1">
        {recentActivities.map((activity, index) => {
          const Icon = activityIcons[activity.type];
          const colorClass = activityColors[activity.type];
          return (
            <div
              key={activity.id}
              className="flex items-start gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors"
            >
              <div
                className={`flex-shrink-0 w-9 h-9 rounded-lg flex items-center justify-center ${colorClass}`}
              >
                <Icon className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-sm font-semibold text-navy-800 truncate">
                    {activity.title}
                  </h3>
                  <span className="flex-shrink-0 text-xs font-medium text-gold-500">
                    +{activity.xp} XP
                  </span>
                </div>
                <p className="text-xs text-gray-400 mt-0.5 truncate">
                  {activity.description}
                </p>
                <p className="text-[10px] text-gray-300 mt-1">
                  {activity.time}
                </p>
              </div>
              {index < recentActivities.length - 1 && (
                <div className="absolute left-[34px] top-[52px] w-px h-4 bg-gray-100" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
