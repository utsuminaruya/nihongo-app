'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import {
  Stethoscope,
  MapPin,
  Shield,
  BookOpen,
  Globe,
  ChevronRight,
  Star,
} from 'lucide-react';
import { Card, Badge, Button } from '@/components/ui';
import { motion } from 'framer-motion';

function t(locale: string, key: string): string {
  const texts: Record<string, Record<string, string>> = {
    title: { ja: '医療サポート', vi: 'Hỗ trợ y tế', en: 'Medical Support', zh: '医疗支持', id: 'Dukungan Medis', tl: 'Suportang Medikal', my: 'ဆေးဘက်ဆိုင်ရာပံ့ပိုး' },
    subtitle: { ja: '安心して医療サービスを利用しましょう', vi: 'Sử dụng dịch vụ y tế một cách yên tâm', en: 'Access healthcare with confidence', zh: '安心使用医疗服务', id: 'Gunakan layanan medis dengan tenang', tl: 'Gumamit ng serbisyong medikal nang may kumpiyansa', my: 'ဆေးဘက်ဝန်ဆောင်မှုကို ယုံကြည်စွာအသုံးပြုပါ' },
    hospitalSearch: { ja: '病院検索', vi: 'Tìm bệnh viện', en: 'Hospital Search', zh: '搜索医院', id: 'Cari Rumah Sakit', tl: 'Maghanap ng Ospital', my: 'ဆေးရုံရှာ' },
    hospitalDesc: { ja: '多言語対応の病院を探す', vi: 'Tìm bệnh viện hỗ trợ đa ngôn ngữ', en: 'Find multilingual hospitals', zh: '查找多语言医院', id: 'Cari rumah sakit multibahasa', tl: 'Maghanap ng multilingual na ospital', my: 'ဘာသာစကားစုံ ဆေးရုံရှာ' },
    symptomChecker: { ja: '症状チェッカー', vi: 'Kiểm tra triệu chứng', en: 'Symptom Checker', zh: '症状检查', id: 'Pemeriksa Gejala', tl: 'Symptom Checker', my: 'ရောဂါလက္ခဏာစစ်ဆေး' },
    symptomDesc: { ja: 'AIが症状を分析し、適切な診療科を提案', vi: 'AI phân tích triệu chứng và đề xuất khoa phù hợp', en: 'AI analyzes symptoms and suggests departments', zh: 'AI分析症状并推荐科室', id: 'AI menganalisis gejala dan menyarankan departemen', tl: 'AI ang mag-a-analyze ng sintomas', my: 'AI က ရောဂါလက္ခဏာခွဲခြမ်းစိတ်ဖြာ' },
    insurance: { ja: '保険ガイド', vi: 'Hướng dẫn bảo hiểm', en: 'Insurance Guide', zh: '保险指南', id: 'Panduan Asuransi', tl: 'Gabay sa Insurance', my: 'အာမခံလမ်းညွှန်' },
    insuranceDesc: { ja: '国民健康保険の使い方', vi: 'Cách sử dụng bảo hiểm y tế quốc gia', en: 'How to use National Health Insurance', zh: '如何使用国民健康保险', id: 'Cara menggunakan asuransi kesehatan', tl: 'Paano gamitin ang NHI', my: 'အမျိုးသားကျန်းမာရေးအာမခံ အသုံးပြုပုံ' },
    phrasebook: { ja: '医療フレーズ集', vi: 'Sổ tay cụm từ y tế', en: 'Medical Phrasebook', zh: '医疗短语集', id: 'Buku Frasa Medis', tl: 'Medical Phrasebook', my: 'ဆေးဘက်စကားစု' },
    phraseDesc: { ja: '診察で使える日本語フレーズ', vi: 'Cụm từ tiếng Nhật dùng khi khám bệnh', en: 'Japanese phrases for medical visits', zh: '就医时可用的日语短语', id: 'Frasa Jepang untuk kunjungan medis', tl: 'Japanese phrases para sa pagbisita sa doktor', my: 'ဆေးခန်းတွင်အသုံးပြုနိုင်သော ဂျပန်စကား' },
    nearbyHospitals: { ja: '近くの病院', vi: 'Bệnh viện gần đây', en: 'Nearby Hospitals', zh: '附近医院', id: 'Rumah Sakit Terdekat', tl: 'Mga Malapit na Ospital', my: 'အနီးဆုံးဆေးရုံများ' },
    multiLang: { ja: '多言語対応', vi: 'Đa ngôn ngữ', en: 'Multilingual', zh: '多语言', id: 'Multibahasa', tl: 'Multilingual', my: 'ဘာသာစကားစုံ' },
    nhsAccepted: { ja: '保険適用', vi: 'Chấp nhận BHYT', en: 'NHI Accepted', zh: '可用保险', id: 'BPJS Diterima', tl: 'NHI Accepted', my: 'အာမခံလက်ခံ' },
    viewAll: { ja: 'すべて見る', vi: 'Xem tất cả', en: 'View All', zh: '查看全部', id: 'Lihat Semua', tl: 'Tingnan Lahat', my: 'အားလုံးကြည့်' },
    open: { ja: '診療中', vi: 'Đang mở', en: 'Open', zh: '营业中', id: 'Buka', tl: 'Bukas', my: 'ဖွင့်ထား' },
  };
  return texts[key]?.[locale] || texts[key]?.['en'] || key;
}

