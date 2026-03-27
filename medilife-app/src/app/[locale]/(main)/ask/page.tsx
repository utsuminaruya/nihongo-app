'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  ChevronDown,
  ChevronUp,
  FileText,
  Home,
  Stethoscope,
  Briefcase,
  AlertTriangle,
  Train,
  MessageCircleQuestion,
} from 'lucide-react';

// ─────────────────────────────────────────────
// 翻訳
// ─────────────────────────────────────────────
function t(locale: string, key: string): string {
  const texts: Record<string, Record<string, string>> = {
    title: {
      ja: '困ったことQ&A',
      vi: 'Hỏi đáp – Khó khăn tại Nhật',
      en: 'Japan Life Q&A',
      zh: '生活问答',
      id: 'Tanya Jawab',
      tl: 'Tanong at Sagot',
      my: 'မေးခွန်းနှင့်အဖြေ',
    },
    subtitle: {
      ja: '日本生活でよくある困りごとに答えます',
      vi: 'Giải đáp những vấn đề thường gặp khi sống tại Nhật Bản',
      en: 'Answers to common problems in Japan',
      zh: '解答在日本生活中常见的问题',
      id: 'Jawaban untuk masalah umum di Jepang',
      tl: 'Mga sagot sa mga karaniwang problema sa Japan',
      my: 'ဂျပန်တွင်နေထိုင်ရာတွင်ဖြစ်တတ်သောပြဿနာများကိုဖြေရှင်းပေးသည်',
    },
    search: {
      ja: 'キーワードで検索…',
      vi: 'Tìm kiếm theo từ khóa…',
      en: 'Search by keyword…',
      zh: '关键词搜索…',
      id: 'Cari kata kunci…',
      tl: 'Maghanap ng keyword…',
      my: 'Keyword ဖြင့်ရှာဖွေ…',
    },
    all: { ja: 'すべて', vi: 'Tất cả', en: 'All', zh: '全部', id: 'Semua', tl: 'Lahat', my: 'အားလုံး' },
    steps: { ja: '対処手順', vi: 'Các bước xử lý', en: 'Steps', zh: '处理步骤', id: 'Langkah', tl: 'Mga Hakbang', my: 'အဆင့်များ' },
    tip: { ja: 'ポイント', vi: 'Lưu ý', en: 'Tip', zh: '提示', id: 'Tips', tl: 'Tip', my: 'အကြံပြု' },
    noResults: {
      ja: '該当する質問が見つかりませんでした',
      vi: 'Không tìm thấy câu hỏi phù hợp',
      en: 'No questions found',
      zh: '未找到相关问题',
      id: 'Pertanyaan tidak ditemukan',
      tl: 'Walang nahanap na tanong',
      my: 'မေးခွန်းများမတွေ့ပါ',
    },
  };
  return texts[key]?.[locale] ?? texts[key]?.['en'] ?? key;
}

// ─────────────────────────────────────────────
// データ型
// ─────────────────────────────────────────────
type QA = {
  id: string;
  category: string;
  question: Record<string, string>;
  answer: Record<string, string>;
  steps?: Record<string, string[]>;
  tip?: Record<string, string>;
};

