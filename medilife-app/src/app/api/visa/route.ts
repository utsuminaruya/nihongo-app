import { NextRequest, NextResponse } from 'next/server';

// Demo visa data
const demoVisa = {
  id: 'visa-001',
  userId: 'user-001',
  residenceStatus: 'ENGINEER',
  visaNumber: 'TG-2024-123456',
  issueDate: '2024-05-28',
  expiryDate: '2026-05-28',
  status: 'ACTIVE',
  daysRemaining: 87,
  renewalProgress: 50,
  checklist: [
    { id: 1, item: '在留期間更新許可申請書', completed: true },
    { id: 2, item: 'パスポート', completed: true },
    { id: 3, item: '在留カード', completed: true },
    { id: 4, item: '証明写真', completed: true },
    { id: 5, item: '在職証明書', completed: false },
    { id: 6, item: '課税証明書', completed: false },
    { id: 7, item: '納税証明書', completed: false },
  ],
};

export async function GET() {
  return NextResponse.json({ visa: demoVisa });
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  return NextResponse.json({
    success: true,
    message: 'Visa information updated',
    data: { ...demoVisa, ...body },
  });
}
