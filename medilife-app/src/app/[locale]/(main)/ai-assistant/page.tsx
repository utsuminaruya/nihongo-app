'use client';

import { useParams } from 'next/navigation';
import { useState, useRef, useEffect } from 'react';
import {
  Send,
  Bot,
  User,
  Shield,
  Stethoscope,
  MapPin,
  Briefcase,
  Scale,
  BookOpen,
  MessageCircle,
  Sparkles,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

type Category = 'general' | 'visa' | 'medical' | 'life' | 'work' | 'legal' | 'japanese';

function t(locale: string, key: string): string {
  const texts: Record<string, Record<string, string>> = {
    title: { ja: 'AIアシスタント「Medi」', vi: 'Trợ lý AI "Medi"', en: 'AI Assistant "Medi"', zh: 'AI助手 "Medi"', id: 'Asisten AI "Medi"', tl: 'AI Assistant "Medi"', my: 'AI အကူအညီ "Medi"' },
    subtitle: { ja: '何でも聞いてください！', vi: 'Hỏi bất cứ điều gì!', en: 'Ask me anything!', zh: '有什么都可以问我！', id: 'Tanyakan apa saja!', tl: 'Magtanong ng kahit ano!', my: 'ဘာမဆိုမေးပါ!' },
    placeholder: { ja: 'メッセージを入力...', vi: 'Nhập tin nhắn...', en: 'Type a message...', zh: '输入消息...', id: 'Ketik pesan...', tl: 'Mag-type ng mensahe...', my: 'စာရိုက်ပါ...' },
    greeting: {
      ja: 'こんにちは！私はMediLife のAIアシスタント「Medi（メディ）」です。\n\nビザ、医療、生活、仕事、日本語、法律など、日本での生活に関するあらゆる質問にお答えします。\n\n何でもお気軽にご相談ください！母語で話しかけていただいてOKです。',
      vi: 'Xin chào! Tôi là Medi, trợ lý AI của MediLife.\n\nTôi có thể giúp bạn về visa, y tế, cuộc sống, việc làm, tiếng Nhật, pháp luật và mọi vấn đề liên quan đến cuộc sống tại Nhật Bản.\n\nHãy thoải mái hỏi bất cứ điều gì bằng tiếng mẹ đẻ của bạn!',
      en: 'Hello! I\'m Medi, MediLife\'s AI assistant.\n\nI can help you with visa, healthcare, daily life, jobs, Japanese language, legal matters, and anything related to living in Japan.\n\nFeel free to ask anything in your native language!',
      zh: '你好！我是MediLife的AI助手"Medi"。\n\n我可以帮助您解答关于签证、医疗、生活、工作、日语、法律等在日本生活的各种问题。\n\n请用您的母语随时咨询！',
      id: 'Halo! Saya Medi, asisten AI MediLife.\n\nSaya bisa membantu Anda tentang visa, kesehatan, kehidupan sehari-hari, pekerjaan, bahasa Jepang, dan hukum.\n\nSilakan tanyakan apa saja dalam bahasa ibu Anda!',
      tl: 'Kamusta! Ako si Medi, ang AI assistant ng MediLife.\n\nMaaari kitang tulungan sa visa, kalusugan, pamumuhay, trabaho, Japanese language, at legal na bagay.\n\nMagtanong ng kahit ano sa sariling wika mo!',
      my: 'မင်္ဂလာပါ! ကျွန်ုပ်သည် MediLife ၏ AI အကူအညီ "Medi" ဖြစ်ပါသည်။\n\nဗီဇာ၊ ကျန်းမာရေး၊ နေ့စဉ်ဘဝ၊ အလုပ်၊ ဂျပန်စာ၊ ဥပဒေ စသည်တို့နှင့်ပတ်သက်ပြီး ကူညီနိုင်ပါသည်။\n\nမိခင်ဘာသာစကားဖြင့် မေးနိုင်ပါသည်!',
    },
    general: { ja: '総合', vi: 'Tổng hợp', en: 'General', zh: '综合', id: 'Umum', tl: 'General', my: 'အထွေထွေ' },
    visa: { ja: 'ビザ', vi: 'Visa', en: 'Visa', zh: '签证', id: 'Visa', tl: 'Visa', my: 'ဗီဇာ' },
    medical: { ja: '医療', vi: 'Y tế', en: 'Medical', zh: '医疗', id: 'Medis', tl: 'Medikal', my: 'ဆေးဘက်' },
    life: { ja: '生活', vi: 'Cuộc sống', en: 'Life', zh: '生活', id: 'Kehidupan', tl: 'Buhay', my: 'ဘဝ' },
    work: { ja: '仕事', vi: 'Việc làm', en: 'Work', zh: '工作', id: 'Kerja', tl: 'Trabaho', my: 'အလုပ်' },
    legal: { ja: '法律', vi: 'Pháp luật', en: 'Legal', zh: '法律', id: 'Hukum', tl: 'Legal', my: 'ဥပဒေ' },
    japanese: { ja: '日本語', vi: 'Tiếng Nhật', en: 'Japanese', zh: '日语', id: 'Bahasa Jepang', tl: 'Japanese', my: 'ဂျပန်စာ' },
    selectCategory: { ja: 'カテゴリ選択', vi: 'Chọn danh mục', en: 'Select Category', zh: '选择分类', id: 'Pilih Kategori', tl: 'Pumili ng Kategorya', my: 'အမျိုးအစားရွေးပါ' },
  };
  return texts[key]?.[locale] || texts[key]?.['en'] || key;
}

const categoryIcons: Record<Category, React.ComponentType<{ className?: string }>> = {
  general: MessageCircle,
  visa: Shield,
  medical: Stethoscope,
  life: MapPin,
  work: Briefcase,
  legal: Scale,
  japanese: BookOpen,
};

const categoryColors: Record<Category, string> = {
  general: 'bg-blue-100 text-blue-600 border-blue-200',
  visa: 'bg-indigo-100 text-indigo-600 border-indigo-200',
  medical: 'bg-emerald-100 text-emerald-600 border-emerald-200',
  life: 'bg-amber-100 text-amber-600 border-amber-200',
  work: 'bg-purple-100 text-purple-600 border-purple-200',
  legal: 'bg-slate-100 text-slate-600 border-slate-200',
  japanese: 'bg-rose-100 text-rose-600 border-rose-200',
};

export default function AiAssistantPage() {
  const params = useParams();
  const locale = params.locale as string;
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: t(locale, 'greeting') },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category>('general');
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
      const response = await fetch('/api/ai/assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMessage,
          locale,
          category: selectedCategory,
          history: messages.slice(-10),
        }),
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
        { role: 'assistant', content: locale === 'ja' ? '接続エラーです。' : 'Connection error.' },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-130px)]">
      {/* ヘッダー */}
      <div className="flex items-center gap-3 mb-3">
        <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-emerald-500 flex items-center justify-center">
          <Sparkles className="h-5 w-5 text-white" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-slate-800">{t(locale, 'title')}</h2>
          <p className="text-xs text-text-light">{t(locale, 'subtitle')}</p>
        </div>
      </div>

      {/* カテゴリ選択 */}
      <div className="mb-3 overflow-x-auto scrollbar-hide">
        <div className="flex gap-2 pb-1">
          {(Object.keys(categoryIcons) as Category[]).map((cat) => {
            const Icon = categoryIcons[cat];
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium whitespace-nowrap border transition-colors ${
                  isSelected
                    ? categoryColors[cat]
                    : 'bg-white text-slate-500 border-slate-200 hover:bg-slate-50'
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                {t(locale, cat)}
              </button>
            );
          })}
        </div>
      </div>

      {/* チャットエリア */}
      <div className="flex-1 overflow-y-auto space-y-3 mb-3 scrollbar-hide">
        <AnimatePresence>
          {messages.map((msg, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex gap-2 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.role === 'assistant' && (
                <div className="flex-shrink-0 h-8 w-8 rounded-full bg-gradient-to-br from-blue-500 to-emerald-500 flex items-center justify-center">
                  <Bot className="h-4 w-4 text-white" />
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
            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-500 to-emerald-500 flex items-center justify-center">
              <Bot className="h-4 w-4 text-white" />
            </div>
            <div className="bg-white border border-slate-200 rounded-2xl rounded-bl-md px-4 py-3">
              <div className="flex gap-1">
                <span className="h-2 w-2 rounded-full bg-slate-300 animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="h-2 w-2 rounded-full bg-slate-300 animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="h-2 w-2 rounded-full bg-slate-300 animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

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
          className="rounded-xl bg-gradient-to-br from-blue-600 to-emerald-500 p-3 text-white hover:opacity-90 disabled:opacity-50 transition-opacity"
        >
          <Send className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
