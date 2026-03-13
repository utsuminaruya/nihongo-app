/**
 * シードスクリプト: 初期データをSupabaseに投入する
 *
 * 使い方:
 *   NEXT_PUBLIC_SUPABASE_URL=... NEXT_PUBLIC_SUPABASE_ANON_KEY=... npx tsx scripts/seed.ts
 */
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ NEXT_PUBLIC_SUPABASE_URL と NEXT_PUBLIC_SUPABASE_ANON_KEY を設定してください');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// カテゴリデータ
const categoriesData = [
  { name_ja: '漢語専門用語', name_en: 'Medical Terms', name_vi: 'Thuật ngữ chuyên môn', type: 'A', description: '介護現場で使われる漢語の専門用語', icon: '🏥', display_order: 1 },
  { name_ja: '日常語の専門用法', name_en: 'Professional Daily Words', name_vi: 'Từ ngữ hàng ngày dùng chuyên môn', type: 'B', description: '普通の言葉が介護現場で特別な意味を持つ', icon: '💬', display_order: 2 },
  { name_ja: '省略表現', name_en: 'Abbreviations', name_vi: 'Từ viết tắt', type: 'C', description: '現場で使われる略語・短縮表現', icon: '⚡', display_order: 3 },
  { name_ja: '気持ちの理解', name_en: 'Context-dependent Words', name_vi: 'Từ phụ thuộc ngữ cảnh', type: 'D', description: '同じ言葉でも文脈で意味が変わる言葉', icon: '💝', display_order: 4 },
];

// 単語データ（タイプA）
const typeA = [
  { word_ja: '就眠介助', reading: 'しゅうみんかいじょ', meaning_ja: '寝る準備を手伝う', meaning_vi: 'Hỗ trợ đi ngủ', difficulty: 2, display_order: 1 },
  { word_ja: '離床', reading: 'りしょう', meaning_ja: 'ベッドから起きる', meaning_vi: 'Rời giường', difficulty: 1, display_order: 2 },
  { word_ja: '臥床', reading: 'がしょう', meaning_ja: 'ベッドに寝る', meaning_vi: 'Nằm xuống giường', difficulty: 2, display_order: 3 },
  { word_ja: '体位交換', reading: 'たいいこうかん', meaning_ja: '体の向きを変える', meaning_vi: 'Thay đổi tư thế', difficulty: 2, display_order: 4 },
  { word_ja: '嚥下', reading: 'えんげ', meaning_ja: '飲み込む', meaning_vi: 'Nuốt', difficulty: 3, display_order: 5 },
  { word_ja: '誤嚥', reading: 'ごえん', meaning_ja: '食べ物が気管に入る', meaning_vi: 'Sặc/Hít phải', difficulty: 3, display_order: 6 },
  { word_ja: '褥瘡', reading: 'じょくそう', meaning_ja: '床ずれ', meaning_vi: 'Loét do tì đè', difficulty: 3, display_order: 7 },
  { word_ja: '清拭', reading: 'せいしき', meaning_ja: '体を拭いて清潔にする', meaning_vi: 'Lau người', difficulty: 2, display_order: 8 },
  { word_ja: '陰部洗浄', reading: 'いんぶせんじょう', meaning_ja: '下半身を洗う', meaning_vi: 'Vệ sinh vùng kín', difficulty: 2, display_order: 9 },
  { word_ja: '排泄介助', reading: 'はいせつかいじょ', meaning_ja: 'トイレの手伝い', meaning_vi: 'Hỗ trợ đi vệ sinh', difficulty: 1, display_order: 10 },
  { word_ja: '移乗', reading: 'いじょう', meaning_ja: 'ベッドから車椅子へ移る', meaning_vi: 'Di chuyển (từ giường sang xe lăn)', difficulty: 1, display_order: 11 },
  { word_ja: '更衣介助', reading: 'こういかいじょ', meaning_ja: '着替えを手伝う', meaning_vi: 'Hỗ trợ thay quần áo', difficulty: 1, display_order: 12 },
  { word_ja: '口腔ケア', reading: 'こうくうけあ', meaning_ja: '口の中を清潔にする', meaning_vi: 'Chăm sóc răng miệng', difficulty: 1, display_order: 13 },
  { word_ja: '服薬介助', reading: 'ふくやくかいじょ', meaning_ja: '薬を飲む手伝い', meaning_vi: 'Hỗ trợ uống thuốc', difficulty: 2, display_order: 14 },
  { word_ja: '傾眠', reading: 'けいみん', meaning_ja: 'うとうとしている状態', meaning_vi: 'Trạng thái ngủ gật', difficulty: 2, display_order: 15 },
];

