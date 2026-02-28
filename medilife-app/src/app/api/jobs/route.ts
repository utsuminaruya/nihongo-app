import { NextRequest, NextResponse } from 'next/server';

const demoJobs = [
  { id: 'j1', title: 'フロントエンドエンジニア', titleEn: 'Frontend Engineer', company: 'テックスタート株式会社', location: '東京都渋谷区', salary: { min: 350000, max: 500000, currency: 'JPY' }, type: 'FULL_TIME', languages: ['ja-N2', 'en'], visaSupport: true, posted: '2026-02-25', tags: ['React', 'TypeScript', 'Next.js'] },
  { id: 'j2', title: '通訳・翻訳', titleEn: 'Interpreter/Translator', company: 'グローバルブリッジ株式会社', location: '東京都新宿区', salary: { min: 280000, max: 400000, currency: 'JPY' }, type: 'FULL_TIME', languages: ['ja-N1', 'vi'], visaSupport: true, posted: '2026-02-24', tags: ['Vietnamese', 'Translation', 'Business'] },
  { id: 'j3', title: '介護スタッフ', titleEn: 'Care Worker', company: 'やすらぎ介護サービス', location: '埼玉県さいたま市', salary: { min: 230000, max: 300000, currency: 'JPY' }, type: 'FULL_TIME', languages: ['ja-N3'], visaSupport: true, posted: '2026-02-23', tags: ['Care', 'Nursing', 'Welfare'] },
  { id: 'j4', title: 'レストランスタッフ', titleEn: 'Restaurant Staff', company: '和食レストラン花', location: '東京都港区', salary: { min: 1200, max: 1500, currency: 'JPY/h' }, type: 'PART_TIME', languages: ['ja-N4'], visaSupport: false, posted: '2026-02-22', tags: ['Food', 'Service', 'Part-time'] },
  { id: 'j5', title: 'ソフトウェアエンジニア', titleEn: 'Software Engineer', company: 'デジタルイノベーション株式会社', location: '東京都品川区', salary: { min: 400000, max: 700000, currency: 'JPY' }, type: 'FULL_TIME', languages: ['en'], visaSupport: true, posted: '2026-02-20', tags: ['Python', 'AWS', 'Backend'] },
];

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q')?.toLowerCase();
  const type = searchParams.get('type');

  let results = demoJobs;

  if (query) {
    results = results.filter(j =>
      j.title.toLowerCase().includes(query) ||
      j.titleEn.toLowerCase().includes(query) ||
      j.company.toLowerCase().includes(query) ||
      j.tags.some(tag => tag.toLowerCase().includes(query))
    );
  }

  if (type) {
    results = results.filter(j => j.type === type);
  }

  return NextResponse.json({ jobs: results, total: results.length });
}
