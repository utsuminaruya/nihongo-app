'use client';

import { useParams } from 'next/navigation';
import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Loader2, AlertCircle } from 'lucide-react';
import { Card } from '@/components/ui';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

function t(locale: string, key: string): string {
  const texts: Record<string, Record<string, string>> = {
    title: { ja: '症状チェッカー', vi: 'Kiểm tra triệu chứng', en: 'Symptom Checker', zh: '症状检查', id: 'Pemeriksa Gejala', tl: 'Symptom Checker', my: 'ရောဂါလက္ခဏာစစ်ဆေး' },
    subtitle: { ja: 'AIが症状から適切な診療科をご提案します', vi: 'AI đề xuất khoa phù hợp dựa trên triệu chứng', en: 'AI suggests the right department based on your symptoms', zh: 'AI根据症状推荐合适的科室', id: 'AI menyarankan departemen yang tepat', tl: 'AI ang magsu-suggest ng tamang departamento', my: 'AI က ရောဂါလက္ခဏာမှ သင့်တော်သောဌာနကို အကြံပြုသည်' },
    placeholder: { ja: '症状を入力してください（例：頭が痛い、お腹が痛い）', vi: 'Nhập triệu chứng (VD: đau đầu, đau bụng)', en: 'Describe your symptoms (e.g., headache, stomachache)', zh: '请输入症状（如：头痛、肚子疼）', id: 'Masukkan gejala (mis: sakit kepala)', tl: 'Ilagay ang iyong sintomas', my: 'ရောဂါလက္ခဏာရိုက်ထည့်ပါ' },
    disclaimer: { ja: '※これは医療診断ではありません。必ず医師の診察を受けてください。', vi: '※Đây không phải là chẩn đoán y tế. Hãy đến bác sĩ khám.', en: '※This is not a medical diagnosis. Please consult a doctor.', zh: '※这不是医疗诊断。请务必就医。', id: '※Ini bukan diagnosis medis. Silakan konsultasi dokter.', tl: '※Hindi ito medikal na diagnosis. Kumonsulta sa doktor.', my: '※ဤသည် ဆေးဘက်ရောဂါရှာဖွေခြင်းမဟုတ်ပါ။ ဆရာဝန်ကိုပြသပါ။' },
    quickSymptoms: { ja: 'よくある症状', vi: 'Triệu chứng thường gặp', en: 'Common Symptoms', zh: '常见症状', id: 'Gejala Umum', tl: 'Karaniwang Sintomas', my: 'အဖြစ်များသောရောဂါလက္ခဏာ' },
    emergency: { ja: '緊急の場合は119に電話', vi: 'Trường hợp khẩn cấp gọi 119', en: 'Call 119 for emergencies', zh: '紧急情况请拨打119', id: 'Hubungi 119 untuk darurat', tl: 'Tumawag sa 119 para sa emergency', my: 'အရေးပေါ်ဖြစ်ပါက 119 ဖုန်းခေါ်ပါ' },
    greeting: { ja: 'こんにちは！どんな症状がありますか？母語で入力していただければ、日本語の医療用語に翻訳してお伝えします。', vi: 'Xin chào! Bạn có triệu chứng gì? Hãy nhập bằng tiếng mẹ đẻ, tôi sẽ dịch sang thuật ngữ y tế tiếng Nhật.', en: 'Hello! What symptoms do you have? You can type in your native language and I\'ll translate to Japanese medical terms.', zh: '你好！您有什么症状？请用母语输入，我会翻译成日语医疗用语。', id: 'Halo! Gejala apa yang Anda alami? Ketik dalam bahasa ibu Anda.', tl: 'Kamusta! Ano ang iyong sintomas? Mag-type sa sariling wika mo.', my: 'မင်္ဂလာပါ! ဘယ်လိုရောဂါလက္ခဏာရှိပါသလဲ? မိခင်ဘာသာစကားဖြင့် ရိုက်ထည့်ပါ။' },
  };
  return texts[key]?.[locale] || texts[key]?.['en'] || key;
}

