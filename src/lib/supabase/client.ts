import { createBrowserClient } from "@supabase/ssr";

export function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  // プレースホルダーの場合でもクライアントを作成（リクエスト時にエラーになるが初期化は可能）
  return createBrowserClient(
    supabaseUrl || "https://placeholder.supabase.co",
    supabaseKey || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.placeholder"
  );
}

/**
 * Supabaseの環境変数が正しく設定されているかチェック
 */
export function isSupabaseConfigured(): boolean {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  return !!url && !url.includes("placeholder");
}
