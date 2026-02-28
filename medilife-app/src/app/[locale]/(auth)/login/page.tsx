'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, Globe, ArrowRight } from 'lucide-react';

const translations: Record<string, Record<string, string>> = {
  ja: { title: 'おかえりなさい', subtitle: 'MediLifeにログイン', email: 'メールアドレス', password: 'パスワード', login: 'ログイン', or: 'または', google: 'Googleでログイン', line: 'LINEでログイン', noAccount: 'アカウントをお持ちでない方', register: '新規登録', forgot: 'パスワードを忘れた方' },
  en: { title: 'Welcome Back', subtitle: 'Sign in to MediLife', email: 'Email Address', password: 'Password', login: 'Sign In', or: 'or', google: 'Continue with Google', line: 'Continue with LINE', noAccount: "Don't have an account?", register: 'Sign Up', forgot: 'Forgot password?' },
  vi: { title: 'Chào mừng trở lại', subtitle: 'Đăng nhập MediLife', email: 'Địa chỉ email', password: 'Mật khẩu', login: 'Đăng nhập', or: 'hoặc', google: 'Tiếp tục với Google', line: 'Tiếp tục với LINE', noAccount: 'Chưa có tài khoản?', register: 'Đăng ký', forgot: 'Quên mật khẩu?' },
  zh: { title: '欢迎回来', subtitle: '登录MediLife', email: '邮箱地址', password: '密码', login: '登录', or: '或', google: '使用Google登录', line: '使用LINE登录', noAccount: '还没有账号？', register: '注册', forgot: '忘记密码？' },
  id: { title: 'Selamat Datang Kembali', subtitle: 'Masuk ke MediLife', email: 'Alamat Email', password: 'Kata Sandi', login: 'Masuk', or: 'atau', google: 'Lanjutkan dengan Google', line: 'Lanjutkan dengan LINE', noAccount: 'Belum punya akun?', register: 'Daftar', forgot: 'Lupa kata sandi?' },
  tl: { title: 'Maligayang Pagbabalik', subtitle: 'Mag-sign in sa MediLife', email: 'Email Address', password: 'Password', login: 'Mag-sign In', or: 'o', google: 'Magpatuloy sa Google', line: 'Magpatuloy sa LINE', noAccount: 'Wala pang account?', register: 'Mag-sign Up', forgot: 'Nakalimutan ang password?' },
  my: { title: 'ပြန်လာတာကြိုဆိုပါတယ်', subtitle: 'MediLifeသို့ဝင်ရောက်ပါ', email: 'အီးမေးလ်', password: 'စကားဝှက်', login: 'ဝင်ရောက်ရန်', or: 'သို့မဟုတ်', google: 'Googleဖြင့်ဆက်လက်ပါ', line: 'LINEဖြင့်ဆက်လက်ပါ', noAccount: 'အကောင့်မရှိသေးပါသလား?', register: 'စာရင်းသွင်းရန်', forgot: 'စကားဝှက်မေ့နေပါသလား?' },
};

function t(locale: string, key: string): string {
  return translations[locale]?.[key] || translations['en'][key] || key;
}

export default function LoginPage() {
  const params = useParams();
  const router = useRouter();
  const locale = (params?.locale as string) || 'ja';
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Demo: skip actual auth
    setTimeout(() => {
      router.push(`/${locale}/home`);
    }, 1000);
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      {/* Logo */}
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <Globe className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900">{t(locale, 'title')}</h1>
        <p className="text-gray-500 mt-1">{t(locale, 'subtitle')}</p>
      </div>

      {/* Login Form */}
      <div className="bg-white rounded-2xl shadow-lg p-6 space-y-4">
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{t(locale, 'email')}</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                placeholder="name@example.com"
              />
            </div>
          </div>
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="block text-sm font-medium text-gray-700">{t(locale, 'password')}</label>
              <button type="button" className="text-xs text-blue-600 hover:underline">{t(locale, 'forgot')}</button>
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full pl-10 pr-12 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition flex items-center justify-center gap-2 disabled:opacity-60"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>{t(locale, 'login')} <ArrowRight className="w-4 h-4" /></>
            )}
          </button>
        </form>

        <div className="relative">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-200" /></div>
          <div className="relative flex justify-center text-sm"><span className="px-2 bg-white text-gray-500">{t(locale, 'or')}</span></div>
        </div>

        {/* Social Login */}
        <div className="space-y-3">
          <button className="w-full border border-gray-200 py-3 rounded-xl font-medium hover:bg-gray-50 transition flex items-center justify-center gap-3">
            <svg className="w-5 h-5" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" /><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" /><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" /><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" /></svg>
            {t(locale, 'google')}
          </button>
          <button className="w-full bg-[#06C755] text-white py-3 rounded-xl font-medium hover:bg-[#05b04d] transition flex items-center justify-center gap-3">
            <span className="text-lg font-bold">LINE</span>
            {t(locale, 'line')}
          </button>
        </div>
      </div>

      {/* Register Link */}
      <p className="text-center mt-6 text-sm text-gray-500">
        {t(locale, 'noAccount')}{' '}
        <Link href={`/${locale}/register`} className="text-blue-600 font-semibold hover:underline">{t(locale, 'register')}</Link>
      </p>
    </motion.div>
  );
}
