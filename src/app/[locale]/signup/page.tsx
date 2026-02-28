"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { useAuth } from "@/hooks/useAuth";
import { Mail, Lock, Eye, EyeOff, Loader2, CheckCircle } from "lucide-react";
import toast from "react-hot-toast";

export default function SignupPage() {
  const t = useTranslations("common");
  const { locale } = useParams();
  const { signUpWithEmail, signInWithGoogle } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isConfirmSent, setIsConfirmSent] = useState(false);

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("パスワードが一致しません");
      return;
    }

    setIsLoading(true);
    const { error } = await signUpWithEmail(email, password);

    if (error) {
      toast.error(error.message);
    } else {
      setIsConfirmSent(true);
    }
    setIsLoading(false);
  }

  async function handleGoogleSignup() {
    setIsLoading(true);
    const { error } = await signInWithGoogle();
    if (error) {
      toast.error(error.message);
      setIsLoading(false);
    }
  }

  // 確認メール送信後の画面
  if (isConfirmSent) {
    return (
      <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md text-center">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-navy-800 mb-2">
            確認メールを送信しました
          </h2>
          <p className="text-gray-600 mb-6">
            <span className="font-medium">{email}</span>
            に確認メールを送信しました。メール内のリンクをクリックして登録を完了してください。
          </p>
          <Link
            href={`/${locale}/login`}
            className="text-sakura-500 font-medium hover:underline"
          >
            ログインページへ戻る
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* ヘッダー */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-navy-800 mb-2">
            {t("signup")}
          </h1>
          <p className="text-gray-500">NihonGO! で日本語学習を始めよう</p>
        </div>

        {/* Googleサインアップ */}
        <button
          onClick={handleGoogleSignup}
          disabled={isLoading}
          className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-gray-300 rounded-xl text-sm font-medium text-navy-800 hover:bg-gray-50 transition-colors disabled:opacity-50"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
              fill="#4285F4"
            />
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34A853"
            />
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              fill="#FBBC05"
            />
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              fill="#EA4335"
            />
          </svg>
          Google でサインアップ
        </button>

        {/* 区切り線 */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-white px-4 text-gray-400">or</span>
          </div>
        </div>

        {/* メールサインアップフォーム */}
        <form onSubmit={handleSignup} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-navy-800 mb-1"
            >
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sakura-500 focus:border-transparent"
                placeholder="you@example.com"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-navy-800 mb-1"
            >
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sakura-500 focus:border-transparent"
                placeholder="6文字以上"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                aria-label="Toggle password visibility"
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-navy-800 mb-1"
            >
              Confirm Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                id="confirmPassword"
                type={showPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                minLength={6}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sakura-500 focus:border-transparent"
                placeholder="パスワードを再入力"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 bg-sakura-500 text-white font-semibold rounded-xl hover:bg-sakura-600 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
            {t("signup")}
          </button>
        </form>

        {/* ログインリンク */}
        <p className="mt-6 text-center text-sm text-gray-500">
          既にアカウントをお持ちの方は{" "}
          <Link
            href={`/${locale}/login`}
            className="text-sakura-500 font-medium hover:underline"
          >
            {t("login")}
          </Link>
        </p>
      </div>
    </div>
  );
}
