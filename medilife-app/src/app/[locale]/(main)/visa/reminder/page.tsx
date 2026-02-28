'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft, Bell, BellOff, Mail, MessageSquare, Smartphone, Calendar } from 'lucide-react';
import Link from 'next/link';

const translations: Record<string, Record<string, string>> = {
  ja: { title: 'リマインダー設定', back: '戻る', enabled: 'リマインダーON', disabled: 'リマインダーOFF', methods: '通知方法', push: 'プッシュ通知', email: 'メール通知', line: 'LINE通知', timing: '通知タイミング', days90: '90日前', days60: '60日前', days30: '30日前', days14: '14日前', days7: '7日前', day1: '前日', save: '設定を保存', saved: '保存しました' },
  en: { title: 'Reminder Settings', back: 'Back', enabled: 'Reminders ON', disabled: 'Reminders OFF', methods: 'Notification Methods', push: 'Push Notification', email: 'Email', line: 'LINE', timing: 'Notification Timing', days90: '90 days before', days60: '60 days before', days30: '30 days before', days14: '14 days before', days7: '7 days before', day1: '1 day before', save: 'Save Settings', saved: 'Saved' },
  vi: { title: 'Cài đặt nhắc nhở', back: 'Quay lại', enabled: 'Nhắc nhở BẬT', disabled: 'Nhắc nhở TẮT', methods: 'Phương thức thông báo', push: 'Push', email: 'Email', line: 'LINE', timing: 'Thời điểm thông báo', days90: 'Trước 90 ngày', days60: 'Trước 60 ngày', days30: 'Trước 30 ngày', days14: 'Trước 14 ngày', days7: 'Trước 7 ngày', day1: 'Trước 1 ngày', save: 'Lưu', saved: 'Đã lưu' },
  zh: { title: '提醒设置', back: '返回', enabled: '提醒已开启', disabled: '提醒已关闭', methods: '通知方式', push: '推送通知', email: '邮件', line: 'LINE', timing: '通知时间', days90: '90天前', days60: '60天前', days30: '30天前', days14: '14天前', days7: '7天前', day1: '1天前', save: '保存设置', saved: '已保存' },
  id: { title: 'Pengaturan Pengingat', back: 'Kembali', enabled: 'Pengingat AKTIF', disabled: 'Pengingat NONAKTIF', methods: 'Metode Notifikasi', push: 'Notifikasi Push', email: 'Email', line: 'LINE', timing: 'Waktu Notifikasi', days90: '90 hari sebelum', days60: '60 hari sebelum', days30: '30 hari sebelum', days14: '14 hari sebelum', days7: '7 hari sebelum', day1: '1 hari sebelum', save: 'Simpan', saved: 'Tersimpan' },
  tl: { title: 'Setting ng Paalala', back: 'Bumalik', enabled: 'Paalala BUKAS', disabled: 'Paalala SARADO', methods: 'Paraan ng Abiso', push: 'Push Notification', email: 'Email', line: 'LINE', timing: 'Oras ng Abiso', days90: '90 araw bago', days60: '60 araw bago', days30: '30 araw bago', days14: '14 araw bago', days7: '7 araw bago', day1: '1 araw bago', save: 'I-save', saved: 'Na-save' },
  my: { title: 'သတိပေးချက်', back: 'နောက်သို့', enabled: 'ဖွင့်ထား', disabled: 'ပိတ်ထား', methods: 'အကြောင်းကြားနည်း', push: 'Push', email: 'Email', line: 'LINE', timing: 'အချိန်', days90: '90ရက်အလို', days60: '60ရက်အလို', days30: '30ရက်အလို', days14: '14ရက်အလို', days7: '7ရက်အလို', day1: '1ရက်အလို', save: 'သိမ်းရန်', saved: 'သိမ်းပြီး' },
};

function t(locale: string, key: string): string {
  return translations[locale]?.[key] || translations['en'][key] || key;
}