const demoHospitals = [
  { name: '東京メディカルセンター', specialty: '内科・外科', rating: 4.5, languages: ['vi', 'en', 'zh'], distance: '0.8km', isOpen: true },
  { name: 'さくら国際クリニック', specialty: '総合診療', rating: 4.8, languages: ['vi', 'en', 'zh', 'tl'], distance: '1.2km', isOpen: true },
  { name: '新宿メンタルクリニック', specialty: '心療内科', rating: 4.3, languages: ['en', 'zh'], distance: '2.1km', isOpen: false },
];

export default function HealthPage() {
  const params = useParams();
  const locale = params.locale as string;

  const menuItems = [
    { key: 'hospitalSearch', desc: 'hospitalDesc', icon: MapPin, color: 'bg-blue-100 text-blue-600', href: `/${locale}/health/hospitals` },
    { key: 'symptomChecker', desc: 'symptomDesc', icon: Stethoscope, color: 'bg-emerald-100 text-emerald-600', href: `/${locale}/health/symptoms` },
    { key: 'insurance', desc: 'insuranceDesc', icon: Shield, color: 'bg-amber-100 text-amber-600', href: `/${locale}/health/insurance` },
    { key: 'phrasebook', desc: 'phraseDesc', icon: BookOpen, color: 'bg-purple-100 text-purple-600', href: `/${locale}/health/phrasebook` },
  ];

  return (
    <div className="space-y-6">
      {/* ヘッダー */}
      <div>
        <h2 className="text-2xl font-bold text-slate-800">{t(locale, 'title')}</h2>
        <p className="text-sm text-text-light mt-1">{t(locale, 'subtitle')}</p>
      </div>

      {/* メインメニュー */}
      <div className="space-y-3">
        {menuItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={item.key}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08 }}
            >
              <Link href={item.href}>
                <Card hoverable>
                  <div className="flex items-center gap-4">
                    <div className={`rounded-xl p-3 ${item.color}`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-slate-800">{t(locale, item.key)}</p>
                      <p className="text-sm text-text-light mt-0.5">{t(locale, item.desc)}</p>
                    </div>
                    <ChevronRight className="h-5 w-5 text-slate-400 flex-shrink-0" />
                  </div>
                </Card>
              </Link>
            </motion.div>
          );
        })}
      </div>

      {/* 近くの病院 */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-bold text-slate-800">{t(locale, 'nearbyHospitals')}</h3>
          <Link href={`/${locale}/health/hospitals`} className="text-sm text-blue-600 flex items-center gap-1">
            {t(locale, 'viewAll')}
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="space-y-3">
          {demoHospitals.map((hospital, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + index * 0.1 }}
            >
              <Card hoverable>
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="font-semibold text-slate-800">{hospital.name}</p>
                    <p className="text-sm text-text-light">{hospital.specialty}</p>
                  </div>
                  {hospital.isOpen && (
                    <Badge variant="success">{t(locale, 'open')}</Badge>
                  )}
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <span className="flex items-center gap-1 text-amber-500">
                    <Star className="h-3.5 w-3.5" fill="currentColor" />
                    {hospital.rating}
                  </span>
                  <span className="flex items-center gap-1 text-text-light">
                    <MapPin className="h-3.5 w-3.5" />
                    {hospital.distance}
                  </span>
                  <span className="flex items-center gap-1 text-text-light">
                    <Globe className="h-3.5 w-3.5" />
                    {hospital.languages.join(', ')}
                  </span>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 緊急ボタン */}
      <Card className="bg-red-50 border-red-200 text-center">
        <p className="text-sm text-red-700 mb-3">
          {locale === 'ja' ? '緊急の場合は119に電話してください' : 'In case of emergency, call 119'}
        </p>
        <a href="tel:119">
          <Button variant="danger" fullWidth>
            {locale === 'ja' ? '🚨 119に電話する' : '🚨 Call 119'}
          </Button>
        </a>
      </Card>
    </div>
  );
}
