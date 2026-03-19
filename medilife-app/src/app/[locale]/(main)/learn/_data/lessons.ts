export type Lesson = {
  id: string;
  title: Record<string, string>;
  duration: number; // minutes
  content: LessonContent[];
};

export type LessonContent = {
  type: 'intro' | 'vocab' | 'grammar' | 'dialogue' | 'quiz';
  title?: Record<string, string>;
  items?: VocabItem[];
  grammar?: GrammarItem[];
  dialogue?: DialogueLine[];
  quiz?: QuizItem[];
  text?: Record<string, string>;
};

export type VocabItem = {
  japanese: string;
  reading: string;
  meaning: Record<string, string>;
  example?: string;
  exampleReading?: string;
  exampleMeaning?: Record<string, string>;
};

export type GrammarItem = {
  pattern: string;
  explanation: Record<string, string>;
  examples: { japanese: string; reading: string; meaning: Record<string, string> }[];
};

export type DialogueLine = {
  speaker: string;
  japanese: string;
  reading: string;
  meaning: Record<string, string>;
};

export type QuizItem = {
  question: Record<string, string>;
  options: string[];
  correct: number;
  explanation: Record<string, string>;
};

export type Course = {
  id: string;
  title: Record<string, string>;
  description: Record<string, string>;
  level: 'beginner' | 'intermediate' | 'advanced';
  jlptLevel: 'N5' | 'N4' | 'N3' | 'N2' | 'N1' | 'none';
  color: string;
  totalLessons: number;
  estimatedHours: number;
  lessons: Lesson[];
};

