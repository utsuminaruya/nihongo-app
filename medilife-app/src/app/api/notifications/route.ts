import { NextResponse } from 'next/server';

const demoNotifications = [
  { id: 'n1', type: 'visa', title: 'ビザ更新のお知らせ', titleEn: 'Visa Renewal Reminder', message: 'ビザの有効期限まで残り87日です。更新手続きを開始してください。', messageEn: '87 days until visa expiry. Please start renewal process.', read: false, createdAt: '2026-03-01T09:00:00Z' },
  { id: 'n2', type: 'health', title: '健康診断のお知らせ', titleEn: 'Health Checkup Reminder', message: '年次健康診断の時期です。最寄りの病院で予約してください。', messageEn: 'Time for annual health checkup. Book at your nearest hospital.', read: false, createdAt: '2026-02-28T10:00:00Z' },
  { id: 'n3', type: 'job', title: '新着求人', titleEn: 'New Job Match', message: 'あなたのプロフィールに合った新しい求人が見つかりました。', messageEn: 'New job matching your profile found.', read: true, createdAt: '2026-02-27T14:00:00Z' },
  { id: 'n4', type: 'life', title: '確定申告の時期です', titleEn: 'Tax Filing Season', message: '2025年分の確定申告期間は3月15日までです。', messageEn: 'Tax filing for 2025 is due by March 15.', read: true, createdAt: '2026-02-26T08:00:00Z' },
];

export async function GET() {
  return NextResponse.json({
    notifications: demoNotifications,
    unreadCount: demoNotifications.filter(n => !n.read).length,
  });
}
