import type { Category, Word, ContextPattern } from '@/types';

// カテゴリデータ
export const categories: Category[] = [
  {
    id: 1,
    name_ja: '漢語専門用語',
    name_en: 'Medical Terms',
    name_vi: 'Thuật ngữ chuyên môn',
    type: 'A',
    description: '介護現場で使われる漢語の専門用語',
    icon: '🩺',
    display_order: 1,
  },
  {
    id: 2,
    name_ja: '日常語の専門用法',
    name_en: 'Professional Daily Words',
    name_vi: 'Từ ngữ hàng ngày dùng chuyên môn',
    type: 'B',
    description: '普通の言葉が介護現場で特別な意味を持つ',
    icon: '🔄',
    display_order: 2,
  },
  {
    id: 3,
    name_ja: '省略表現',
    name_en: 'Abbreviations',
    name_vi: 'Từ viết tắt',
    type: 'C',
    description: '現場で使われる略語・短縮表現',
    icon: '✂️',
    display_order: 3,
  },
  {
    id: 4,
    name_ja: '気持ちの理解',
    name_en: 'Context-dependent Words',
    name_vi: 'Từ phụ thuộc ngữ cảnh',
    type: 'D',
    description: '同じ言葉でも文脈で意味が変わる言葉',
    icon: '🎭',
    display_order: 4,
  },
];

// タイプA: 漢語専門用語（15語）
const typeA_words: Omit<Word, 'id'>[] = [
  { category_id: 1, word_ja: '就眠介助', reading: 'しゅうみんかいじょ', meaning_ja: '寝る準備を手伝う', meaning_vi: 'Hỗ trợ đi ngủ', scene: '夜の業務で使う。利用者をベッドに誘導し、着替えや歯磨きを手伝う場面。', example_sentence: '「田中さんの就眠介助、お願いします」', difficulty: 2, display_order: 1 },
  { category_id: 1, word_ja: '離床', reading: 'りしょう', meaning_ja: 'ベッドから起きる', meaning_vi: 'Rời giường', scene: '朝の業務で使う。利用者がベッドから起き上がる支援をする場面。', example_sentence: '「8時に離床を促してください」', difficulty: 1, display_order: 2 },
  { category_id: 1, word_ja: '臥床', reading: 'がしょう', meaning_ja: 'ベッドに寝る', meaning_vi: 'Nằm xuống giường', scene: '体調不良時や休息時に使う。利用者がベッドに横になる場面。', example_sentence: '「山田さんは午後から臥床しています」', difficulty: 2, display_order: 3 },
  { category_id: 1, word_ja: '体位交換', reading: 'たいいこうかん', meaning_ja: '体の向きを変える', meaning_vi: 'Thay đổi tư thế', scene: '褥瘡予防のため、定期的に体の向きを変える。', example_sentence: '「2時間ごとに体位交換をしてください」', difficulty: 2, display_order: 4 },
  { category_id: 1, word_ja: '嚥下', reading: 'えんげ', meaning_ja: '飲み込む', meaning_vi: 'Nuốt', scene: '食事介助の際に、利用者がしっかり飲み込めているか確認する場面。', example_sentence: '「嚥下の状態を観察してください」', difficulty: 3, display_order: 5 },
  { category_id: 1, word_ja: '誤嚥', reading: 'ごえん', meaning_ja: '食べ物が気管に入る', meaning_vi: 'Sặc/Hít phải', scene: '食事中に食べ物が気管に入ってしまう危険な状態。すぐに報告が必要。', example_sentence: '「誤嚥に注意してゆっくり食べさせてください」', difficulty: 3, display_order: 6 },
  { category_id: 1, word_ja: '褥瘡', reading: 'じょくそう', meaning_ja: '床ずれ', meaning_vi: 'Loét do tì đè', scene: '長時間同じ姿勢でいると皮膚が赤くなったり傷ができる。看護師に報告。', example_sentence: '「お尻に褥瘡ができています」', difficulty: 3, display_order: 7 },
  { category_id: 1, word_ja: '清拭', reading: 'せいしき', meaning_ja: '体を拭いて清潔にする', meaning_vi: 'Lau người', scene: '入浴できない利用者の体を温かいタオルで拭く。', example_sentence: '「今日は入浴の代わりに清拭をお願いします」', difficulty: 2, display_order: 8 },
  { category_id: 1, word_ja: '陰部洗浄', reading: 'いんぶせんじょう', meaning_ja: '下半身を洗う', meaning_vi: 'Vệ sinh vùng kín', scene: 'おむつ交換時や排泄後に、陰部を清潔にする。', example_sentence: '「おむつ交換の後、陰部洗浄もしてください」', difficulty: 2, display_order: 9 },
  { category_id: 1, word_ja: '排泄介助', reading: 'はいせつかいじょ', meaning_ja: 'トイレの手伝い', meaning_vi: 'Hỗ trợ đi vệ sinh', scene: 'トイレへの移動やズボンの上げ下ろしなど、排泄に関する支援。', example_sentence: '「排泄介助が必要な方が3名います」', difficulty: 1, display_order: 10 },
  { category_id: 1, word_ja: '移乗', reading: 'いじょう', meaning_ja: 'ベッドから車椅子へ移る', meaning_vi: 'Di chuyển (từ giường sang xe lăn)', scene: 'ベッドと車椅子の間の移動を介助する場面。', example_sentence: '「移乗の時は腰に気をつけてください」', difficulty: 1, display_order: 11 },
  { category_id: 1, word_ja: '更衣介助', reading: 'こういかいじょ', meaning_ja: '着替えを手伝う', meaning_vi: 'Hỗ trợ thay quần áo', scene: '朝の着替えやパジャマへの着替えを手伝う。', example_sentence: '「更衣介助の時、麻痺側から脱がせてください」', difficulty: 1, display_order: 12 },
  { category_id: 1, word_ja: '口腔ケア', reading: 'こうくうけあ', meaning_ja: '口の中を清潔にする', meaning_vi: 'Chăm sóc răng miệng', scene: '食後の歯磨きや入れ歯の手入れなど。', example_sentence: '「食後の口腔ケアをお願いします」', difficulty: 1, display_order: 13 },
  { category_id: 1, word_ja: '服薬介助', reading: 'ふくやくかいじょ', meaning_ja: '薬を飲む手伝い', meaning_vi: 'Hỗ trợ uống thuốc', scene: '決まった時間に薬を飲むのを手伝う。薬の間違いに注意。', example_sentence: '「服薬介助は必ずダブルチェックしてください」', difficulty: 2, display_order: 14 },
  { category_id: 1, word_ja: '傾眠', reading: 'けいみん', meaning_ja: 'うとうとしている状態', meaning_vi: 'Trạng thái ngủ gật', scene: '日中にうとうとしている利用者の状態を表す。', example_sentence: '「食後から傾眠傾向です」', difficulty: 2, display_order: 15 },
];

