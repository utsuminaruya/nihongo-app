'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Shield, Clock, FileText, Bell, Calendar, AlertTriangle } from 'lucide-react';

const translations: Record<string, Record<string, string>> = {
  ja: { title: 'ビザ管理', status: '在留資格', type: '技術・人文知識・国際業務', validUntil: '有効期限', daysLeft: '残り日数', days: '日', renewal: '更新手続き', timeline: 'タイムライン', documents: '必要書類', reminder: 'リマインダー', progress: '更新進捗', step1: '書類準備', step2: '申請書記入', step3: '入管提出', step4: '結果受取', warning: '更新期限が近づいています', checkDocs: '必要書類を確認' },
  en: { title: 'Visa Management', status: 'Residence Status', type: 'Engineer/Specialist', validUntil: 'Valid Until', daysLeft: 'Days Left', days: 'days', renewal: 'Renewal Process', timeline: 'Timeline', documents: 'Documents', reminder: 'Reminders', progress: 'Renewal Progress', step1: 'Prepare Documents', step2: 'Fill Application', step3: 'Submit to Immigration', step4: 'Receive Result', warning: 'Renewal deadline approaching', checkDocs: 'Check required documents' },
  vi: { title: 'Quản lý Visa', status: 'Tư cách lưu trú', type: 'Kỹ sư/Chuyên gia', validUntil: 'Hết hạn', daysLeft: 'Còn lại', days: 'ngày', renewal: 'Quy trình gia hạn', timeline: 'Timeline', documents: 'Tài liệu', reminder: 'Nhắc nhở', progress: 'Tiến độ gia hạn', step1: 'Chuẩn bị hồ sơ', step2: 'Điền đơn', step3: 'Nộp hồ sơ', step4: 'Nhận kết quả', warning: 'Sắp hết hạn', checkDocs: 'Kiểm tra tài liệu' },
  zh: { title: '签证管理', status: '在留资格', type: '技术·人文·国际业务', validUntil: '有效期至', daysLeft: '剩余天数', days: '天', renewal: '更新流程', timeline: '时间线', documents: '所需文件', reminder: '提醒', progress: '更新进度', step1: '准备材料', step2: '填写申请', step3: '提交入管', step4: '领取结果', warning: '更新期限临近', checkDocs: '检查所需文件' },
  id: { title: 'Manajemen Visa', status: 'Status Tinggal', type: 'Insinyur/Spesialis', validUntil: 'Berlaku Hingga', daysLeft: 'Sisa Hari', days: 'hari', renewal: 'Proses Perpanjangan', timeline: 'Timeline', documents: 'Dokumen', reminder: 'Pengingat', progress: 'Progres Perpanjangan', step1: 'Siapkan Dokumen', step2: 'Isi Formulir', step3: 'Kirim ke Imigrasi', step4: 'Terima Hasil', warning: 'Batas perpanjangan mendekat', checkDocs: 'Cek dokumen' },
  tl: { title: 'Pamamahala ng Visa', status: 'Status ng Paninirahan', type: 'Engineer/Specialist', validUntil: 'Valid Hanggang', daysLeft: 'Natitirang Araw', days: 'araw', renewal: 'Proseso ng Pag-renew', timeline: 'Timeline', documents: 'Mga Dokumento', reminder: 'Mga Paalala', progress: 'Progreso ng Pag-renew', step1: 'Ihanda ang Dokumento', step2: 'Punan ang Form', step3: 'I-submit sa Immigration', step4: 'Tanggapin ang Resulta', warning: 'Malapit na ang deadline', checkDocs: 'Suriin ang mga dokumento' },
  my: { title: 'ဗီဇာစီမံခန့်ခွဲမှု', status: 'နေထိုင်ခွင့်', type: 'အင်ဂျင်နီယာ', validUntil: 'သက်တမ်းကုန်ဆုံး', daysLeft: 'ကျန်ရက်', days: 'ရက်', renewal: 'သက်တမ်းတိုး', timeline: 'Timeline', documents: 'စာရွက်စာတမ်း', reminder: 'သတိပေးချက်', progress: 'တိုးတက်မှု', step1: 'စာရွက်ပြင်ဆင်', step2: 'လျှောက်လွှာဖြည့်', step3: 'တင်သွင်း', step4: 'ရလဒ်ရယူ', warning: 'သက်တမ်းနီးပါပြီ', checkDocs: 'စာရွက်စစ်ဆေး' },
};

