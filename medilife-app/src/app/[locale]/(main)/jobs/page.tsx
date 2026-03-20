'use client';

import { useParams } from 'next/navigation';
import { useState } from 'react';
import {
  Search,
  MapPin,
  Banknote,
  Clock,
  Bookmark,
  Filter,
  Building2,
  BadgeCheck,
  X,
  Briefcase,
} from 'lucide-react';
import { Card, Badge, Button } from '@/components/ui';
import { motion, AnimatePresence } from 'framer-motion';

function t(locale: string, key: string): string {
  const texts: Record<string, Record<string, string>> = {
    title: { ja: '求人検索', vi: 'Tìm việc làm', en: 'Job Search', zh: '找工作', id: 'Cari Kerja', tl: 'Maghanap ng Trabaho', my: 'အလုပ်ရှာ' },
    subtitle: { ja: 'あなたに合った仕事を見つけましょう', vi: 'Tìm công việc phù hợp với bạn', en: 'Find the right job for you', zh: '找到适合你的工作', id: 'Temukan pekerjaan yang cocok', tl: 'Hanapin ang tamang trabaho', my: 'သင့်အတွက်သင့်တော်သောအလုပ်ရှာပါ' },
    search: { ja: '職種・キーワードで検索', vi: 'Tìm theo ngành, từ khóa', en: 'Search by job title, keyword', zh: '按职位、关键词搜索', id: 'Cari berdasarkan jabatan', tl: 'Maghanap ayon sa titulo', my: 'ရာထူး၊ သော့ချက်ဖြင့်ရှာ' },
    filter: { ja: 'フィルター', vi: 'Bộ lọc', en: 'Filter', zh: '筛选', id: 'Filter', tl: 'Filter', my: 'စစ်ထုတ်' },
    allJobs: { ja: 'すべて', vi: 'Tất cả', en: 'All', zh: '全部', id: 'Semua', tl: 'Lahat', my: 'အားလုံး' },
    saved: { ja: '保存済み', vi: 'Đã lưu', en: 'Saved', zh: '已保存', id: 'Tersimpan', tl: 'Na-save', my: 'သိမ်းထား' },
    applied: { ja: '応募済み', vi: 'Đã ứng tuyển', en: 'Applied', zh: '已投递', id: 'Sudah Dilamar', tl: 'Na-apply', my: 'လျှောက်ပြီး' },
    fullTime: { ja: '正社員', vi: 'Toàn thời gian', en: 'Full-time', zh: '全职', id: 'Penuh Waktu', tl: 'Full-time', my: 'အချိန်ပြည့်' },
    partTime: { ja: 'パート・アルバイト', vi: 'Bán thời gian', en: 'Part-time', zh: '兼职/打工', id: 'Paruh Waktu', tl: 'Part-time', my: 'အချိန်ပိုင်း' },
    contract: { ja: '契約社員', vi: 'Hợp đồng', en: 'Contract', zh: '合同制', id: 'Kontrak', tl: 'Kontrata', my: 'စာချုပ်' },
    perMonth: { ja: '/月', vi: '/tháng', en: '/mo', zh: '/月', id: '/bulan', tl: '/buwan', my: '/လ' },
    perHour: { ja: '/時', vi: '/giờ', en: '/hr', zh: '/时', id: '/jam', tl: '/oras', my: '/နာရီ' },
    mediflow: { ja: 'MediLife認定', vi: 'MediLife', en: 'MediLife', zh: 'MediLife认定', id: 'MediLife', tl: 'MediLife', my: 'MediLife' },
    apply: { ja: '応募する', vi: 'Ứng tuyển', en: 'Apply', zh: '申请', id: 'Lamar', tl: 'Mag-apply', my: 'လျှောက်' },
    noResults: { ja: '求人が見つかりませんでした', vi: 'Không tìm thấy việc làm', en: 'No jobs found', zh: '未找到职位', id: 'Tidak ada lowongan', tl: 'Walang trabahong nahanap', my: 'အလုပ်မတွေ့ပါ' },
    jobCount: { ja: '件', vi: 'việc', en: 'jobs', zh: '个职位', id: 'lowongan', tl: 'trabaho', my: 'ခုရှိသည်' },
    industry: { ja: '業種', vi: 'Ngành', en: 'Industry', zh: '行业', id: 'Industri', tl: 'Industriya', my: 'လုပ်ငန်းနယ်ပယ်' },
    visa: { ja: '対応ビザ', vi: 'Visa phù hợp', en: 'Visa Type', zh: '适用签证', id: 'Jenis Visa', tl: 'Uri ng Visa', my: 'ဗီဇာအမျိုးအစား' },
    jlpt: { ja: '必要日本語レベル', vi: 'Cấp độ tiếng Nhật', en: 'JLPT Required', zh: '日语要求', id: 'Level Bahasa Jepang', tl: 'Antas ng Japanese', my: 'ဂျပန်ဘာသာ လိုအပ်သောအဆင့်' },
    housing: { ja: '寮あり', vi: 'Có ký túc xá', en: 'Housing provided', zh: '提供宿舍', id: 'Disediakan hunian', tl: 'May tirahan', my: 'အိမ်ရာပေး' },
    clearFilter: { ja: 'クリア', vi: 'Xóa lọc', en: 'Clear', zh: '清除', id: 'Hapus', tl: 'Burahin', my: 'ရှင်းပါ' },
    posted: { ja: '投稿日', vi: 'Đăng', en: 'Posted', zh: '发布', id: 'Diposting', tl: 'Nai-post', my: 'တင်သည်' },
  };
  return texts[key]?.[locale] || texts[key]?.['en'] || key;
}

type Job = {
  id: string;
  company: string;
  companyType: string;
  title: Record<string, string>;
  description: Record<string, string>;
  location: string;
  prefecture: string;
  salary: { min: number; max: number; type: 'monthly' | 'hourly' };
  type: 'FULL_TIME' | 'PART_TIME' | 'CONTRACT';
  industry: string;
  isMediflow: boolean;
  visaTypes: string[];
  requiredLevel: string;
  posted: string;
  benefits: string[];
  hasHousing: boolean;
};