// タイプB: 日常語の専門用法（10語）
const typeB_words: Omit<Word, 'id'>[] = [
  { category_id: 2, word_ja: '付き添い', reading: 'つきそい', meaning_ja: '見守りながら移動を支援', meaning_vi: 'Đi kèm/Hỗ trợ di chuyển', scene: '通院や外出時に利用者に付き添う。', example_sentence: '「明日の通院、付き添いお願いします」', difficulty: 1, display_order: 1 },
  { category_id: 2, word_ja: '声かけ', reading: 'こえかけ', meaning_ja: '安全確認・意識確認のための呼びかけ', meaning_vi: 'Gọi/Hỏi thăm', scene: '利用者の状態確認のため声をかける。', example_sentence: '「定期的に声かけして安否確認してください」', difficulty: 1, display_order: 2 },
  { category_id: 2, word_ja: '見守り', reading: 'みまもり', meaning_ja: '転倒防止のための観察', meaning_vi: 'Quan sát/Trông chừng', scene: '利用者が自分で動く時、安全のために見ている。', example_sentence: '「歩行時は見守りをお願いします」', difficulty: 1, display_order: 3 },
  { category_id: 2, word_ja: '促す', reading: 'うながす', meaning_ja: '自分でやるよう誘導する', meaning_vi: 'Khuyến khích/Thúc giục', scene: '利用者の自立を支えるため、自分でやるよう誘導する。', example_sentence: '「水分を摂るよう促してください」', difficulty: 2, display_order: 4 },
  { category_id: 2, word_ja: '介入', reading: 'かいにゅう', meaning_ja: '手を出して手伝う', meaning_vi: 'Can thiệp/Hỗ trợ', scene: '利用者が困っている時に手助けする。', example_sentence: '「自分でできる時は介入しすぎないで」', difficulty: 2, display_order: 5 },
  { category_id: 2, word_ja: '対応', reading: 'たいおう', meaning_ja: 'ナースコールや要望に応える', meaning_vi: 'Ứng phó/Xử lý', scene: 'ナースコールが鳴った時や、利用者の要望に対処する。', example_sentence: '「ナースコールの対応お願いします」', difficulty: 1, display_order: 6 },
  { category_id: 2, word_ja: '申し送り', reading: 'もうしおくり', meaning_ja: '次の勤務者への引き継ぎ', meaning_vi: 'Bàn giao ca', scene: 'シフト交代時に、利用者の状態を次の担当者に伝える。', example_sentence: '「申し送りで伝え忘れたことがあります」', difficulty: 2, display_order: 7 },
  { category_id: 2, word_ja: '記録', reading: 'きろく', meaning_ja: '介護記録を書く', meaning_vi: 'Ghi chép', scene: '利用者の状態や行ったケアを記録する。', example_sentence: '「ケアが終わったら記録を書いてください」', difficulty: 1, display_order: 8 },
  { category_id: 2, word_ja: '観察', reading: 'かんさつ', meaning_ja: '状態変化を注意して見る', meaning_vi: 'Quan sát', scene: '利用者の体調や行動の変化を注意深く見る。', example_sentence: '「食事中の様子をよく観察してください」', difficulty: 1, display_order: 9 },
  { category_id: 2, word_ja: '報告', reading: 'ほうこく', meaning_ja: '上司・看護師に状態を伝える', meaning_vi: 'Báo cáo', scene: '異変があった時に上司や看護師に伝える。', example_sentence: '「何かあったらすぐ報告してください」', difficulty: 1, display_order: 10 },
];

