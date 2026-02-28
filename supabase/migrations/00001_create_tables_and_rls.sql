-- ============================================================
-- NihonGO! データベーススキーマ + Row Level Security (RLS)
-- ============================================================

-- ENUM型の定義
CREATE TYPE jlpt_level AS ENUM ('N5', 'N4', 'N3', 'N2', 'N1');
CREATE TYPE subscription_tier AS ENUM ('FREE', 'BASIC', 'PRO', 'PREMIUM');
CREATE TYPE course_category AS ENUM ('JLPT_GENERAL', 'KAIGO', 'KANGO', 'BUSINESS', 'DAILY_LIFE');
CREATE TYPE quiz_type AS ENUM ('MULTIPLE_CHOICE', 'FILL_BLANK', 'LISTENING', 'READING', 'KANJI_READING', 'KANJI_WRITING', 'GRAMMAR', 'ESSAY');
CREATE TYPE progress_status AS ENUM ('NOT_STARTED', 'IN_PROGRESS', 'COMPLETED', 'REVIEW');

-- ============ ユーザーテーブル ============
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  native_language TEXT DEFAULT 'vi',
  current_level jlpt_level DEFAULT 'N5',
  target_level jlpt_level DEFAULT 'N3',
  subscription_tier subscription_tier DEFAULT 'FREE',
  stripe_customer_id TEXT UNIQUE,
  avatar_url TEXT,
  timezone TEXT DEFAULT 'Asia/Tokyo',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- ユーザーは自分のデータのみ参照・更新可能
CREATE POLICY "users_select_own" ON users
  FOR SELECT USING (auth.uid() = id);
CREATE POLICY "users_insert_own" ON users
  FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "users_update_own" ON users
  FOR UPDATE USING (auth.uid() = id);

-- ============ コーステーブル ============
CREATE TABLE courses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title JSONB NOT NULL,
  description JSONB NOT NULL,
  level jlpt_level NOT NULL,
  category course_category NOT NULL,
  "order" INT NOT NULL,
  is_published BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE courses ENABLE ROW LEVEL SECURITY;

-- 公開コースは全ユーザーが閲覧可能
CREATE POLICY "courses_select_published" ON courses
  FOR SELECT USING (is_published = true);

-- ============ レッスンテーブル ============
CREATE TABLE lessons (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id UUID NOT NULL REFERENCES courses(id),
  title JSONB NOT NULL,
  content JSONB NOT NULL,
  grammar JSONB,
  vocabulary JSONB,
  audio_url TEXT,
  "order" INT NOT NULL,
  duration INT DEFAULT 15,
  xp_reward INT DEFAULT 10,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE lessons ENABLE ROW LEVEL SECURITY;

-- レッスンは公開コースに属する場合のみ閲覧可能
CREATE POLICY "lessons_select_published" ON lessons
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM courses WHERE courses.id = lessons.course_id AND courses.is_published = true
    )
  );

-- ============ クイズテーブル ============
CREATE TABLE quizzes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lesson_id UUID REFERENCES lessons(id),
  level jlpt_level NOT NULL,
  type quiz_type NOT NULL,
  question JSONB NOT NULL,
  options JSONB,
  answer TEXT NOT NULL,
  explanation JSONB NOT NULL,
  audio_url TEXT,
  image_url TEXT,
  difficulty INT DEFAULT 1,
  tags TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE quizzes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "quizzes_select_all" ON quizzes
  FOR SELECT USING (true);

-- ============ 学習進捗テーブル ============
CREATE TABLE lesson_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id),
  lesson_id UUID NOT NULL REFERENCES lessons(id),
  status progress_status DEFAULT 'NOT_STARTED',
  score INT,
  xp_earned INT DEFAULT 0,
  time_spent INT DEFAULT 0,
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id, lesson_id)
);

ALTER TABLE lesson_progress ENABLE ROW LEVEL SECURITY;

CREATE POLICY "lesson_progress_select_own" ON lesson_progress
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "lesson_progress_insert_own" ON lesson_progress
  FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "lesson_progress_update_own" ON lesson_progress
  FOR UPDATE USING (auth.uid() = user_id);

-- ============ クイズ結果テーブル ============
CREATE TABLE quiz_results (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id),
  quiz_id UUID NOT NULL REFERENCES quizzes(id),
  is_correct BOOLEAN NOT NULL,
  user_answer TEXT NOT NULL,
  time_spent INT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE quiz_results ENABLE ROW LEVEL SECURITY;

CREATE POLICY "quiz_results_select_own" ON quiz_results
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "quiz_results_insert_own" ON quiz_results
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- ============ 学習ストリークテーブル ============
CREATE TABLE study_streaks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id),
  date DATE NOT NULL,
  minutes_studied INT DEFAULT 0,
  lessons_completed INT DEFAULT 0,
  xp_earned INT DEFAULT 0,
  UNIQUE(user_id, date)
);

ALTER TABLE study_streaks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "study_streaks_select_own" ON study_streaks
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "study_streaks_insert_own" ON study_streaks
  FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "study_streaks_update_own" ON study_streaks
  FOR UPDATE USING (auth.uid() = user_id);

-- ============ AIチューター会話テーブル ============
CREATE TABLE ai_conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id),
  topic TEXT,
  level jlpt_level NOT NULL,
  scenario TEXT,
  messages JSONB NOT NULL DEFAULT '[]',
  feedback JSONB,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE ai_conversations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "ai_conversations_select_own" ON ai_conversations
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "ai_conversations_insert_own" ON ai_conversations
  FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "ai_conversations_update_own" ON ai_conversations
  FOR UPDATE USING (auth.uid() = user_id);

-- ============ サブスクリプションテーブル ============
CREATE TABLE subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID UNIQUE NOT NULL REFERENCES users(id),
  stripe_subscription_id TEXT UNIQUE NOT NULL,
  tier subscription_tier NOT NULL,
  status TEXT NOT NULL,
  current_period_start TIMESTAMPTZ NOT NULL,
  current_period_end TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "subscriptions_select_own" ON subscriptions
  FOR SELECT USING (auth.uid() = user_id);

-- ============ updated_at 自動更新トリガー ============
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER users_updated_at
  BEFORE UPDATE ON users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER lesson_progress_updated_at
  BEFORE UPDATE ON lesson_progress
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER ai_conversations_updated_at
  BEFORE UPDATE ON ai_conversations
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER subscriptions_updated_at
  BEFORE UPDATE ON subscriptions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ============ 新規ユーザー自動作成トリガー ============
-- Supabase Authでユーザーが作成されたら、usersテーブルにも自動挿入
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, email)
  VALUES (NEW.id, NEW.email)
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();
