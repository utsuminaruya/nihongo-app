'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, User, FileText, MapPin, GraduationCap, ArrowRight, ArrowLeft, Check } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { useUserStore } from '@/stores/userStore';

const LOCALES = [
  { code: 'ja', name: '日本語', flag: '🇯🇵' },
  { code: 'vi', name: 'Tiếng Việt', flag: '🇻🇳' },
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'zh', name: '中文', flag: '🇨🇳' },
  { code: 'id', name: 'Bahasa Indonesia', flag: '🇮🇩' },
  { code: 'tl', name: 'Tagalog', flag: '🇵🇭' },
  { code: 'my', name: 'မြန်မာ', flag: '🇲🇲' },
];

const VISA_TYPES = [
  { id: 'ENGINEER', ja: '技術・人文知識・国際業務', en: 'Engineer/Specialist' },
  { id: 'SKILLED_WORKER', ja: '技能', en: 'Skilled Worker' },
  { id: 'SPECIFIED_SKILLED_1', ja: '特定技能1号', en: 'Specified Skilled Worker i' },
  { id: 'SPECIFIED_SKILLED_2', ja: '特定技能2号', en: 'Specified Skilled Worker ii' },
  { id: 'TECHNICAL_INTERN_1', ja: '技能実習1号', en: 'Technical Intern i' },
  { id: 'TECHNICAL_INTERN_2', ja: '技能実習2号', en: 'Technical Intern ii' },
  { id: 'STUDENT', ja: '留学', en: 'Student' },
  { id: 'DEPENDENT', ja: '家族滞在', en: 'Dependent' },
  { id: 'PERMANENT_RESIDENT', ja: '永住者', en: 'Permanent Resident' },
  { id: 'SPOUSE', ja: '日本人の配偶者等', en: 'Spouse of Japanese' },
];

const JLPT_LEVELS = ['N5', 'N4', 'N3', 'N2', 'N1'];
const INTERESTS = [
  { id: 'visa', icon: '📋', ja: 'ビザ管理', en: 'Visa Management' },
  { id: 'health', icon: '🏥', ja: '医療', en: 'Healthcare' },
  { id: 'life', icon: '📖', ja: '生活ガイド', en: 'Life Guide' },
  { id: 'money', icon: '💰', ja: '送金', en: 'Remittance' },
  { id: 'jobs', icon: '💼', ja: '求人', en: 'Jobs' },
  { id: 'learn', icon: '🎓', ja: '日本語学習', en: 'Japanese Learning' },
];

const PREFECTURES = ['北海道','青森県','岩手県','宮城県','秋田県','山形県','福島県','茨城県','栃木県','群馬県','埼玉県','千葉県','東京都','神奈川県','新潟県','富山県','石川県','福井県','山梨県','長野県','岐阜県','静岡県','愛知県','三重県','滋賀県','京都府','大阪府','兵庫県','奈良県','和歌山県','鳥取県','島根県','岡山県','広島県','山口県','徳島県','香川県','愛媛県','高知県','福岡県','佐賀県','長崎県','熊本県','大分県','宮崎県','鹿児島県','沖縄県'];