// タイプC: 省略表現（7語）
const typeC_words: Omit<Word, 'id'>[] = [
  { category_id: 3, word_ja: '体交', reading: 'たいこう', meaning_ja: '体位交換', meaning_vi: 'Thay đổi tư thế (viết tắt)', scene: '「体位交換」の略。記録や口頭指示でよく使われる。', example_sentence: '「2時に体交お願い」', difficulty: 1, display_order: 1 },
  { category_id: 3, word_ja: 'トイ誘', reading: 'といゆう', meaning_ja: 'トイレ誘導', meaning_vi: 'Dẫn đi vệ sinh (viết tắt)', scene: '「トイレ誘導」の略。排泄のタイミングでトイレに誘導する。', example_sentence: '「食後にトイ誘してください」', difficulty: 1, display_order: 2 },
  { category_id: 3, word_ja: 'バイタル', reading: 'ばいたる', meaning_ja: 'バイタルサイン（体温・血圧・脈拍・呼吸）', meaning_vi: 'Dấu hiệu sinh tồn', scene: '体温・血圧・脈拍・呼吸数のこと。毎日測定する。', example_sentence: '「朝のバイタル測っておいて」', difficulty: 1, display_order: 3 },
  { category_id: 3, word_ja: 'サチュ', reading: 'さちゅ', meaning_ja: 'サチュレーション（血中酸素濃度）', meaning_vi: 'Độ bão hòa oxy', scene: '「サチュレーション」の略。パルスオキシメーターで測定する。', example_sentence: '「サチュが低いから看護師に報告して」', difficulty: 2, display_order: 4 },
  { category_id: 3, word_ja: 'オムツ交', reading: 'おむつこう', meaning_ja: 'オムツ交換', meaning_vi: 'Thay tã (viết tắt)', scene: '「オムツ交換」の略。記録でよく使われる。', example_sentence: '「3時にオムツ交お願い」', difficulty: 1, display_order: 5 },
  { category_id: 3, word_ja: '食介', reading: 'しょっかい', meaning_ja: '食事介助', meaning_vi: 'Hỗ trợ ăn uống (viết tắt)', scene: '「食事介助」の略。食事を食べる手伝い。', example_sentence: '「佐藤さんは食介が必要です」', difficulty: 1, display_order: 6 },
  { category_id: 3, word_ja: '入介', reading: 'にゅうかい', meaning_ja: '入浴介助', meaning_vi: 'Hỗ trợ tắm (viết tắt)', scene: '「入浴介助」の略。お風呂に入る手伝い。', example_sentence: '「今日の入介は4名です」', difficulty: 1, display_order: 7 },
];

