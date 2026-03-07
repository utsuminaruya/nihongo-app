// Supported UI/response languages
export type UILanguage = 'vi' | 'en' | 'tl' | 'id' | 'my' | 'ja';

// 8 categories
export type CategoryKey =
  | 'hospital'
  | 'government'
  | 'daily'
  | 'work'
  | 'care'
  | 'phone'
  | 'transport'
  | 'emergency';

export type JlptLevel = 'N5' | 'N4' | 'N3';

export interface UserConcern {
  original: string;
  japanese: string;
  detected_language: string;
}

export interface Phrase {
  japanese: string;
  furigana: string;
  translation: string;
  situation: string;
  politeness: 'casual' | 'polite' | 'formal';
}

export interface ConversationLine {
  speaker: 'you' | 'other';
  japanese: string;
  furigana: string;
  translation: string;
}

export interface Conversation {
  title: string;
  scene: string;
  lines: ConversationLine[];
}

export interface QuizItem {
  question: string;
  options: string[];
  correct_index: number;
  explanation: string;
}

export interface CueCard {
  japanese: string;
  furigana: string;
  context: string;
}

export interface GrammarPoint {
  pattern: string;
  explanation: string;
  examples: string[];
}

export interface AIResponse {
  user_concern: UserConcern;
  phrases: Phrase[];
  conversation: Conversation;
  quiz: QuizItem[];
  cue_cards: CueCard[];
  grammar_point: GrammarPoint;
  cultural_tip: string;
}

export interface HistoryEntry {
  id: string;
  timestamp: number;
  userInput: string;
  category: CategoryKey;
  language: UILanguage;
  response: AIResponse;
}