const translations: Record<string, Record<string, string>> = {
  ja: { step1: '言語選択', step2: '基本情報', step3: 'ビザ種類', step4: '居住地', step5: '日本語レベル', selectLang: '使用する言語を選択してください', name: '名前', dob: '生年月日', gender: '性別', male: '男性', female: '女性', other: 'その他', selectVisa: '在留資格を選択してください', prefecture: '都道府県', city: '市区町村', jpLevel: '日本語レベルを選択', interests: '興味のあるサービス', next: '次へ', back: '戻る', start: 'はじめる', skip: 'スキップ' },
  en: { step1: 'Language', step2: 'Basic Info', step3: 'Visa Type', step4: 'Residence', step5: 'Japanese Level', selectLang: 'Select your preferred language', name: 'Full Name', dob: 'Date of Birth', gender: 'Gender', male: 'Male', female: 'Female', other: 'Other', selectVisa: 'Select your visa type', prefecture: 'Prefecture', city: 'City', jpLevel: 'Select your Japanese level', interests: 'Services you are interested in', next: 'Next', back: 'Back', start: 'Get Started', skip: 'Skip' },
  vi: { step1: 'Ngôn ngữ', step2: 'Thông tin', step3: 'Loại visa', step4: 'Nơi ở', step5: 'Trình độ', selectLang: 'Chọn ngôn ngữ', name: 'Họ tên', dob: 'Ngày sinh', gender: 'Giới tính', male: 'Nam', female: 'Nữ', other: 'Khác', selectVisa: 'Chọn loại visa', prefecture: 'Tỉnh', city: 'Thành phố', jpLevel: 'Trình độ tiếng Nhật', interests: 'Dịch vụ quan tâm', next: 'Tiếp', back: 'Quay lại', start: 'Bắt đầu', skip: 'Bỏ qua' },
  zh: { step1: '语言', step2: '基本信息', step3: '签证类型', step4: '居住地', step5: '日语水平', selectLang: '选择您的语言', name: '姓名', dob: '出生日期', gender: '性别', male: '男', female: '女', other: '其他', selectVisa: '选择签证类型', prefecture: '都道府县', city: '城市', jpLevel: '日语水平', interests: '感兴趣的服务', next: '下一步', back: '返回', start: '开始使用', skip: '跳过' },
  id: { step1: 'Bahasa', step2: 'Info Dasar', step3: 'Jenis Visa', step4: 'Tempat Tinggal', step5: 'Level Jepang', selectLang: 'Pilih bahasa', name: 'Nama', dob: 'Tanggal Lahir', gender: 'Jenis Kelamin', male: 'Laki-laki', female: 'Perempuan', other: 'Lainnya', selectVisa: 'Pilih jenis visa', prefecture: 'Prefektur', city: 'Kota', jpLevel: 'Level bahasa Jepang', interests: 'Layanan yang diminati', next: 'Lanjut', back: 'Kembali', start: 'Mulai', skip: 'Lewati' },
  tl: { step1: 'Wika', step2: 'Impormasyon', step3: 'Uri ng Visa', step4: 'Tirahan', step5: 'Level ng Hapon', selectLang: 'Pumili ng wika', name: 'Pangalan', dob: 'Petsa ng Kapanganakan', gender: 'Kasarian', male: 'Lalaki', female: 'Babae', other: 'Iba pa', selectVisa: 'Pumili ng uri ng visa', prefecture: 'Prefecture', city: 'Lungsod', jpLevel: 'Level sa Japanese', interests: 'Mga serbisyong interesado', next: 'Susunod', back: 'Bumalik', start: 'Simulan', skip: 'Laktawan' },
  my: { step1: 'ဘာသာစကား', step2: 'အခြေခံ', step3: 'ဗီဇာ', step4: 'နေရာ', step5: 'ဂျပန်', selectLang: 'ဘာသာစကားရွေးပါ', name: 'အမည်', dob: 'မွေးနေ့', gender: 'ကျား/မ', male: 'ကျား', female: 'မ', other: 'အခြား', selectVisa: 'ဗီဇာအမျိုးအစား', prefecture: 'ခရိုင်', city: 'မြို့', jpLevel: 'ဂျပန်စာအဆင့်', interests: 'စိတ်ဝင်စားသောဝန်ဆောင်မှု', next: 'ရှေ့', back: 'နောက်', start: 'စတင်', skip: 'ကျော်' },
};

function t(locale: string, key: string): string {
  return translations[locale]?.[key] || translations['en'][key] || key;
}

const STEPS = [
  { icon: Globe, key: 'step1' },
  { icon: User, key: 'step2' },
  { icon: FileText, key: 'step3' },
  { icon: MapPin, key: 'step4' },
  { icon: GraduationCap, key: 'step5' },
];