// 単語データ（タイプB）
const typeB = [
  { word_ja: '付き添い', reading: 'つきそい', meaning_ja: '見守りながら移動を支援', meaning_vi: 'Đi kèm/Hỗ trợ di chuyển', difficulty: 1, display_order: 1 },
  { word_ja: '声かけ', reading: 'こえかけ', meaning_ja: '安全確認・意識確認のための呼びかけ', meaning_vi: 'Gọi/Hỏi thăm', difficulty: 1, display_order: 2 },
  { word_ja: '見守り', reading: 'みまもり', meaning_ja: '転倒防止のための観察', meaning_vi: 'Quan sát/Trông chừng', difficulty: 1, display_order: 3 },
  { word_ja: '促す', reading: 'うながす', meaning_ja: '自分でやるよう誘導する', meaning_vi: 'Khuyến khích/Thúc giục', difficulty: 2, display_order: 4 },
  { word_ja: '介入', reading: 'かいにゅう', meaning_ja: '手を出して手伝う', meaning_vi: 'Can thiệp/Hỗ trợ', difficulty: 2, display_order: 5 },
  { word_ja: '対応', reading: 'たいおう', meaning_ja: 'ナースコールや要望に応える', meaning_vi: 'Ứng phó/Xử lý', difficulty: 1, display_order: 6 },
  { word_ja: '申し送り', reading: 'もうしおくり', meaning_ja: '次の勤務者への引き継ぎ', meaning_vi: 'Bàn giao ca', difficulty: 2, display_order: 7 },
  { word_ja: '記録', reading: 'きろく', meaning_ja: '介護記録を書く', meaning_vi: 'Ghi chép', difficulty: 1, display_order: 8 },
  { word_ja: '観察', reading: 'かんさつ', meaning_ja: '状態変化を注意して見る', meaning_vi: 'Quan sát', difficulty: 1, display_order: 9 },
  { word_ja: '報告', reading: 'ほうこく', meaning_ja: '上司・看護師に状態を伝える', meaning_vi: 'Báo cáo', difficulty: 1, display_order: 10 },
];

// 単語データ（タイプC）
const typeC = [
  { word_ja: '体交', reading: 'たいこう', meaning_ja: '体位交換', meaning_vi: 'Thay đổi tư thế (viết tắt)', difficulty: 1, display_order: 1 },
  { word_ja: 'トイ誘', reading: 'といゆう', meaning_ja: 'トイレ誘導', meaning_vi: 'Dẫn đi vệ sinh (viết tắt)', difficulty: 1, display_order: 2 },
  { word_ja: 'バイタル', reading: 'ばいたる', meaning_ja: 'バイタルサイン（体温・血圧・脈拍・呼吸）', meaning_vi: 'Dấu hiệu sinh tồn', difficulty: 1, display_order: 3 },
  { word_ja: 'サチュ', reading: 'さちゅ', meaning_ja: 'サチュレーション（血中酸素濃度）', meaning_vi: 'Độ bão hòa oxy', difficulty: 2, display_order: 4 },
  { word_ja: 'オムツ交', reading: 'おむつこう', meaning_ja: 'オムツ交換', meaning_vi: 'Thay tã (viết tắt)', difficulty: 1, display_order: 5 },
  { word_ja: '食介', reading: 'しょっかい', meaning_ja: '食事介助', meaning_vi: 'Hỗ trợ ăn uống (viết tắt)', difficulty: 1, display_order: 6 },
  { word_ja: '入介', reading: 'にゅうかい', meaning_ja: '入浴介助', meaning_vi: 'Hỗ trợ tắm (viết tắt)', difficulty: 1, display_order: 7 },
];

