"use client";

import { useTranslations } from "next-intl";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

const weeklyData = [
  { day: "Mon", minutes: 45, xp: 120 },
  { day: "Tue", minutes: 30, xp: 80 },
  { day: "Wed", minutes: 60, xp: 150 },
  { day: "Thu", minutes: 25, xp: 65 },
  { day: "Fri", minutes: 50, xp: 130 },
  { day: "Sat", minutes: 75, xp: 200 },
  { day: "Sun", minutes: 40, xp: 100 },
];

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    value: number;
    dataKey: string;
  }>;
  label?: string;
  minutesLabel: string;
}

function CustomTooltip({ active, payload, label, minutesLabel }: CustomTooltipProps) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-navy-800 text-white text-sm rounded-lg px-3 py-2 shadow-lg">
        <p className="font-medium">{label}</p>
        <p className="text-sakura-300">
          {payload[0].value} {minutesLabel}
        </p>
        <p className="text-gold-300">{payload[1]?.value ?? 0} XP</p>
      </div>
    );
  }
  return null;
}

export default function WeeklyChart() {
  const t = useTranslations("dashboard");

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-4 sm:p-6">
      <h2 className="text-lg font-bold text-navy-800 mb-4">
        {t("weeklyProgress")}
      </h2>
      <div className="w-full h-64 sm:h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={weeklyData}
            margin={{ top: 5, right: 5, left: -20, bottom: 5 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#e5e7eb"
              vertical={false}
            />
            <XAxis
              dataKey="day"
              tick={{ fontSize: 12, fill: "#6b7280" }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 12, fill: "#6b7280" }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              content={<CustomTooltip minutesLabel={t("minutes")} />}
              cursor={{ fill: "rgba(231, 72, 96, 0.05)" }}
            />
            <Bar
              dataKey="minutes"
              fill="#E74860"
              radius={[6, 6, 0, 0]}
              barSize={20}
            />
            <Bar
              dataKey="xp"
              fill="#FFD700"
              radius={[6, 6, 0, 0]}
              barSize={20}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-3 flex items-center justify-center gap-6 text-sm text-gray-500">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-sm bg-sakura-500" />
          <span>{t("minutesStudied")}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-sm bg-gold-400" />
          <span>XP</span>
        </div>
      </div>
    </div>
  );
}
