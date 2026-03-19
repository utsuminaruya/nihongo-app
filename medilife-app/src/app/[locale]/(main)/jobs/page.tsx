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
  ChevronDown,
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
    title: { ja: '英語講師（英語ネイティブ・バイリンガル）', en: 'English Instructor (Native / Bilingual)', vi: 'Giáo viên tiếng Anh (bản ngữ/song ngữ)', zh: '英语讲师（母语/双语）' },
    description: { ja: 'こども・大人向け英会話レッスン。英語ネイティブまたはバイリンガルの方。教育経験あれば尚可。', en: 'English conversation lessons for children and adults. Native or bilingual English required. Teaching experience a plus.' },
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
];

const industries = ['介護・福祉', 'IT・テクノロジー', '飲食・フード', '建設・土木', '製造業', '医療・看護', '農業・食品', 'ホテル・観光', '清掃・設備管理', '物流・倉庫', '教育'];
const prefectures = ['東京都', '神奈川県', '大阪府', '埼玉県', '千葉県', '愛知県'];
const visaOptions = ['特定技能1号', '技術・人文知識・国際業務', '留学（資格外活動許可）', '永住者', '介護'];

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