const jobs: Job[] = [
  // 介護・福祉
  {
    id: '1',
    company: '介護施設ひまわり',
    companyType: '特別養護老人ホーム',
    title: { ja: '介護スタッフ（正社員）', en: 'Care Worker (Full-time)', vi: 'Nhân viên chăm sóc (toàn thời gian)', zh: '护理员（正社员）' },
    description: { ja: '入居者の日常生活のサポート（食事・入浴・排泄介助）、レクリエーション活動の補助。日本語N4以上必要。', en: 'Support residents\' daily life (meals, bathing, toileting), assist with recreation activities. JLPT N4 or above required.' },
    location: '東京都新宿区',
    prefecture: '東京都',
    salary: { min: 220000, max: 280000, type: 'monthly' },
    type: 'FULL_TIME',
    industry: '介護・福祉',
    isMediflow: true,
    visaTypes: ['特定技能1号', '介護'],
    requiredLevel: 'N4',
    posted: '2日前',
    benefits: ['社会保険完備', '交通費支給', '資格取得支援', '年次有給休暇'],
    hasHousing: true,
  },
  {
    id: '2',
    company: 'ケアホーム桜',
    companyType: '住宅型有料老人ホーム',
    title: { ja: 'ホームヘルパー', en: 'Home Helper', vi: 'Người chăm sóc tại nhà', zh: '家庭护理员' },
    description: { ja: '訪問介護サービス。高齢者の自宅を訪問し、生活支援・身体介護を行います。普通自動車免許あれば尚可。', en: 'Home visit care service. Visit elderly clients\' homes, provide life support and physical care. Driver\'s license a plus.' },
    location: '神奈川県横浜市',
    prefecture: '神奈川県',
    salary: { min: 200000, max: 250000, type: 'monthly' },
    type: 'FULL_TIME',
    industry: '介護・福祉',
    isMediflow: true,
    visaTypes: ['特定技能1号', '介護'],
    requiredLevel: 'N4',
    posted: '5日前',
    benefits: ['社会保険完備', '交通費全額支給', '残業少なめ'],
    hasHousing: false,
  },

  // IT・エンジニア
  {
    id: '3',
    company: '株式会社テックジャパン',
    companyType: 'ITベンチャー',
    title: { ja: 'Webエンジニア（フロントエンド）', en: 'Web Engineer (Frontend)', vi: 'Kỹ sư Web (Frontend)', zh: 'Web工程师（前端）' },
    description: { ja: 'React/Next.jsを使ったWebアプリ開発。英語・日本語どちらでも対応可能。リモートワーク相談可。', en: 'Web app development using React/Next.js. Both English and Japanese OK. Remote work negotiable.' },
    location: '東京都渋谷区',
    prefecture: '東京都',
    salary: { min: 350000, max: 550000, type: 'monthly' },
    type: 'FULL_TIME',
    industry: 'IT・テクノロジー',
    isMediflow: false,
    visaTypes: ['技術・人文知識・国際業務', '高度専門職'],
    requiredLevel: 'N3',
    posted: '1週間前',
    benefits: ['リモートワーク可', '社会保険完備', 'フレックスタイム', '書籍購入補助'],
    hasHousing: false,
  },
  {
    id: '4',
    company: '日本デジタルソリューションズ',
    companyType: 'システムインテグレーター',
    title: { ja: 'ITサポートスタッフ', en: 'IT Support Staff', vi: 'Nhân viên hỗ trợ IT', zh: 'IT支持人员' },
    description: { ja: '社内システムの運用・保守、ヘルプデスク対応。多言語スキル（英語・ベトナム語・インドネシア語など）歓迎。', en: 'Internal systems operation, maintenance, and help desk support. Multilingual skills (English, Vietnamese, Indonesian etc.) welcome.' },
    location: '大阪府大阪市',
    prefecture: '大阪府',
    salary: { min: 250000, max: 350000, type: 'monthly' },
    type: 'FULL_TIME',
    industry: 'IT・テクノロジー',
    isMediflow: false,
    visaTypes: ['技術・人文知識・国際業務'],
    requiredLevel: 'N3',
    posted: '3日前',
    benefits: ['社会保険完備', '交通費支給', '資格取得支援'],
    hasHousing: false,
  },

  // 飲食・フード
  {
    id: '5',
    company: 'レストラン桜',
    companyType: '和食レストラン',
    title: { ja: '調理スタッフ・キッチンスタッフ', en: 'Kitchen Staff / Cook', vi: 'Nhân viên bếp', zh: '厨房工作人员' },
    description: { ja: '和食レストランでの調理補助、食材の仕込み、皿洗い。未経験可。日本の食文化を学びながら働けます。', en: 'Cooking assistance at Japanese restaurant, food prep, dishwashing. No experience required. Learn Japanese food culture while working.' },
    location: '大阪府大阪市',
    prefecture: '大阪府',
    salary: { min: 200000, max: 260000, type: 'monthly' },
    type: 'FULL_TIME',
    industry: '飲食・フード',
    isMediflow: true,
    visaTypes: ['特定技能1号（外食業）'],
    requiredLevel: 'N4',
    posted: '3日前',
    benefits: ['賄い食あり', '社会保険完備', '経験者優遇'],
    hasHousing: true,
  },
  {
    id: '6',
    company: 'コンビニエンスストア大手チェーン',
    companyType: 'コンビニエンスストア',
    title: { ja: 'コンビニスタッフ（留学生歓迎）', en: 'Convenience Store Staff (Students Welcome)', vi: 'Nhân viên cửa hàng tiện lợi (chào đón du học sinh)', zh: '便利店店员（欢迎留学生）' },
    description: { ja: 'レジ業務、品出し、清掃。留学ビザの方は週28時間以内で勤務可能。シフト自由で学業と両立できます。', en: 'Cashier, stocking, cleaning. Students on study visa can work up to 28 hrs/week. Flexible shifts to balance with studies.' },
    location: '東京都新宿区',
    prefecture: '東京都',
    salary: { min: 1113, max: 1300, type: 'hourly' },
    type: 'PART_TIME',
    industry: '飲食・フード',
    isMediflow: false,
    visaTypes: ['留学（資格外活動許可）', '特定活動'],
    requiredLevel: 'N4',
    posted: '5日前',
    benefits: ['交通費支給', 'シフト自由', '制服支給'],
    hasHousing: false,
  },
  {
    id: '7',
    company: 'ファミリーレストランチェーン（大手）',
    companyType: 'ファミリーレストラン',
    title: { ja: 'ホールスタッフ・接客', en: 'Floor Staff / Customer Service', vi: 'Nhân viên phục vụ', zh: '服务员' },
    description: { ja: '料理の提供、注文受付、レジ業務。研修あり。外国語スキルを活かして接客できます。', en: 'Serving food, taking orders, cashier duties. Training provided. Use your foreign language skills in customer service.' },
    location: '埼玉県さいたま市',
    prefecture: '埼玉県',
    salary: { min: 1050, max: 1200, type: 'hourly' },
    type: 'PART_TIME',
    industry: '飲食・フード',
    isMediflow: false,
    visaTypes: ['留学（資格外活動許可）', '永住者', '日本人の配偶者'],
    requiredLevel: 'N4',
    posted: '2日前',
    benefits: ['まかない食', '交通費支給', '昇給あり'],
    hasHousing: false,
  },

  // 建設・製造
  {
    id: '8',
    company: '建設会社マルイチ工業',
    companyType: '総合建設業',
    title: { ja: '建設作業員', en: 'Construction Worker', vi: 'Công nhân xây dựng', zh: '建筑工人' },
    description: { ja: '建築・土木工事の現場作業。資材の搬入・運搬、基礎工事のサポート。体力に自信のある方。', en: 'On-site construction work. Loading/transporting materials, foundation work support. Must be physically fit.' },
    location: '埼玉県さいたま市',
    prefecture: '埼玉県',
    salary: { min: 250000, max: 330000, type: 'monthly' },
    type: 'FULL_TIME',
    industry: '建設・土木',
    isMediflow: true,
    visaTypes: ['特定技能1号（建設）'],
    requiredLevel: 'N4',
    posted: '1日前',
    benefits: ['社会保険完備', '交通費支給', '作業服支給', '資格取得支援'],
    hasHousing: true,
  },
  {
    id: '9',
    company: '精密機械製造株式会社',
    companyType: '製造業',
    title: { ja: '製造ライン作業員', en: 'Manufacturing Line Worker', vi: 'Công nhân dây chuyền sản xuất', zh: '生产线工人' },
    description: { ja: '自動車部品の製造ライン作業。品質検査、組み立て作業。未経験可。研修充実。', en: 'Auto parts manufacturing line work. Quality inspection, assembly. No experience required. Thorough training provided.' },
    location: '愛知県名古屋市',
    prefecture: '愛知県',
    salary: { min: 230000, max: 290000, type: 'monthly' },
    type: 'FULL_TIME',
    industry: '製造業',
    isMediflow: true,
    visaTypes: ['特定技能1号（製造業）', '技能実習'],
    requiredLevel: 'N5',
    posted: '4日前',
    benefits: ['社会保険完備', '寮完備', '送迎バスあり', '残業代全額支給'],
    hasHousing: true,
  },

  // 医療・看護
  {
    id: '10',
    company: '医療法人さくら病院',
    companyType: '総合病院',
    title: { ja: '看護助手・病院スタッフ', en: 'Nursing Assistant / Hospital Staff', vi: 'Trợ lý y tá / Nhân viên bệnh viện', zh: '护理助手/医院工作人员' },
    description: { ja: '入院患者の生活サポート、病棟業務補助。医療の基礎知識を学べる環境。N3以上推奨。', en: 'Support inpatients\' daily life, assist with ward duties. Environment to learn basic medical knowledge. N3+ recommended.' },
    location: '東京都品川区',
    prefecture: '東京都',
    salary: { min: 210000, max: 260000, type: 'monthly' },
    type: 'FULL_TIME',
    industry: '医療・看護',
    isMediflow: true,
    visaTypes: ['特定技能1号', '介護'],
    requiredLevel: 'N3',
    posted: '1週間前',
    benefits: ['社会保険完備', '資格取得支援', '制服支給', '院内食堂あり'],
    hasHousing: false,
  },

  // 農業・食品
  {
    id: '11',
    company: '農業法人みどりファーム',
    companyType: '農業生産法人',
    title: { ja: '農業スタッフ（野菜・果物栽培）', en: 'Farm Worker (Vegetables & Fruit)', vi: 'Nhân viên nông trại', zh: '农业员工（蔬菜水果栽培）' },
    description: { ja: 'トマト・いちご等の栽培、収穫、選別作業。農業の経験不問。自然の中で働きたい方歓迎。', en: 'Growing, harvesting, and sorting tomatoes, strawberries, etc. No farming experience needed. Nature lovers welcome.' },
    location: '千葉県成田市',
    prefecture: '千葉県',
    salary: { min: 190000, max: 230000, type: 'monthly' },
    type: 'FULL_TIME',
    industry: '農業・食品',
    isMediflow: true,
    visaTypes: ['特定技能1号（農業）', '技能実習'],
    requiredLevel: 'N5',
    posted: '2週間前',
    benefits: ['寮完備・光熱費込', '社会保険完備', '食材支給'],
    hasHousing: true,
  },

  // ホテル・観光
  {
    id: '12',
    company: 'ホテルグランドリゾート',
    companyType: '国際観光ホテル',
    title: { ja: 'ホテルフロントスタッフ', en: 'Hotel Front Desk Staff', vi: 'Nhân viên lễ tân khách sạn', zh: '酒店前台工作人员' },
    description: { ja: 'チェックイン・チェックアウト、問い合わせ対応。英語・中国語・ベトナム語等の多言語スキルを活かせる職場。', en: 'Check-in/out, guest inquiries. Multilingual skills (English, Chinese, Vietnamese etc.) highly valued.' },
    location: '東京都港区',
    prefecture: '東京都',
    salary: { min: 240000, max: 310000, type: 'monthly' },
    type: 'FULL_TIME',
    industry: 'ホテル・観光',
    isMediflow: false,
    visaTypes: ['技術・人文知識・国際業務', '永住者'],
    requiredLevel: 'N3',
    posted: '3日前',
    benefits: ['制服支給', '社会保険完備', '宿泊割引', '交通費支給'],
    hasHousing: false,
  },

  // 清掃・設備
  {
    id: '13',
    company: 'クリーンサービスジャパン',
    companyType: '総合清掃会社',
    title: { ja: 'ビル清掃スタッフ（早朝・夜間）', en: 'Building Cleaning Staff (Early Morning / Night)', vi: 'Nhân viên vệ sinh tòa nhà (sáng sớm/tối)', zh: '大楼清洁人员（早晨/夜间）' },
    description: { ja: 'オフィスビル・商業施設の清掃業務。日本語はあいさつ程度でOK。早朝・夜間シフトあり。', en: 'Cleaning of office buildings and commercial facilities. Minimal Japanese required. Early morning and night shifts available.' },
    location: '神奈川県川崎市',
    prefecture: '神奈川県',
    salary: { min: 1100, max: 1300, type: 'hourly' },
    type: 'PART_TIME',
    industry: '清掃・設備管理',
    isMediflow: true,
    visaTypes: ['特定技能1号（ビルクリーニング）', '永住者', '留学'],
    requiredLevel: 'N5',
    posted: '4日前',
    benefits: ['交通費支給', '制服支給', '時間外手当'],
    hasHousing: false,
  },

  // 倉庫・物流
  {
    id: '14',
    company: 'ロジスティクス大手（アマゾン系）',
    companyType: '物流センター',
    title: { ja: '倉庫スタッフ・物流作業員', en: 'Warehouse / Logistics Staff', vi: 'Nhân viên kho hàng / logistics', zh: '仓库/物流工作人员' },
    description: { ja: '商品のピッキング・梱包・仕分け作業。立ち仕事が多い。体力のある方歓迎。夜勤は時給UP。', en: 'Product picking, packing, and sorting. Mostly standing work. Good physical fitness required. Night shift has higher pay.' },
    location: '千葉県市川市',
    prefecture: '千葉県',
    salary: { min: 1200, max: 1500, type: 'hourly' },
    type: 'PART_TIME',
    industry: '物流・倉庫',
    isMediflow: false,
    visaTypes: ['永住者', '日本人の配偶者', '定住者', '特定活動', '留学'],
    requiredLevel: 'N5',
    posted: '1日前',
    benefits: ['交通費支給', '深夜割増賃金', '制服支給'],
    hasHousing: false,
  },

  // 教育
  {
    id: '15',
    company: '英会話スクールNova',
    companyType: '語学スクール',
    title: { ja: '英語講師（英語ネイティブ・バイリンガル）', en: 'English Instructor (Native / Bilingual)', vi: 'Giáo viên tiếng Anh (bản ngữ/song ngữ)', zh: '英语讲师（母语/双语）', id: 'Instruktur Bahasa Inggris (Native/Bilingual)', tl: 'Guro ng Ingles (Native/Bilingual)', my: 'အင်္ဂလိပ်ဆရာ (Native/Bilingual)' },
    description: { ja: 'こども・大人向け英会話レッスン。英語ネイティブまたはバイリンガルの方。教育経験あれば尚可。', en: 'English conversation lessons for children and adults. Native or bilingual English required. Teaching experience a plus.', vi: 'Dạy tiếng Anh cho trẻ em và người lớn. Yêu cầu bản ngữ hoặc song ngữ tiếng Anh. Có kinh nghiệm giảng dạy là lợi thế.', zh: '为儿童和成人提供英语会话课程。需英语母语或双语者。有教学经验者优先。', id: 'Pelajaran percakapan bahasa Inggris untuk anak-anak dan orang dewasa. Diperlukan penutur asli atau bilingual bahasa Inggris.', tl: 'Mga aralin sa pakikipag-usap sa Ingles para sa mga bata at matatanda. Kailangan ng native o bilingual na Ingles.', my: 'ကလေးများနှင့်လူကြီးများအတွက်အင်္ဂလိပ်စကားပြောသင်တန်း။ Native သို့မဟုတ် bilingual အင်္ဂလိပ်လိုအပ်သည်။' },
    location: '東京都豊島区',
    prefecture: '東京都',
    salary: { min: 260000, max: 360000, type: 'monthly' },
    type: 'FULL_TIME',
    industry: '教育',
    isMediflow: false,
    visaTypes: ['技術・人文知識・国際業務', '永住者'],
    requiredLevel: 'N3',
    posted: '1週間前',
    benefits: ['社会保険完備', 'フレックスタイム', '日本語学習支援'],
    hasHousing: false,
  },

  // --- 追加求人（16〜36件） ---

  // 介護・福祉
  {
    id: '16',
    company: 'デイサービスセンターさわやか',
    companyType: '通所介護施設',
    title: { ja: '介護職員（パート）', en: 'Care Worker (Part-time)', vi: 'Nhân viên chăm sóc (bán thời gian)', zh: '护理员（兼职）', id: 'Pekerja Perawatan (Paruh Waktu)', tl: 'Manggagawa sa Pag-aalaga (Part-time)', my: 'စောင့်ရှောက်မှုဝန်ထမ်း (အချိန်ပိုင်း)' },
    description: { ja: '通所介護（デイサービス）での高齢者支援。送迎補助・入浴介助・レクリエーション補助。週3日〜勤務可能。', en: 'Support for elderly at day service center. Assist with transportation, bathing, and recreation. Available from 3 days/week.', vi: 'Hỗ trợ người cao tuổi tại trung tâm dịch vụ ban ngày. Hỗ trợ đưa đón, tắm rửa, hoạt động giải trí. Có thể làm từ 3 ngày/tuần.', zh: '日间护理服务中心的老年人支持。协助接送、洗澡、娱乐活动。每周可工作3天以上。', id: 'Dukungan untuk lansia di pusat layanan harian. Bantu transportasi, mandi, dan rekreasi. Tersedia dari 3 hari/minggu.', tl: 'Suporta para sa matatanda sa day service center. Tulungan sa transportasyon, paliligo, at libangan. Maaaring magtrabaho mula 3 araw/linggo.', my: 'နေ့စဉ်ဝန်ဆောင်မှုဌာနတွင်သက်ကြီးရွယ်အိုများကိုကူညီပါ။ သယ်ပို့ခြင်း၊ ရေချိုးခြင်း၊ ဖျော်ဖြေရေးလုပ်ငန်းများကူညီပါ။' },
    location: '神奈川県横浜市',
    prefecture: '神奈川県',
    salary: { min: 1200, max: 1450, type: 'hourly' },
    type: 'PART_TIME',
    industry: '介護・福祉',
    isMediflow: true,
    visaTypes: ['特定技能1号', '介護', '永住者'],
    requiredLevel: 'N4',
    posted: '2025-03-10',
    benefits: ['交通費全額支給', '社会保険完備（条件あり）', '昇給あり', '有給休暇'],
    hasHousing: false,
  },
  {
    id: '17',
    company: 'グループホームやすらぎ',
    companyType: '認知症対応型共同生活介護',
    title: { ja: '夜間介護スタッフ（正社員）', en: 'Nighttime Care Staff (Full-time)', vi: 'Nhân viên chăm sóc ban đêm (toàn thời gian)', zh: '夜间护理人员（正社员）', id: 'Staf Perawatan Malam (Full-time)', tl: 'Night Shift Care Staff (Full-time)', my: 'ညဘက်စောင့်ရှောက်မှုဝန်ထမ်း (အချိန်ပြည့်)' },
    description: { ja: '認知症高齢者グループホームでの夜間勤務。生活支援・安全確認・緊急対応。夜勤手当充実。', en: 'Night shift work at group home for elderly with dementia. Life support, safety checks, emergency response. Night shift allowance provided.', vi: 'Làm ca đêm tại nhà nhóm cho người cao tuổi mắc chứng mất trí nhớ. Hỗ trợ sinh hoạt, kiểm tra an toàn, xử lý khẩn cấp.', zh: '在痴呆老年人团体家庭夜间工作。生活支持、安全确认、紧急应对。夜班补贴丰厚。', id: 'Shift malam di group home untuk lansia dengan demensia. Dukungan kehidupan, pemeriksaan keamanan, respons darurat.', tl: 'Night shift sa group home para sa matatandang may demensya. Suporta sa pamumuhay, pagsusuri ng kaligtasan, pagtugon sa emergency.', my: 'Dementia သက်ကြီးရွယ်အိုများအတွက် group home တွင်ညဘက်လုပ်ပါ။ ဘဝပံ့ပိုးကူညီမှု၊ ဘေးကင်းရေးစစ်ဆေးမှု၊ အရေးပေါ်တုံ့ပြန်မှု။' },
    location: '大阪府堺市',
    prefecture: '大阪府',
    salary: { min: 240000, max: 300000, type: 'monthly' },
    type: 'FULL_TIME',
    industry: '介護・福祉',
    isMediflow: true,
    visaTypes: ['特定技能1号', '介護'],
    requiredLevel: 'N4',
    posted: '2025-03-05',
    benefits: ['夜勤手当', '社会保険完備', '交通費支給', '資格取得支援', '有給休暇10日'],
    hasHousing: true,
  },

  // IT・テクノロジー
  {
    id: '18',
    company: '株式会社グローバルテック',
    companyType: 'ITコンサルティング',
    title: { ja: 'バックエンドエンジニア（Python/Go）', en: 'Backend Engineer (Python/Go)', vi: 'Kỹ sư Backend (Python/Go)', zh: '后端工程师（Python/Go）', id: 'Engineer Backend (Python/Go)', tl: 'Backend Engineer (Python/Go)', my: 'Backend Engineer (Python/Go)' },
    description: { ja: 'クラウドインフラ設計・API開発・データ基盤構築。AWS/GCP経験者優遇。英語でのコミュニケーション可能な方。', en: 'Cloud infrastructure design, API development, data platform building. AWS/GCP experience preferred. English communication ability required.', vi: 'Thiết kế cơ sở hạ tầng đám mây, phát triển API, xây dựng nền tảng dữ liệu. Ưu tiên kinh nghiệm AWS/GCP.', zh: '云基础架构设计、API开发、数据平台构建。优先考虑有AWS/GCP经验者。需要英语沟通能力。', id: 'Desain infrastruktur cloud, pengembangan API, pembangunan platform data. Pengalaman AWS/GCP diutamakan.', tl: 'Disenyo ng cloud infrastructure, pagbuo ng API, pagtatayo ng data platform. AWS/GCP na karanasan ang mas pinagbibigyan.', my: 'Cloud infrastructure ဒီဇိုင်း၊ API ဖန်တီးမှု၊ data platform တည်ဆောက်မှု။ AWS/GCP အတွေ့အကြုံဦးစားပေးသည်။' },
    location: '東京都千代田区',
    prefecture: '東京都',
    salary: { min: 450000, max: 700000, type: 'monthly' },
    type: 'FULL_TIME',
    industry: 'IT・テクノロジー',
    isMediflow: false,
    visaTypes: ['技術・人文知識・国際業務', '高度専門職', '永住者'],
    requiredLevel: 'N3',
    posted: '2025-03-12',
    benefits: ['フルリモート可', 'フレックスタイム制', '社会保険完備', '書籍・学習費補助', 'ストックオプション'],
    hasHousing: false,
  },
  {
    id: '19',
    company: 'デジタルワークス株式会社',
    companyType: 'SaaS企業',
    title: { ja: 'データアナリスト（契約社員）', en: 'Data Analyst (Contract)', vi: 'Chuyên viên phân tích dữ liệu (hợp đồng)', zh: '数据分析师（合同制）', id: 'Analis Data (Kontrak)', tl: 'Data Analyst (Kontrata)', my: 'Data Analyst (စာချုပ်)' },
    description: { ja: 'BIツール（Tableau/Power BI）を使ったデータ分析・レポート作成。SQL/Pythonスキル必須。外国籍歓迎。', en: 'Data analysis and report creation using BI tools (Tableau/Power BI). SQL/Python skills required. Foreign nationals welcome.', vi: 'Phân tích dữ liệu và tạo báo cáo bằng công cụ BI (Tableau/Power BI). Cần kỹ năng SQL/Python. Chào đón người nước ngoài.', zh: '使用BI工具（Tableau/Power BI）进行数据分析和报告制作。需要SQL/Python技能。欢迎外国人。', id: 'Analisis data dan pembuatan laporan menggunakan alat BI. Keterampilan SQL/Python diperlukan. Warga negara asing disambut.', tl: 'Pagsusuri ng data at paggawa ng ulat gamit ang mga tool na BI. Kailangan ng SQL/Python na kasanayan.', my: 'BI tools သုံး၍ data analysis နှင့် report ရေးဆွဲမှု။ SQL/Python ကျွမ်းကျင်မှုလိုအပ်သည်။ နိုင်ငံခြားသားများကြိုဆိုသည်။' },
    location: '福岡県福岡市',
    prefecture: '福岡県',
    salary: { min: 320000, max: 450000, type: 'monthly' },
    type: 'CONTRACT',
    industry: 'IT・テクノロジー',
    isMediflow: false,
    visaTypes: ['技術・人文知識・国際業務', '特定活動'],
    requiredLevel: 'N3',
    posted: '2025-03-08',
    benefits: ['交通費支給', '社会保険完備', 'リモートワーク週2〜3日', '書籍購入補助'],
    hasHousing: false,
  },

  // 飲食・フード
  {
    id: '20',
    company: 'ラーメン魂一家',
    companyType: 'ラーメンチェーン',
    title: { ja: 'ラーメン店スタッフ（調理・接客）', en: 'Ramen Restaurant Staff (Kitchen & Service)', vi: 'Nhân viên quán mì ramen (bếp và phục vụ)', zh: '拉面店员工（厨房与服务）', id: 'Staf Restoran Ramen (Dapur & Pelayanan)', tl: 'Kawani ng Ramen Restaurant (Kusina at Serbisyo)', my: 'Ramen ဆိုင်ဝန်ထမ်း (မီးဖိုချောင်နှင့်ဝန်ဆောင်မှု)' },
    description: { ja: 'ラーメンの調理、接客、清掃。スープの仕込みから盛り付けまで一通り覚えられます。特定技能外食業の方歓迎。', en: 'Ramen cooking, customer service, cleaning. Learn everything from soup preparation to plating. SSW food service visa holders welcome.', vi: 'Nấu ramen, phục vụ khách hàng, dọn dẹp. Học mọi thứ từ nấu súp đến trình bày món ăn. Chào đón người có visa đặc định kỹ năng.', zh: '拉面烹饪、客户服务、清洁。从汤汁制作到摆盘全部学习。欢迎特定技能餐饮业签证持有者。', id: 'Memasak ramen, pelayanan pelanggan, kebersihan. Pelajari segalanya dari persiapan sup hingga penyajian.', tl: 'Pagluluto ng ramen, serbisyo sa customer, paglilinis. Matuto ng lahat mula sa paghahanda ng sopas hanggang pagpapatong.', my: 'Ramen ချက်ပြုတ်ခြင်း၊ ဖောက်သည်ဝန်ဆောင်မှု၊ သန့်ရှင်းရေး။ ဟင်းချိုပြင်ဆင်ခြင်းမှ ပန်းကန်ပြင်ဆင်ခြင်းအထိ သင်ယူနိုင်သည်။' },
    location: '神奈川県川崎市',
    prefecture: '神奈川県',
    salary: { min: 210000, max: 270000, type: 'monthly' },
    type: 'FULL_TIME',
    industry: '飲食・フード',
    isMediflow: true,
    visaTypes: ['特定技能1号（外食業）', '永住者'],
    requiredLevel: 'N4',
    posted: '2025-03-14',
    benefits: ['まかない食（1日1食）', '社会保険完備', '交通費支給', '制服貸与', '昇給・賞与あり'],
    hasHousing: true,
  },
  {
    id: '21',
    company: 'カフェ＆ベーカリーミオ',
    companyType: 'カフェチェーン',
    title: { ja: 'カフェスタッフ・バリスタ', en: 'Cafe Staff / Barista', vi: 'Nhân viên quán cà phê / Barista', zh: '咖啡厅员工/咖啡师', id: 'Staf Kafe / Barista', tl: 'Staff ng Cafe / Barista', my: 'ကော်ဖီဆိုင်ဝန်ထမ်း / Barista' },
    description: { ja: 'コーヒー・スイーツ提供、レジ操作、店内清掃。バリスタ経験者優遇。外国語接客できる方を積極採用。', en: 'Coffee and sweets service, cashier operation, store cleaning. Barista experience preferred. Actively hiring multilingual staff.', vi: 'Phục vụ cà phê và bánh ngọt, vận hành quầy tính tiền, vệ sinh cửa hàng. Ưu tiên kinh nghiệm barista.', zh: '提供咖啡和甜点、收银操作、店内清洁。有咖啡师经验者优先。积极招募会外语接待的员工。', id: 'Pelayanan kopi dan kue, operasi kasir, kebersihan toko. Pengalaman barista diutamakan.', tl: 'Serbisyo ng kape at matamis, operasyon ng cashier, paglilinis ng tindahan. Mas ginusto ang karanasan bilang barista.', my: 'ကော်ဖီနှင့်အချိုပွဲဝန်ဆောင်မှု၊ cashier လည်ပတ်မှု၊ ဆိုင်သန့်ရှင်းရေး။ Barista အတွေ့အကြုံဦးစားပေးသည်။' },
    location: '東京都渋谷区',
    prefecture: '東京都',
    salary: { min: 1150, max: 1400, type: 'hourly' },
    type: 'PART_TIME',
    industry: '飲食・フード',
    isMediflow: false,
    visaTypes: ['留学（資格外活動許可）', '永住者', '特定活動', '日本人の配偶者'],
    requiredLevel: 'N4',
    posted: '2025-03-16',
    benefits: ['交通費支給', 'ドリンク無料', 'シフト自由', '昇給あり'],
    hasHousing: false,
  },

  // 建設・土木
  {
    id: '22',
    company: '東北建設株式会社',
    companyType: '総合建設業',
    title: { ja: '鉄筋工・型枠大工', en: 'Rebar Worker / Formwork Carpenter', vi: 'Công nhân cốt thép / thợ ván khuôn', zh: '钢筋工/模板木工', id: 'Pekerja Besi Tulangan / Tukang Bekisting', tl: 'Manggagawa ng Rebar / Formwork Carpenter', my: 'သံကြိုးလုပ်သား / ဝေါသားလုပ်သား' },
    description: { ja: '建築現場での鉄筋組み立て・型枠設置作業。特定技能建設分野の方を積極採用中。未経験でも研修で丁寧に指導します。', en: 'Rebar assembly and formwork installation at construction sites. Actively hiring SSW construction. Training for inexperienced workers.', vi: 'Lắp ráp cốt thép và lắp đặt ván khuôn tại công trường xây dựng. Tích cực tuyển dụng kỹ năng đặc định xây dựng.', zh: '建筑工地的钢筋组装和模板安装。积极招募特定技能建设领域人才。未经验者也会认真培训。', id: 'Perakitan tulangan besi dan pemasangan bekisting di lokasi konstruksi. Aktif merekrut SSW konstruksi.', tl: 'Pag-aayos ng rebar at pag-install ng formwork sa mga construction site. Aktibong nagtatanggap ng SSW construction.', my: 'ဆောက်လုပ်ရေးကွင်းတွင် သံကြိုးတပ်ဆင်ခြင်းနှင့် formwork တပ်ဆင်ခြင်း။ SSW ဆောက်လုပ်ရေးကို တက်ကြွစွာစုဆောင်းသည်။' },
    location: '宮城県仙台市',
    prefecture: '宮城県',
    salary: { min: 270000, max: 350000, type: 'monthly' },
    type: 'FULL_TIME',
    industry: '建設・土木',
    isMediflow: true,
    visaTypes: ['特定技能1号（建設）', '技能実習'],
    requiredLevel: 'N5',
    posted: '2025-03-01',
    benefits: ['社会保険完備', '寮完備（個室）', '食事補助', '交通費支給', '各種資格取得支援'],
    hasHousing: true,
  },
  {
    id: '23',
    company: '北海道ハウス工業',
    companyType: '住宅建設業',
    title: { ja: '内装施工スタッフ（壁紙・床材）', en: 'Interior Construction Staff (Wallpaper & Flooring)', vi: 'Nhân viên thi công nội thất (giấy dán tường & sàn)', zh: '室内施工人员（壁纸·地板）', id: 'Staf Konstruksi Interior (Wallpaper & Lantai)', tl: 'Interior Construction Staff (Wallpaper & Flooring)', my: 'အတွင်းပိုင်းဆောက်လုပ်ရေးဝန်ထမ်း (နံရံကပ်ကြည် & ကြမ်းခင်း)' },
    description: { ja: '戸建て・マンションの内装工事（クロス貼り・フローリング設置）。丁寧な仕事ができる方。北海道の大自然の中で働けます。', en: 'Interior work for houses and condos (wallpaper, flooring installation). For detail-oriented workers. Work amidst Hokkaido nature.', vi: 'Công việc nội thất cho nhà và căn hộ (giấy dán tường, lắp sàn). Cho người tỉ mỉ. Làm việc trong thiên nhiên Hokkaido.', zh: '独栋住宅和公寓的内装工程（壁纸粘贴、地板安装）。适合细心的工作者。在北海道大自然中工作。', id: 'Pekerjaan interior untuk rumah dan kondominium. Untuk pekerja yang teliti. Bekerja di alam Hokkaido.', tl: 'Interior work para sa mga bahay at condo. Para sa mga detalyado at maingat na manggagawa. Magtrabaho sa kalikasan ng Hokkaido.', my: 'အိမ်နှင့် condo များအတွက် interior လုပ်ငန်း။ သေသပ်သောလုပ်သားများအတွက်။ Hokkaido သဘာဝတောအုပ်ထဲတွင်အလုပ်လုပ်နိုင်သည်။' },
    location: '北海道札幌市',
    prefecture: '北海道',
    salary: { min: 260000, max: 320000, type: 'monthly' },
    type: 'FULL_TIME',
    industry: '建設・土木',
    isMediflow: false,
    visaTypes: ['特定技能1号（建設）', '永住者', '定住者'],
    requiredLevel: 'N4',
    posted: '2025-02-25',
    benefits: ['社会保険完備', '寮完備', '車通勤可', '作業服・道具支給', '有給休暇'],
    hasHousing: true,
  },

  // 製造業
  {
    id: '24',
    company: '東海電子部品製造株式会社',
    companyType: '電子部品メーカー',
    title: { ja: '電子部品組み立てスタッフ', en: 'Electronic Parts Assembly Staff', vi: 'Nhân viên lắp ráp linh kiện điện tử', zh: '电子零件组装员工', id: 'Staf Perakitan Komponen Elektronik', tl: 'Staff ng Pagtitipon ng Electronic Parts', my: 'လျှပ်စစ်အစိတ်အပိုင်းတပ်ဆင်ရေးဝန်ထမ်း' },
    description: { ja: '基板への部品実装・検査・梱包。細かい作業が得意な方歓迎。クリーンルーム環境。完全週休2日制。', en: 'Component mounting on circuit boards, inspection, packaging. Detail-oriented workers welcome. Cleanroom environment. Complete 2-day weekend.', vi: 'Lắp ráp linh kiện lên bảng mạch, kiểm tra, đóng gói. Chào đón người giỏi công việc tỉ mỉ. Nghỉ 2 ngày cuối tuần.', zh: '向电路板安装零件、检查、包装。欢迎擅长细致工作的人。净室环境。完全双休制。', id: 'Pemasangan komponen pada papan sirkuit, inspeksi, pengemasan. Lingkungan cleanroom. Libur penuh 2 hari akhir pekan.', tl: 'Pag-mount ng component sa circuit board, inspeksyon, packaging. Maligayang pagdating sa detail-oriented na manggagawa.', my: 'Circuit board တွင် component တပ်ဆင်ခြင်း၊ စစ်ဆေးခြင်း၊ ထုပ်ပိုးခြင်း။ သေသပ်သောလုပ်သားများကြိုဆိုသည်။' },
    location: '愛知県豊田市',
    prefecture: '愛知県',
    salary: { min: 240000, max: 300000, type: 'monthly' },
    type: 'FULL_TIME',
    industry: '製造業',
    isMediflow: true,
    visaTypes: ['特定技能1号（製造業）', '技能実習', '定住者'],
    requiredLevel: 'N5',
    posted: '2025-03-10',
    benefits: ['社会保険完備', '寮完備（単身用）', '送迎バスあり', '食堂完備', '残業代全額支給'],
    hasHousing: true,
  },
  {
    id: '25',
    company: '大阪食品加工株式会社',
    companyType: '食品製造業',
    title: { ja: '食品製造スタッフ（惣菜・弁当）', en: 'Food Manufacturing Staff (Prepared Foods)', vi: 'Nhân viên sản xuất thực phẩm (thức ăn sẵn)', zh: '食品制造员工（熟食·便当）', id: 'Staf Produksi Makanan (Makanan Siap Saji)', tl: 'Staff ng Produksyon ng Pagkain', my: 'အစားအစာထုတ်လုပ်ရေးဝန်ထမ်း' },
    description: { ja: 'お弁当・惣菜の製造ライン作業。調理・盛り付け・ライン管理。食品衛生の知識が身につきます。未経験歓迎。', en: 'Bento and prepared food production line work. Cooking, plating, line management. Gain food hygiene knowledge. No experience needed.', vi: 'Công việc dây chuyền sản xuất cơm hộp và thức ăn sẵn. Nấu ăn, trình bày, quản lý dây chuyền. Không cần kinh nghiệm.', zh: '便当和熟食的生产线工作。烹饪、摆盘、产线管理。学习食品卫生知识。欢迎无经验者。', id: 'Pekerjaan jalur produksi bento dan makanan siap saji. Memasak, penyajian, manajemen jalur. Tanpa pengalaman dipersilakan.', tl: 'Trabaho sa production line ng bento at prepared food. Pagluluto, pagpapatong, pamamahala ng linya. Walang karanasan na kailangan.', my: 'Bento နှင့်ပြင်ဆင်ထားသောအစားအစာ ထုတ်လုပ်မှုလိုင်းလုပ်ငန်း။ ချက်ပြုတ်ခြင်း၊ ပြင်ဆင်ခြင်း၊ လိုင်းစီမံခန့်ခွဲမှု။ အတွေ့အကြုံမလိုအပ်ပါ။' },
    location: '大阪府大阪市',
    prefecture: '大阪府',
    salary: { min: 1100, max: 1350, type: 'hourly' },
    type: 'PART_TIME',
    industry: '製造業',
    isMediflow: false,
    visaTypes: ['特定技能1号（製造業）', '永住者', '定住者', '留学（資格外活動許可）'],
    requiredLevel: 'N5',
    posted: '2025-03-18',
    benefits: ['交通費支給', '深夜割増賃金', '社会保険（条件あり）', '制服貸与'],
    hasHousing: false,
  },

  // 医療・看護
  {
    id: '26',
    company: '医療法人誠心会クリニック',
    companyType: '内科・整形外科クリニック',
    title: { ja: '医療事務・受付スタッフ', en: 'Medical Clerical / Reception Staff', vi: 'Nhân viên hành chính y tế / lễ tân', zh: '医疗行政/前台员工', id: 'Staf Administrasi Medis / Resepsionis', tl: 'Medical Clerical / Reception Staff', my: 'ဆေးဘက်ဆိုင်ရာ Clerical / Reception ဝန်ထမ်း' },
    description: { ja: '患者の受付・電話対応・レセプト（診療報酬請求）業務。医療事務の資格あれば優遇。日本語でのコミュニケーション必須。', en: 'Patient reception, phone handling, medical billing. Medical clerical qualification preferred. Japanese communication required.', vi: 'Tiếp nhận bệnh nhân, xử lý điện thoại, lập hóa đơn y tế. Bằng cấp hành chính y tế được ưu tiên.', zh: '患者接待、电话接听、诊疗报酬申请业务。有医疗事务资格者优先。需要日语沟通能力。', id: 'Penerimaan pasien, penanganan telepon, penagihan medis. Kualifikasi administrasi medis diutamakan.', tl: 'Pagtanggap ng pasyente, paghawak ng telepono, medikal na billing. Mas ginusto ang kwalipikasyon sa medical clerical.', my: 'လူနာလက်ခံမှု၊ ဖုန်းကိုင်တွယ်မှု၊ ဆေးဘက်ဆိုင်ရာ ငွေတောင်းခံမှု။ ဆေးဘက်ဆိုင်ရာ Clerical အရည်အချင်းဦးစားပေးသည်။' },
    location: '埼玉県さいたま市',
    prefecture: '埼玉県',
    salary: { min: 200000, max: 255000, type: 'monthly' },
    type: 'FULL_TIME',
    industry: '医療・看護',
    isMediflow: true,
    visaTypes: ['技術・人文知識・国際業務', '永住者', '日本人の配偶者'],
    requiredLevel: 'N2',
    posted: '2025-03-07',
    benefits: ['社会保険完備', '交通費支給', '資格取得支援', '有給休暇12日', '年末年始休暇'],
    hasHousing: false,
  },

  // 農業・食品
  {
    id: '27',
    company: '北海道アグリコープ',
    companyType: '農業生産法人',
    title: { ja: '酪農・畜産スタッフ', en: 'Dairy / Livestock Farm Worker', vi: 'Nhân viên trang trại bò sữa / chăn nuôi', zh: '乳业/畜牧业工作人员', id: 'Pekerja Pertanian Susu / Peternakan', tl: 'Manggagawa sa Dairy / Livestock Farm', my: 'နို့ထွက် / မွေးမြူရေးဝန်ထမ်း' },
    description: { ja: '乳牛の飼育・搾乳・牛舎の清掃。北海道の広大な牧場で働きます。特定技能農業分野（畜産農業）対応。農業が好きな方大歓迎。', en: 'Dairy cow raising, milking, barn cleaning. Work on a vast Hokkaido ranch. SSW agriculture (livestock) eligible. Agriculture lovers welcome.', vi: 'Nuôi bò sữa, vắt sữa, dọn chuồng trại. Làm việc trên trang trại rộng lớn ở Hokkaido. Phù hợp SSW nông nghiệp.', zh: '饲养奶牛、挤奶、牛舍清洁。在北海道广阔牧场工作。特定技能农业领域（畜产农业）对应。', id: 'Pemeliharaan sapi perah, pemerahan susu, pembersihan kandang. Bekerja di ranch Hokkaido yang luas. SSW pertanian (peternakan) memenuhi syarat.', tl: 'Pagpapalaki ng dairy cow, pagpapagatas, paglilinis ng kamalig. Magtrabaho sa malawak na ranch ng Hokkaido.', my: 'နို့ဆိုင်နွားမွေးမြူခြင်း၊ နို့ညှစ်ခြင်း၊ ရာသင်ခန်းသန့်ရှင်းရေး။ Hokkaido ကျယ်ဝန်းသောမြေတွင်အလုပ်လုပ်ပါ။' },
    location: '北海道帯広市',
    prefecture: '北海道',
    salary: { min: 200000, max: 260000, type: 'monthly' },
    type: 'FULL_TIME',
    industry: '農業・食品',
    isMediflow: true,
    visaTypes: ['特定技能1号（農業）', '技能実習'],
    requiredLevel: 'N5',
    posted: '2025-02-20',
    benefits: ['寮完備（光熱費込）', '食事補助', '社会保険完備', '農業機械免許取得支援'],
    hasHousing: true,
  },
  {
    id: '28',
    company: '九州フルーツ農園',
    companyType: '農業生産法人',
    title: { ja: '果樹農業スタッフ（ぶどう・みかん）', en: 'Fruit Farm Worker (Grapes & Mandarins)', vi: 'Nhân viên trồng cây ăn quả (nho & quýt)', zh: '果树农业员工（葡萄·橘子）', id: 'Pekerja Kebun Buah (Anggur & Jeruk Mandarin)', tl: 'Manggagawa ng Fruit Farm (Ubas at Mandarin)', my: 'သစ်သီးစောင့်ရေှာက်ရေးဝန်ထမ်း (စပျစ်သီး & လိမ္မော်သီး)' },
    description: { ja: 'ぶどう・みかんの栽培管理・収穫・選別。農薬散布等の作業も含む。季節によって収穫量が変動。正社員として長期安定雇用。', en: 'Grape and mandarin cultivation, harvesting, sorting. Includes pesticide spraying. Harvests vary by season. Long-term stable employment as full-time.', vi: 'Trồng và thu hoạch nho và quýt, phân loại. Bao gồm phun thuốc trừ sâu. Thu hoạch thay đổi theo mùa.', zh: '葡萄和橘子的栽培管理、收获、分拣。包括农药喷洒作业。收获量随季节变化。', id: 'Budidaya, panen, sortasi anggur dan jeruk mandarin. Termasuk penyemprotan pestisida. Pekerjaan stabil jangka panjang.', tl: 'Pagsasaka, ani, at pag-uuri ng ubas at mandarin. Kabilang ang pag-spray ng pesticide. Stable na pangmatagalang trabaho.', my: 'စပျစ်သီးနှင့်လိမ္မော်သီး စိုက်ပျိုးစောင့်ရှောက်ခြင်း၊ ဆွတ်ခူးခြင်း၊ ရွေးချယ်ခြင်း။ ပိုးသတ်ဆေးဖျန်းခြင်းပါဝင်သည်။' },
    location: '福岡県久留米市',
    prefecture: '福岡県',
    salary: { min: 195000, max: 245000, type: 'monthly' },
    type: 'FULL_TIME',
    industry: '農業・食品',
    isMediflow: true,
    visaTypes: ['特定技能1号（農業）', '技能実習'],
    requiredLevel: 'N5',
    posted: '2025-03-03',
    benefits: ['寮完備', '社会保険完備', '農業機械資格取得支援', '季節賞与あり'],
    hasHousing: true,
  },

  // ホテル・観光
  {
    id: '29',
    company: 'リゾートホテル白雪',
    companyType: '温泉リゾートホテル',
    title: { ja: 'ホテル客室清掃スタッフ', en: 'Hotel Room Cleaning Staff', vi: 'Nhân viên dọn phòng khách sạn', zh: '酒店客房清洁人员', id: 'Staf Kebersihan Kamar Hotel', tl: 'Hotel Room Cleaning Staff', my: 'ဟိုတယ်အခန်းသန့်ရှင်းရေးဝန်ထမ်း' },
    description: { ja: '温泉旅館・リゾートホテルの客室清掃・ベッドメイキング・アメニティ補充。日本語はあいさつ程度でOK。チームワークを大切にする職場。', en: 'Room cleaning, bed making, amenity restocking at hot spring resort hotel. Minimal Japanese OK. Team-oriented workplace.', vi: 'Dọn phòng, làm giường, bổ sung tiện nghi tại khách sạn suối nước nóng. Tiếng Nhật cơ bản OK. Môi trường làm việc nhóm.', zh: '温泉旅馆、度假酒店的客房清洁、铺床、补充用品。日语打招呼程度OK。重视团队合作的职场。', id: 'Pembersihan kamar, merapikan tempat tidur, pengisian perlengkapan di hotel resort pemandian air panas.', tl: 'Paglilinis ng kwarto, paggawa ng kama, pagpuno ng amenity sa hot spring resort hotel. Minimal na Japanese OK.', my: 'ဟော့စပရင်း resort hotel တွင် အခန်းသန့်ရှင်းရေး၊ အိပ်ရာပြင်ဆင်ခြင်း၊ amenity ဖြည့်တင်းခြင်း။ ဂျပန်ဘာသာနည်းနည်းရရင်OK။' },
    location: '北海道函館市',
    prefecture: '北海道',
    salary: { min: 1050, max: 1250, type: 'hourly' },
    type: 'PART_TIME',
    industry: 'ホテル・観光',
    isMediflow: false,
    visaTypes: ['特定技能1号（宿泊）', '永住者', '留学（資格外活動許可）', '定住者'],
    requiredLevel: 'N5',
    posted: '2025-03-15',
    benefits: ['交通費支給', '制服貸与', '食事補助（社員食堂）', '温泉無料利用', '宿泊割引'],
    hasHousing: true,
  },
  {
    id: '30',
    company: '大阪ホテルインターナショナル',
    companyType: '国際ホテル',
    title: { ja: 'ホテルレストランスタッフ（多言語歓迎）', en: 'Hotel Restaurant Staff (Multilingual Welcome)', vi: 'Nhân viên nhà hàng khách sạn (đa ngôn ngữ chào đón)', zh: '酒店餐厅员工（欢迎多语言）', id: 'Staf Restoran Hotel (Multibahasa Disambut)', tl: 'Hotel Restaurant Staff (Multilingual na Malugod na Tinatanggap)', my: 'ဟိုတယ်စားသောက်ဆိုင်ဝန်ထမ်း (ဘာသာစကားအမျိုးမျိုးကြိုဆိုသည်)' },
    description: { ja: '国際ホテルの朝食・ランチビュッフェ運営。配膳・ドリンクサービス・料理補充。英語・中国語・日本語でのサービス。', en: 'Operate breakfast and lunch buffet at international hotel. Serving, drink service, food replenishment. Service in English, Chinese, Japanese.', vi: 'Vận hành buffet sáng và trưa tại khách sạn quốc tế. Phục vụ, phục vụ đồ uống. Dịch vụ bằng tiếng Anh, Trung, Nhật.', zh: '国际酒店的早午自助餐运营。配餐、饮料服务、补充菜品。英语、中文、日语服务。', id: 'Mengoperasikan buffet sarapan dan makan siang di hotel internasional. Melayani dalam bahasa Inggris, Mandarin, Jepang.', tl: 'Mag-operate ng breakfast at lunch buffet sa international hotel. Serbisyo sa Ingles, Tsino, Hapon.', my: 'နိုင်ငံတကာဟိုတယ်တွင် မနက်ဖြန်နှင့်နေ့လည် buffet လည်ပတ်မှု။ အင်္ဂလိပ်၊ တရုတ်၊ ဂျပန်ဘာသာဖြင့်ဝန်ဆောင်မှု။' },
    location: '大阪府大阪市',
    prefecture: '大阪府',
    salary: { min: 220000, max: 280000, type: 'monthly' },
    type: 'FULL_TIME',
    industry: 'ホテル・観光',
    isMediflow: false,
    visaTypes: ['技術・人文知識・国際業務', '特定技能1号（宿泊）', '永住者'],
    requiredLevel: 'N3',
    posted: '2025-03-11',
    benefits: ['社会保険完備', '制服支給', '交通費支給', 'まかない食あり', '宿泊特典'],
    hasHousing: false,
  },

  // 清掃・設備管理
  {
    id: '31',
    company: '関西クリーンパートナーズ',
    companyType: '総合メンテナンス会社',
    title: { ja: '病院・施設清掃スタッフ（正社員）', en: 'Hospital & Facility Cleaning Staff (Full-time)', vi: 'Nhân viên vệ sinh bệnh viện và cơ sở (toàn thời gian)', zh: '医院/设施清洁人员（正社员）', id: 'Staf Kebersihan Rumah Sakit & Fasilitas (Full-time)', tl: 'Hospital & Facility Cleaning Staff (Full-time)', my: 'ဆေးရုံ & အဆောက်အဦသန့်ရှင်းရေးဝန်ထမ်း (အချိန်ပြည့်)' },
    description: { ja: '病院・福祉施設の清掃・消毒業務。感染対策を徹底した作業。チームリーダー候補として採用。日本語基礎があれば大丈夫。', en: 'Cleaning and disinfection of hospitals and welfare facilities. Thorough infection control measures. Hired as team leader candidates. Basic Japanese OK.', vi: 'Vệ sinh và khử trùng bệnh viện, cơ sở phúc lợi. Biện pháp kiểm soát nhiễm trùng nghiêm ngặt. Ứng viên trưởng nhóm tiềm năng.', zh: '医院、福利设施的清洁消毒业务。彻底的感染对策。作为团队领导候选人录用。有日语基础即可。', id: 'Pembersihan dan disinfeksi rumah sakit dan fasilitas kesejahteraan. Tindakan pengendalian infeksi yang ketat.', tl: 'Paglilinis at disimpeksyon ng mga ospital at welfare facilities. Mahigpit na kontrol sa impeksyon.', my: 'ဆေးရုံနှင့် welfare ဌာနများ သန့်ရှင်းရေးနှင့် 消毒 လုပ်ငန်း။ ကူးစက်ရောဂါထိန်းချုပ်ရေးသေချာစေသည်။' },
    location: '大阪府吹田市',
    prefecture: '大阪府',
    salary: { min: 215000, max: 265000, type: 'monthly' },
    type: 'FULL_TIME',
    industry: '清掃・設備管理',
    isMediflow: true,
    visaTypes: ['特定技能1号（ビルクリーニング）', '永住者', '定住者'],
    requiredLevel: 'N5',
    posted: '2025-03-09',
    benefits: ['社会保険完備', '交通費全額支給', '制服支給', '昇給・昇格あり', '有給休暇'],
    hasHousing: false,
  },

  // 物流・倉庫
  {
    id: '32',
    company: '東京ロジスティクスセンター',
    companyType: '物流センター',
    title: { ja: 'フォークリフトオペレーター', en: 'Forklift Operator', vi: 'Người điều khiển xe nâng', zh: '叉车操作员', id: 'Operator Forklift', tl: 'Forklift Operator', my: 'Forklift မောင်းနှင်သူ' },
    description: { ja: '倉庫内でのフォークリフト操作（資格取得支援あり）、入出荷管理。普通免許・フォークリフト免許者優遇。物流の中心で活躍できます。', en: 'Forklift operation inside warehouse (license acquisition support available), inbound/outbound management. Driver\'s license preferred. Play a central role in logistics.', vi: 'Vận hành xe nâng trong kho (hỗ trợ lấy bằng), quản lý nhập xuất. Ưu tiên có bằng lái xe và xe nâng.', zh: '仓库内叉车操作（提供资格取得支援）、进出货管理。优先考虑有驾照和叉车证者。', id: 'Operasi forklift di dalam gudang (dukungan mendapatkan lisensi tersedia), manajemen masuk/keluar barang.', tl: 'Operasyon ng forklift sa loob ng bodega (may suporta sa pagkuha ng lisensya), pamamahala ng pasok/palabas.', my: 'ဂိုဒေါင်တွင် forklift မောင်းနှင်ခြင်း (လိုင်စင်ရရန်ပံ့ပိုးမှုရှိ)၊ ဝင်/ထွက်ကုန်စီမံခန့်ခွဲမှု။' },
    location: '東京都江東区',
    prefecture: '東京都',
    salary: { min: 250000, max: 320000, type: 'monthly' },
    type: 'FULL_TIME',
    industry: '物流・倉庫',
    isMediflow: false,
    visaTypes: ['永住者', '定住者', '日本人の配偶者', '特定活動'],
    requiredLevel: 'N4',
    posted: '2025-03-13',
    benefits: ['社会保険完備', '交通費支給', 'フォークリフト免許取得費用補助', '残業代全額支給', '夜勤手当'],
    hasHousing: false,
  },
  {
    id: '33',
    company: '宮城物流サービス株式会社',
    companyType: '配送・宅配業者',
    title: { ja: '軽貨物配送ドライバー（委託）', en: 'Light Freight Delivery Driver (Commissioned)', vi: 'Tài xế giao hàng hạng nhẹ (ủy thác)', zh: '轻货物配送司机（委托）', id: 'Pengemudi Pengiriman Barang Ringan (Dikontrak)', tl: 'Light Freight Delivery Driver (Komisyon)', my: 'ပေါ့ပါးကုန်တင်ပို့ရေးဒရိုင်ဘာ (ကော်မရှင်)' },
    description: { ja: '軽バン・軽トラックを使った宅配業務。個人委託契約。稼ぎたい方は歩合で高収入可能。普通自動車免許必須。日本語基礎あれば可。', en: 'Home delivery using light vans/trucks. Individual consignment contract. High income through commission for motivated workers. Driver\'s license required.', vi: 'Giao hàng tại nhà bằng xe tải nhỏ. Hợp đồng cá nhân. Thu nhập cao qua hoa hồng cho người chăm chỉ.', zh: '使用轻型面包车/卡车的宅配业务。个人委托合同。努力工作可获高收入。需要普通驾照。', id: 'Pengiriman rumah menggunakan van/truk ringan. Kontrak konsinyasi individu. Penghasilan tinggi melalui komisi.', tl: 'Pag-deliver sa bahay gamit ang light van/truck. Indibidwal na kontrata. Mataas na kita sa pamamagitan ng komisyon.', my: 'Light van/truck သုံး၍ အိမ်သို့ပို့ဆောင်ခြင်း။ တစ်ဦးချင်း ကော်မရှင်စာချုပ်။ ကြိုးစားသူများ ကော်မရှင်မှ ဝင်ငွေမြင့်မားနိုင်သည်။' },
    location: '宮城県仙台市',
    prefecture: '宮城県',
    salary: { min: 250000, max: 450000, type: 'monthly' },
    type: 'CONTRACT',
    industry: '物流・倉庫',
    isMediflow: false,
    visaTypes: ['永住者', '定住者', '日本人の配偶者'],
    requiredLevel: 'N4',
    posted: '2025-03-17',
    benefits: ['稼働時間自由', 'ガソリン代補助', '車両貸与あり（条件あり）'],
    hasHousing: false,
  },

  // 教育
  {
    id: '34',
    company: '多文化子ども教室NPOきずな',
    companyType: 'NPO法人',
    title: { ja: '外国につながる子ども支援スタッフ', en: 'Support Staff for Children with Foreign Backgrounds', vi: 'Nhân viên hỗ trợ trẻ em có gốc ngoại quốc', zh: '外籍背景儿童支持员工', id: 'Staf Pendukung Anak-anak Berlatar Belakang Asing', tl: 'Support Staff para sa mga Batang may Foreign Backgrounds', my: 'နိုင်ငံခြားနောက်ခံရှိသောကလေးများ ပံ့ပိုးကူညီသောဝန်ထမ်း' },
    description: { ja: '外国籍の子どもたちへの日本語学習支援、学習補助、保護者との通訳補助。ベトナム語・フィリピン語・中国語・インドネシア語等のスキルを活かせます。', en: 'Japanese language support and learning assistance for children of foreign nationals. Help with parent interpretation. Use Vietnamese, Tagalog, Chinese, Indonesian skills.', vi: 'Hỗ trợ học tiếng Nhật và học tập cho trẻ em nước ngoài. Hỗ trợ phiên dịch với phụ huynh. Sử dụng kỹ năng tiếng Việt, Tagalog, Trung, Indonesia.', zh: '为外国籍儿童提供日语学习支援、学习辅助、家长口译协助。可以活用越南语、菲律宾语、中文、印尼语等技能。', id: 'Dukungan belajar bahasa Jepang dan bantuan belajar untuk anak-anak asing. Gunakan keterampilan Vietnam, Tagalog, Mandarin, Indonesia.', tl: 'Suporta sa pag-aaral ng Japanese at tulong sa pag-aaral para sa mga bata ng dayuhang mamamayan. Gamitin ang mga kasanayan sa Vietnamese, Tagalog, Chinese, Indonesian.', my: 'နိုင်ငံခြားသားကလေးများအတွက် ဂျပန်ဘာသာသင်ကြားမှုပံ့ပိုးကူညီခြင်းနှင့် မိဘများနှင့်စကားပြန်ကူညီမှု။' },
    location: '神奈川県川崎市',
    prefecture: '神奈川県',
    salary: { min: 1300, max: 1600, type: 'hourly' },
    type: 'PART_TIME',
    industry: '教育',
    isMediflow: false,
    visaTypes: ['技術・人文知識・国際業務', '永住者', '定住者', '留学（資格外活動許可）'],
    requiredLevel: 'N3',
    posted: '2025-03-06',
    benefits: ['交通費支給', '研修あり', '社会的意義のある仕事'],
    hasHousing: false,
  },
  {
    id: '35',
    company: '東北日本語学校',
    companyType: '日本語学校',
    title: { ja: '日本語教師（非常勤・契約）', en: 'Japanese Language Teacher (Part-time/Contract)', vi: 'Giáo viên tiếng Nhật (bán thời gian/hợp đồng)', zh: '日语教师（非常勤·合同制）', id: 'Guru Bahasa Jepang (Paruh Waktu/Kontrak)', tl: 'Guro ng Wikang Hapon (Part-time/Kontrata)', my: 'ဂျပန်ဘာသာဆရာ (အချိန်ပိုင်း/စာချုပ်)' },
    description: { ja: '外国人留学生・社会人向けの日本語授業担当。日本語教師養成講座修了者または日本語教育能力検定試験合格者優遇。', en: 'Japanese language classes for foreign students and working adults. Graduates of Japanese teacher training courses or exam passers preferred.', vi: 'Dạy tiếng Nhật cho du học sinh nước ngoài và người đi làm. Ưu tiên người hoàn thành khóa đào tạo giáo viên tiếng Nhật.', zh: '面向外国留学生和社会人士的日语课程。优先考虑完成日语教师养成课程或通过日语教育能力检定考试者。', id: 'Kelas bahasa Jepang untuk pelajar asing dan karyawan. Lulusan kursus pelatihan guru bahasa Jepang diutamakan.', tl: 'Mga klase ng Japanese para sa mga dayuhang estudyante at nagtatrabaho. Mas ginusto ang mga nagtapos ng Japanese teacher training course.', my: 'နိုင်ငံခြားကျောင်းသားများနှင့်အလုပ်သမားများအတွက် ဂျပန်ဘာသာသင်တန်း။ ဂျပန်ဆရာလေ့ကျင့်ရေးသင်တန်းကိုပြီးဆုံးသူများဦးစားပေးသည်။' },
    location: '宮城県仙台市',
    prefecture: '宮城県',
    salary: { min: 220000, max: 300000, type: 'monthly' },
    type: 'CONTRACT',
    industry: '教育',
    isMediflow: false,
    visaTypes: ['技術・人文知識・国際業務', '永住者'],
    requiredLevel: 'N2',
    posted: '2025-03-04',
    benefits: ['交通費支給', '社会保険完備', '授業準備時間確保', '経験による昇給'],
    hasHousing: false,
  },

  // 小売・販売
  {
    id: '36',
    company: 'ドン・キホーテグループ',
    companyType: '総合ディスカウントストア',
    title: { ja: '多言語対応販売スタッフ（インバウンド）', en: 'Multilingual Sales Staff (Inbound Tourism)', vi: 'Nhân viên bán hàng đa ngôn ngữ (du lịch inbound)', zh: '多语言销售员工（入境旅游）', id: 'Staf Penjualan Multibahasa (Pariwisata Inbound)', tl: 'Multilingual Sales Staff (Inbound Tourism)', my: 'ဘာသာစကားအမျိုးမျိုးနိုင်သောရောင်းချရေးဝန်ထမ်း' },
    description: { ja: '外国人観光客向け接客・商品説明・会計業務。中国語・英語・韓国語等の語学スキルを活かせます。観光地近くの店舗配属。', en: 'Customer service, product explanation, cashier for foreign tourists. Use Chinese, English, Korean language skills. Assignment near tourist spots.', vi: 'Phục vụ khách du lịch nước ngoài, giới thiệu sản phẩm, thu ngân. Sử dụng kỹ năng tiếng Trung, Anh, Hàn.', zh: '面向外国游客的接待、商品说明、收银业务。可以活用中文、英语、韩语等语言技能。分配至景区附近店铺。', id: 'Layanan pelanggan, penjelasan produk, kasir untuk turis asing. Gunakan keterampilan bahasa Mandarin, Inggris, Korea.', tl: 'Serbisyo sa customer, paliwanag ng produkto, cashier para sa mga dayuhang turista. Gamitin ang Tsino, Ingles, Korean na kasanayan.', my: 'နိုင်ငံခြားသားခရီးသွားများအတွက် ဖောက်သည်ဝန်ဆောင်မှု၊ ကုန်ပစ္စည်းရှင်းလင်းချက်၊ cashier လုပ်ငန်းများ။' },
    location: '東京都台東区',
    prefecture: '東京都',
    salary: { min: 1200, max: 1500, type: 'hourly' },
    type: 'PART_TIME',
    industry: '飲食・フード',
    isMediflow: false,
    visaTypes: ['技術・人文知識・国際業務', '留学（資格外活動許可）', '永住者', '特定活動'],
    requiredLevel: 'N3',
    posted: '2025-03-19',
    benefits: ['交通費支給', 'シフト柔軟', '語学手当', '社員割引', '昇給あり'],
    hasHousing: false,
  },
];

