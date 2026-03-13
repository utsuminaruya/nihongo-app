-- きこえる介護日本語 データベーススキーマ

-- ユーザーテーブル
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  native_language TEXT DEFAULT 'vi',
  created_at TIMESTAMP DEFAULT NOW()
);

-- カテゴリテーブル
CREATE TABLE categories (
  id SERIAL PRIMARY KEY,
  name_ja TEXT NOT NULL,
  name_en TEXT NOT NULL,
  name_vi TEXT,
  type TEXT NOT NULL,
  description TEXT,
  icon TEXT,
  display_order INT
);

-- 単語テーブル
CREATE TABLE words (
  id SERIAL PRIMARY KEY,
  category_id INT REFERENCES categories(id),
  word_ja TEXT NOT NULL,
  reading TEXT NOT NULL,
  meaning_ja TEXT NOT NULL,
  meaning_vi TEXT,
  meaning_en TEXT,
  scene TEXT,
  example_sentence TEXT,
  audio_url_standard TEXT,
  audio_url_fast TEXT,
  audio_url_elderly TEXT,
  difficulty INT DEFAULT 1,
  display_order INT
);

-- 文脈依存語の意味パターン（タイプD専用）
CREATE TABLE context_patterns (
  id SERIAL PRIMARY KEY,
  word_id INT REFERENCES words(id),
  pattern_name TEXT NOT NULL,
  scene TEXT NOT NULL,
  meaning TEXT NOT NULL,
  voice_tone TEXT,
  audio_url TEXT,
  display_order INT
);

-- 学習進捗テーブル
CREATE TABLE user_progress (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  word_id INT REFERENCES words(id),
  status TEXT DEFAULT 'not_started',
  correct_count INT DEFAULT 0,
  incorrect_count INT DEFAULT 0,
  last_studied_at TIMESTAMP,
  UNIQUE(user_id, word_id)
);

-- クイズ結果テーブル
CREATE TABLE quiz_results (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  word_id INT REFERENCES words(id),
  is_correct BOOLEAN,
  answered_at TIMESTAMP DEFAULT NOW()
);