export default function OnboardingPage() {
  const params = useParams();
  const router = useRouter();
  const [locale, setLocale] = useState((params?.locale as string) || 'ja');
  const [step, setStep] = useState(0);
  const [selectedLang, setSelectedLang] = useState(locale);
  const [name, setName] = useState('');
  const [dob, setDob] = useState('');
  const [gender, setGender] = useState('');
  const [visaType, setVisaType] = useState('');
  const [prefecture, setPrefecture] = useState('');
  const [city, setCity] = useState('');
  const [jpLevel, setJpLevel] = useState('');
  const [interests, setInterests] = useState<string[]>([]);

  const toggleInterest = (id: string) => {
    setInterests(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const saveProfile = async () => {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (user) {
      await supabase.from('profiles').upsert({
        id: user.id,
        name,
        date_of_birth: dob,
        gender,
        visa_type: visaType,
        prefecture,
        city,
        japanese_level: jpLevel,
        native_language: selectedLang,
        interests,
        onboarding_done: true,
        updated_at: new Date().toISOString(),
      });

      const { setUser } = useUserStore.getState();
      setUser({
        name,
        nativeLanguage: selectedLang,
        residenceStatus: visaType,
        prefecture,
        city,
        japaneseLevel: jpLevel,
        onboardingDone: true,
      });
    }

    router.push(`/${locale}/home`);
  };

  const handleNext = () => {
    if (step === 0) {
      setLocale(selectedLang);
    }
    if (step < 4) setStep(step + 1);
    else saveProfile();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-emerald-50 flex flex-col">
      {/* Progress Bar */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          {STEPS.map((s, i) => {
            const Icon = s.icon;
            return (
              <div key={i} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${i <= step ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-400'}`}>
                  {i < step ? <Check className="w-5 h-5" /> : <Icon className="w-5 h-5" />}
                </div>
                {i < 4 && <div className={`w-8 sm:w-12 h-1 mx-1 rounded ${i < step ? 'bg-blue-600' : 'bg-gray-200'}`} />}
              </div>
            );
          })}
        </div>
        <p className="text-center text-sm font-medium text-gray-600">{t(locale, STEPS[step].key)}</p>
      </div>

      {/* Step Content */}
      <div className="flex-1 px-4 pb-4 overflow-y-auto">
        <AnimatePresence mode="wait">
          <motion.div key={step} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.3 }} className="max-w-md mx-auto">

            {/* Step 0: Language */}
            {step === 0 && (
              <div className="space-y-3">
                <h2 className="text-xl font-bold text-center mb-4">{t(locale, 'selectLang')}</h2>
                {LOCALES.map(l => (
                  <button key={l.code} onClick={() => setSelectedLang(l.code)} className={`w-full p-4 rounded-xl border-2 flex items-center gap-4 transition ${selectedLang === l.code ? 'border-blue-600 bg-blue-50' : 'border-gray-200 bg-white hover:border-gray-300'}`}>
                    <span className="text-3xl">{l.flag}</span>
                    <span className="font-semibold text-lg">{l.name}</span>
                    {selectedLang === l.code && <Check className="w-5 h-5 text-blue-600 ml-auto" />}
                  </button>
                ))}
              </div>
            )}

            {/* Step 1: Basic Info */}
            {step === 1 && (
              <div className="space-y-4 bg-white rounded-2xl p-6 shadow-sm">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t(locale, 'name')}</label>
                  <input type="text" value={name} onChange={e => setName(e.target.value)} className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t(locale, 'dob')}</label>
                  <input type="date" value={dob} onChange={e => setDob(e.target.value)} className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t(locale, 'gender')}</label>
                  <div className="flex gap-3">
                    {['male', 'female', 'other'].map(g => (
                      <button key={g} onClick={() => setGender(g)} className={`flex-1 py-3 rounded-xl border-2 font-medium transition ${gender === g ? 'border-blue-600 bg-blue-50 text-blue-700' : 'border-gray-200 text-gray-600 hover:border-gray-300'}`}>
                        {t(locale, g)}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Visa Type */}
            {step === 2 && (
              <div className="space-y-3">
                <h2 className="text-lg font-bold mb-2">{t(locale, 'selectVisa')}</h2>
                <div className="grid grid-cols-1 gap-2 max-h-[60vh] overflow-y-auto">
                  {VISA_TYPES.map(v => (
                    <button key={v.id} onClick={() => setVisaType(v.id)} className={`w-full p-3 rounded-xl border-2 text-left transition ${visaType === v.id ? 'border-blue-600 bg-blue-50' : 'border-gray-200 bg-white hover:border-gray-300'}`}>
                      <p className="font-semibold text-sm">{v.ja}</p>
                      <p className="text-xs text-gray-500">{v.en}</p>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 3: Residence */}
            {step === 3 && (
              <div className="space-y-4 bg-white rounded-2xl p-6 shadow-sm">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t(locale, 'prefecture')}</label>
                  <select value={prefecture} onChange={e => setPrefecture(e.target.value)} className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white">
                    <option value="">---</option>
                    {PREFECTURES.map(p => <option key={p} value={p}>{p}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t(locale, 'city')}</label>
                  <input type="text" value={city} onChange={e => setCity(e.target.value)} className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none" />
                </div>
              </div>
            )}

            {/* Step 4: Japanese Level + Interests */}
            {step === 4 && (
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-3">{t(locale, 'jpLevel')}</h3>
                  <div className="flex gap-2">
                    {JLPT_LEVELS.map(level => (
                      <button key={level} onClick={() => setJpLevel(level)} className={`flex-1 py-3 rounded-xl border-2 font-bold text-sm transition ${jpLevel === level ? 'border-blue-600 bg-blue-600 text-white' : 'border-gray-200 text-gray-600 hover:border-gray-300'}`}>
                        {level}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-3">{t(locale, 'interests')}</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {INTERESTS.map(item => (
                      <button key={item.id} onClick={() => toggleInterest(item.id)} className={`p-4 rounded-xl border-2 text-center transition ${interests.includes(item.id) ? 'border-blue-600 bg-blue-50' : 'border-gray-200 bg-white hover:border-gray-300'}`}>
                        <span className="text-2xl block mb-1">{item.icon}</span>
                        <span className="text-xs font-medium">{locale === 'ja' ? item.ja : item.en}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom Navigation */}
      <div className="p-4 bg-white border-t border-gray-100">
        <div className="max-w-md mx-auto flex gap-3">
          {step > 0 && (
            <button onClick={() => setStep(step - 1)} className="px-6 py-3 border border-gray-200 rounded-xl font-medium text-gray-600 hover:bg-gray-50 transition flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" /> {t(locale, 'back')}
            </button>
          )}
          <button onClick={handleNext} className="flex-1 bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition flex items-center justify-center gap-2">
            {step === 4 ? t(locale, 'start') : t(locale, 'next')} <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
