'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Mail, Lock, User, Eye, EyeOff, Globe, ArrowRight, Check } from 'lucide-react';

const translations: Record<string, Record<string, string>> = {
  ja: { title: '新規登録', subtitle: 'MediLifeアカウントを作成', name: '名前', email: 'メールアドレス', password: 'パスワード', confirmPassword: 'パスワード確認', register: 'アカウント作成', or: 'または', google: 'Googleで登録', line: 'LINEで登録', hasAccount: 'すでにアカウントをお持ちの方', login: 'ログイン', agree: '利用規約に同意します', strength: 'パスワード強度', weak: '弱い', medium: '普通', strong: '強い' },
  en: { title: 'Create Account', subtitle: 'Join MediLife today', name: 'Full Name', email: 'Email Address', password: 'Password', confirmPassword: 'Confirm Password', register: 'Create Account', or: 'or', google: 'Sign up with Google', line: 'Sign up with LINE', hasAccount: 'Already have an account?', login: 'Sign In', agree: 'I agree to the Terms of Service', strength: 'Password strength', weak: 'Weak', medium: 'Medium', strong: 'Strong' },
  vi: { title: 'Đăng ký', subtitle: 'Tham gia MediLife', name: 'Họ tên', email: 'Email', password: 'Mật khẩu', confirmPassword: 'Xác nhận mật khẩu', register: 'Tạo tài khoản', or: 'hoặc', google: 'Đăng ký bằng Google', line: 'Đăng ký bằng LINE', hasAccount: 'Đã có tài khoản?', login: 'Đăng nhập', agree: 'Tôi đồng ý với Điều khoản', strength: 'Độ mạnh mật khẩu', weak: 'Yếu', medium: 'Trung bình', strong: 'Mạnh' },
  zh: { title: '注册', subtitle: '加入MediLife', name: '姓名', email: '邮箱', password: '密码', confirmPassword: '确认密码', register: '创建账号', or: '或', google: '使用Google注册', line: '使用LINE注册', hasAccount: '已有账号？', login: '登录', agree: '我同意服务条款', strength: '密码强度', weak: '弱', medium: '中', strong: '强' },
  id: { title: 'Daftar', subtitle: 'Bergabung dengan MediLife', name: 'Nama Lengkap', email: 'Email', password: 'Kata Sandi', confirmPassword: 'Konfirmasi Kata Sandi', register: 'Buat Akun', or: 'atau', google: 'Daftar dengan Google', line: 'Daftar dengan LINE', hasAccount: 'Sudah punya akun?', login: 'Masuk', agree: 'Saya setuju dengan Ketentuan', strength: 'Kekuatan kata sandi', weak: 'Lemah', medium: 'Sedang', strong: 'Kuat' },
  tl: { title: 'Mag-sign Up', subtitle: 'Sumali sa MediLife', name: 'Buong Pangalan', email: 'Email', password: 'Password', confirmPassword: 'Kumpirmahin ang Password', register: 'Gumawa ng Account', or: 'o', google: 'Mag-sign up sa Google', line: 'Mag-sign up sa LINE', hasAccount: 'May account na?', login: 'Mag-sign In', agree: 'Sumasang-ayon ako sa Terms', strength: 'Lakas ng password', weak: 'Mahina', medium: 'Katamtaman', strong: 'Malakas' },
  my: { title: 'စာရင်းသွင်းရန်', subtitle: 'MediLifeသို့ပါဝင်ပါ', name: 'အမည်', email: 'အီးမေးလ်', password: 'စကားဝှက်', confirmPassword: 'စကားဝှက်အတည်ပြု', register: 'အကောင့်ဖန်တီးရန်', or: 'သို့မဟုတ်', google: 'Googleဖြင့်စာရင်းသွင်း', line: 'LINEဖြင့်စာရင်းသွင်း', hasAccount: 'အကောင့်ရှိပြီးသားလား?', login: 'ဝင်ရောက်ရန်', agree: 'စည်းကမ်းများကိုလက်ခံပါသည်', strength: 'စကားဝှက်အားကောင်းမှု', weak: 'အားနည်း', medium: 'အလယ်အလတ်', strong: 'အားကောင်း' },
};

function t(locale: string, key: string): string {
  return translations[locale]?.[key] || translations['en'][key] || key;
}

function getPasswordStrength(pw: string): number {
  let s = 0;
  if (pw.length >= 8) s++;
  if (/[A-Z]/.test(pw)) s++;
  if (/[0-9]/.test(pw)) s++;
  if (/[^A-Za-z0-9]/.test(pw)) s++;
  return s;
}

export default function RegisterPage() {
  const params = useParams();
  const router = useRouter();
  const locale = (params?.locale as string) || 'ja';
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);

  const strength = getPasswordStrength(password);
  const strengthLabel = strength <= 1 ? t(locale, 'weak') : strength <= 2 ? t(locale, 'medium') : t(locale, 'strong');
  const strengthColor = strength <= 1 ? 'bg-red-500' : strength <= 2 ? 'bg-yellow-500' : 'bg-emerald-500';

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      router.push(`/${locale}/onboarding`);
    }, 1000);
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <div className="text-center mb-6">
        <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <Globe className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900">{t(locale, 'title')}</h1>
        <p className="text-gray-500 mt-1">{t(locale, 'subtitle')}</p>
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-6 space-y-4">
        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{t(locale, 'name')}</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input type="text" value={name} onChange={e => setName(e.target.value)} className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{t(locale, 'email')}</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition" placeholder="name@example.com" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{t(locale, 'password')}</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input type={showPassword ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} className="w-full pl-10 pr-12 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition" />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            {password && (
              <div className="mt-2">
                <div className="flex gap-1 mb-1">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className={`h-1 flex-1 rounded-full ${i <= strength ? strengthColor : 'bg-gray-200'}`} />
                  ))}
                </div>
                <p className="text-xs text-gray-500">{t(locale, 'strength')}: {strengthLabel}</p>
              </div>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{t(locale, 'confirmPassword')}</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition" />
            </div>
          </div>
          <label className="flex items-center gap-2 cursor-pointer">
            <div onClick={() => setAgreed(!agreed)} className={`w-5 h-5 rounded border-2 flex items-center justify-center transition ${agreed ? 'bg-blue-600 border-blue-600' : 'border-gray-300'}`}>
              {agreed && <Check className="w-3 h-3 text-white" />}
            </div>
            <span className="text-sm text-gray-600">{t(locale, 'agree')}</span>
          </label>
          <button type="submit" disabled={loading || !agreed} className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition flex items-center justify-center gap-2 disabled:opacity-60">
            {loading ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <>{t(locale, 'register')} <ArrowRight className="w-4 h-4" /></>}
          </button>
        </form>

        <div className="relative">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-200" /></div>
          <div className="relative flex justify-center text-sm"><span className="px-2 bg-white text-gray-500">{t(locale, 'or')}</span></div>
        </div>

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

      <p className="text-center mt-6 text-sm text-gray-500">
        {t(locale, 'hasAccount')}{' '}
        <Link href={`/${locale}/login`} className="text-blue-600 font-semibold hover:underline">{t(locale, 'login')}</Link>
      </p>
    </motion.div>
  );
}
