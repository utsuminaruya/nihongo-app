"use client";

import { useEffect, useState } from "react";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/client";
import { useUserStore } from "@/stores/user-store";
import type { User } from "@supabase/supabase-js";

export function useAuth() {
  const supabase = createClient();
  const { user: profile, setUser, setLoading } = useUserStore();
  const [authUser, setAuthUser] = useState<User | null>(null);

  useEffect(() => {
    // Supabaseが未設定の場合はスキップ
    if (!isSupabaseConfigured()) {
      setLoading(false);
      return;
    }

    // 初回の認証状態を取得
    const getSession = async () => {
      setLoading(true);
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        setAuthUser(user);

        if (user) {
          await fetchProfile(user.id);
        }
      } catch {
        // Supabase接続エラー（プレースホルダーまたはネットワーク）
      }
      setLoading(false);
    };

    getSession();

    // 認証状態の変化を監視
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      const user = session?.user ?? null;
      setAuthUser(user);

      if (user) {
        await fetchProfile(user.id);
      } else {
        setUser(null);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function fetchProfile(userId: string) {
    const { data } = await supabase
      .from("users")
      .select("*")
      .eq("id", userId)
      .single();

    if (data) {
      setUser({
        id: data.id,
        email: data.email,
        name: data.name,
        nativeLanguage: data.native_language,
        currentLevel: data.current_level,
        targetLevel: data.target_level,
        subscriptionTier: data.subscription_tier,
        avatarUrl: data.avatar_url,
        timezone: data.timezone,
      });
    }
  }

  async function signInWithEmail(email: string, password: string) {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return { error };
  }

  async function signUpWithEmail(email: string, password: string) {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });
    return { error };
  }

  async function signInWithGoogle() {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
    return { error };
  }

  async function signOut() {
    await supabase.auth.signOut();
    setUser(null);
  }

  return {
    authUser,
    profile,
    isLoading: useUserStore((s) => s.isLoading),
    signInWithEmail,
    signUpWithEmail,
    signInWithGoogle,
    signOut,
    fetchProfile,
  };
}
