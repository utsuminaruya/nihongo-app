export type JlptLevel = "N5" | "N4" | "N3" | "N2" | "N1";

export type SubscriptionTier = "FREE" | "BASIC" | "PRO" | "PREMIUM";

export type CourseCategory =
  | "JLPT_GENERAL"
  | "KAIGO"
  | "KANGO"
  | "BUSINESS"
  | "DAILY_LIFE";

export type QuizType =
  | "MULTIPLE_CHOICE"
  | "FILL_BLANK"
  | "LISTENING"
  | "READING"
  | "KANJI_READING"
  | "KANJI_WRITING"
  | "GRAMMAR"
  | "ESSAY";

export type ProgressStatus =
  | "NOT_STARTED"
  | "IN_PROGRESS"
  | "COMPLETED"
  | "REVIEW";

export interface UserProfile {
  id: string;
  email: string;
  name: string | null;
  nativeLanguage: string;
  currentLevel: JlptLevel;
  targetLevel: JlptLevel;
  subscriptionTier: SubscriptionTier;
  avatarUrl: string | null;
  timezone: string;
}

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

export interface AiTutorSession {
  id: string;
  topic: string | null;
  level: JlptLevel;
  scenario: string | null;
  messages: ChatMessage[];
}

export interface LessonData {
  id: string;
  title: Record<string, string>;
  content: Record<string, unknown>;
  grammar: Record<string, unknown> | null;
  vocabulary: Record<string, unknown> | null;
  audioUrl: string | null;
  order: number;
  duration: number;
  xpReward: number;
}

export interface QuizQuestion {
  id: string;
  type: QuizType;
  question: Record<string, string>;
  options: string[] | null;
  answer: string;
  explanation: Record<string, string>;
  difficulty: number;
}
