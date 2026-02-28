import { NextRequest, NextResponse } from 'next/server';

const demoHospitals = [
  { id: 'h1', name: '東京メディカルセンター', nameEn: 'Tokyo Medical Center', address: '東京都新宿区西新宿1-1-1', lat: 35.6896, lng: 139.6922, phone: '03-1234-5678', languages: ['ja', 'en', 'zh'], departments: ['内科', '外科', '小児科'], rating: 4.5, distance: 0.8, openNow: true },
  { id: 'h2', name: '新宿国際クリニック', nameEn: 'Shinjuku International Clinic', address: '東京都新宿区歌舞伎町2-2-2', lat: 35.6938, lng: 139.7034, phone: '03-2345-6789', languages: ['ja', 'en', 'vi', 'zh'], departments: ['内科', '皮膚科'], rating: 4.2, distance: 1.2, openNow: true },
  { id: 'h3', name: '渋谷総合病院', nameEn: 'Shibuya General Hospital', address: '東京都渋谷区渋谷3-3-3', lat: 35.6580, lng: 139.7016, phone: '03-3456-7890', languages: ['ja', 'en'], departments: ['内科', '外科', '産婦人科', '眼科'], rating: 4.0, distance: 2.5, openNow: false },
  { id: 'h4', name: 'さくらクリニック', nameEn: 'Sakura Clinic', address: '東京都中野区中野4-4-4', lat: 35.7074, lng: 139.6651, phone: '03-4567-8901', languages: ['ja', 'en', 'tl'], departments: ['内科', '歯科'], rating: 4.7, distance: 3.1, openNow: true },
];

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const language = searchParams.get('language');
  const department = searchParams.get('department');

  let results = demoHospitals;

  if (language) {
    results = results.filter(h => h.languages.includes(language));
  }
  if (department) {
    results = results.filter(h => h.departments.includes(department));
  }

  return NextResponse.json({ hospitals: results, total: results.length });
}