// ─────────────────────────────────────────────
// Q&A データ（ベトナム語優先）
// ─────────────────────────────────────────────
const QAS: QA[] = [
  // ── ビザ・在留 ──
  {
    id: 'visa-1',
    category: 'visa',
    question: {
      vi: 'Thẻ lưu trú (zairyu card) của tôi sắp hết hạn, phải làm gì?',
      ja: '在留カードの有効期限が近い。どうすればいい？',
      en: 'My residence card is expiring soon. What should I do?',
      zh: '我的在留卡快到期了，怎么办？',
      id: 'Kartu tinggal saya hampir habis, apa yang harus dilakukan?',
      tl: 'Malapit nang mag-expire ang aking residence card. Ano ang gagawin?',
      my: 'ကျွန်ုပ်၏နေထိုင်ခွင့်ကတ်သက်တမ်းနီးနေပြီ ဘာလုပ်ရမလဲ?',
    },
    answer: {
      vi: 'Bạn cần làm thủ tục gia hạn tại Cục quản lý xuất nhập cảnh (入国管理局 / Immigration Bureau). Nên nộp đơn trong vòng 3 tháng trước ngày hết hạn. Nếu hết hạn mà không gia hạn sẽ bị phạt hoặc bị trục xuất.',
      ja: '在留期間更新許可申請を入国管理局（出入国在留管理庁）で行う必要があります。期限の3ヶ月前から申請できます。期限切れになると不法滞在となり罰則や強制退去の対象になります。',
      en: 'You need to apply for a renewal of residence status at the Immigration Bureau. Applications can be submitted up to 3 months before expiry. Overstaying will result in penalties or deportation.',
      zh: '需要到入国管理局申请在留期间更新。可以在到期前3个月开始申请。超期滞留会受到处罚或强制遣返。',
      id: 'Anda perlu mengajukan perpanjangan di Biro Imigrasi (Nyukoku Kanrikyoku). Bisa diajukan 3 bulan sebelum habis masa berlaku.',
      tl: 'Kailangan mong mag-apply ng renewal sa Immigration Bureau. Maaaring mag-apply 3 buwan bago mag-expire.',
      my: 'လဝကရုံးတွင်နေထိုင်ခွင့်သက်တမ်းတိုးလျှောက်ထားရမည်။',
    },
    steps: {
      vi: [
        'Chuẩn bị hồ sơ: đơn xin gia hạn, ảnh 4×3, hộ chiếu, thẻ lưu trú hiện tại, giấy tờ thu nhập (bảng lương, tờ khai thuế)',
        'Đến Cục quản lý xuất nhập cảnh gần nhất (hoặc nộp đơn online tại e-Gov)',
        'Nộp hồ sơ và nhận phiếu xác nhận (受付票)',
        'Chờ thông báo: thường mất 2 tuần ~ 3 tháng',
        'Đến nhận thẻ lưu trú mới khi được thông báo',
      ],
      ja: [
        '必要書類を準備（申請書・写真・パスポート・現在の在留カード・収入証明書類）',
        '最寄りの出入国在留管理局へ持参、またはe-Govでオンライン申請',
        '申請書を提出し、受付票を受け取る',
        '審査結果を待つ（2週間〜3ヶ月程度）',
        '通知が来たら新しい在留カードを受け取る',
      ],
      en: [
        'Prepare documents: application form, 4×3 photo, passport, current residence card, income proof',
        'Visit the nearest Immigration Bureau or apply online via e-Gov',
        'Submit documents and receive a receipt slip',
        'Wait for review (2 weeks – 3 months)',
        'Pick up new residence card when notified',
      ],
    },
    tip: {
      vi: 'Trong thời gian chờ kết quả, bạn được phép ở lại Nhật hợp pháp dù thẻ đã hết hạn, miễn là bạn đã nộp đơn trước ngày hết hạn.',
      ja: '申請中は在留期限が切れていても適法に滞在できます（特例期間）。',
      en: 'While awaiting the result, you may legally stay even if your card has expired, as long as you applied before expiry.',
    },
  },
  {
    id: 'visa-2',
    category: 'visa',
    question: {
      vi: 'Tôi muốn thay đổi tư cách lưu trú (ví dụ: từ thực tập sinh sang kỹ sư). Cần làm gì?',
      ja: '在留資格を変更したい（例：技能実習→技術・人文知識・国際業務）。どうすればいい？',
      en: 'I want to change my visa status (e.g. technical intern to engineer). What should I do?',
      zh: '我想变更在留资格，该怎么做？',
      id: 'Saya ingin mengubah status visa. Apa yang harus dilakukan?',
      tl: 'Gusto kong baguhin ang aking visa status. Ano ang gagawin?',
      my: 'ဗီဇာအမျိုးအစားပြောင်းလဲလိုပါသည်',
    },
    answer: {
      vi: 'Bạn cần nộp đơn xin "thay đổi tư cách lưu trú" (在留資格変更許可申請) tại Cục quản lý xuất nhập cảnh. Cần có hợp đồng lao động mới hoặc giấy tờ chứng minh lý do thay đổi.',
      ja: '出入国在留管理庁へ「在留資格変更許可申請」を提出する必要があります。新しい会社との雇用契約書や活動内容を証明する書類が必要です。',
      en: 'You need to submit a "Change of Status of Residence" application at the Immigration Bureau, along with a new employment contract or proof of new activity.',
      zh: '需要到入国管理局提交"在留资格变更许可申请"，并附上新的雇用合同等证明材料。',
      id: 'Ajukan permohonan perubahan status di Biro Imigrasi dengan kontrak kerja baru.',
      tl: 'Mag-submit ng application para sa pagbabago ng status sa Immigration Bureau.',
      my: 'လဝကရုံးတွင်နေထိုင်ခွင့်အမျိုးအစားပြောင်းလဲခွင့်ပြုချက်လျှောက်ထားရမည်',
    },
    steps: {
      vi: [
        'Tìm được công ty mới và ký hợp đồng lao động (hoặc nhận được offer letter)',
        'Chuẩn bị hồ sơ: đơn xin thay đổi, hộ chiếu, thẻ lưu trú, hồ sơ công ty mới (giấy phép kinh doanh, bảng lương dự kiến)',
        'Nộp hồ sơ tại Cục quản lý xuất nhập cảnh',
        'Chờ kết quả (1 ~ 3 tháng)',
        'Nếu được chấp thuận, đến nhận thẻ lưu trú mới',
      ],
      ja: [
        '新しい雇用先を確保し、雇用契約書または内定通知書を取得',
        '申請書類を準備（申請書・パスポート・在留カード・新会社の書類）',
        '出入国在留管理局へ提出',
        '審査結果を待つ（1〜3ヶ月）',
        '許可が下りたら新しい在留カードを受け取る',
      ],
      en: [
        'Secure a new employer and obtain employment contract or offer letter',
        'Prepare documents (application form, passport, residence card, company documents)',
        'Submit at the Immigration Bureau',
        'Wait 1-3 months for review',
        'Collect new residence card upon approval',
      ],
    },
    tip: {
      vi: 'Không được bắt đầu làm việc ở công ty mới trước khi được cấp phép thay đổi tư cách lưu trú.',
      ja: '在留資格変更の許可が下りるまで、新しい会社での就労は開始できません。',
      en: 'You cannot start working at the new company until the change of status is approved.',
    },
  },

  // ── 住居 ──
  {
    id: 'housing-1',
    category: 'housing',
    question: {
      vi: 'Chủ nhà muốn đuổi tôi ra khỏi nhà trước hạn. Tôi có quyền gì?',
      ja: '大家さんが突然退去を求めてきた。どんな権利がある？',
      en: 'My landlord is demanding I leave before my contract ends. What are my rights?',
      zh: '房东突然要求我提前搬出，我有什么权利？',
      id: 'Pemilik rumah tiba-tiba meminta saya pindah. Apa hak saya?',
      tl: 'Hinihiling ng may-ari na umalis ako bago matapos ang kontrata. Ano ang aking karapatan?',
      my: 'နေအိမ်ပိုင်ရှင်က ကျွန်ုပ်ကိုအိမ်ထွက်ခိုင်းနေသည်',
    },
    answer: {
      vi: 'Theo luật Nhật Bản (Luật thuê nhà), chủ nhà không thể đơn phương chấm dứt hợp đồng mà không có lý do chính đáng. Nếu bạn không vi phạm hợp đồng, chủ nhà phải báo trước ít nhất 6 tháng và cần có "lý do chính đáng" (seiryu). Hãy liên hệ với cơ quan tư vấn pháp lý miễn phí.',
      ja: '借地借家法により、正当な事由なく賃貸人（大家）が賃借人（入居者）に退去を求めることは非常に困難です。正当事由がない場合、6ヶ月前の通知が必要で、かつ立退料の支払いが必要な場合があります。無料法律相談窓口に相談しましょう。',
      en: 'Under Japanese tenancy law, landlords cannot unilaterally terminate a lease without "just cause". If you have not violated the contract, you have strong protections. Seek free legal advice.',
      zh: '根据日本《借地借家法》，房东不能无正当理由强制赶走租客。建议咨询免费法律援助窗口。',
      id: 'Menurut hukum Jepang, pemilik rumah tidak bisa mengusir penyewa tanpa alasan sah. Konsultasikan ke layanan hukum gratis.',
      tl: 'Sa batas ng Japan, hindi basta-basta makapag-alis ng nangungupahan ang may-ari nang walang makatwirang dahilan.',
      my: 'ဂျပန်ဥပဒေအရ၊ မှောင်မိုက်ကြောင်းမရှိဘဲ နေအိမ်ပိုင်ရှင်သည်ငှားသူကိုမနှင်ထုတ်နိုင်ပါ',
    },
    steps: {
      vi: [
        'Đọc lại hợp đồng thuê nhà để kiểm tra điều khoản',
        'Không ký bất kỳ giấy tờ nào khi bị áp lực',
        'Chụp ảnh/ghi lại các yêu cầu của chủ nhà (tin nhắn, email)',
        'Liên hệ Trung tâm tư vấn pháp lý miễn phí (法テラス / Hōterasu, số 0570-078374)',
        'Nếu cần, nhờ luật sư hoặc tổ chức hỗ trợ người nước ngoài can thiệp',
      ],
      ja: [
        '賃貸借契約書を確認し、違反がないかチェック',
        '大家からの要求文書（メール・手紙）を保存',
        '即座にサインしない',
        '法テラス（0570-078374）や市区町村の法律相談窓口に連絡',
        '必要に応じて弁護士に相談',
      ],
      en: [
        'Review your lease contract carefully',
        'Save all communications from the landlord',
        'Do NOT sign anything under pressure',
        'Contact Hōterasu (0570-078374) for free legal advice',
        'Consult a lawyer if needed',
      ],
    },
    tip: {
      vi: 'Hōterasu (法テラス) cung cấp tư vấn pháp lý miễn phí bằng nhiều ngôn ngữ, kể cả tiếng Việt. Điện thoại: 0570-078374.',
      ja: '法テラス（0570-078374）は無料で法律相談が受けられます。外国語対応可。',
      en: 'Hōterasu (0570-078374) offers free legal consultations in multiple languages.',
    },
  },
  {
    id: 'housing-2',
    category: 'housing',
    question: {
      vi: 'Tôi muốn thuê nhà nhưng bị từ chối vì là người nước ngoài. Có thể làm gì?',
      ja: '外国人だから部屋を貸してもらえない。どうすればいい？',
      en: 'I was refused rental housing because I am a foreigner. What can I do?',
      zh: '因为是外国人被拒绝租房，怎么办？',
      id: 'Saya ditolak sewa rumah karena orang asing. Apa yang bisa dilakukan?',
      tl: 'Tinanggihan ako ng bahay dahil banyaga ako. Ano ang magagawa?',
      my: 'နိုင်ငံခြားသားဖြစ်၍အိမ်ငှားခြင်းကိုငြင်းဆိုထားသည်',
    },
    answer: {
      vi: 'Đây là hành vi phân biệt đối xử trái pháp luật. Bạn có thể nhờ Tổ chức hỗ trợ ngoại kiều (外国人生活支援センター) hoặc sử dụng công ty bảo lãnh (保証会社) để tìm nhà. Nhiều chính quyền địa phương có chương trình hỗ trợ tìm nhà cho người nước ngoài.',
      ja: '外国人を理由とした入居拒否は法的に問題のある差別行為です。外国人生活支援センターや自治体の外国人相談窓口、公益財団法人日本賃貸住宅管理協会などに相談できます。保証会社を利用することも有効です。',
      en: 'Refusing to rent due to nationality is discriminatory. Contact your local foreign resident support center or use a guarantor company. Many cities have housing support programs for foreigners.',
      zh: '以外国人身份拒绝租房属于歧视行为。可咨询外国人生活支援中心或使用保证公司。',
      id: 'Penolakan karena status asing merupakan diskriminasi. Hubungi pusat dukungan warga asing setempat.',
      tl: 'Ang pagtanggid dahil banyaga ay diskriminasyon. Makipag-ugnayan sa lokal na sentro ng suporta para sa dayuhan.',
      my: 'နိုင်ငံခြားသားဖြစ်၍ငြင်းဆိုခြင်းသည်ခွဲခြားဆက်ဆံမှုဖြစ်သည်',
    },
    steps: {
      vi: [
        'Tìm đại lý bất động sản chuyên cho người nước ngoài thuê nhà (ví dụ: SUUMO, Leopalace21, Global Agents)',
        'Chuẩn bị bảo lãnh: tìm công ty bảo lãnh (家賃保証会社) hoặc người bảo lãnh',
        'Liên hệ JNTO hoặc cơ quan hỗ trợ người nước ngoài tại địa phương',
        'Nếu bị phân biệt đối xử rõ ràng, báo cáo đến Ủy ban nhân quyền (人権擁護委員)',
      ],
      ja: [
        '外国人向け不動産会社（SUUMO・Leopalace21・Global Agentsなど）を利用する',
        '家賃保証会社を利用する',
        '市区町村の外国人相談窓口に相談する',
        '差別的対応をされた場合は法務省の人権擁護委員に相談',
      ],
      en: [
        'Use real estate agencies that specialize in foreign residents',
        'Use a guarantor company (yachin hosho kaisha)',
        'Contact your city\'s foreign resident support office',
        'Report discrimination to the Human Rights Commission (Jinken Yogo Iin)',
      ],
    },
    tip: {
      vi: 'Mạng SUUMO và Homes.co.jp có bộ lọc "外国人可" (cho phép người nước ngoài). Hãy dùng tính năng này để tìm kiếm nhanh hơn.',
      ja: 'SUUMO・Homes.co.jpで「外国人可」フィルターを使うと効率的に探せます。',
      en: 'Use the "外国人可" (foreigners welcome) filter on SUUMO or Homes.co.jp.',
    },
  },

  // ── 医療 ──
  {
    id: 'health-1',
    category: 'healthcare',
    question: {
      vi: 'Tôi bị đau bụng dữ dội vào ban đêm. Phải gọi đến đâu?',
      ja: '夜中に激しい腹痛。どこに電話すればいい？',
      en: 'I have severe stomach pain at night. Who should I call?',
      zh: '半夜腹痛剧烈，应该打什么电话？',
      id: 'Saya sakit perut parah di malam hari. Harus hubungi siapa?',
      tl: 'Matinding sakit ng tiyan sa gabi. Sino ang tatawagan?',
      my: 'ညဘက်ဝမ်းနာမကြည်ဖြစ်နေသည်',
    },
    answer: {
      vi: 'Nếu rất nghiêm trọng, gọi cấp cứu 119. Nếu nhẹ hơn, gọi đường dây tư vấn y tế #7119 (hoạt động 24/7 tại nhiều tỉnh) để được hướng dẫn. Bạn cũng có thể tìm phòng khám trực ca đêm (夜間急患センター) gần nhất.',
      ja: '重篤な場合は救急車（119番）を呼んでください。緊急度が低い場合は救急安心センター（#7119、24時間）に電話して指示を仰ぐと良いです。夜間救急外来（救急病院・夜間急患センター）を受診する方法もあります。',
      en: 'For serious cases, call 119 (ambulance). For less urgent situations, call #7119 (24hr medical advice line available in many prefectures). You can also search for a night emergency clinic nearby.',
      zh: '严重情况拨打119急救。不太紧急时拨打#7119（24小时医疗咨询热线）。',
      id: 'Untuk darurat serius, hubungi 119. Untuk yang kurang gawat, hubungi #7119 (konsultasi medis 24 jam).',
      tl: 'Para sa seryosong kaso, tumawag ng 119. Para sa hindi gaanong urgent, tumawag ng #7119.',
      my: 'အရေးပေါ်ဆိုလျှင်119ဖုန်းခေါ်ပါ',
    },
    steps: {
      vi: [
        'Đánh giá mức độ nghiêm trọng: nếu đau không chịu được, gọi 119 ngay',
        'Nếu chịu được, gọi #7119 (tư vấn y tế 24h) để được chỉ dẫn',
        'Hoặc tìm kiếm "夜間救急" trên Google Maps để tìm cơ sở y tế mở cửa ban đêm',
        'Chuẩn bị: thẻ bảo hiểm y tế (保険証), thẻ lưu trú, tiền (khoảng 5,000-15,000 yên)',
        'Khi đến bệnh viện: nói rõ triệu chứng "お腹が痛いです" (oBara ga itai desu)',
      ],
      ja: [
        '症状を判断：耐えられない激痛→119番、様子を見られる→#7119',
        '#7119（救急安心センター）に電話して指示を仰ぐ',
        'Googleマップで「夜間救急」を検索して受診先を見つける',
        '持参品：保険証・在留カード・現金（5,000〜15,000円程度）',
        '受診時：「お腹が痛いです」「いつから」「どんな痛みか」を伝える',
      ],
      en: [
        'Assess severity: unbearable pain → call 119; manageable → call #7119',
        'Call #7119 for medical advice and directions',
        'Search "夜間救急" on Google Maps for nearby night clinics',
        'Prepare: health insurance card, residence card, cash (¥5,000-15,000)',
        'At the hospital: say "お腹が痛いです" (stomach hurts)',
      ],
    },
    tip: {
      vi: 'Ứng dụng "医療機関検索" của Bộ Y tế Nhật Bản giúp tìm bệnh viện mở cửa ban đêm. Tại Tokyo, gọi #7119 để được hỗ trợ bằng tiếng Việt và tiếng Anh.',
      ja: '厚生労働省の「医療機関検索」アプリや各都道府県の夜間救急検索サービスを活用しましょう。東京の#7119では英語・中国語等の多言語対応があります。',
      en: 'The Ministry of Health\'s "医療機関検索" app helps find open clinics. In Tokyo, #7119 offers multilingual support.',
    },
  },
  {
    id: 'health-2',
    category: 'healthcare',
    question: {
      vi: 'Tôi không có bảo hiểm y tế. Đi khám bệnh sẽ tốn bao nhiêu tiền?',
      ja: '健康保険に入っていない。病院に行ったらいくらかかる？',
      en: 'I don\'t have health insurance. How much will a hospital visit cost?',
      zh: '我没有健康保险，去医院要花多少钱？',
      id: 'Saya tidak punya asuransi kesehatan. Berapa biaya ke rumah sakit?',
      tl: 'Wala akong health insurance. Magkano ang gastos sa ospital?',
      my: 'ကျန်းမာရေးအာမခံမရှိပါ၊ ဆေးရုံသွားလျှင်ဘယ်လောက်ကုန်မလဲ',
    },
    answer: {
      vi: 'Không có bảo hiểm y tế, bạn phải trả toàn bộ chi phí (10割負担). Một lần khám thông thường có thể tốn 10,000-30,000 yên hoặc hơn. Quan trọng là: nếu bạn đang cư trú hợp pháp tại Nhật, bạn có nghĩa vụ tham gia Bảo hiểm y tế quốc gia (国民健康保険). Hãy đến tòa thị chính để đăng ký ngay.',
      ja: '健康保険がない場合、医療費を全額（10割）自己負担することになります。通常の診察でも1万〜3万円程度かかることがあります。日本に適法に在住している場合、国民健康保険への加入は義務ですので、市区町村窓口で加入手続きをしましょう。',
      en: 'Without insurance, you pay 100% of costs, which can be ¥10,000-30,000+ for a regular visit. If legally residing in Japan, you are required to enroll in National Health Insurance (NHI). Register at your city hall.',
      zh: '没有保险需全额自付，普通门诊可能需要1万到3万日元。如果合法居住，必须加入国民健康保险，请到市区町村办公室办理。',
      id: 'Tanpa asuransi harus bayar penuh (bisa 10,000-30,000 yen). Jika tinggal legal, wajib daftar ke Asuransi Kesehatan Nasional di balai kota.',
      tl: 'Walang insurance, babayaran mo ang buong halaga (10,000-30,000 yen). Kung legal ang paninirahan, dapat mag-enroll sa National Health Insurance sa city hall.',
      my: 'အာမခံမရှိဘဲဆေးရုံသွားလျှင်ပြည့်ပြည့်ဝဝကုန်ကျမည်',
    },
    steps: {
      vi: [
        'Đến tòa thị chính (市区町村役場) nơi bạn đang đăng ký cư trú',
        'Mang theo: thẻ lưu trú, hộ chiếu, con dấu (inkan) nếu có',
        'Đăng ký Bảo hiểm y tế quốc gia (国民健康保険)',
        'Có thể đăng ký hồi tố từ ngày đến Nhật (tối đa 2 năm)',
        'Nhận thẻ bảo hiểm (保険証) và bắt đầu sử dụng ngay',
      ],
      ja: [
        '住民登録をしている市区町村役場へ行く',
        '持参物：在留カード・パスポート・印鑑（あれば）',
        '国民健康保険の加入申請をする',
        '最大2年間遡って加入可能（ただし保険料も遡って請求される）',
        '保険証を受け取り、医療費3割負担に',
      ],
      en: [
        'Go to your registered city/ward hall',
        'Bring: residence card, passport, inkan seal (if you have one)',
        'Apply for National Health Insurance (NHI)',
        'Can register retroactively up to 2 years',
        'Receive insurance card and pay only 30% of medical fees',
      ],
    },
    tip: {
      vi: 'Phí bảo hiểm y tế quốc gia tính theo thu nhập năm trước. Nếu thu nhập thấp hoặc mới đến Nhật, bạn có thể xin giảm phí.',
      ja: '国民健康保険料は前年の所得に基づきます。所得が少ない場合は保険料の減額・免除申請ができます。',
      en: 'NHI premiums are based on previous year\'s income. Low-income applicants can request a reduction.',
    },
  },

  // ── 仕事 ──
  {
    id: 'work-1',
    category: 'work',
    question: {
      vi: 'Công ty không trả lương đúng hạn hoặc trả thiếu. Phải làm gì?',
      ja: '給料が遅れている・少ない。どうすればいい？',
      en: 'My employer is not paying my wages on time or is underpaying me. What should I do?',
      zh: '公司没有按时发工资或少发了。怎么办？',
      id: 'Perusahaan tidak membayar gaji tepat waktu atau kurang. Apa yang harus dilakukan?',
      tl: 'Ang kumpanya ay hindi nagbabayad ng suweldo sa tamang oras o kulang. Ano ang gagawin?',
      my: 'ကုမ္ပဏီသည်လစာမပေးဆပ်ဘဲရှိသည်',
    },
    answer: {
      vi: 'Đây là vi phạm Luật Lao động Nhật Bản. Bạn có quyền yêu cầu bồi thường và có thể báo cáo đến Cục Tiêu chuẩn Lao động (労働基準監督署 / Rodo Kijun Kantokusho). Đây là cơ quan kiểm soát việc thực thi pháp luật lao động và hoàn toàn miễn phí.',
      ja: '賃金の未払いや遅延は労働基準法違反です。労働基準監督署に申告することができ、会社に是正を求めることができます。相談は無料です。',
      en: 'Wage theft or late payment violates the Labor Standards Act. You can report this to the Labor Standards Inspection Office (Rodo Kijun Kantokusho) for free.',
      zh: '拖欠工资违反劳动基准法，可向劳动基准监督署举报，完全免费。',
      id: 'Ini melanggar hukum ketenagakerjaan. Laporkan ke Kantor Inspeksi Standar Ketenagakerjaan (Rodo Kijun Kantokusho).',
      tl: 'Lumalagpas ito sa batas paggawa. I-report sa Labor Standards Inspection Office.',
      my: 'လုပ်ခလစာမပေးဆပ်ခြင်းသည်အလုပ်သမားဥပဒေကိုချိုးဖောက်ခြင်းဖြစ်သည်',
    },
    steps: {
      vi: [
        'Ghi lại bằng chứng: bảng lương (給与明細), hợp đồng lao động, lịch sử chuyển khoản ngân hàng',
        'Đầu tiên, nói chuyện với bộ phận nhân sự hoặc cấp trên bằng văn bản (email/tin nhắn)',
        'Nếu không giải quyết được, liên hệ Cục Tiêu chuẩn Lao động gần nhất (tìm kiếm "労働基準監督署")',
        'Hoặc gọi đường dây tư vấn lao động: 0570-001-110 (General Labor Consultation Center)',
        'Nếu cần, nhờ tổ chức Công đoàn hoặc luật sư lao động hỗ trợ',
      ],
      ja: [
        '証拠を集める：給与明細・雇用契約書・銀行の振込履歴',
        'まず人事部や上司に書面で請求する',
        '解決しない場合、最寄りの労働基準監督署へ申告',
        '電話相談：総合労働相談コーナー（0570-001-110）',
        '必要に応じて労働組合や弁護士に相談',
      ],
      en: [
        'Gather evidence: pay slips, employment contract, bank transfer records',
        'First, formally request payment from HR in writing',
        'If unresolved, report to the nearest Labor Standards Inspection Office',
        'Call: 0570-001-110 (General Labor Consultation)',
        'If needed, contact a labor union or labor attorney',
      ],
    },
    tip: {
      vi: 'Theo luật Nhật Bản, người lao động có quyền đòi lương quá hạn trong vòng 5 năm (2020年改正). Đừng bỏ qua quyền lợi của mình!',
      ja: '2020年改正で、未払い賃金の請求権は5年に延長されました。権利をあきらめないでください。',
      en: 'Since the 2020 amendment, unpaid wages can be claimed for up to 5 years. Do not give up your rights.',
    },
  },
  {
    id: 'work-2',
    category: 'work',
    question: {
      vi: 'Tôi bị sa thải đột ngột không có lý do. Có hợp pháp không?',
      ja: '突然クビにされた。それは合法？',
      en: 'I was suddenly fired without reason. Is this legal?',
      zh: '突然被解雇，没有原因。这合法吗？',
      id: 'Saya tiba-tiba dipecat tanpa alasan. Apakah ini legal?',
      tl: 'Biglang pinaalis ako ng trabaho nang walang dahilan. Legal ba ito?',
      my: 'ကြောင်းမဲ့ရုတ်တရက်အလုပ်ထုတ်ခြင်းခံရသည်',
    },
    answer: {
      vi: 'Theo Luật Hợp đồng Lao động Nhật Bản, sa thải không có lý do chính đáng là vô hiệu. Công ty phải thông báo trước ít nhất 30 ngày hoặc trả tiền thay thế (30 ngày lương). Bạn có thể khiếu nại để được phục hồi chức vụ hoặc bồi thường.',
      ja: '労働契約法により、客観的に合理的な理由がなく、社会通念上相当でない解雇は「不当解雇」として無効です。解雇は30日前の予告か、30日分の解雇予告手当の支払いが必要です。不当解雇の場合は、地位確認や損害賠償を求めることができます。',
      en: 'Under the Labor Contract Act, dismissal without "objectively reasonable grounds" is invalid. Companies must give 30 days notice or pay 30 days of wages. You can claim reinstatement or compensation for wrongful dismissal.',
      zh: '根据劳动合同法，没有合理理由的解雇无效。公司须提前30天通知或支付30天工资。可以申请复职或赔偿。',
      id: 'Pemecatan tanpa alasan yang sah adalah tidak sah. Perusahaan harus memberikan pemberitahuan 30 hari atau membayar 30 hari gaji.',
      tl: 'Ang pagpapaalis na walang makatwirang dahilan ay walang bisa. Ang kumpanya ay dapat magbigay ng 30 araw na abiso o bayad.',
      my: 'ကြောင်းမဲ့ထုတ်ပယ်ခြင်းသည်မမှန်ကန်ပါ',
    },
    steps: {
      vi: [
        'Ngay lập tức: yêu cầu văn bản giải trình lý do sa thải bằng văn bản',
        'Bảo quản hợp đồng lao động, bảng lương, email/tin nhắn liên quan',
        'Liên hệ Cục Tiêu chuẩn Lao động hoặc tư vấn lao động 0570-001-110',
        'Xem xét nộp đơn khiếu nại tại Ủy ban Giải quyết Tranh chấp Lao động (労働局あっせん)',
        'Nếu cần, nhờ luật sư lao động tư vấn (nhiều nơi có tư vấn miễn phí)',
      ],
      ja: [
        '解雇理由を書面で請求する（解雇理由証明書）',
        '雇用契約書・給与明細・メールなど証拠を保存',
        '労働基準監督署か総合労働相談コーナー（0570-001-110）へ',
        '労働局のあっせん制度を活用して調停を求める',
        '弁護士（無料法律相談も活用）に相談して法的手段を検討',
      ],
      en: [
        'Immediately request written dismissal reason (dismissal reason certificate)',
        'Preserve employment contract, pay slips, related emails',
        'Contact Labor Standards Inspection Office or 0570-001-110',
        'Consider mediation through Labor Bureau (Rodo Kyoku assent)',
        'Consult a labor attorney (many offer free consultations)',
      ],
    },
    tip: {
      vi: 'Trong khi khiếu nại, bạn có thể xin trợ cấp thất nghiệp (失業手当) nếu đã đóng Bảo hiểm lao động (雇用保険) đủ thời gian. Đến Hellowork gần nhất để đăng ký.',
      ja: '不当解雇で争っている場合でも、雇用保険の受給資格があれば失業給付を受けられます。ハローワークで手続きしましょう。',
      en: 'While fighting wrongful dismissal, you may still claim unemployment benefits if you meet the employment insurance requirements. Register at your nearest Hellowork.',
    },
  },

  // ── 緊急 ──
  {
    id: 'emergency-1',
    category: 'emergency',
    question: {
      vi: 'Tôi vừa bị trộm. Phải làm gì ngay bây giờ?',
      ja: '財布・スマホを盗まれた。今すぐすべきことは？',
      en: 'I was just robbed. What do I do right now?',
      zh: '我刚被抢劫。现在该怎么办？',
      id: 'Saya baru saja dirampok. Apa yang harus dilakukan sekarang?',
      tl: 'Nakawan lang ako. Ano ang gagawin agad?',
      my: 'ယခုတော်တော်ကြာပြီးခိုးထုတ်ခြင်းခံရသည်',
    },
    answer: {
      vi: 'Gọi cảnh sát 110 ngay lập tức. Đối với thẻ ngân hàng và thẻ tín dụng, gọi ngay đến số khẩn cấp của ngân hàng để khóa thẻ. Đối với SIM điện thoại, gọi ngay cho nhà mạng.',
      ja: 'まず警察（110番）に電話してください。クレジットカードや銀行カードはすぐに各銀行の緊急連絡先に電話して利用停止にしてください。スマホはSIMロックまたはキャリアへの連絡を。在留カードを紛失した場合は入国管理局への届出も必要です。',
      en: 'Call police at 110 immediately. Freeze your bank/credit cards by calling your bank\'s emergency line. Contact your phone carrier to lock your SIM. If you lost your residence card, report it to Immigration.',
      zh: '立即拨打110报警。联系银行紧急热线冻结银行卡和信用卡。联系运营商锁定SIM卡。如果在留卡丢失，还需向入国管理局报告。',
      id: 'Hubungi polisi 110 segera. Blokir kartu bank/kredit dengan menghubungi bank. Hubungi operator untuk mengunci SIM.',
      tl: 'Tumawag ng 110 sa pulis agad. I-freeze ang bank/credit cards. Makipag-ugnayan sa phone carrier para i-lock ang SIM.',
      my: '110ဖုန်းခေါ်ပါ',
    },
    steps: {
      vi: [
        '**Ngay lập tức**: Gọi cảnh sát 110 (hoặc đến đồn cảnh sát gần nhất)',
        'Khóa thẻ ngân hàng/tín dụng: gọi ngay số ở mặt sau thẻ hoặc ứng dụng ngân hàng',
        'Khóa SIM: gọi nhà mạng (Docomo: 0120-524-360, SoftBank: 0800-919-0157, au: 0077-7-111)',
        'Nếu mất thẻ lưu trú: đến Cục quản lý xuất nhập cảnh hoặc trụ sở cảnh sát để làm lại',
        'Nếu mất hộ chiếu: liên hệ Đại sứ quán Việt Nam gần nhất',
        'Lấy biên bản cảnh sát (被害届の控え) để dùng cho bảo hiểm hoặc thủ tục khác',
      ],
      ja: [
        '警察（110番）に被害届を出す',
        '銀行・クレジットカードを利用停止にする',
        'スマホ紛失はキャリアに連絡してSIMロック',
        '在留カード紛失→出入国在留管理局または警察署へ届出',
        'パスポート紛失→在日大使館・領事館へ',
        '被害届の受理番号・控えを保管（保険申請等に必要）',
      ],
      en: [
        'File a police report (110)',
        'Freeze bank and credit cards',
        'Contact carrier to lock SIM',
        'Lost residence card → report to Immigration or police',
        'Lost passport → contact your embassy',
        'Keep a copy of the police report (for insurance etc.)',
      ],
    },
    tip: {
      vi: 'JNTO (Tổng cục Du lịch Nhật Bản) có đường dây hỗ trợ du khách nước ngoài gặp sự cố: 050-3816-2787 (hoạt động 24/7, nhiều ngôn ngữ).',
      ja: 'JNTO（日本政府観光局）の外国人向け観光案内所「Japan Visitor Hotline」（050-3816-2787、24時間・多言語）に相談できます。',
      en: 'JNTO\'s Japan Visitor Hotline (050-3816-2787, 24/7, multilingual) can assist in emergencies.',
    },
  },

  // ── 交通 ──
  {
    id: 'transport-1',
    category: 'transport',
    question: {
      vi: 'Tôi bị phạt vì đi xe đạp sai quy định. Phải xử lý thế nào?',
      ja: '自転車のルール違反で警告された。どうすればいい？',
      en: 'I was stopped for a bicycle violation. What should I do?',
      zh: '骑自行车违规被警告了，怎么办？',
      id: 'Saya diberhentikan karena pelanggaran sepeda. Apa yang harus dilakukan?',
      tl: 'Pinahinto ako dahil sa paglabag sa bisikleta. Ano ang gagawin?',
      my: 'စက်ဘီးနင်းနည်းမှားသောကြောင့်သတိပေးခြင်းခံရသည်',
    },
    answer: {
      vi: 'Từ năm 2024, Nhật Bản xiết chặt luật giao thông đối với xe đạp. Các vi phạm phổ biến bao gồm: sử dụng điện thoại khi đi xe, đi ngược chiều, không đội mũ bảo hiểm (trẻ em bắt buộc), đi trên vỉa hè. Vi phạm có thể dẫn đến phạt tiền đến 50,000 yên hoặc thậm chí bị bắt.',
      ja: '2024年の改正道路交通法から、自転車違反への取り締まりが強化されました。スマホ・イヤホン使用、逆走、信号無視などで赤切符（反則金最大5万円）が交付されるようになりました。警官から停められた場合は落ち着いて対応し、指示に従いましょう。',
      en: 'Since 2024, Japan has tightened bicycle traffic rules. Common violations include phone use, wrong-way riding, and running red lights. Fines can reach ¥50,000. Stay calm and follow police instructions.',
      zh: '2024年修订的道路交通法加强了对自行车违规的执法。使用手机、逆行等违规行为最高罚款5万日元。保持冷静，配合警察。',
      id: 'Sejak 2024, aturan sepeda diperketat. Pelanggaran umum: menggunakan HP, jalan berlawanan arah. Denda bisa mencapai 50,000 yen.',
      tl: 'Mula 2024, pinahigpit ang patakaran sa bisikleta. Ang paggamit ng phone habang nagbibisikleta ay maaaring pagmultahin ng hanggang ¥50,000.',
      my: '2024ခုနှစ်မှစ၍စက်ဘီးနင်းဥပဒေပိုတင်းကျပ်လာသည်',
    },
    steps: {
      vi: [
        'Khi bị cảnh sát dừng: ở lại bình tĩnh, không chạy trốn, hợp tác',
        'Trình thẻ lưu trú hoặc hộ chiếu khi được yêu cầu',
        'Nếu bị phạt, nhận phiếu phạt và nộp phạt theo hướng dẫn (tại ngân hàng hoặc bưu điện)',
        'Ghi nhớ các quy tắc cơ bản: luôn đội mũ bảo hiểm, không dùng điện thoại, dừng đèn đỏ',
        'Đăng ký bảo hiểm xe đạp (自転車保険) được khuyến khích và bắt buộc ở một số tỉnh',
      ],
      ja: [
        '停められたら落ち着いて対応し、在留カードを提示',
        '反則切符を受け取ったら期限内に反則金を納付（銀行・郵便局）',
        '基本ルールを守る：ヘルメット着用・スマホ禁止・信号厳守・逆走禁止',
        '自転車保険の加入（一部自治体では義務化）',
      ],
      en: [
        'When stopped: stay calm, cooperate, show your residence card',
        'If fined, pay within the deadline at a bank or post office',
        'Always: wear helmet, no phone use, obey traffic signals, ride in the correct direction',
        'Consider getting bicycle insurance (mandatory in some prefectures)',
      ],
    },
    tip: {
      vi: 'Tại Nhật, xe đạp phải đi trên đường cho xe cơ giới (車道), không phải vỉa hè (歩道), trừ trường hợp có biển cho phép hoặc bạn là trẻ em, người già, phụ nữ mang thai.',
      ja: '原則として自転車は車道（左側）を通行します。歩道通行が許可されているのは、標識がある場合、子供・高齢者・妊婦などの場合です。',
      en: 'In Japan, bicycles must ride on the road (left side), not the sidewalk, unless there is a sign permitting it or you are a child/elderly/pregnant.',
    },
  },
];