// タイプD: 文脈依存語（8語）
const typeD_words: Omit<Word, 'id'>[] = [
  { category_id: 4, word_ja: 'いいよ', reading: 'いいよ', meaning_ja: '文脈により意味が変わる', meaning_vi: 'Tùy ngữ cảnh', scene: '「いいよ」は状況によって全く違う意味になる。声のトーンが重要。', example_sentence: '「いいよ」（断り？承諾？許可？）', difficulty: 3, display_order: 1 },
  { category_id: 4, word_ja: '大丈夫', reading: 'だいじょうぶ', meaning_ja: '文脈により意味が変わる', meaning_vi: 'Tùy ngữ cảnh', scene: '「大丈夫」も文脈で意味が変わる。特に「強がり」の場合は注意。', example_sentence: '「大丈夫です」（問題なし？断り？強がり？）', difficulty: 3, display_order: 2 },
  { category_id: 4, word_ja: 'ちょっと', reading: 'ちょっと', meaning_ja: '少し待って／難しい／来て', meaning_vi: 'Một chút/Khó/Đến đây', scene: '「ちょっと」は場面によって多くの意味を持つ。', example_sentence: '「ちょっと」（待って？来て？困る？）', difficulty: 2, display_order: 3 },
  { category_id: 4, word_ja: 'もう少し', reading: 'もうすこし', meaning_ja: '時間の要求／量の要求／我慢', meaning_vi: 'Thêm một chút', scene: '時間・量・我慢の要求を表す。', example_sentence: '「もう少し…」（時間？量？我慢？）', difficulty: 2, display_order: 4 },
  { category_id: 4, word_ja: 'あとで', reading: 'あとで', meaning_ja: 'すぐ後／かなり後／やらない', meaning_vi: 'Sau/Lát nữa', scene: '「あとで」の意味は人や状況で大きく異なる。', example_sentence: '「あとで」（すぐ？ずっと後？やらない？）', difficulty: 2, display_order: 5 },
  { category_id: 4, word_ja: 'けっこうです', reading: 'けっこうです', meaning_ja: '十分／断り', meaning_vi: 'Đủ rồi/Không cần', scene: '「けっこうです」は満足の意味と断りの意味がある。', example_sentence: '「けっこうです」（十分？いらない？）', difficulty: 2, display_order: 6 },
  { category_id: 4, word_ja: 'すみません', reading: 'すみません', meaning_ja: '謝罪／感謝／呼びかけ', meaning_vi: 'Xin lỗi/Cảm ơn/Xin phép', scene: '「すみません」は謝罪・感謝・呼びかけに使う。', example_sentence: '「すみません」（ごめん？ありがとう？ちょっと？）', difficulty: 1, display_order: 7 },
  { category_id: 4, word_ja: 'お願いします', reading: 'おねがいします', meaning_ja: '依頼／懇願／挨拶', meaning_vi: 'Làm ơn/Xin hãy', scene: '「お願いします」は頼む時だけでなく挨拶にも使う。', example_sentence: '「お願いします」（やって？お願い！よろしく？）', difficulty: 1, display_order: 8 },
];

