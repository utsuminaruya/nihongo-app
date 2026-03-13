// カテゴリタイプ
export type CategoryType = 'A' | 'B' | 'C' | 'D';

// 単語
export interface Word {
  id: number;
  category_id: number;
  word_ja: string;
  reading: string;
  meaning_ja: string;
  meaning_vi?: string;
  meaning_en?: string;
  scene?: string;
  example_sentence?: string;
  audio_url_standard?: string;
  audio_url_fast?: string;
  audio_url_elderly?: string;
  difficulty: number;
  display_order: number;
}

// カテゴリ
export interface Category {
  id: number;
  name_ja: string;
  name_en: string;
  name_vi?: string;
  type: CategoryType;
  description?: string;
  icon?: string;
  display_order: number;
}

// 文脈パターン（タイプD用）
export interface ContextPattern {
  id: number;
  word_id: number;
  pattern_name: string;
  scene: string;
  meaning: string;
  voice_tone?: string;
  audio_url?: string;
  display_order: number;
}

// 学習進捗
export type ProgressStatus = 'not_started' | 'learning' | 'mastered';

export interface UserProgress {
  id: number;
  user_id: string;
  word_id: number;
  status: ProgressStatus;
  correct_count: number;
  incorrect_count: number;
  last_studied_at?: string;
}

// クイズ結果
export interface QuizResult {
  id: number;
  user_id: string;
  word_id: number;
  is_correct: boolean;
  answered_at: string;
}

// UI用拡張型
export interface WordWithCategory extends Word {
  category: Category;
}

export interface CategoryWithProgress extends Category {
  total_words: number;
  mastered_count: number;
  learning_count: number;
}

export interface WordWithProgress extends Word {
  progress?: UserProgress;
}

export interface WordWithPatterns extends Word {
  patterns: ContextPattern[];
}