// ─────────────────────────────────────────────
// カテゴリ設定
// ─────────────────────────────────────────────
const CATEGORIES = [
  { key: 'all', icon: MessageCircleQuestion, color: 'bg-slate-100 text-slate-600' },
  { key: 'visa', icon: FileText, color: 'bg-blue-100 text-blue-600' },
  { key: 'housing', icon: Home, color: 'bg-amber-100 text-amber-600' },
  { key: 'healthcare', icon: Stethoscope, color: 'bg-teal-100 text-teal-600' },
  { key: 'work', icon: Briefcase, color: 'bg-purple-100 text-purple-600' },
  { key: 'emergency', icon: AlertTriangle, color: 'bg-red-100 text-red-600' },
  { key: 'transport', icon: Train, color: 'bg-indigo-100 text-indigo-600' },
];

const CATEGORY_LABELS: Record<string, Record<string, string>> = {
  all: { vi: 'Tất cả', ja: 'すべて', en: 'All', zh: '全部', id: 'Semua', tl: 'Lahat', my: 'အားလုံး' },
  visa: { vi: 'Visa / Lưu trú', ja: 'ビザ・在留', en: 'Visa / Residence', zh: '签证/在留', id: 'Visa', tl: 'Visa', my: 'ဗီဇာ' },
  housing: { vi: 'Nhà ở', ja: '住居', en: 'Housing', zh: '住房', id: 'Rumah', tl: 'Bahay', my: 'အိမ်ရာ' },
  healthcare: { vi: 'Y tế', ja: '医療', en: 'Healthcare', zh: '医疗', id: 'Kesehatan', tl: 'Kalusugan', my: 'ကျန်းမာရေး' },
  work: { vi: 'Lao động', ja: '労働', en: 'Work', zh: '工作', id: 'Kerja', tl: 'Trabaho', my: 'အလုပ်' },
  emergency: { vi: 'Khẩn cấp', ja: '緊急', en: 'Emergency', zh: '紧急', id: 'Darurat', tl: 'Emergency', my: 'အရေးပေါ်' },
  transport: { vi: 'Giao thông', ja: '交通', en: 'Transport', zh: '交通', id: 'Transport', tl: 'Transportasyon', my: 'သယ်ယူ' },
};

