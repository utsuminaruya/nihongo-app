import { NextRequest, NextResponse } from 'next/server';

const providers = [
  { id: 'wise', name: 'Wise', fee: 750, rate: 0.00667, speed: '1-2日', rating: 4.8, logo: '🌐' },
  { id: 'westernunion', name: 'Western Union', fee: 1500, rate: 0.00650, speed: '即日', rating: 4.0, logo: '🟡' },
  { id: 'remitly', name: 'Remitly', fee: 499, rate: 0.00660, speed: '1-3日', rating: 4.5, logo: '💚' },
  { id: 'sendwave', name: 'SBI Remit', fee: 980, rate: 0.00665, speed: '1日', rating: 4.3, logo: '🔵' },
  { id: 'paypal', name: 'PayPal', fee: 499, rate: 0.00640, speed: '2-4日', rating: 3.8, logo: '🅿️' },
];

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const amount = parseFloat(searchParams.get('amount') || '100000');
  const country = searchParams.get('country') || 'VN';

  const countryMultiplier: Record<string, number> = { VN: 1, PH: 0.37, CN: 0.047, ID: 103.5, MM: 14.0 };
  const multiplier = countryMultiplier[country] || 1;

  const results = providers.map(p => ({
    ...p,
    sendAmount: amount,
    receiveAmount: Math.round(amount * p.rate * multiplier * 100) / 100,
    totalCost: amount + p.fee,
  }));

  results.sort((a, b) => b.receiveAmount - a.receiveAmount);

  return NextResponse.json({ providers: results, currency: country === 'VN' ? 'VND' : country === 'PH' ? 'PHP' : country === 'CN' ? 'CNY' : country === 'ID' ? 'IDR' : 'MMK' });
}