function t(locale: string, key: string): string {
  return translations[locale]?.[key] || translations['en'][key] || key;
}

export default function VisaPage() {
  const params = useParams();
  const locale = (params?.locale as string) || 'ja';
  const daysLeft = 87;
  const totalDays = 365;
  const progress = ((totalDays - daysLeft) / totalDays) * 100;
  const circumference = 2 * Math.PI * 60;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  const menuItems = [
    { href: `/${locale}/visa/timeline`, icon: Clock, label: t(locale, 'timeline'), color: 'bg-blue-100 text-blue-600' },
    { href: `/${locale}/visa/documents`, icon: FileText, label: t(locale, 'documents'), color: 'bg-emerald-100 text-emerald-600' },
    { href: `/${locale}/visa/reminder`, icon: Bell, label: t(locale, 'reminder'), color: 'bg-amber-100 text-amber-600' },
  ];

  const steps = [
    { label: t(locale, 'step1'), done: true },
    { label: t(locale, 'step2'), done: true },
    { label: t(locale, 'step3'), done: false },
    { label: t(locale, 'step4'), done: false },
  ];

  return (
    <div className="pb-6 space-y-4">
      <h1 className="text-xl font-bold px-4 pt-4">{t(locale, 'title')}</h1>

      {/* Visa Status Card */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mx-4 bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-5 text-white">
        <div className="flex items-center gap-4">
          <div className="relative">
            <svg width="140" height="140" className="-rotate-90">
              <circle cx="70" cy="70" r="60" stroke="rgba(255,255,255,0.2)" strokeWidth="8" fill="none" />
              <circle cx="70" cy="70" r="60" stroke="white" strokeWidth="8" fill="none" strokeLinecap="round" strokeDasharray={circumference} strokeDashoffset={strokeDashoffset} />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-bold">{daysLeft}</span>
              <span className="text-xs opacity-80">{t(locale, 'days')}</span>
            </div>
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Shield className="w-5 h-5" />
              <span className="text-sm opacity-80">{t(locale, 'status')}</span>
            </div>
            <p className="font-bold text-lg mb-1">{t(locale, 'type')}</p>
            <div className="flex items-center gap-2 text-sm opacity-80">
              <Calendar className="w-4 h-4" />
              <span>{t(locale, 'validUntil')}: 2026-05-28</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Warning */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="mx-4 bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-medium text-amber-800">{t(locale, 'warning')}</p>
          <p className="text-xs text-amber-600 mt-1">{t(locale, 'checkDocs')}</p>
        </div>
      </motion.div>

      {/* Menu Items */}
      <div className="mx-4 grid grid-cols-3 gap-3">
        {menuItems.map((item, i) => (
          <Link key={i} href={item.href}>
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 * i }} className="bg-white rounded-xl p-4 text-center shadow-sm hover:shadow-md transition">
              <div className={`w-12 h-12 ${item.color} rounded-xl flex items-center justify-center mx-auto mb-2`}>
                <item.icon className="w-6 h-6" />
              </div>
              <p className="text-xs font-medium text-gray-700">{item.label}</p>
            </motion.div>
          </Link>
        ))}
      </div>

      {/* Renewal Progress */}
      <div className="mx-4 bg-white rounded-xl p-4 shadow-sm">
        <h3 className="font-semibold mb-4">{t(locale, 'progress')}</h3>
        <div className="space-y-3">
          {steps.map((s, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${s.done ? 'bg-emerald-500 text-white' : 'bg-gray-200 text-gray-400'}`}>
                {s.done ? <Check className="w-4 h-4" /> : <span className="text-xs font-bold">{i + 1}</span>}
              </div>
              <p className={`text-sm flex-1 ${s.done ? 'text-gray-700' : 'text-gray-400'}`}>{s.label}</p>
              {s.done && <span className="text-xs text-emerald-500 font-medium">✓</span>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Check({ className }: { className?: string }) {
  return <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>;
}
