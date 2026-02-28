'use client';

import { useParams } from 'next/navigation';
import { useState } from 'react';
import {
  Star,
  ExternalLink,
} from 'lucide-react';
import { Card, Badge, Button } from '@/components/ui';
import { motion } from 'framer-motion';

function t(locale: string, key: string): string {
  const texts: Record<string, Record<string, string>> = {
    title: { ja: '送金比較', vi: 'So sánh chuyển tiền', en: 'Remittance Compare', zh: '汇款比较', id: 'Perbandingan Remitansi', tl: 'Paghahambing ng Padala', my: 'ငွေလွှဲနှိုင်းယှဉ်' },
    subtitle: { ja: '最安の送金方法を見つけましょう', vi: 'Tìm cách chuyển tiền rẻ nhất', en: 'Find the cheapest way to send money', zh: '找到最便宜的汇款方式', id: 'Temukan cara transfer termurah', tl: 'Maghanap ng pinakamurang paraan', my: 'အသက်သာဆုံးနည်းလမ်းကိုရှာပါ' },
    amount: { ja: '送金額', vi: 'Số tiền', en: 'Amount', zh: '金额', id: 'Jumlah', tl: 'Halaga', my: 'ပမာဏ' },
    to: { ja: '送金先', vi: 'Gửi đến', en: 'Send to', zh: '收款国', id: 'Kirim ke', tl: 'Ipadala sa', my: 'ပို့ရန်' },
    fee: { ja: '手数料', vi: 'Phí', en: 'Fee', zh: '手续费', id: 'Biaya', tl: 'Bayad', my: 'အခကြေးငွေ' },
    rate: { ja: 'レート', vi: 'Tỷ giá', en: 'Rate', zh: '汇率', id: 'Kurs', tl: 'Rate', my: 'နှုန်း' },
    speed: { ja: '所要時間', vi: 'Thời gian', en: 'Speed', zh: '速度', id: 'Kecepatan', tl: 'Bilis', my: 'မြန်နှုန်း' },
    receives: { ja: '受取額', vi: 'Số tiền nhận', en: 'Receives', zh: '到账金额', id: 'Diterima', tl: 'Matatanggap', my: 'လက်ခံရရှိ' },
    bestRate: { ja: '最安', vi: 'Rẻ nhất', en: 'Best', zh: '最优', id: 'Terbaik', tl: 'Pinakamabuti', my: 'အကောင်းဆုံး' },
    fastest: { ja: '最速', vi: 'Nhanh nhất', en: 'Fastest', zh: '最快', id: 'Tercepat', tl: 'Pinakamabilis', my: 'အမြန်ဆုံး' },
    sendNow: { ja: '送金する', vi: 'Gửi ngay', en: 'Send Now', zh: '立即汇款', id: 'Kirim Sekarang', tl: 'Ipadala', my: 'ယခုပို့မည်' },
    compare: { ja: '比較結果', vi: 'Kết quả so sánh', en: 'Compare Results', zh: '比较结果', id: 'Hasil Perbandingan', tl: 'Resulta ng Paghahambing', my: 'နှိုင်းယှဉ်ရလဒ်' },
  };
  return texts[key]?.[locale] || texts[key]?.['en'] || key;
}

const countries = [
  { code: 'VN', name: 'Vietnam', currency: 'VND', flag: '🇻🇳' },
  { code: 'CN', name: 'China', currency: 'CNY', flag: '🇨🇳' },
  { code: 'PH', name: 'Philippines', currency: 'PHP', flag: '🇵🇭' },
  { code: 'ID', name: 'Indonesia', currency: 'IDR', flag: '🇮🇩' },
  { code: 'MM', name: 'Myanmar', currency: 'MMK', flag: '🇲🇲' },
  { code: 'NP', name: 'Nepal', currency: 'NPR', flag: '🇳🇵' },
];