// 文脈パターン（タイプD用）
// タイプD単語のIDは33〜40（typeA:1-15, typeB:16-25, typeC:26-32, typeD:33-40）
export const contextPatterns: Omit<ContextPattern, 'id'>[] = [
  // いいよ (id:33)
  { word_id: 33, pattern_name: '断り', scene: '「お茶もう一杯いる？」→「いいよ」', meaning: 'いらない', voice_tone: '下がる↓', display_order: 1 },
  { word_id: 33, pattern_name: '承諾', scene: '「手伝ってくれる？」→「いいよ」', meaning: 'OK、やるよ', voice_tone: '上がる↑', display_order: 2 },
  { word_id: 33, pattern_name: '許容', scene: '「ごめんね」→「いいよ」', meaning: '気にしないで', voice_tone: 'やさしく→', display_order: 3 },
  { word_id: 33, pattern_name: '許可', scene: '「帰っていいですか」→「いいよ」', meaning: '帰ってOK', voice_tone: '平坦→', display_order: 4 },
  { word_id: 33, pattern_name: '諦め', scene: '「もういいよ…」', meaning: 'あきらめ・悲しみ', voice_tone: '下がる↓＋間', display_order: 5 },
  // 大丈夫 (id:34)
  { word_id: 34, pattern_name: '問題なし', scene: '「痛くないですか？」→「大丈夫」', meaning: '痛くない', voice_tone: '明るく↑', display_order: 1 },
  { word_id: 34, pattern_name: '断り', scene: '「お茶いりますか？」→「大丈夫です」', meaning: 'いらない', voice_tone: '下がる↓', display_order: 2 },
  { word_id: 34, pattern_name: '強がり', scene: '辛そうな顔で「大丈夫…」', meaning: '本当は辛い', voice_tone: '弱く↓', display_order: 3 },
  { word_id: 34, pattern_name: '確認', scene: '「大丈夫ですか？」', meaning: '問題ないか確認', voice_tone: '上がる↑', display_order: 4 },
  // ちょっと (id:35)
  { word_id: 35, pattern_name: '待って', scene: '「ちょっと待って」', meaning: '少し待ってほしい', voice_tone: '早口→', display_order: 1 },
  { word_id: 35, pattern_name: '困る', scene: '「それはちょっと…」', meaning: '難しい・困る', voice_tone: '下がる↓', display_order: 2 },
  { word_id: 35, pattern_name: '来て', scene: '「ちょっと来て」', meaning: 'こちらに来て', voice_tone: '急いで→', display_order: 3 },
  // もう少し (id:36)
  { word_id: 36, pattern_name: '時間', scene: '「もう少し待って」', meaning: 'もう少し時間がほしい', voice_tone: 'お願い→', display_order: 1 },
  { word_id: 36, pattern_name: '量', scene: '「もう少しください」', meaning: 'もう少し量がほしい', voice_tone: '上がる↑', display_order: 2 },
  { word_id: 36, pattern_name: '我慢', scene: '「もう少しの辛抱だよ」', meaning: 'もう少し我慢して', voice_tone: 'やさしく→', display_order: 3 },
  // あとで (id:37)
  { word_id: 37, pattern_name: 'すぐ後', scene: '「あとでやります」（すぐやる人）', meaning: '5分〜10分後', voice_tone: '明るく→', display_order: 1 },
  { word_id: 37, pattern_name: 'かなり後', scene: '「あとでね…」', meaning: 'いつかやるかも', voice_tone: '曖昧に→', display_order: 2 },
  { word_id: 37, pattern_name: 'やらない', scene: '「あとでいいよ」（面倒な時）', meaning: 'やりたくない', voice_tone: '下がる↓', display_order: 3 },
  // けっこうです (id:38)
  { word_id: 38, pattern_name: '十分', scene: '「もう一杯いかがですか？」→「けっこうです」', meaning: 'もう十分です', voice_tone: '丁寧に→', display_order: 1 },
  { word_id: 38, pattern_name: '断り', scene: '「保険に興味ありますか？」→「けっこうです」', meaning: 'いりません', voice_tone: 'きっぱり→', display_order: 2 },
  // すみません (id:39)
  { word_id: 39, pattern_name: '謝罪', scene: '失敗した時「すみません」', meaning: 'ごめんなさい', voice_tone: '下がる↓', display_order: 1 },
  { word_id: 39, pattern_name: '感謝', scene: '手伝ってもらった時「すみません」', meaning: 'ありがとう', voice_tone: 'やさしく↑', display_order: 2 },
  { word_id: 39, pattern_name: '呼びかけ', scene: '「すみません、ちょっといいですか」', meaning: '注意をひく', voice_tone: '上がる↑', display_order: 3 },
  // お願いします (id:40)
  { word_id: 40, pattern_name: '依頼', scene: '「これ、お願いします」', meaning: 'やってください', voice_tone: '丁寧に→', display_order: 1 },
  { word_id: 40, pattern_name: '懇願', scene: '「お願いします！」（強く）', meaning: '本当にお願い', voice_tone: '強く↑', display_order: 2 },
  { word_id: 40, pattern_name: '挨拶', scene: '「今日もお願いします」', meaning: 'よろしく', voice_tone: '軽く→', display_order: 3 },
];

// 全単語データ（ID付き）
export const allWords: Word[] = [
  ...typeA_words.map((w, i) => ({ ...w, id: i + 1 })),
  ...typeB_words.map((w, i) => ({ ...w, id: i + 16 })),
  ...typeC_words.map((w, i) => ({ ...w, id: i + 26 })),
  ...typeD_words.map((w, i) => ({ ...w, id: i + 33 })),
];

// ヘルパー関数
export function getWordsByCategory(categoryType: string): Word[] {
  const cat = categories.find(c => c.type === categoryType);
  if (!cat) return [];
  return allWords.filter(w => w.category_id === cat.id);
}

export function getWordById(id: number): Word | undefined {
  return allWords.find(w => w.id === id);
}

export function getCategoryByType(type: string): Category | undefined {
  return categories.find(c => c.type === type);
}

export function getPatternsByWordId(wordId: number): Omit<ContextPattern, 'id'>[] {
  return contextPatterns.filter(p => p.word_id === wordId);
}

// 隣の単語を取得
export function getAdjacentWords(wordId: number): { prev: Word | undefined; next: Word | undefined } {
  const word = getWordById(wordId);
  if (!word) return { prev: undefined, next: undefined };

  const categoryWords = allWords.filter(w => w.category_id === word.category_id);
  const index = categoryWords.findIndex(w => w.id === wordId);

  return {
    prev: index > 0 ? categoryWords[index - 1] : undefined,
    next: index < categoryWords.length - 1 ? categoryWords[index + 1] : undefined,
  };
}
