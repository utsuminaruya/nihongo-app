export const APP_NAME = "NihonGO!";
export const APP_DESCRIPTION =
  "AI-Powered Japanese Language Platform for Foreign Workers";
export const COMPANY_NAME = "Mediflow株式会社";

export const LINE_URLS = {
  employers: "https://lin.ee/R3ytJln",
  jobSeekers: "https://lin.ee/xUocVyI",
} as const;

export const JLPT_LEVELS = ["N5", "N4", "N3", "N2", "N1"] as const;
export type JlptLevel = (typeof JLPT_LEVELS)[number];

export const COURSE_CATEGORIES = [
  "JLPT_GENERAL",
  "KAIGO",
  "KANGO",
  "BUSINESS",
  "DAILY_LIFE",
] as const;

export const COURSE_CATEGORY_LABELS: Record<string, Record<string, string>> = {
  JLPT_GENERAL: { ja: "JLPT対策", en: "JLPT Prep" },
  KAIGO: { ja: "介護日本語", en: "Nursing Care" },
  KANGO: { ja: "看護日本語", en: "Nursing" },
  BUSINESS: { ja: "ビジネス日本語", en: "Business" },
  DAILY_LIFE: { ja: "生活日本語", en: "Daily Life" },
};

export const AI_TUTOR_SCENARIOS = [
  {
    id: "free_talk",
    label: { ja: "自由会話", en: "Free Talk" },
  },
  {
    id: "care_facility",
    label: { ja: "介護施設での会話", en: "Care Facility" },
  },
  {
    id: "hospital_reception",
    label: { ja: "病院での受付", en: "Hospital Reception" },
  },
  {
    id: "emergency_report",
    label: { ja: "緊急報告", en: "Emergency Report" },
  },
  {
    id: "handover",
    label: { ja: "申し送り", en: "Handover" },
  },
  {
    id: "daily_conversation",
    label: { ja: "日常会話", en: "Daily Conversation" },
  },
] as const;