export default function VisaReminderPage() {
  const params = useParams();
  const locale = (params?.locale as string) || 'ja';
  const [enabled, setEnabled] = useState(true);
  const [methods, setMethods] = useState({ push: true, email: true, line: false });
  const [timings, setTimings] = useState({ days90: true, days60: true, days30: true, days14: true, days7: true, day1: true });
  const [saved, setSaved] = useState(false);

  const toggleMethod = (key: keyof typeof methods) => setMethods(prev => ({ ...prev, [key]: !prev[key] }));
  const toggleTiming = (key: keyof typeof timings) => setTimings(prev => ({ ...prev, [key]: !prev[key] }));

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const methodItems = [
    { key: 'push' as const, icon: Smartphone, label: t(locale, 'push') },
    { key: 'email' as const, icon: Mail, label: t(locale, 'email') },
    { key: 'line' as const, icon: MessageSquare, label: t(locale, 'line') },
  ];

  const timingItems: { key: keyof typeof timings; label: string }[] = [
    { key: 'days90', label: t(locale, 'days90') },
    { key: 'days60', label: t(locale, 'days60') },
    { key: 'days30', label: t(locale, 'days30') },
    { key: 'days14', label: t(locale, 'days14') },
    { key: 'days7', label: t(locale, 'days7') },
    { key: 'day1', label: t(locale, 'day1') },
  ];

  return (
    <div className="pb-6">
      <div className="flex items-center gap-3 px-4 pt-4 mb-4">
        <Link href={`/${locale}/visa`}><ArrowLeft className="w-6 h-6 text-gray-600" /></Link>
        <h1 className="text-xl font-bold">{t(locale, 'title')}</h1>
      </div>

      {/* Toggle */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mx-4 bg-white rounded-xl p-4 shadow-sm mb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {enabled ? <Bell className="w-6 h-6 text-blue-600" /> : <BellOff className="w-6 h-6 text-gray-400" />}
            <span className="font-medium">{enabled ? t(locale, 'enabled') : t(locale, 'disabled')}</span>
          </div>
          <button onClick={() => setEnabled(!enabled)} className={`w-12 h-7 rounded-full transition-colors relative ${enabled ? 'bg-blue-600' : 'bg-gray-300'}`}>
            <div className={`w-5 h-5 bg-white rounded-full absolute top-1 transition-transform ${enabled ? 'translate-x-6' : 'translate-x-1'}`} />
          </button>
        </div>
      </motion.div>

      {enabled && (
        <>
          {/* Methods */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mx-4 bg-white rounded-xl p-4 shadow-sm mb-4">
            <h3 className="font-semibold mb-3">{t(locale, 'methods')}</h3>
            <div className="space-y-3">
              {methodItems.map(m => (
                <div key={m.key} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <m.icon className="w-5 h-5 text-gray-500" />
                    <span className="text-sm">{m.label}</span>
                  </div>
                  <button onClick={() => toggleMethod(m.key)} className={`w-10 h-6 rounded-full transition-colors relative ${methods[m.key] ? 'bg-blue-600' : 'bg-gray-300'}`}>
                    <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-transform ${methods[m.key] ? 'translate-x-5' : 'translate-x-1'}`} />
                  </button>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Timing */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mx-4 bg-white rounded-xl p-4 shadow-sm mb-4">
            <h3 className="font-semibold mb-3 flex items-center gap-2"><Calendar className="w-5 h-5" /> {t(locale, 'timing')}</h3>
            <div className="space-y-3">
              {timingItems.map(ti => (
                <div key={ti.key} className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">{ti.label}</span>
                  <button onClick={() => toggleTiming(ti.key)} className={`w-10 h-6 rounded-full transition-colors relative ${timings[ti.key] ? 'bg-emerald-500' : 'bg-gray-300'}`}>
                    <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-transform ${timings[ti.key] ? 'translate-x-5' : 'translate-x-1'}`} />
                  </button>
                </div>
              ))}
            </div>
          </motion.div>
        </>
      )}

      {/* Save Button */}
      <div className="mx-4">
        <button onClick={handleSave} className={`w-full py-3 rounded-xl font-semibold transition ${saved ? 'bg-emerald-500 text-white' : 'bg-blue-600 text-white hover:bg-blue-700'}`}>
          {saved ? t(locale, 'saved') : t(locale, 'save')}
        </button>
      </div>
    </div>
  );
}