// 単語データ（タイプD）
const typeD = [
  { word_ja: 'いいよ', reading: 'いいよ', meaning_ja: '文脈により意味が変わる', meaning_vi: 'Tùy ngữ cảnh', difficulty: 3, display_order: 1 },
  { word_ja: '大丈夫', reading: 'だいじょうぶ', meaning_ja: '文脈により意味が変わる', meaning_vi: 'Tùy ngữ cảnh', difficulty: 3, display_order: 2 },
  { word_ja: 'ちょっと', reading: 'ちょっと', meaning_ja: '少し待って／難しい／来て', meaning_vi: 'Một chút/Khó/Đến đây', difficulty: 2, display_order: 3 },
  { word_ja: 'もう少し', reading: 'もうすこし', meaning_ja: '時間の要求／量の要求／我慢', meaning_vi: 'Thêm một chút', difficulty: 2, display_order: 4 },
  { word_ja: 'あとで', reading: 'あとで', meaning_ja: 'すぐ後／かなり後／やらない', meaning_vi: 'Sau/Lát nữa', difficulty: 2, display_order: 5 },
  { word_ja: 'けっこうです', reading: 'けっこうです', meaning_ja: '十分／断り', meaning_vi: 'Đủ rồi/Không cần', difficulty: 2, display_order: 6 },
  { word_ja: 'すみません', reading: 'すみません', meaning_ja: '謝罪／感謝／呼びかけ', meaning_vi: 'Xin lỗi/Cảm ơn/Xin phép', difficulty: 1, display_order: 7 },
  { word_ja: 'お願いします', reading: 'おねがいします', meaning_ja: '依頼／懇願／挨拶', meaning_vi: 'Làm ơn/Xin hãy', difficulty: 1, display_order: 8 },
];

async function seed() {
  console.log('🌱 シードデータの投入を開始します...');

  // 1. カテゴリ投入
  const { data: cats, error: catError } = await supabase
    .from('categories')
    .upsert(categoriesData, { onConflict: 'id' })
    .select();

  if (catError) {
    console.error('❌ カテゴリ投入エラー:', catError);
    return;
  }
  console.log(`✅ カテゴリ ${cats?.length}件 投入完了`);

  // 2. 単語投入
  const catIds = cats!.reduce((acc: Record<string, number>, c: { type: string; id: number }) => {
    acc[c.type] = c.id;
    return acc;
  }, {});

  const allWords = [
    ...typeA.map(w => ({ ...w, category_id: catIds['A'] })),
    ...typeB.map(w => ({ ...w, category_id: catIds['B'] })),
    ...typeC.map(w => ({ ...w, category_id: catIds['C'] })),
    ...typeD.map(w => ({ ...w, category_id: catIds['D'] })),
  ];

  const { data: words, error: wordError } = await supabase
    .from('words')
    .upsert(allWords, { onConflict: 'id' })
    .select();

  if (wordError) {
    console.error('❌ 単語投入エラー:', wordError);
    return;
  }
  console.log(`✅ 単語 ${words?.length}件 投入完了`);

  // 3. 文脈パターン投入（タイプD用）
  const typeDWords = words!.filter((w: { category_id: number }) => w.category_id === catIds['D']);

  const patterns = [
    // いいよ
    ...[
      { pattern_name: '断り', scene: '「お茶もう一杯いる？」→「いいよ」', meaning: 'いらない', voice_tone: '下がる↓', display_order: 1 },
      { pattern_name: '承諾', scene: '「手伝ってくれる？」→「いいよ」', meaning: 'OK、やるよ', voice_tone: '上がる↑', display_order: 2 },
      { pattern_name: '許容', scene: '「ごめんね」→「いいよ」', meaning: '気にしないで', voice_tone: 'やさしく→', display_order: 3 },
      { pattern_name: '許可', scene: '「帰っていいですか」→「いいよ」', meaning: '帰ってOK', voice_tone: '平坦→', display_order: 4 },
      { pattern_name: '諦め', scene: '「もういいよ…」', meaning: 'あきらめ・悲しみ', voice_tone: '下がる↓＋間', display_order: 5 },
    ].map(p => ({ ...p, word_id: typeDWords.find((w: { word_ja: string }) => w.word_ja === 'いいよ')?.id })),
    // 大丈夫
    ...[
      { pattern_name: '問題なし', scene: '「痛くないですか？」→「大丈夫」', meaning: '痛くない', voice_tone: '明るく↑', display_order: 1 },
      { pattern_name: '断り', scene: '「お茶いりますか？」→「大丈夫です」', meaning: 'いらない', voice_tone: '下がる↓', display_order: 2 },
      { pattern_name: '強がり', scene: '辛そうな顔で「大丈夫…」', meaning: '本当は辛い', voice_tone: '弱く↓', display_order: 3 },
      { pattern_name: '確認', scene: '「大丈夫ですか？」', meaning: '問題ないか確認', voice_tone: '上がる↑', display_order: 4 },
    ].map(p => ({ ...p, word_id: typeDWords.find((w: { word_ja: string }) => w.word_ja === '大丈夫')?.id })),
  ];

  const { error: patternError } = await supabase.from('context_patterns').upsert(patterns);
  if (patternError) {
    console.error('❌ パターン投入エラー:', patternError);
    return;
  }
  console.log(`✅ 文脈パターン ${patterns.length}件 投入完了`);

  console.log('\n🎉 シードデータ投入完了！');
}

seed();