export const courses: Course[] = [
  // ============================
  // COURSE 1: ひらがな・カタカナ
  // ============================
  {
    id: 'hiragana-katakana',
    title: { ja: 'ひらがな・カタカナ入門', en: 'Hiragana & Katakana Basics', vi: 'Nhập môn Hiragana & Katakana', zh: '平假名・片假名入门', id: 'Dasar Hiragana & Katakana', tl: 'Hiragana at Katakana', my: 'Hiragana နှင့် Katakana အခြေခံ' },
    description: { ja: '日本語の文字の基礎。ひらがな46文字、カタカナ46文字を完全マスター', en: 'Master all 46 hiragana and 46 katakana characters step by step', vi: 'Học tất cả 46 chữ hiragana và 46 chữ katakana từng bước', zh: '逐步掌握全部46个平假名和46个片假名', id: 'Kuasai 46 hiragana dan 46 katakana langkah demi langkah', tl: 'Master ang lahat ng 46 hiragana at 46 katakana', my: 'Hiragana 46 လုံးနှင့် Katakana 46 လုံး တစ်ဆင့်ချင်းသင်ယူ' },
    level: 'beginner',
    jlptLevel: 'N5',
    color: 'from-sky-400 to-blue-500',
    totalLessons: 10,
    estimatedHours: 5,
    lessons: [
      {
        id: 'hiragana-1',
        title: { ja: 'ひらがな あ行〜か行', en: 'Hiragana: A-row to Ka-row', vi: 'Hiragana: Hàng A đến Ka', zh: '平假名：あ行〜か行' },
        duration: 15,
        content: [
          {
            type: 'intro',
            title: { ja: 'ひらがなとは？', en: 'What is Hiragana?' },
            text: { ja: 'ひらがなは日本語の基本文字です。全部で46文字あります。', en: 'Hiragana is the foundational script of Japanese. There are 46 basic characters.' },
          },
          {
            type: 'vocab',
            title: { ja: 'あ行の文字', en: 'A-row characters' },
            items: [
              { japanese: 'あ', reading: 'a', meaning: { ja: 'あ（a）', en: 'a', vi: 'a', zh: 'a' } },
              { japanese: 'い', reading: 'i', meaning: { ja: 'い（i）', en: 'i', vi: 'i', zh: 'i' } },
              { japanese: 'う', reading: 'u', meaning: { ja: 'う（u）', en: 'u', vi: 'u', zh: 'u' } },
              { japanese: 'え', reading: 'e', meaning: { ja: 'え（e）', en: 'e', vi: 'e', zh: 'e' } },
              { japanese: 'お', reading: 'o', meaning: { ja: 'お（o）', en: 'o', vi: 'o', zh: 'o' } },
            ],
          },
          {
            type: 'vocab',
            title: { ja: 'か行の文字', en: 'Ka-row characters' },
            items: [
              { japanese: 'か', reading: 'ka', meaning: { ja: 'か（ka）', en: 'ka', vi: 'ka', zh: 'ka' }, example: 'かさ', exampleReading: 'kasa', exampleMeaning: { ja: '傘', en: 'umbrella', vi: 'ô', zh: '雨伞' } },
              { japanese: 'き', reading: 'ki', meaning: { ja: 'き（ki）', en: 'ki', vi: 'ki', zh: 'ki' }, example: 'きって', exampleReading: 'kitte', exampleMeaning: { ja: '切手', en: 'stamp', vi: 'tem', zh: '邮票' } },
              { japanese: 'く', reading: 'ku', meaning: { ja: 'く（ku）', en: 'ku', vi: 'ku', zh: 'ku' }, example: 'くつ', exampleReading: 'kutsu', exampleMeaning: { ja: '靴', en: 'shoes', vi: 'giày', zh: '鞋子' } },
              { japanese: 'け', reading: 'ke', meaning: { ja: 'け（ke）', en: 'ke', vi: 'ke', zh: 'ke' }, example: 'けいたい', exampleReading: 'keitai', exampleMeaning: { ja: '携帯', en: 'mobile phone', vi: 'điện thoại', zh: '手机' } },
              { japanese: 'こ', reading: 'ko', meaning: { ja: 'こ（ko）', en: 'ko', vi: 'ko', zh: 'ko' }, example: 'こども', exampleReading: 'kodomo', exampleMeaning: { ja: '子供', en: 'child', vi: 'trẻ em', zh: '孩子' } },
            ],
          },
          {
            type: 'quiz',
            quiz: [
              { question: { ja: '「か」の読み方は？', en: 'How do you read 「か」?' }, options: ['ka', 'ki', 'ku', 'ko'], correct: 0, explanation: { ja: '「か」は「ka」と読みます。', en: '「か」 is read as "ka".' } },
              { question: { ja: '「い」の読み方は？', en: 'How do you read 「い」?' }, options: ['a', 'i', 'u', 'e'], correct: 1, explanation: { ja: '「い」は「i」と読みます。', en: '「い」 is read as "i".' } },
              { question: { ja: '「くつ」は英語で何ですか？', en: 'What does 「くつ」 mean in English?' }, options: ['hat', 'shoes', 'bag', 'shirt'], correct: 1, explanation: { ja: '「くつ」は靴、英語でshoesです。', en: '「くつ」(kutsu) means shoes.' } },
            ],
          },
        ],
      },
      {
        id: 'hiragana-2',
        title: { ja: 'ひらがな さ行〜な行', en: 'Hiragana: Sa-row to Na-row', vi: 'Hiragana: Hàng Sa đến Na', zh: '平假名：さ行〜な行' },
        duration: 15,
        content: [
          {
            type: 'vocab',
            title: { ja: 'さ行の文字', en: 'Sa-row characters' },
            items: [
              { japanese: 'さ', reading: 'sa', meaning: { ja: 'sa', en: 'sa', vi: 'sa', zh: 'sa' }, example: 'さくら', exampleReading: 'sakura', exampleMeaning: { ja: '桜', en: 'cherry blossom', vi: 'hoa anh đào', zh: '樱花' } },
              { japanese: 'し', reading: 'shi', meaning: { ja: 'shi', en: 'shi', vi: 'shi', zh: 'shi' }, example: 'しごと', exampleReading: 'shigoto', exampleMeaning: { ja: '仕事', en: 'work', vi: 'công việc', zh: '工作' } },
              { japanese: 'す', reading: 'su', meaning: { ja: 'su', en: 'su', vi: 'su', zh: 'su' }, example: 'すし', exampleReading: 'sushi', exampleMeaning: { ja: '寿司', en: 'sushi', vi: 'sushi', zh: '寿司' } },
              { japanese: 'せ', reading: 'se', meaning: { ja: 'se', en: 'se', vi: 'se', zh: 'se' }, example: 'せんせい', exampleReading: 'sensei', exampleMeaning: { ja: '先生', en: 'teacher', vi: 'giáo viên', zh: '老师' } },
              { japanese: 'そ', reading: 'so', meaning: { ja: 'so', en: 'so', vi: 'so', zh: 'so' }, example: 'そら', exampleReading: 'sora', exampleMeaning: { ja: '空', en: 'sky', vi: 'bầu trời', zh: '天空' } },
            ],
          },
        ],
      },
    ],
  },

  // ============================
  // COURSE 2: 日常会話
  // ============================
  {
    id: 'daily-conversation',
    title: { ja: '日常会話', en: 'Daily Conversation', vi: 'Hội thoại hàng ngày', zh: '日常会话', id: 'Percakapan Sehari-hari', tl: 'Pang-araw-araw na Usapan', my: 'နေ့စဉ်စကားပြော' },
    description: { ja: 'あいさつから始まる、日本での日常生活に必要な基本会話フレーズ集', en: 'Essential Japanese phrases for daily life — greetings, shopping, asking directions and more', vi: 'Các cụm từ thiết yếu cho cuộc sống hàng ngày tại Nhật — chào hỏi, mua sắm, hỏi đường', zh: '日常生活必备日语短语——问候、购物、问路等', id: 'Frasa Jepang penting untuk kehidupan sehari-hari', tl: 'Mahahalagang Japanese na parirala para sa pang-araw-araw na buhay', my: 'နေ့စဉ်ဘဝအတွက် မရှိမဖြစ် ဂျပန်စကားစုများ' },
    level: 'beginner',
    jlptLevel: 'N5',
    color: 'from-blue-500 to-blue-600',
    totalLessons: 20,
    estimatedHours: 10,
    lessons: [
      {
        id: 'greetings',
        title: { ja: 'あいさつの基本', en: 'Basic Greetings', vi: 'Lời chào cơ bản', zh: '基本问候语' },
        duration: 10,
        content: [
          {
            type: 'vocab',
            title: { ja: '基本のあいさつ', en: 'Essential Greetings' },
            items: [
              { japanese: 'おはようございます', reading: 'Ohayou gozaimasu', meaning: { ja: '朝のあいさつ', en: 'Good morning', vi: 'Chào buổi sáng', zh: '早上好', id: 'Selamat pagi', tl: 'Magandang umaga', my: 'မင်္ဂလာနံနက်ခင်းပါ' }, example: 'おはようございます！今日もよろしくお願いします。', exampleReading: 'Ohayou gozaimasu! Kyou mo yoroshiku onegaishimasu.', exampleMeaning: { ja: '毎日使う職場のあいさつ', en: 'Good morning! I look forward to working with you today.', vi: 'Chào buổi sáng! Mong mọi người giúp đỡ hôm nay.' } },
              { japanese: 'こんにちは', reading: 'Konnichiwa', meaning: { ja: '昼間のあいさつ', en: 'Hello / Good afternoon', vi: 'Xin chào / Chào buổi chiều', zh: '你好 / 下午好', id: 'Halo / Selamat siang', tl: 'Kumusta / Magandang hapon', my: 'မင်္ဂလာနေ့လည်ပိုင်းပါ' } },
              { japanese: 'こんばんは', reading: 'Konbanwa', meaning: { ja: '夜のあいさつ', en: 'Good evening', vi: 'Chào buổi tối', zh: '晚上好', id: 'Selamat malam', tl: 'Magandang gabi', my: 'မင်္ဂလာညနေပါ' } },
              { japanese: 'おやすみなさい', reading: 'Oyasuminasai', meaning: { ja: '就寝前のあいさつ', en: 'Good night', vi: 'Chúc ngủ ngon', zh: '晚安', id: 'Selamat tidur', tl: 'Magandang gabi (sa tulog)', my: 'အိပ်ချိန်ကြောင်းပါ' } },
              { japanese: 'ありがとうございます', reading: 'Arigatou gozaimasu', meaning: { ja: 'お礼の言葉（丁寧）', en: 'Thank you (polite)', vi: 'Cảm ơn (lịch sự)', zh: '谢谢（正式）', id: 'Terima kasih (formal)', tl: 'Salamat (pormal)', my: 'ကျေးဇူးတင်ပါသည် (နှိမ်ချစကား)' } },
              { japanese: 'すみません', reading: 'Sumimasen', meaning: { ja: '謝罪・呼びかけ', en: 'Excuse me / Sorry', vi: 'Xin lỗi / Thưa', zh: '对不起 / 打扰一下', id: 'Permisi / Maaf', tl: 'Excuse me / Patawad', my: 'ခွင့်လွှတ်ပါ / ဆောရီး' } },
              { japanese: 'はじめまして', reading: 'Hajimemashite', meaning: { ja: '初対面のあいさつ', en: 'Nice to meet you', vi: 'Rất vui được gặp bạn', zh: '初次见面，你好', id: 'Salam kenal', tl: 'Ikinagagalak kitang makilala', my: 'တွေ့ရသောကြောင့် ဝမ်းသာပါသည်' } },
              { japanese: 'よろしくお願いします', reading: 'Yoroshiku onegaishimasu', meaning: { ja: '頼む・よろしくの意味', en: 'I\'m in your care / Nice to meet you', vi: 'Mong mọi người giúp đỡ', zh: '请多关照', id: 'Mohon kerja samanya', tl: 'Inaasahan ko ang iyong tulong', my: 'ကူညီပေးပါဦး' } },
            ],
          },
          {
            type: 'dialogue',
            title: { ja: '会話例：はじめての出会い', en: 'Dialogue: First Meeting' },
            dialogue: [
              { speaker: 'A', japanese: 'はじめまして。アンと申します。', reading: 'Hajimemashite. An to moushimasu.', meaning: { ja: '初対面のあいさつ', en: 'Nice to meet you. My name is An.', vi: 'Rất vui được gặp bạn. Tôi tên là An.' } },
              { speaker: 'B', japanese: 'はじめまして。田中です。よろしくお願いします。', reading: 'Hajimemashite. Tanaka desu. Yoroshiku onegaishimasu.', meaning: { ja: '自己紹介', en: 'Nice to meet you. I\'m Tanaka. I\'m in your care.', vi: 'Rất vui được gặp bạn. Tôi là Tanaka. Mong bạn giúp đỡ.' } },
              { speaker: 'A', japanese: 'こちらこそ、よろしくお願いします！', reading: 'Kochira koso, yoroshiku onegaishimasu!', meaning: { ja: '同じく、よろしく', en: 'Same here, nice to meet you!', vi: 'Tôi cũng mong được giúp đỡ!' } },
            ],
          },
          {
            type: 'quiz',
            quiz: [
              { question: { ja: '朝のあいさつは何ですか？', en: 'What is the morning greeting?' }, options: ['こんにちは', 'おはようございます', 'こんばんは', 'おやすみなさい'], correct: 1, explanation: { ja: '朝は「おはようございます」です。', en: '"Ohayou gozaimasu" is the morning greeting.' } },
              { question: { ja: '「ありがとうございます」の意味は？', en: 'What does "Arigatou gozaimasu" mean?' }, options: ['Hello', 'Sorry', 'Thank you', 'Goodbye'], correct: 2, explanation: { ja: '「ありがとうございます」は「Thank you」です。', en: '"Arigatou gozaimasu" means "Thank you".' } },
            ],
          },
        ],
      },
      {
        id: 'self-introduction',
        title: { ja: '自己紹介', en: 'Self Introduction', vi: 'Tự giới thiệu', zh: '自我介绍' },
        duration: 15,
        content: [
          {
            type: 'vocab',
            title: { ja: '自己紹介に使う言葉', en: 'Words for Self-Introduction' },
            items: [
              { japanese: 'なまえ／名前', reading: 'namae', meaning: { ja: '名前', en: 'name', vi: 'tên', zh: '名字' }, example: '私の名前はマリアです。', exampleReading: 'Watashi no namae wa Maria desu.', exampleMeaning: { en: 'My name is Maria.' } },
              { japanese: 'くに／国', reading: 'kuni', meaning: { ja: '国', en: 'country', vi: 'quốc gia', zh: '国家' }, example: 'ベトナムから来ました。', exampleReading: 'Betonamu kara kimashita.', exampleMeaning: { en: 'I came from Vietnam.' } },
              { japanese: 'しごと／仕事', reading: 'shigoto', meaning: { ja: '仕事', en: 'job / work', vi: 'công việc', zh: '工作' }, example: 'レストランで仕事しています。', exampleReading: 'Resutoran de shigoto shite imasu.', exampleMeaning: { en: 'I work at a restaurant.' } },
              { japanese: 'すんでいる／住んでいる', reading: 'sunde iru', meaning: { ja: '住んでいる', en: 'living (somewhere)', vi: 'đang sống (ở đâu)', zh: '住在' }, example: '東京に住んでいます。', exampleReading: 'Tokyo ni sunde imasu.', exampleMeaning: { en: 'I live in Tokyo.' } },
            ],
          },
          {
            type: 'grammar',
            title: { ja: '〜です（〜desu）の使い方', en: 'How to use 〜です (desu)' },
            grammar: [
              {
                pattern: '〜です',
                explanation: { ja: '「〜です」は「〜です」を使って自分の情報を伝えます。', en: '"〜desu" is used to state facts about yourself or things. It is polite.', vi: '"〜desu" dùng để nói về bản thân hoặc sự việc một cách lịch sự.' },
                examples: [
                  { japanese: 'マリアです。', reading: 'Maria desu.', meaning: { ja: 'マリアです。', en: 'I am Maria.', vi: 'Tôi là Maria.' } },
                  { japanese: 'フィリピン人です。', reading: 'Firipin-jin desu.', meaning: { ja: 'フィリピン人です。', en: 'I am Filipino.', vi: 'Tôi là người Philippines.' } },
                  { japanese: '25歳です。', reading: 'Nijuu-go-sai desu.', meaning: { ja: '25歳です。', en: 'I am 25 years old.', vi: 'Tôi 25 tuổi.' } },
                ],
              },
              {
                pattern: '〜から来ました',
                explanation: { ja: '「〜から来ました」は出身地を伝えます。', en: '"〜kara kimashita" means "I came from 〜" (nationality/origin).', vi: '"〜kara kimashita" có nghĩa là "Tôi đến từ 〜".' },
                examples: [
                  { japanese: 'ベトナムから来ました。', reading: 'Betonamu kara kimashita.', meaning: { en: 'I came from Vietnam.', vi: 'Tôi đến từ Việt Nam.' } },
                  { japanese: 'フィリピンから来ました。', reading: 'Firipin kara kimashita.', meaning: { en: 'I came from the Philippines.' } },
                  { japanese: 'インドネシアから来ました。', reading: 'Indoneshia kara kimashita.', meaning: { en: 'I came from Indonesia.' } },
                ],
              },
            ],
          },
          {
            type: 'quiz',
            quiz: [
              { question: { ja: '「私はベトナムから来ました」を正しく訳すと？', en: 'What does "Watashi wa Betonamu kara kimashita" mean?' }, options: ['I live in Vietnam', 'I came from Vietnam', 'I like Vietnam', 'I go to Vietnam'], correct: 1, explanation: { en: '"Kara kimashita" means "came from".' } },
              { question: { ja: '「何歳ですか？」に対して25歳の場合の答えは？', en: 'If asked your age and you are 25, what do you say?' }, options: ['25です', '25人です', '25歳です', '25年です'], correct: 2, explanation: { ja: '年齢には「〜歳（さい）です」を使います。', en: 'Use "〜sai desu" for age.' } },
            ],
          },
        ],
      },
      {
        id: 'shopping-phrases',
        title: { ja: '買い物の表現', en: 'Shopping Phrases', vi: 'Cụm từ mua sắm', zh: '购物表达' },
        duration: 12,
        content: [
          {
            type: 'vocab',
            title: { ja: '買い物で使う言葉', en: 'Shopping Vocabulary' },
            items: [
              { japanese: 'これ', reading: 'kore', meaning: { ja: 'これ（近くにあるもの）', en: 'this (near me)', vi: 'cái này', zh: '这个' }, example: 'これをください。', exampleReading: 'Kore wo kudasai.', exampleMeaning: { en: 'Please give me this.' } },
              { japanese: 'いくらですか', reading: 'ikura desu ka', meaning: { ja: '値段を聞く', en: 'How much is it?', vi: 'Bao nhiêu tiền?', zh: '多少钱？' } },
              { japanese: 'たかい／高い', reading: 'takai', meaning: { ja: '高い（値段）', en: 'expensive', vi: 'đắt', zh: '贵' } },
              { japanese: 'やすい／安い', reading: 'yasui', meaning: { ja: '安い（値段）', en: 'cheap / inexpensive', vi: 'rẻ', zh: '便宜' } },
              { japanese: 'ください', reading: 'kudasai', meaning: { ja: '〜をください', en: 'Please give me 〜', vi: 'Cho tôi 〜', zh: '请给我〜' } },
              { japanese: 'レシート', reading: 'reshiito', meaning: { ja: '領収書', en: 'receipt', vi: 'hóa đơn', zh: '收据' } },
              { japanese: 'クレジットカード', reading: 'kurejitto kaado', meaning: { ja: 'クレジットカード', en: 'credit card', vi: 'thẻ tín dụng', zh: '信用卡' } },
              { japanese: 'おつり', reading: 'otsuri', meaning: { ja: 'おつり', en: 'change (money)', vi: 'tiền thối lại', zh: '找零' } },
            ],
          },
          {
            type: 'dialogue',
            title: { ja: '会話例：コンビニで', en: 'Dialogue: At a Convenience Store' },
            dialogue: [
              { speaker: '店員', japanese: 'いらっしゃいませ！', reading: 'Irasshaimase!', meaning: { en: 'Welcome!', vi: 'Chào mừng!', zh: '欢迎光临！' } },
              { speaker: 'あなた', japanese: 'これをください。', reading: 'Kore wo kudasai.', meaning: { en: 'I\'ll take this please.', vi: 'Cho tôi cái này.', zh: '请给我这个。' } },
              { speaker: '店員', japanese: '280円になります。', reading: 'Nihyaku-hachijuu-en ni narimasu.', meaning: { en: 'That will be 280 yen.', vi: 'Tổng cộng 280 yên.', zh: '一共280日元。' } },
              { speaker: 'あなた', japanese: 'カードで払えますか？', reading: 'Kaado de haraemasu ka?', meaning: { en: 'Can I pay by card?', vi: 'Tôi có thể trả bằng thẻ không?', zh: '可以刷卡吗？' } },
              { speaker: '店員', japanese: 'はい、大丈夫です。', reading: 'Hai, daijoubu desu.', meaning: { en: 'Yes, that\'s fine.', vi: 'Vâng, được ạ.', zh: '可以的。' } },
            ],
          },
        ],
      },
      {
        id: 'asking-directions',
        title: { ja: '道の聞き方', en: 'Asking for Directions', vi: 'Hỏi đường', zh: '问路表达' },
        duration: 12,
        content: [
          {
            type: 'vocab',
            title: { ja: '道・場所に関する言葉', en: 'Direction & Location Words' },
            items: [
              { japanese: 'みぎ／右', reading: 'migi', meaning: { en: 'right', vi: 'phải', zh: '右', ja: '右' } },
              { japanese: 'ひだり／左', reading: 'hidari', meaning: { en: 'left', vi: 'trái', zh: '左', ja: '左' } },
              { japanese: 'まっすぐ', reading: 'massugu', meaning: { en: 'straight ahead', vi: 'thẳng', zh: '直走', ja: 'まっすぐ' } },
              { japanese: '〜はどこですか', reading: '〜wa doko desu ka', meaning: { en: 'Where is 〜?', vi: '〜 ở đâu?', zh: '〜在哪里？', ja: '〜はどこですか' } },
              { japanese: 'ちかく／近く', reading: 'chikaku', meaning: { en: 'nearby', vi: 'gần đây', zh: '附近', ja: '近く' } },
              { japanese: 'とおい／遠い', reading: 'tooi', meaning: { en: 'far', vi: 'xa', zh: '远', ja: '遠い' } },
              { japanese: 'えき／駅', reading: 'eki', meaning: { en: 'station', vi: 'ga tàu', zh: '车站', ja: '駅' } },
              { japanese: 'コンビニ', reading: 'konbini', meaning: { en: 'convenience store', vi: 'cửa hàng tiện lợi', zh: '便利店', ja: 'コンビニ' } },
            ],
          },
          {
            type: 'dialogue',
            title: { ja: '会話例：道を尋ねる', en: 'Dialogue: Asking for Directions' },
            dialogue: [
              { speaker: 'あなた', japanese: 'すみません、駅はどこですか？', reading: 'Sumimasen, eki wa doko desu ka?', meaning: { en: 'Excuse me, where is the station?', vi: 'Xin lỗi, nhà ga ở đâu ạ?', zh: '请问车站在哪里？' } },
              { speaker: '人', japanese: 'あの信号を右に曲がってください。', reading: 'Ano shingou wo migi ni magatte kudasai.', meaning: { en: 'Turn right at that traffic light.', vi: 'Rẽ phải ở đèn giao thông kia.', zh: '在那个红绿灯右转。' } },
              { speaker: 'あなた', japanese: '歩いてどのくらいかかりますか？', reading: 'Aruite dono kurai kakarimasu ka?', meaning: { en: 'How long does it take on foot?', vi: 'Đi bộ mất bao lâu?', zh: '步行需要多久？' } },
              { speaker: '人', japanese: '5分くらいです。', reading: 'Go-fun kurai desu.', meaning: { en: 'About 5 minutes.', vi: 'Khoảng 5 phút.', zh: '大约5分钟。' } },
            ],
          },
        ],
      },
    ],
  },

  // ============================
  // COURSE 3: 職場の日本語
  // ============================
  {
    id: 'workplace-japanese',
    title: { ja: '職場の日本語', en: 'Workplace Japanese', vi: 'Tiếng Nhật tại nơi làm việc', zh: '职场日语', id: 'Bahasa Jepang di Tempat Kerja', tl: 'Japanese sa Trabaho', my: 'အလုပ်ခွင် ဂျပန်ဘာသာစကား' },
    description: { ja: '仕事で使う必須フレーズ。報告・連絡・相談、電話応対、会議での表現など', en: 'Essential phrases for the Japanese workplace: reporting, phone calls, meetings, and asking for help', vi: 'Cụm từ thiết yếu cho nơi làm việc Nhật: báo cáo, điện thoại, họp, nhờ giúp đỡ', zh: '职场必备短语：汇报、电话应对、会议表达等', id: 'Frasa penting untuk tempat kerja Jepang: laporan, telepon, rapat, minta bantuan', tl: 'Mahahalagang parirala para sa Japanese na trabaho', my: 'ဂျပန် အလုပ်ခွင်တွင် မရှိမဖြစ် စကားစုများ' },
    level: 'intermediate',
    jlptLevel: 'N4',
    color: 'from-emerald-500 to-emerald-600',
    totalLessons: 15,
    estimatedHours: 8,
    lessons: [
      {
        id: 'workplace-greetings',
        title: { ja: '職場のあいさつ', en: 'Workplace Greetings', vi: 'Lời chào tại nơi làm việc', zh: '职场问候语' },
        duration: 12,
        content: [
          {
            type: 'vocab',
            title: { ja: '職場で毎日使うあいさつ', en: 'Daily Workplace Greetings' },
            items: [
              { japanese: 'おはようございます', reading: 'Ohayou gozaimasu', meaning: { en: 'Good morning', vi: 'Chào buổi sáng', zh: '早上好', ja: '朝の挨拶' }, example: '【毎朝必須】出勤したらまず全員に声をかける', exampleMeaning: { en: '[Required daily] Greet everyone when you arrive at work.' } },
              { japanese: 'お先に失礼します', reading: 'Osaki ni shitsurei shimasu', meaning: { en: 'I\'m leaving before you (sorry for leaving first)', vi: 'Tôi xin phép về trước', zh: '我先走了（对不起先行离开）', ja: '退勤時のあいさつ' }, example: 'お先に失礼します。お疲れ様でした。', exampleMeaning: { en: 'I\'m leaving now. Thank you for your hard work.' } },
              { japanese: 'お疲れ様でした', reading: 'Otsukare-sama deshita', meaning: { en: 'Good work / Thank you for your hard work', vi: 'Cảm ơn vì công việc hôm nay', zh: '辛苦了', ja: '一日の終わりに' } },
              { japanese: 'よろしくお願いします', reading: 'Yoroshiku onegaishimasu', meaning: { en: 'Please help me / I\'m counting on you', vi: 'Nhờ bạn giúp đỡ', zh: '请多关照', ja: '依頼時に使う' } },
              { japanese: 'かしこまりました', reading: 'Kashikomarimashita', meaning: { en: 'Understood / Certainly (very formal)', vi: 'Tôi hiểu rồi (rất lịch sự)', zh: '明白了（非常正式）', ja: '上司への返答' } },
              { japanese: 'ただいま戻りました', reading: 'Tadaima modorimashita', meaning: { en: 'I\'m back (returning to workplace)', vi: 'Tôi đã về rồi', zh: '我回来了（回到职场）', ja: '外出から戻ったとき' } },
              { japanese: '行ってきます', reading: 'Itte kimasu', meaning: { en: 'I\'m heading out', vi: 'Tôi đi đây', zh: '我出去了', ja: '外出するとき' } },
            ],
          },
          {
            type: 'grammar',
            title: { ja: '報告・連絡の基本フレーズ', en: 'Basic Reporting Phrases' },
            grammar: [
              {
                pattern: '〜が完了しました（かんりょうしました）',
                explanation: { ja: '仕事が終わったことを報告する', en: 'Use this to report that a task is complete.', vi: 'Dùng để báo cáo công việc đã hoàn thành.' },
                examples: [
                  { japanese: '報告書の作成が完了しました。', reading: 'Houkokusho no sakusei ga kanryou shimashita.', meaning: { en: 'I\'ve completed the report.', vi: 'Tôi đã hoàn thành báo cáo.' } },
                  { japanese: '作業が完了しました。確認をお願いします。', reading: 'Sagyou ga kanryou shimashita. Kakunin wo onegaishimasu.', meaning: { en: 'The work is done. Please check it.', vi: 'Công việc đã xong. Nhờ bạn kiểm tra giúp.' } },
                ],
              },
              {
                pattern: '〜について確認してもよいですか',
                explanation: { ja: '何かを確認したいときの丁寧な聞き方', en: 'Politely asking to confirm something.', vi: 'Hỏi lịch sự để xác nhận điều gì đó.' },
                examples: [
                  { japanese: 'この書類について確認してもよいですか？', reading: 'Kono shorui ni tsuite kakunin shite mo yoi desu ka?', meaning: { en: 'May I check with you about this document?', vi: 'Tôi có thể hỏi về tài liệu này không?' } },
                  { japanese: '今日の作業内容について確認してもよいですか？', reading: 'Kyou no sagyou naiyou ni tsuite kakunin shite mo yoi desu ka?', meaning: { en: 'May I confirm today\'s tasks with you?', vi: 'Tôi có thể xác nhận nội dung công việc hôm nay không?' } },
                ],
              },
            ],
          },
          {
            type: 'quiz',
            quiz: [
              { question: { ja: '退勤するとき何と言いますか？', en: 'What do you say when leaving work before colleagues?' }, options: ['おはようございます', 'いただきます', 'お先に失礼します', 'いらっしゃいませ'], correct: 2, explanation: { en: '"Osaki ni shitsurei shimasu" is said when you leave before your colleagues.' } },
              { question: { ja: '上司から指示を受けたとき、最も丁寧な返答は？', en: 'What is the most polite response when receiving instructions from your boss?' }, options: ['わかった', 'はい', 'かしこまりました', 'そうですね'], correct: 2, explanation: { en: '"Kashikomarimashita" is the most formal and polite way to say "understood" to a superior.' } },
            ],
          },
        ],
      },
      {
        id: 'phone-calls',
        title: { ja: '電話応対', en: 'Phone Calls at Work', vi: 'Nghe và gọi điện thoại', zh: '电话应对' },
        duration: 15,
        content: [
          {
            type: 'vocab',
            title: { ja: '電話でよく使う言葉', en: 'Common Phone Phrases' },
            items: [
              { japanese: 'もしもし', reading: 'moshimoshi', meaning: { en: 'Hello (on the phone)', vi: 'Alô', zh: '喂', ja: '電話を取るとき' } },
              { japanese: '〜でございます', reading: '〜de gozaimasu', meaning: { en: 'This is 〜 (company name)', vi: 'Đây là 〜 (tên công ty)', zh: '这里是〜（公司名称）', ja: '会社名を名乗るとき' }, example: '山田商事でございます。', exampleMeaning: { en: 'This is Yamada Trading Company.' } },
              { japanese: 'いつもお世話になっております', reading: 'Itsumo osewa ni natte orimasu', meaning: { en: 'Thank you for your continued support', vi: 'Cảm ơn vì sự hỗ trợ thường xuyên', zh: '一直承蒙您的关照', ja: 'ビジネス電話の定型表現' } },
              { japanese: 'しょうしょうおまちください', reading: 'Shoushou omachi kudasai', meaning: { en: 'Please hold for a moment', vi: 'Vui lòng chờ một chút', zh: '请稍等', ja: '保留にするとき' } },
              { japanese: '〜に取り次ぎます', reading: '〜ni toritsugimasu', meaning: { en: 'I will transfer you to 〜', vi: 'Tôi sẽ chuyển máy cho 〜', zh: '我帮您转接〜', ja: '電話を回すとき' } },
            ],
          },
          {
            type: 'dialogue',
            title: { ja: '会話例：電話を受ける', en: 'Dialogue: Receiving a Work Call' },
            dialogue: [
              { speaker: 'あなた', japanese: 'はい、山田商事でございます。', reading: 'Hai, Yamada Shouji de gozaimasu.', meaning: { en: 'Yes, this is Yamada Trading Company.', vi: 'Vâng, đây là Công ty Yamada.' } },
              { speaker: '相手', japanese: '田中部長はいらっしゃいますか？', reading: 'Tanaka buchou wa irasshaimasu ka?', meaning: { en: 'Is Manager Tanaka available?', vi: 'Trưởng phòng Tanaka có ở đó không?' } },
              { speaker: 'あなた', japanese: 'しょうしょうお待ちください。今取り次ぎます。', reading: 'Shoushou omachi kudasai. Ima toritsugimasu.', meaning: { en: 'Please hold a moment. I\'ll transfer you now.', vi: 'Xin chờ một chút. Tôi sẽ chuyển máy ngay.' } },
            ],
          },
        ],
      },
    ],
  },

  // ============================
  // COURSE 4: 医療の日本語
  // ============================
  {
    id: 'medical-japanese',
    title: { ja: '医療の日本語', en: 'Medical Japanese', vi: 'Tiếng Nhật y tế', zh: '医疗日语', id: 'Bahasa Jepang Medis', tl: 'Japanese para sa Medikal', my: 'ဆေးပညာ ဂျပန်ဘာသာ' },
    description: { ja: '病院・薬局での日本語。症状の伝え方、保険証の使い方、薬の説明を理解する', en: 'Japanese for hospitals and pharmacies — explaining symptoms, using insurance, understanding prescriptions', vi: 'Tiếng Nhật cho bệnh viện và nhà thuốc — giải thích triệu chứng, dùng bảo hiểm, hiểu đơn thuốc', zh: '医院和药局的日语——说明症状、使用保险、理解处方', id: 'Bahasa Jepang untuk rumah sakit dan apotek', tl: 'Japanese para sa ospital at parmasya', my: 'ဆေးရုံနှင့် ဆေးဆိုင်တွင် အသုံးပြုသော ဂျပန်ဘာသာ' },
    level: 'intermediate',
    jlptLevel: 'N4',
    color: 'from-red-400 to-rose-500',
    totalLessons: 12,
    estimatedHours: 6,
    lessons: [
      {
        id: 'body-parts',
        title: { ja: '体の部位と症状', en: 'Body Parts & Symptoms', vi: 'Bộ phận cơ thể và triệu chứng', zh: '身体部位和症状' },
        duration: 15,
        content: [
          {
            type: 'vocab',
            title: { ja: '体の部位', en: 'Body Parts' },
            items: [
              { japanese: 'あたま／頭', reading: 'atama', meaning: { en: 'head', vi: 'đầu', zh: '头', ja: '頭' } },
              { japanese: 'のど／喉', reading: 'nodo', meaning: { en: 'throat', vi: 'cổ họng', zh: '喉咙', ja: '喉' } },
              { japanese: 'おなか／お腹', reading: 'onaka', meaning: { en: 'stomach / abdomen', vi: 'bụng', zh: '肚子', ja: 'お腹' } },
              { japanese: 'せなか／背中', reading: 'senaka', meaning: { en: 'back', vi: 'lưng', zh: '背部', ja: '背中' } },
              { japanese: 'むね／胸', reading: 'mune', meaning: { en: 'chest', vi: 'ngực', zh: '胸部', ja: '胸' } },
              { japanese: 'あし／足', reading: 'ashi', meaning: { en: 'leg / foot', vi: 'chân', zh: '腿/脚', ja: '足' } },
            ],
          },
          {
            type: 'vocab',
            title: { ja: '症状を表す言葉', en: 'Symptom Vocabulary' },
            items: [
              { japanese: '〜が痛い', reading: '〜ga itai', meaning: { en: 'My 〜 hurts', vi: '〜 của tôi đau', zh: '〜疼', ja: '〜が痛い' }, example: '頭が痛いです。', exampleReading: 'Atama ga itai desu.', exampleMeaning: { en: 'I have a headache.', vi: 'Tôi bị đau đầu.' } },
              { japanese: '熱がある', reading: 'netsu ga aru', meaning: { en: 'I have a fever', vi: 'Tôi bị sốt', zh: '我发烧了', ja: '発熱' }, example: '38度の熱があります。', exampleMeaning: { en: 'I have a 38°C fever.' } },
              { japanese: 'せきがでる', reading: 'seki ga deru', meaning: { en: 'I have a cough', vi: 'Tôi bị ho', zh: '我在咳嗽', ja: '咳が出る' } },
              { japanese: 'はなみずがでる', reading: 'hanamizu ga deru', meaning: { en: 'I have a runny nose', vi: 'Tôi bị chảy nước mũi', zh: '我流鼻涕', ja: '鼻水が出る' } },
              { japanese: 'げりをしている', reading: 'geri wo shite iru', meaning: { en: 'I have diarrhea', vi: 'Tôi bị tiêu chảy', zh: '我拉肚子', ja: '下痢をしている' } },
              { japanese: 'きもちがわるい', reading: 'kimochi ga warui', meaning: { en: 'I feel nauseous / sick', vi: 'Tôi cảm thấy buồn nôn', zh: '我感觉恶心', ja: '気持ちが悪い（吐き気）' } },
            ],
          },
          {
            type: 'dialogue',
            title: { ja: '会話例：病院の受付で', en: 'Dialogue: At the Hospital Reception' },
            dialogue: [
              { speaker: '受付', japanese: 'どうされましたか？', reading: 'Dou saremashita ka?', meaning: { en: 'What\'s the matter?', vi: 'Bạn bị làm sao vậy?' } },
              { speaker: 'あなた', japanese: '昨日から頭が痛くて、熱もあります。', reading: 'Kinou kara atama ga itakute, netsu mo arimasu.', meaning: { en: 'Since yesterday, I\'ve had a headache and also a fever.', vi: 'Từ hôm qua tôi bị đau đầu và cũng bị sốt.' } },
              { speaker: '受付', japanese: '保険証はお持ちですか？', reading: 'Hoken-shou wa omochi desu ka?', meaning: { en: 'Do you have your insurance card?', vi: 'Bạn có mang theo thẻ bảo hiểm không?' } },
              { speaker: 'あなた', japanese: 'はい、これです。', reading: 'Hai, kore desu.', meaning: { en: 'Yes, here it is.', vi: 'Vâng, đây ạ.' } },
            ],
          },
        ],
      },
    ],
  },

  // ============================
  // COURSE 5: 敬語
  // ============================
  {
    id: 'keigo',
    title: { ja: '敬語マスター', en: 'Keigo (Polite Speech) Master', vi: 'Nắm vững Kính ngữ', zh: '敬语精通', id: 'Kuasai Keigo (Bahasa Hormat)', tl: 'Keigo (Maayos na Pagsasalita)', my: 'Keigo (နှိမ်ချစကား) တတ်မြောက်' },
    description: { ja: '日本のビジネスに欠かせない敬語。丁寧語・尊敬語・謙譲語を実践的に学ぶ', en: 'Master Japanese polite speech — polite, honorific, and humble forms used in business settings', vi: 'Thành thạo kính ngữ Nhật — dạng lịch sự, tôn kính và khiêm tốn dùng trong kinh doanh', zh: '精通日本商务敬语——礼貌语、尊敬语、谦让语', id: 'Kuasai bahasa hormat Jepang dalam bisnis', tl: 'Master ang Japanese polite speech para sa negosyo', my: 'ဂျပန် စီးပွားရေးတွင် နှိမ်ချစကားကို တတ်မြောက်' },
    level: 'advanced',
    jlptLevel: 'N3',
    color: 'from-purple-500 to-purple-600',
    totalLessons: 18,
    estimatedHours: 12,
    lessons: [
      {
        id: 'teineigo',
        title: { ja: '丁寧語の基本', en: 'Polite Speech Basics (Teineigo)', vi: 'Cơ bản về ngôn ngữ lịch sự', zh: '丁宁语基础' },
        duration: 20,
        content: [
          {
            type: 'grammar',
            title: { ja: '丁寧語：です・ます形', en: 'Teineigo: Desu / Masu Form' },
            grammar: [
              {
                pattern: '動詞のます形',
                explanation: { ja: '動詞に「ます」をつけると丁寧な表現になります。', en: 'Adding 「ます」 to verbs makes them polite.', vi: 'Thêm 「ます」 vào động từ để tạo ra dạng lịch sự.' },
                examples: [
                  { japanese: '食べます / 食べました / 食べません', reading: 'Tabemasu / Tabemashita / Tabemasen', meaning: { en: 'eat / ate / don\'t eat', vi: 'ăn / đã ăn / không ăn' } },
                  { japanese: '行きます / 行きました / 行きません', reading: 'Ikimasu / Ikimashita / Ikimasen', meaning: { en: 'go / went / don\'t go', vi: 'đi / đã đi / không đi' } },
                ],
              },
              {
                pattern: '尊敬語：〜ていらっしゃいます',
                explanation: { ja: '相手の行動を高める表現。上司・客・先輩に使う。', en: 'Honorific form to elevate the listener\'s actions. Used for superiors, customers, and seniors.', vi: 'Dạng tôn kính để nâng cao hành động của người nghe. Dùng cho cấp trên, khách hàng.' },
                examples: [
                  { japanese: '社長はいらっしゃいますか？', reading: 'Shachou wa irasshaimasu ka?', meaning: { en: 'Is the president available?', vi: 'Tổng giám đốc có ở đây không?' } },
                  { japanese: '田中部長がお呼びです。', reading: 'Tanaka buchou ga oyobi desu.', meaning: { en: 'Manager Tanaka is calling for you.', vi: 'Trưởng phòng Tanaka đang gọi bạn.' } },
                ],
              },
            ],
          },
        ],
      },
    ],
  },

  // ============================
  // COURSE 6: JLPT N5 対策
  // ============================
  {
    id: 'jlpt-n5',
    title: { ja: 'JLPT N5 完全対策', en: 'JLPT N5 Complete Prep', vi: 'Luyện thi JLPT N5 toàn diện', zh: 'JLPT N5 完全备考', id: 'Persiapan Lengkap JLPT N5', tl: 'Kumpletong Paghahanda sa JLPT N5', my: 'JLPT N5 ပြင်ဆင်ခြင်း' },
    description: { ja: 'JLPT N5試験に合格するための文法・語彙・読解・聴解の完全対策。練習問題付き', en: 'Full preparation for the JLPT N5 exam — grammar, vocabulary, reading, and listening, with practice tests', vi: 'Chuẩn bị toàn diện cho kỳ thi JLPT N5 — ngữ pháp, từ vựng, đọc hiểu, nghe hiểu', zh: 'JLPT N5考试完全备考——语法、词汇、阅读、听力，附练习题', id: 'Persiapan penuh untuk ujian JLPT N5', tl: 'Buong paghahanda para sa pagsubok na JLPT N5', my: 'JLPT N5 စာမေးပွဲအတွက် ပြည့်ဝသော ပြင်ဆင်မှု' },
    level: 'beginner',
    jlptLevel: 'N5',
    color: 'from-teal-400 to-cyan-500',
    totalLessons: 25,
    estimatedHours: 15,
    lessons: [
      {
        id: 'n5-numbers',
        title: { ja: '数字と時間', en: 'Numbers & Time', vi: 'Số và thời gian', zh: '数字和时间' },
        duration: 15,
        content: [
          {
            type: 'vocab',
            title: { ja: '基本の数字', en: 'Basic Numbers' },
            items: [
              { japanese: '一（いち）', reading: 'ichi', meaning: { en: '1', vi: '1', zh: '1', ja: '1' } },
              { japanese: '二（に）', reading: 'ni', meaning: { en: '2', vi: '2', zh: '2', ja: '2' } },
              { japanese: '三（さん）', reading: 'san', meaning: { en: '3', vi: '3', zh: '3', ja: '3' } },
              { japanese: '四（し・よん）', reading: 'shi / yon', meaning: { en: '4', vi: '4', zh: '4', ja: '4' } },
              { japanese: '五（ご）', reading: 'go', meaning: { en: '5', vi: '5', zh: '5', ja: '5' } },
              { japanese: '十（じゅう）', reading: 'juu', meaning: { en: '10', vi: '10', zh: '10', ja: '10' } },
              { japanese: '百（ひゃく）', reading: 'hyaku', meaning: { en: '100', vi: '100', zh: '100', ja: '100' } },
              { japanese: '千（せん）', reading: 'sen', meaning: { en: '1,000', vi: '1,000', zh: '1,000', ja: '1,000' } },
              { japanese: '万（まん）', reading: 'man', meaning: { en: '10,000', vi: '10,000', zh: '10,000', ja: '1万' } },
            ],
          },
          {
            type: 'vocab',
            title: { ja: '時間の表現', en: 'Time Expressions' },
            items: [
              { japanese: '〜時（じ）', reading: '〜ji', meaning: { en: '〜 o\'clock', vi: '〜 giờ', zh: '〜点', ja: '〜時' }, example: '9時です。', exampleMeaning: { en: 'It is 9 o\'clock.', vi: '9 giờ.' } },
              { japanese: '〜分（ふん・ぷん）', reading: '〜fun / pun', meaning: { en: '〜 minutes', vi: '〜 phút', zh: '〜分', ja: '〜分' }, example: '9時30分です。', exampleMeaning: { en: 'It is 9:30.', vi: '9 giờ 30 phút.' } },
              { japanese: 'いま', reading: 'ima', meaning: { en: 'now', vi: 'bây giờ', zh: '现在', ja: '今' } },
              { japanese: 'きょう', reading: 'kyou', meaning: { en: 'today', vi: 'hôm nay', zh: '今天', ja: '今日' } },
              { japanese: 'あした', reading: 'ashita', meaning: { en: 'tomorrow', vi: 'ngày mai', zh: '明天', ja: '明日' } },
              { japanese: 'きのう', reading: 'kinou', meaning: { en: 'yesterday', vi: 'hôm qua', zh: '昨天', ja: '昨日' } },
            ],
          },
          {
            type: 'quiz',
            quiz: [
              { question: { ja: '「3時15分」はどう読みますか？', en: 'How do you read "3時15分"?' }, options: ['さんじじゅうごふん', 'さんじいちごふん', 'さんじじゅうごぷん', 'みっつじかん'], correct: 0, explanation: { en: '「3時15分」 is "san-ji juu-go-fun".' } },
              { question: { ja: '「10,000」は日本語で？', en: 'What is "10,000" in Japanese?' }, options: ['せん', 'じゅうせん', 'まん', 'じゅうまん'], correct: 2, explanation: { en: '10,000 is 「まん」 (man) in Japanese.' } },
            ],
          },
        ],
      },
    ],
  },
];

export function getCourseById(id: string): Course | undefined {
  return courses.find((c) => c.id === id);
}

export function getLessonById(courseId: string, lessonId: string): Lesson | undefined {
  const course = getCourseById(courseId);
  return course?.lessons.find((l) => l.id === lessonId);
}