// ─────────────────────────────────────────────
// メインページ
// ─────────────────────────────────────────────
export default function AskPage() {
  const params = useParams();
  const locale = (params?.locale as string) || 'vi';

  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [openId, setOpenId] = useState<string | null>(null);

  const filtered = QAS.filter((qa) => {
    const matchCat = activeCategory === 'all' || qa.category === activeCategory;
    const q = (qa.question[locale] || qa.question['en'] || '').toLowerCase();
    const a = (qa.answer[locale] || qa.answer['en'] || '').toLowerCase();
    const matchSearch = !search || q.includes(search.toLowerCase()) || a.includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="space-y-5 pb-8">
      {/* ヘッダー */}
      <div>
        <h2 className="text-2xl font-bold text-slate-800">{t(locale, 'title')}</h2>
        <p className="text-sm text-slate-500 mt-1">{t(locale, 'subtitle')}</p>
      </div>

      {/* 検索バー */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={t(locale, 'search')}
          className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
        />
      </div>

      {/* カテゴリタブ */}
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
        {CATEGORIES.map(({ key, icon: Icon, color }) => (
          <button
            key={key}
            onClick={() => setActiveCategory(key)}
            className={`flex items-center gap-1.5 whitespace-nowrap px-3 py-2 rounded-xl text-xs font-medium transition-all ${
              activeCategory === key
                ? 'bg-blue-600 text-white shadow'
                : 'bg-white border border-slate-200 text-slate-600 hover:border-blue-300'
            }`}
          >
            <Icon className="h-4 w-4" />
            {CATEGORY_LABELS[key]?.[locale] ?? CATEGORY_LABELS[key]?.['en'] ?? key}
          </button>
        ))}
      </div>

      {/* Q&A リスト */}
      {filtered.length === 0 ? (
        <div className="text-center py-12 text-slate-400">
          <MessageCircleQuestion className="h-12 w-12 mx-auto mb-3 opacity-40" />
          <p>{t(locale, 'noResults')}</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((qa) => {
            const isOpen = openId === qa.id;
            const catCfg = CATEGORIES.find((c) => c.key === qa.category);
            const CatIcon = catCfg?.icon ?? MessageCircleQuestion;
            const question = qa.question[locale] || qa.question['en'] || '';
            const answer = qa.answer[locale] || qa.answer['en'] || '';
            const steps = qa.steps?.[locale] || qa.steps?.['en'];
            const tip = qa.tip?.[locale] || qa.tip?.['en'];

            return (
              <motion.div
                key={qa.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-2xl border border-slate-100 bg-white shadow-sm overflow-hidden"
              >
                {/* 質問ヘッダー */}
                <button
                  onClick={() => setOpenId(isOpen ? null : qa.id)}
                  className="w-full text-left p-4 flex items-start gap-3"
                >
                  <div className={`flex-shrink-0 rounded-lg p-2 ${catCfg?.color ?? 'bg-slate-100 text-slate-500'}`}>
                    <CatIcon className="h-4 w-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-slate-800 leading-snug">{question}</p>
                    <p className="text-xs text-slate-400 mt-1">
                      {CATEGORY_LABELS[qa.category]?.[locale] ?? qa.category}
                    </p>
                  </div>
                  {isOpen ? (
                    <ChevronUp className="h-5 w-5 text-slate-400 flex-shrink-0 mt-0.5" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-slate-400 flex-shrink-0 mt-0.5" />
                  )}
                </button>

                {/* 回答 */}
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <div className="px-4 pb-4 space-y-4 border-t border-slate-50 pt-3">
                        {/* 回答テキスト */}
                        <p className="text-sm text-slate-700 leading-relaxed">{answer}</p>

                        {/* 手順 */}
                        {steps && steps.length > 0 && (
                          <div>
                            <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-2">
                              {t(locale, 'steps')}
                            </p>
                            <ol className="space-y-2">
                              {steps.map((step, i) => (
                                <li key={i} className="flex gap-3 text-sm text-slate-700">
                                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 text-blue-700 text-xs font-bold flex items-center justify-center">
                                    {i + 1}
                                  </span>
                                  <span className="leading-snug pt-0.5">{step.replace(/^\*\*|\*\*$/g, '')}</span>
                                </li>
                              ))}
                            </ol>
                          </div>
                        )}

                        {/* ヒント */}
                        {tip && (
                          <div className="rounded-xl bg-amber-50 border border-amber-200 p-3">
                            <p className="text-xs font-bold text-amber-700 mb-1">💡 {t(locale, 'tip')}</p>
                            <p className="text-xs text-amber-800 leading-relaxed">{tip}</p>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}