const industries = ['介護・福祉', 'IT・テクノロジー', '飲食・フード', '建設・土木', '製造業', '医療・看護', '農業・食品', 'ホテル・観光', '清掃・設備管理', '物流・倉庫', '教育'];
const prefectures = ['東京都', '神奈川県', '大阪府', '埼玉県', '千葉県', '愛知県', '福岡県', '北海道', '宮城県'];

type Tab = 'all' | 'saved' | 'applied';

export default function JobsPage() {
  const params = useParams();
  const locale = params.locale as string;
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<Tab>('all');
  const [showFilter, setShowFilter] = useState(false);
  const [filterIndustry, setFilterIndustry] = useState('');
  const [filterPref, setFilterPref] = useState('');
  const [filterType, setFilterType] = useState('');
  const [filterHousing, setFilterHousing] = useState(false);
  const [savedIds, setSavedIds] = useState<string[]>([]);

  const filtered = jobs.filter((job) => {
    if (activeTab === 'saved') return savedIds.includes(job.id);
    const q = searchQuery.toLowerCase();
    const titleMatch = (job.title[locale] || job.title['en'] || '').toLowerCase().includes(q);
    const companyMatch = job.company.toLowerCase().includes(q);
    const industryMatch = job.industry.toLowerCase().includes(q);
    const qMatch = !q || titleMatch || companyMatch || industryMatch;
    const indMatch = !filterIndustry || job.industry === filterIndustry;
    const prefMatch = !filterPref || job.prefecture === filterPref;
    const typeMatch = !filterType || job.type === filterType;
    const housingMatch = !filterHousing || job.hasHousing;
    return qMatch && indMatch && prefMatch && typeMatch && housingMatch;
  });

  const hasFilter = filterIndustry || filterPref || filterType || filterHousing;

  const toggleSave = (id: string) => {
    setSavedIds(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  return (
    <div className="space-y-4">
      {/* ヘッダー */}
      <div>
        <h2 className="text-2xl font-bold text-slate-800">{t(locale, 'title')}</h2>
        <p className="text-sm text-text-light mt-1">{t(locale, 'subtitle')}</p>
      </div>

      {/* タブ */}
      <div className="flex gap-2">
        {(['all', 'saved'] as Tab[]).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              activeTab === tab
                ? 'bg-blue-600 text-white'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            {t(locale, tab === 'all' ? 'allJobs' : tab)}
            {tab === 'saved' && savedIds.length > 0 && (
              <span className="ml-1.5 bg-blue-100 text-blue-700 rounded-full px-1.5 text-xs">{savedIds.length}</span>
            )}
          </button>
        ))}
      </div>

      {/* 検索 */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
          <input
            type="text"
            placeholder={t(locale, 'search')}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-4 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          />
        </div>
        <button
          onClick={() => setShowFilter(!showFilter)}
          className={`rounded-xl border p-3 transition-colors flex items-center gap-1.5 ${hasFilter ? 'bg-blue-600 border-blue-600 text-white' : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-600'}`}
        >
          <Filter className="h-5 w-5" />
          {hasFilter && <span className="text-xs font-bold">ON</span>}
        </button>
      </div>

      {/* フィルターパネル */}
      <AnimatePresence>
        {showFilter && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <Card className="space-y-3">
              {/* 業種 */}
              <div>
                <p className="text-xs font-bold text-slate-500 mb-1.5">{t(locale, 'industry')}</p>
                <div className="flex flex-wrap gap-1.5">
                  {industries.map(ind => (
                    <button key={ind} onClick={() => setFilterIndustry(filterIndustry === ind ? '' : ind)}
                      className={`text-xs rounded-full px-2.5 py-1 border transition-colors ${filterIndustry === ind ? 'bg-blue-600 text-white border-blue-600' : 'border-slate-200 text-slate-600 hover:bg-slate-50'}`}>
                      {ind}
                    </button>
                  ))}
                </div>
              </div>
              {/* 都道府県 */}
              <div>
                <p className="text-xs font-bold text-slate-500 mb-1.5">エリア</p>
                <div className="flex flex-wrap gap-1.5">
                  {prefectures.map(p => (
                    <button key={p} onClick={() => setFilterPref(filterPref === p ? '' : p)}
                      className={`text-xs rounded-full px-2.5 py-1 border transition-colors ${filterPref === p ? 'bg-blue-600 text-white border-blue-600' : 'border-slate-200 text-slate-600 hover:bg-slate-50'}`}>
                      {p}
                    </button>
                  ))}
                </div>
              </div>
              {/* 雇用形態 */}
              <div>
                <p className="text-xs font-bold text-slate-500 mb-1.5">雇用形態</p>
                <div className="flex gap-1.5">
                  {[['FULL_TIME', 'fullTime'], ['PART_TIME', 'partTime'], ['CONTRACT', 'contract']].map(([val, key]) => (
                    <button key={val} onClick={() => setFilterType(filterType === val ? '' : val)}
                      className={`text-xs rounded-full px-2.5 py-1 border transition-colors ${filterType === val ? 'bg-blue-600 text-white border-blue-600' : 'border-slate-200 text-slate-600 hover:bg-slate-50'}`}>
                      {t(locale, key)}
                    </button>
                  ))}
                </div>
              </div>
              {/* 寮あり */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setFilterHousing(!filterHousing)}
                  className={`relative w-10 h-6 rounded-full transition-colors ${filterHousing ? 'bg-blue-600' : 'bg-slate-200'}`}
                >
                  <div className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-transform ${filterHousing ? 'translate-x-5' : 'translate-x-1'}`} />
                </button>
                <span className="text-sm text-slate-700">{t(locale, 'housing')}</span>
              </div>
              {/* クリア */}
              {hasFilter && (
                <button onClick={() => { setFilterIndustry(''); setFilterPref(''); setFilterType(''); setFilterHousing(false); }}
                  className="flex items-center gap-1.5 text-xs text-red-500 hover:text-red-700">
                  <X className="h-3 w-3" />{t(locale, 'clearFilter')}
                </button>
              )}
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 件数 */}
      <p className="text-sm text-slate-500">
        <span className="font-bold text-slate-800">{filtered.length}</span> {t(locale, 'jobCount')}
      </p>

      {/* 求人リスト */}
      {filtered.length === 0 ? (
        <Card className="text-center py-8 text-slate-500">
          <Briefcase className="h-8 w-8 mx-auto mb-2 text-slate-300" />
          {t(locale, 'noResults')}
        </Card>
      ) : (
        <div className="space-y-3">
          {filtered.map((job, index) => (
            <motion.div
              key={job.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card hoverable>
                {/* ヘッダー */}
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-start gap-2.5 flex-1 min-w-0">
                    <div className="h-11 w-11 rounded-xl bg-slate-100 flex items-center justify-center flex-shrink-0">
                      <Building2 className="h-5 w-5 text-slate-500" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[11px] text-text-light">{job.company}・{job.companyType}</p>
                      <p className="font-bold text-slate-800 text-sm leading-tight">
                        {job.title[locale] || job.title['en']}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => toggleSave(job.id)}
                    className="rounded-full p-1.5 hover:bg-slate-100 transition-colors flex-shrink-0"
                  >
                    <Bookmark className={`h-4 w-4 transition-colors ${savedIds.includes(job.id) ? 'fill-blue-500 text-blue-500' : 'text-slate-400'}`} />
                  </button>
                </div>

                {/* 説明文 */}
                <p className="text-xs text-slate-500 mb-2.5 line-clamp-2">
                  {job.description[locale] || job.description['en']}
                </p>

                {/* バッジ */}
                <div className="flex flex-wrap gap-1.5 mb-2.5">
                  {job.isMediflow && (
                    <Badge variant="info">
                      <BadgeCheck className="h-3 w-3 mr-0.5" />
                      {t(locale, 'mediflow')}
                    </Badge>
                  )}
                  <Badge variant="default">
                    {job.type === 'FULL_TIME' ? t(locale, 'fullTime') : job.type === 'PART_TIME' ? t(locale, 'partTime') : t(locale, 'contract')}
                  </Badge>
                  <Badge variant="default">JLPT {job.requiredLevel}〜</Badge>
                  {job.hasHousing && <Badge variant="success">🏠 {t(locale, 'housing')}</Badge>}
                  {job.visaTypes.slice(0, 1).map((v) => (
                    <Badge key={v} variant="outline">{v}</Badge>
                  ))}
                  {job.visaTypes.length > 1 && (
                    <Badge variant="outline">+{job.visaTypes.length - 1}</Badge>
                  )}
                </div>

                {/* 場所・投稿日 */}
                <div className="flex items-center gap-4 text-xs text-text-light mb-3">
                  <span className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" />{job.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />{job.posted}
                  </span>
                </div>

                {/* 給与・応募 */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-blue-600 font-bold text-sm">
                    <Banknote className="h-4 w-4" />
                    <span>
                      ¥{job.salary.min.toLocaleString()}〜¥{job.salary.max.toLocaleString()}
                      {job.salary.type === 'hourly' ? t(locale, 'perHour') : t(locale, 'perMonth')}
                    </span>
                  </div>
                  <Button size="sm">{t(locale, 'apply')}</Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
