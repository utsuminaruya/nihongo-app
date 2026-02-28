"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import {
  MessageCircle,
  Hospital,
  Home,
  AlertTriangle,
  ClipboardList,
  MessagesSquare,
} from "lucide-react";

export interface Scenario {
  id: string;
  icon: React.ReactNode;
  titleKey: string;
  descKey: string;
}

const scenarios: Scenario[] = [
  {
    id: "free_talk",
    icon: <MessageCircle className="w-8 h-8" />,
    titleKey: "freeChat",
    descKey: "freeChatDesc",
  },
  {
    id: "hospital_reception",
    icon: <Hospital className="w-8 h-8" />,
    titleKey: "hospital",
    descKey: "hospitalDesc",
  },
  {
    id: "care_facility",
    icon: <Home className="w-8 h-8" />,
    titleKey: "nursingCare",
    descKey: "nursingCareDesc",
  },
  {
    id: "emergency_report",
    icon: <AlertTriangle className="w-8 h-8" />,
    titleKey: "emergency",
    descKey: "emergencyDesc",
  },
  {
    id: "handover",
    icon: <ClipboardList className="w-8 h-8" />,
    titleKey: "handover",
    descKey: "handoverDesc",
  },
  {
    id: "daily_conversation",
    icon: <MessagesSquare className="w-8 h-8" />,
    titleKey: "dailyChat",
    descKey: "dailyChatDesc",
  },
];

interface ScenarioSelectorProps {
  onSelect: (scenarioId: string) => void;
}

export default function ScenarioSelector({ onSelect }: ScenarioSelectorProps) {
  const t = useTranslations("aiTutor");

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-navy-800 mb-2">{t("title")}</h1>
        <p className="text-gray-600">{t("subtitle")}</p>
      </div>

      <h2 className="text-xl font-semibold text-navy-700 mb-6 text-center">
        {t("selectScenario")}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {scenarios.map((scenario, index) => (
          <motion.button
            key={scenario.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            onClick={() => onSelect(scenario.id)}
            className="group flex flex-col items-center gap-3 p-6 bg-white rounded-xl border-2 border-gray-100 hover:border-sakura-300 hover:shadow-lg transition-all duration-200 text-center"
          >
            <div className="p-3 rounded-full bg-sakura-50 text-sakura-500 group-hover:bg-sakura-100 transition-colors">
              {scenario.icon}
            </div>
            <div>
              <h3 className="font-semibold text-navy-800 mb-1">
                {t(scenario.titleKey)}
              </h3>
              <p className="text-sm text-gray-500">
                {t(scenario.descKey)}
              </p>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
