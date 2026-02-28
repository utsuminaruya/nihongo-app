'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle2, Circle, Upload, Info } from 'lucide-react';
import Link from 'next/link';

const translations: Record<string, Record<string, string>> = {
  ja: { title: '必要書類', back: '戻る', progress: '準備完了', upload: 'アップロード', required: '必須', optional: '任意', note: '※書類は原本が必要です。コピーは受付されません。' },
  en: { title: 'Required Documents', back: 'Back', progress: 'Completed', upload: 'Upload', required: 'Required', optional: 'Optional', note: 'Note: Original documents are required. Copies are not accepted.' },
  vi: { title: 'Tài liệu cần thiết', back: 'Quay lại', progress: 'Hoàn thành', upload: 'Tải lên', required: 'Bắt buộc', optional: 'Tùy chọn', note: 'Lưu ý: Cần tài liệu gốc.' },
  zh: { title: '所需文件', back: '返回', progress: '已完成', upload: '上传', required: '必需', optional: '可选', note: '注：需要原件，不接受复印件。' },
  id: { title: 'Dokumen yang Diperlukan', back: 'Kembali', progress: 'Selesai', upload: 'Unggah', required: 'Wajib', optional: 'Opsional', note: 'Catatan: Dokumen asli diperlukan.' },
  tl: { title: 'Mga Kinakailangang Dokumento', back: 'Bumalik', progress: 'Tapos na', upload: 'I-upload', required: 'Kailangan', optional: 'Opsyonal', note: 'Tandaan: Kailangan ang orihinal na dokumento.' },
  my: { title: 'လိုအပ်သောစာရွက်များ', back: 'နောက်သို့', progress: 'ပြီးစီး', upload: 'တင်ရန်', required: 'မဖြစ်မနေ', optional: 'ရွေးချယ်နိုင်', note: 'မှတ်ချက်: မူရင်းစာရွက်လိုအပ်သည်' },
};

function t(locale: string, key: string): string {
  return translations[locale]?.[key] || translations['en'][key] || key;
}

const documents = [
  { id: 1, name: { ja: '在留期間更新許可申請書', en: 'Visa Renewal Application Form' }, required: true, done: true },
  { id: 2, name: { ja: 'パスポート（原本）', en: 'Passport (Original)' }, required: true, done: true },
  { id: 3, name: { ja: '在留カード（原本）', en: 'Residence Card (Original)' }, required: true, done: true },
  { id: 4, name: { ja: '証明写真（4cm×3cm）', en: 'Photo (4cm×3cm)' }, required: true, done: true },
  { id: 5, name: { ja: '在職証明書', en: 'Employment Certificate' }, required: true, done: false },
  { id: 6, name: { ja: '住民税の課税証明書', en: 'Tax Certificate' }, required: true, done: false },
  { id: 7, name: { ja: '住民税の納税証明書', en: 'Tax Payment Certificate' }, required: true, done: false },
  { id: 8, name: { ja: '理由書', en: 'Reason Statement' }, required: false, done: false },
];

export default function VisaDocumentsPage() {
  const params = useParams();
  const locale = (params?.locale as string) || 'ja';
  const [checkedDocs, setCheckedDocs] = useState<Set<number>>(new Set(documents.filter(d => d.done).map(d => d.id)));

  const toggleDoc = (id: number) => {
    setCheckedDocs(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const total = documents.filter(d => d.required).length;
  const completed = documents.filter(d => d.required && checkedDocs.has(d.id)).length;
  const pct = Math.round((completed / total) * 100);

  return (
    <div className="pb-6">
      <div className="flex items-center gap-3 px-4 pt-4 mb-4">
        <Link href={`/${locale}/visa`}><ArrowLeft className="w-6 h-6 text-gray-600" /></Link>
        <h1 className="text-xl font-bold">{t(locale, 'title')}</h1>
      </div>

      {/* Progress */}
      <div className="mx-4 bg-blue-50 rounded-xl p-4 mb-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-blue-700">{t(locale, 'progress')}</span>
          <span className="text-sm font-bold text-blue-700">{completed}/{total}</span>
        </div>
        <div className="w-full bg-blue-200 rounded-full h-2">
          <motion.div initial={{ width: 0 }} animate={{ width: `${pct}%` }} className="bg-blue-600 h-2 rounded-full" />
        </div>
      </div>

      {/* Documents List */}
      <div className="mx-4 space-y-2">
        {documents.map((doc, i) => (
          <motion.div key={doc.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
            onClick={() => toggleDoc(doc.id)}
            className={`bg-white rounded-xl p-4 shadow-sm flex items-center gap-3 cursor-pointer transition ${checkedDocs.has(doc.id) ? 'ring-1 ring-emerald-200' : ''}`}>
            {checkedDocs.has(doc.id) ? (
              <CheckCircle2 className="w-6 h-6 text-emerald-500 flex-shrink-0" />
            ) : (
              <Circle className="w-6 h-6 text-gray-300 flex-shrink-0" />
            )}
            <div className="flex-1 min-w-0">
              <p className={`text-sm font-medium ${checkedDocs.has(doc.id) ? 'text-gray-400 line-through' : 'text-gray-700'}`}>
                {locale === 'ja' ? doc.name.ja : doc.name.en}
              </p>
              <span className={`text-xs ${doc.required ? 'text-red-500' : 'text-gray-400'}`}>
                {doc.required ? t(locale, 'required') : t(locale, 'optional')}
              </span>
            </div>
            {!checkedDocs.has(doc.id) && (
              <button className="text-blue-500 p-1" onClick={e => { e.stopPropagation(); }}>
                <Upload className="w-4 h-4" />
              </button>
            )}
          </motion.div>
        ))}
      </div>

      {/* Note */}
      <div className="mx-4 mt-4 bg-amber-50 rounded-xl p-3 flex items-start gap-2">
        <Info className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
        <p className="text-xs text-amber-700">{t(locale, 'note')}</p>
      </div>
    </div>
  );
}