const quickSymptoms: Record<string, Record<string, string>> = {
  headache: { ja: '頭痛', vi: 'Đau đầu', en: 'Headache', zh: '头痛', id: 'Sakit kepala', tl: 'Sakit ng ulo', my: 'ခေါင်းကိုက်' },
  fever: { ja: '発熱', vi: 'Sốt', en: 'Fever', zh: '发烧', id: 'Demam', tl: 'Lagnat', my: 'ဖျားနာ' },
  stomachache: { ja: '腹痛', vi: 'Đau bụng', en: 'Stomachache', zh: '肚子疼', id: 'Sakit perut', tl: 'Sakit ng tiyan', my: 'ဝမ်းနာ' },
  cough: { ja: '咳', vi: 'Ho', en: 'Cough', zh: '咳嗽', id: 'Batuk', tl: 'Ubo', my: 'ချောင်းဆိုး' },
  backPain: { ja: '腰痛', vi: 'Đau lưng', en: 'Back Pain', zh: '腰痛', id: 'Sakit pinggang', tl: 'Sakit ng likod', my: 'ခါးနာ' },
  toothache: { ja: '歯痛', vi: 'Đau răng', en: 'Toothache', zh: '牙疼', id: 'Sakit gigi', tl: 'Sakit ng ngipin', my: 'သွားကိုက်' },
};

export default function SymptomCheckerPage() {
  const params = useParams();
  const locale = params.locale as string;
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: t(locale, 'greeting') },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages((prev) => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const response = await fetch('/api/ai/symptoms', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage, locale, history: messages }),
      });

      if (response.ok) {
        const data = await response.json();
        setMessages((prev) => [...prev, { role: 'assistant', content: data.reply }]);
      } else {
        setMessages((prev) => [
          ...prev,
          { role: 'assistant', content: locale === 'ja' ? 'エラーが発生しました。もう一度お試しください。' : 'An error occurred. Please try again.' },
        ]);
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: locale === 'ja' ? '接続エラーです。ネットワーク接続を確認してください。' : 'Connection error. Please check your network.' },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickSymptom = (symptomKey: string) => {
    const symptomText = quickSymptoms[symptomKey]?.[locale] || quickSymptoms[symptomKey]?.['en'] || symptomKey;
    setInput(symptomText);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-130px)]">
      {/* ヘッダー */}
      <div className="mb-4">
        <h2 className="text-xl font-bold text-slate-800">{t(locale, 'title')}</h2>
        <p className="text-xs text-text-light mt-1">{t(locale, 'subtitle')}</p>
      </div>

      {/* 免責事項 */}
      <Card className="bg-amber-50 border-amber-200 mb-4" padding="sm">
        <div className="flex items-start gap-2">
          <AlertCircle className="h-4 w-4 text-amber-600 flex-shrink-0 mt-0.5" />
          <p className="text-xs text-amber-700">{t(locale, 'disclaimer')}</p>
        </div>
      </Card>

      {/* チャットエリア */}
      <div className="flex-1 overflow-y-auto space-y-3 mb-4 scrollbar-hide">
        <AnimatePresence>
          {messages.map((msg, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex gap-2 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.role === 'assistant' && (
                <div className="flex-shrink-0 h-8 w-8 rounded-full bg-emerald-100 flex items-center justify-center">
                  <Bot className="h-4 w-4 text-emerald-600" />
                </div>
              )}
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm ${
                  msg.role === 'user'
                    ? 'bg-blue-600 text-white rounded-br-md'
                    : 'bg-white border border-slate-200 text-slate-800 rounded-bl-md'
                }`}
              >
                <p className="whitespace-pre-wrap">{msg.content}</p>
              </div>
              {msg.role === 'user' && (
                <div className="flex-shrink-0 h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                  <User className="h-4 w-4 text-blue-600" />
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
        {isLoading && (
          <div className="flex gap-2">
            <div className="h-8 w-8 rounded-full bg-emerald-100 flex items-center justify-center">
              <Bot className="h-4 w-4 text-emerald-600" />
            </div>
            <div className="bg-white border border-slate-200 rounded-2xl rounded-bl-md px-4 py-3">
              <Loader2 className="h-4 w-4 animate-spin text-slate-400" />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* クイック症状ボタン */}
      {messages.length <= 2 && (
        <div className="mb-3">
          <p className="text-xs font-medium text-text-light mb-2">{t(locale, 'quickSymptoms')}</p>
          <div className="flex flex-wrap gap-2">
            {Object.entries(quickSymptoms).map(([key, labels]) => (
              <button
                key={key}
                onClick={() => handleQuickSymptom(key)}
                className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-50 transition-colors"
              >
                {labels[locale] || labels['en']}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* 入力エリア */}
      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder={t(locale, 'placeholder')}
          className="flex-1 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          disabled={isLoading}
        />
        <button
          onClick={handleSend}
          disabled={!input.trim() || isLoading}
          className="rounded-xl bg-blue-600 p-3 text-white hover:bg-blue-700 disabled:opacity-50 transition-colors"
        >
          <Send className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