const providers = [
  { name: 'Wise', logo: '💜', fee: 490, rate: 168.5, speed: '1-2日', rating: 4.8, isBest: true, isFastest: false },
  { name: 'SBI Remit', logo: '🏦', fee: 480, rate: 167.8, speed: '1日', rating: 4.5, isBest: false, isFastest: true },
  { name: 'Kyodai Remittance', logo: '🤝', fee: 2000, rate: 169.2, speed: '1-3日', rating: 4.3, isBest: false, isFastest: false },
  { name: 'Western Union', logo: '🌐', fee: 990, rate: 166.5, speed: '即時-1日', rating: 4.0, isBest: false, isFastest: false },
  { name: 'PayPay', logo: '📱', fee: 0, rate: 165.0, speed: '2-3日', rating: 4.2, isBest: false, isFastest: false },
];

export default function MoneyPage() {
  const params = useParams();
  const locale = params.locale as string;
  const [amount, setAmount] = useState('50000');
  const [selectedCountry, setSelectedCountry] = useState('VN');
  const country = countries.find((c) => c.code === selectedCountry) || countries[0];

  const amountNum = parseInt(amount) || 0;

  return (
    <div className="space-y-6">
      {/* ヘッダー */}
      <div>
        <h2 className="text-2xl font-bold text-slate-800">{t(locale, 'title')}</h2>
        <p className="text-sm text-text-light mt-1">{t(locale, 'subtitle')}</p>
      </div>

      {/* 送金条件 */}
      <Card className="bg-gradient-to-br from-blue-50 to-emerald-50 border-0">
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-slate-700 mb-1.5 block">{t(locale, 'amount')} (JPY)</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 font-medium">¥</span>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-8 pr-4 text-xl font-bold text-slate-800 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              />
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-slate-700 mb-1.5 block">{t(locale, 'to')}</label>
            <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
              {countries.map((c) => (
                <button
                  key={c.code}
                  onClick={() => setSelectedCountry(c.code)}
                  className={`flex items-center gap-1.5 rounded-full px-3 py-2 text-sm font-medium whitespace-nowrap border transition-colors ${
                    selectedCountry === c.code
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <span>{c.flag}</span>
                  <span>{c.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </Card>

      {/* 比較結果 */}
      <div>
        <h3 className="text-lg font-bold text-slate-800 mb-3">{t(locale, 'compare')}</h3>
        <div className="space-y-3">
          {providers.map((provider, index) => {
            const received = Math.round((amountNum - provider.fee) * provider.rate);
            return (
              <motion.div
                key={provider.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08 }}
              >
                <Card hoverable className={provider.isBest ? 'border-blue-300 bg-blue-50/30' : ''}>
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{provider.logo}</span>
                      <div>
                        <p className="font-semibold text-slate-800">{provider.name}</p>
                        <div className="flex items-center gap-1">
                          <Star className="h-3 w-3 text-amber-500" fill="currentColor" />
                          <span className="text-xs text-text-light">{provider.rating}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-1">
                      {provider.isBest && <Badge variant="info">{t(locale, 'bestRate')}</Badge>}
                      {provider.isFastest && <Badge variant="success">{t(locale, 'fastest')}</Badge>}
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-center mb-3">
                    <div className="rounded-lg bg-slate-50 p-2">
                      <p className="text-[10px] text-text-light">{t(locale, 'fee')}</p>
                      <p className="text-sm font-bold text-slate-800">¥{provider.fee.toLocaleString()}</p>
                    </div>
                    <div className="rounded-lg bg-slate-50 p-2">
                      <p className="text-[10px] text-text-light">{t(locale, 'rate')}</p>
                      <p className="text-sm font-bold text-slate-800">{provider.rate}</p>
                    </div>
                    <div className="rounded-lg bg-slate-50 p-2">
                      <p className="text-[10px] text-text-light">{t(locale, 'speed')}</p>
                      <p className="text-sm font-bold text-slate-800">{provider.speed}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-text-light">{t(locale, 'receives')}</p>
                      <p className="text-lg font-bold text-emerald-600">
                        {received.toLocaleString()} {country.currency}
                      </p>
                    </div>
                    <Button size="sm" variant="outline">
                      <ExternalLink className="h-3.5 w-3.5 mr-1" />
                      {t(locale, 'sendNow')}
                    </Button>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
