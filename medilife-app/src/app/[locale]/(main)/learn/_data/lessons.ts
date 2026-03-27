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
            text: { ja: 'ひらがなは日本語の基本文字です。全部で46文字あります。', en: 'Hiragana is the foundational script of Japanese. There are 46 basic characters.', vi: 'Hiragana là bảng chữ cơ bản nhất của tiếng Nhật. Có tất cả 46 ký tự cơ bản. Hãy học từng ký tự một nhé!' },
          },
          {
            type: 'vocab',
            title: { ja: 'あ行の文字', en: 'A-row characters' },
            items: [
              { japanese: 'あ', reading: 'a', meaning: { ja: 'あ（a）', en: 'a', vi: 'Đọc là "a" (giống chữ "a" trong tiếng Việt)', zh: 'a' } },
              { japanese: 'い', reading: 'i', meaning: { ja: 'い（i）', en: 'i', vi: 'Đọc là "i" (giống chữ "i" trong tiếng Việt)', zh: 'i' } },
              { japanese: 'う', reading: 'u', meaning: { ja: 'う（u）', en: 'u', vi: 'Đọc là "u" (giống chữ "u" trong tiếng Việt)', zh: 'u' } },
              { japanese: 'え', reading: 'e', meaning: { ja: 'え（e）', en: 'e', vi: 'Đọc là "e" (giống chữ "e" trong tiếng Việt)', zh: 'e' } },
              { japanese: 'お', reading: 'o', meaning: { ja: 'お（o）', en: 'o', vi: 'Đọc là "o" (giống chữ "o" trong tiếng Việt)', zh: 'o' } },
            ],
          },
          {
            type: 'vocab',
            title: { ja: 'か行の文字', en: 'Ka-row characters' },
            items: [
              { japanese: 'か', reading: 'ka', meaning: { ja: 'か（ka）', en: 'ka', vi: 'Đọc là "ka" — ví dụ: かさ (kasa) = cái ô', zh: 'ka' }, example: 'かさ', exampleReading: 'kasa', exampleMeaning: { ja: '傘', en: 'umbrella', vi: 'cái ô / dù che mưa', zh: '雨伞' } },
              { japanese: 'き', reading: 'ki', meaning: { ja: 'き（ki）', en: 'ki', vi: 'Đọc là "ki" — ví dụ: きって (kitte) = tem thư', zh: 'ki' }, example: 'きって', exampleReading: 'kitte', exampleMeaning: { ja: '切手', en: 'stamp', vi: 'tem thư', zh: '邮票' } },
              { japanese: 'く', reading: 'ku', meaning: { ja: 'く（ku）', en: 'ku', vi: 'Đọc là "ku" — ví dụ: くつ (kutsu) = giày', zh: 'ku' }, example: 'くつ', exampleReading: 'kutsu', exampleMeaning: { ja: '靴', en: 'shoes', vi: 'đôi giày', zh: '鞋子' } },
              { japanese: 'け', reading: 'ke', meaning: { ja: 'け（ke）', en: 'ke', vi: 'Đọc là "ke" — ví dụ: けいたい (keitai) = điện thoại di động', zh: 'ke' }, example: 'けいたい', exampleReading: 'keitai', exampleMeaning: { ja: '携帯', en: 'mobile phone', vi: 'điện thoại di động', zh: '手机' } },
              { japanese: 'こ', reading: 'ko', meaning: { ja: 'こ（ko）', en: 'ko', vi: 'Đọc là "ko" — ví dụ: こども (kodomo) = trẻ em', zh: 'ko' }, example: 'こども', exampleReading: 'kodomo', exampleMeaning: { ja: '子供', en: 'child', vi: 'trẻ em / đứa trẻ', zh: '孩子' } },
            ],
          },
          {
            type: 'quiz',
            quiz: [
              { question: { ja: '「か」の読み方は？', en: 'How do you read 「か」?', vi: 'Chữ 「か」 đọc như thế nào?' }, options: ['ka', 'ki', 'ku', 'ko'], correct: 0, explanation: { ja: '「か」は「ka」と読みます。', en: '「か」 is read as "ka".', vi: 'Đúng rồi! 「か」 đọc là "ka". Hãy nhớ ký tự này nhé!' } },
              { question: { ja: '「い」の読み方は？', en: 'How do you read 「い」?', vi: 'Chữ 「い」 đọc như thế nào?' }, options: ['a', 'i', 'u', 'e'], correct: 1, explanation: { ja: '「い」は「i」と読みます。', en: '「い」 is read as "i".', vi: 'Đúng rồi! 「い」 đọc là "i" — giống chữ "i" trong tiếng Việt.' } },
              { question: { ja: '「くつ」は英語で何ですか？', en: 'What does 「くつ」 mean in English?', vi: '「くつ」 có nghĩa là gì?' }, options: ['hat', 'shoes', 'bag', 'shirt'], correct: 1, explanation: { ja: '「くつ」は靴、英語でshoesです。', en: '「くつ」(kutsu) means shoes.', vi: 'Đúng rồi! 「くつ」(kutsu) có nghĩa là đôi giày. Hãy ghi nhớ từ này nhé!' } },
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
              { japanese: 'さ', reading: 'sa', meaning: { ja: 'sa', en: 'sa', vi: 'Đọc là "sa" — ví dụ: さくら (sakura) = hoa anh đào', zh: 'sa' }, example: 'さくら', exampleReading: 'sakura', exampleMeaning: { ja: '桜', en: 'cherry blossom', vi: 'hoa anh đào (biểu tượng của Nhật Bản)', zh: '樱花' } },
              { japanese: 'し', reading: 'shi', meaning: { ja: 'shi', en: 'shi', vi: 'Đọc là "shi" — ví dụ: しごと (shigoto) = công việc', zh: 'shi' }, example: 'しごと', exampleReading: 'shigoto', exampleMeaning: { ja: '仕事', en: 'work', vi: 'công việc / việc làm', zh: '工作' } },
              { japanese: 'す', reading: 'su', meaning: { ja: 'su', en: 'su', vi: 'Đọc là "su" — ví dụ: すし (sushi) = món sushi', zh: 'su' }, example: 'すし', exampleReading: 'sushi', exampleMeaning: { ja: '寿司', en: 'sushi', vi: 'món sushi (món ăn nổi tiếng của Nhật)', zh: '寿司' } },
              { japanese: 'せ', reading: 'se', meaning: { ja: 'se', en: 'se', vi: 'Đọc là "se" — ví dụ: せんせい (sensei) = giáo viên', zh: 'se' }, example: 'せんせい', exampleReading: 'sensei', exampleMeaning: { ja: '先生', en: 'teacher', vi: 'giáo viên / thầy cô', zh: '老师' } },
              { japanese: 'そ', reading: 'so', meaning: { ja: 'so', en: 'so', vi: 'Đọc là "so" — ví dụ: そら (sora) = bầu trời', zh: 'so' }, example: 'そら', exampleReading: 'sora', exampleMeaning: { ja: '空', en: 'sky', vi: 'bầu trời', zh: '天空' } },
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
              { question: { ja: '朝のあいさつは何ですか？', en: 'What is the morning greeting?', vi: 'Câu chào buổi sáng là gì?' }, options: ['こんにちは', 'おはようございます', 'こんばんは', 'おやすみなさい'], correct: 1, explanation: { ja: '朝は「おはようございます」です。', en: '"Ohayou gozaimasu" is the morning greeting.', vi: 'Đúng rồi! Buổi sáng dùng「おはようございます」(Ohayou gozaimasu). Đây là câu chào bắt buộc mỗi sáng đi làm!' } },
              { question: { ja: '「ありがとうございます」の意味は？', en: 'What does "Arigatou gozaimasu" mean?', vi: '「ありがとうございます」có nghĩa là gì?' }, options: ['Hello', 'Sorry', 'Thank you', 'Goodbye'], correct: 2, explanation: { ja: '「ありがとうございます」は「Thank you」です。', en: '"Arigatou gozaimasu" means "Thank you".', vi: 'Đúng rồi! 「ありがとうございます」(Arigatou gozaimasu) có nghĩa là "Cảm ơn" (dạng lịch sự). Dùng hàng ngày rất nhiều!' } },
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
                explanation: { ja: '「〜です」は「〜です」を使って自分の情報を伝えます。', en: '"〜desu" is used to state facts about yourself or things. It is polite.', vi: 'Điểm quan trọng: 「〜です」(desu) là trợ động từ lịch sự cuối câu, tương đương "là" trong tiếng Việt. Ví dụ: マリアです = Tôi là Maria. Luôn dùng 「です」 khi nói chuyện lịch sự.' },
                examples: [
                  { japanese: 'マリアです。', reading: 'Maria desu.', meaning: { ja: 'マリアです。', en: 'I am Maria.', vi: 'Tôi là Maria.' } },
                  { japanese: 'フィリピン人です。', reading: 'Firipin-jin desu.', meaning: { ja: 'フィリピン人です。', en: 'I am Filipino.', vi: 'Tôi là người Philippines.' } },
                  { japanese: '25歳です。', reading: 'Nijuu-go-sai desu.', meaning: { ja: '25歳です。', en: 'I am 25 years old.', vi: 'Tôi 25 tuổi.' } },
                ],
              },
              {
                pattern: '〜から来ました',
                explanation: { ja: '「〜から来ました」は出身地を伝えます。', en: '"〜kara kimashita" means "I came from 〜" (nationality/origin).', vi: 'Điểm quan trọng: 「〜から来ました」(kara kimashita) có nghĩa là "Tôi đến từ 〜". Ở đây 「から」 nghĩa là "từ" và 「来ました」 nghĩa là "đã đến". Cấu trúc: [tên nước] + から来ました.' },
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
              { question: { ja: '「私はベトナムから来ました」を正しく訳すと？', en: 'What does "Watashi wa Betonamu kara kimashita" mean?', vi: '「私はベトナムから来ました」có nghĩa là gì?' }, options: ['I live in Vietnam', 'I came from Vietnam', 'I like Vietnam', 'I go to Vietnam'], correct: 1, explanation: { en: '"Kara kimashita" means "came from".', vi: 'Đúng rồi! 「から来ました」(kara kimashita) có nghĩa là "đã đến từ". Vậy câu này có nghĩa là "Tôi đến từ Việt Nam".' } },
              { question: { ja: '「何歳ですか？」に対して25歳の場合の答えは？', en: 'If asked your age and you are 25, what do you say?', vi: 'Khi được hỏi tuổi và bạn 25 tuổi, bạn trả lời thế nào?' }, options: ['25です', '25人です', '25歳です', '25年です'], correct: 2, explanation: { ja: '年齢には「〜歳（さい）です」を使います。', en: 'Use "〜sai desu" for age.', vi: 'Đúng rồi! Khi nói tuổi, dùng 「〜歳（さい）です」. 歳 (sai) là "tuổi" trong tiếng Nhật. Vậy 25 tuổi nói là「25歳です」.' } },
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
                explanation: { ja: '仕事が終わったことを報告する', en: 'Use this to report that a task is complete.', vi: 'Điểm quan trọng: 「〜が完了しました」(ga kanryou shimashita) dùng để báo cáo với cấp trên rằng công việc đã hoàn thành. Đây là mẫu câu rất quan trọng trong môi trường làm việc Nhật Bản.' },
                examples: [
                  { japanese: '報告書の作成が完了しました。', reading: 'Houkokusho no sakusei ga kanryou shimashita.', meaning: { en: 'I\'ve completed the report.', vi: 'Tôi đã hoàn thành báo cáo.' } },
                  { japanese: '作業が完了しました。確認をお願いします。', reading: 'Sagyou ga kanryou shimashita. Kakunin wo onegaishimasu.', meaning: { en: 'The work is done. Please check it.', vi: 'Công việc đã xong. Nhờ bạn kiểm tra giúp.' } },
                ],
              },
              {
                pattern: '〜について確認してもよいですか',
                explanation: { ja: '何かを確認したいときの丁寧な聞き方', en: 'Politely asking to confirm something.', vi: 'Điểm quan trọng: 「〜について確認してもよいですか」là cách hỏi lịch sự để xác nhận thông tin với cấp trên hoặc đồng nghiệp. Dùng khi bạn chưa rõ nội dung công việc và cần hỏi thêm.' },
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
              { question: { ja: '退勤するとき何と言いますか？', en: 'What do you say when leaving work before colleagues?', vi: 'Khi bạn về trước đồng nghiệp, bạn nói gì?' }, options: ['おはようございます', 'いただきます', 'お先に失礼します', 'いらっしゃいませ'], correct: 2, explanation: { en: '"Osaki ni shitsurei shimasu" is said when you leave before your colleagues.', vi: 'Đúng rồi! 「お先に失礼します」(Osaki ni shitsurei shimasu) có nghĩa là "Xin phép về trước". Đây là câu bắt buộc khi về trước đồng nghiệp, thể hiện sự lịch sự trong văn hóa Nhật!' } },
              { question: { ja: '上司から指示を受けたとき、最も丁寧な返答は？', en: 'What is the most polite response when receiving instructions from your boss?', vi: 'Khi nhận chỉ thị từ cấp trên, câu trả lời lịch sự nhất là gì?' }, options: ['わかった', 'はい', 'かしこまりました', 'そうですね'], correct: 2, explanation: { en: '"Kashikomarimashita" is the most formal and polite way to say "understood" to a superior.', vi: 'Đúng rồi! 「かしこまりました」(Kashikomarimashita) là cách nói "Tôi đã hiểu" trang trọng nhất, dùng với cấp trên hoặc khách hàng. Chú ý: 「わかった」là cách nói thông thường, không phù hợp với cấp trên.' } },
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
              { speaker: '受付', japanese: 'どうされましたか？', reading: 'Dou saremashita ka?', meaning: { en: 'What\'s the matter?', vi: 'Bạn có vấn đề gì vậy? / Bạn bị làm sao?' } },
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
                explanation: { ja: '動詞に「ます」をつけると丁寧な表現になります。', en: 'Adding 「ます」 to verbs makes them polite.', vi: 'Điểm quan trọng: Thêm 「ます」 vào cuối động từ để tạo dạng lịch sự (丁寧語 - Teineigo). Đây là dạng cơ bản nhất cần học trước. Ví dụ: 食べる → 食べます (ăn), 行く → 行きます (đi).' },
                examples: [
                  { japanese: '食べます / 食べました / 食べません', reading: 'Tabemasu / Tabemashita / Tabemasen', meaning: { en: 'eat / ate / don\'t eat', vi: 'ăn / đã ăn / không ăn' } },
                  { japanese: '行きます / 行きました / 行きません', reading: 'Ikimasu / Ikimashita / Ikimasen', meaning: { en: 'go / went / don\'t go', vi: 'đi / đã đi / không đi' } },
                ],
              },
              {
                pattern: '尊敬語：〜ていらっしゃいます',
                explanation: { ja: '相手の行動を高める表現。上司・客・先輩に使う。', en: 'Honorific form to elevate the listener\'s actions. Used for superiors, customers, and seniors.', vi: 'Điểm quan trọng: Đây là 尊敬語 (Sonkeigo) — dạng kính ngữ dùng để nâng cao hành động của người khác (cấp trên, khách hàng, tiền bối). Khi nói về hành động của cấp trên, KHÔNG dùng dạng ます thông thường mà phải dùng dạng tôn kính này.' },
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
              { question: { ja: '「3時15分」はどう読みますか？', en: 'How do you read "3時15分"?', vi: '「3時15分」đọc như thế nào?' }, options: ['さんじじゅうごふん', 'さんじいちごふん', 'さんじじゅうごぷん', 'みっつじかん'], correct: 0, explanation: { en: '「3時15分」 is "san-ji juu-go-fun".', vi: 'Đúng rồi! 「3時15分」đọc là "san-ji juu-go-fun" = 3 giờ 15 phút. Nhớ: 時 (ji) = giờ, 分 (fun/pun) = phút.' } },
              { question: { ja: '「10,000」は日本語で？', en: 'What is "10,000" in Japanese?', vi: '「10,000」trong tiếng Nhật là gì?' }, options: ['せん', 'じゅうせん', 'まん', 'じゅうまん'], correct: 2, explanation: { en: '10,000 is 「まん」 (man) in Japanese.', vi: 'Đúng rồi! Điểm đặc biệt: tiếng Nhật dùng đơn vị 万 (man = 10.000) thay vì 1.000 như tiếng Việt. Vì vậy 10.000 = 1万 (ichi-man).' } },
            ],
          },
        ],
      },
    ],
  },

  // ============================
  // COURSE 7: 買い物の日本語
  // ============================
  {
    id: 'shopping-japanese',
    title: { ja: '買い物の日本語', en: 'Shopping Japanese', vi: 'Tiếng Nhật mua sắm', zh: '购物日语', id: 'Bahasa Jepang Belanja', tl: 'Japanese sa Pamimili', my: 'ဈေးဝယ် ဂျပန်ဘာသာ' },
    description: { ja: 'コンビニ・スーパー・お店での買い物に必要な日本語。値段交渉からレジまで完全カバー', en: 'Japanese for shopping at convenience stores, supermarkets, and shops — from prices to checkout', vi: 'Tiếng Nhật mua sắm tại cửa hàng tiện lợi, siêu thị — từ hỏi giá đến thanh toán', zh: '在便利店、超市购物的日语——从询价到结账完整覆盖', id: 'Bahasa Jepang untuk belanja di toko, supermarket — dari harga hingga kasir', tl: 'Japanese para sa pamimili sa convenience store, supermarket', my: 'ဈေးဆိုင်၊ စူပါမားကတ်တွင် ဈေးဝယ်ရန် ဂျပန်ဘာသာ' },
    level: 'beginner',
    jlptLevel: 'N5',
    color: 'from-orange-400 to-amber-500',
    totalLessons: 4,
    estimatedHours: 3,
    lessons: [
      {
        id: 'shopping-basics',
        title: { ja: '値段を聞く・払う', en: 'Asking Prices & Paying', vi: 'Hỏi giá và thanh toán', zh: '询价与付款' },
        duration: 15,
        content: [
          {
            type: 'intro',
            title: { ja: 'この授業について', en: 'About this lesson' },
            text: { ja: 'コンビニやスーパーで使える基本フレーズを学びます。「いくらですか？」「これをください」など、毎日使える表現です。', en: 'Learn essential phrases for convenience stores and supermarkets. Expressions like "How much?" and "I\'ll take this" that you can use every day.', vi: 'Chúng ta sẽ học các cụm từ cơ bản dùng tại cửa hàng tiện lợi và siêu thị. Những câu như「いくらですか」(bao nhiêu tiền?) và「これをください」(cho tôi cái này) là những câu bạn sẽ dùng hàng ngày tại Nhật!' },
          },
          {
            type: 'vocab',
            title: { ja: '値段・支払いに関する言葉', en: 'Price & Payment Vocabulary' },
            items: [
              { japanese: 'いくらですか', reading: 'ikura desu ka', meaning: { ja: '値段を聞く', en: 'How much is it?', vi: 'Bao nhiêu tiền?', zh: '多少钱？', id: 'Berapa harganya?', tl: 'Magkano?', my: 'ဘယ်လောက်လဲ?' }, example: 'これはいくらですか？', exampleReading: 'Kore wa ikura desu ka?', exampleMeaning: { ja: 'これの値段を聞く', en: 'How much is this?', vi: 'Cái này bao nhiêu tiền?' } },
              { japanese: 'これをください', reading: 'kore wo kudasai', meaning: { ja: 'これを買いたい', en: 'I\'ll take this / Please give me this', vi: 'Cho tôi cái này', zh: '请给我这个', id: 'Tolong berikan ini', tl: 'Ibigay mo ito sa akin', my: 'ဒါပေးပါ' }, example: 'これをひとつください。', exampleReading: 'Kore wo hitotsu kudasai.', exampleMeaning: { ja: 'これを1つください', en: 'One of these please.', vi: 'Cho tôi một cái này.' } },
              { japanese: 'レシートをお願いします', reading: 'reshiito wo onegaishimasu', meaning: { ja: '領収書を要求する', en: 'Receipt please', vi: 'Cho tôi hóa đơn', zh: '请给我收据', id: 'Tolong berikan kuitansi', tl: 'Receipt po', my: 'ဘောင်ချာပေးပါ' } },
              { japanese: 'おつりはいりません', reading: 'otsuri wa irimasen', meaning: { ja: 'おつり不要', en: 'No change needed (keep the change)', vi: 'Không cần thối lại', zh: '不用找零', id: 'Tidak perlu kembalian', tl: 'Hindi na kailangan ng sukli', my: 'အမ်းငွေမလိုပါ' } },
              { japanese: 'クレジットカードで払えますか', reading: 'kurejitto kaado de haraemasu ka', meaning: { ja: 'カード払い可能か確認', en: 'Can I pay by credit card?', vi: 'Tôi có thể trả bằng thẻ tín dụng không?', zh: '可以用信用卡付款吗？', id: 'Bisakah bayar dengan kartu kredit?', tl: 'Maaari bang bayad sa credit card?', my: 'ခရက်ဒစ်ကတ်နဲ့ ပေးလို့ရမလား?' } },
              { japanese: 'PayPayで払えますか', reading: 'PayPay de haraemasu ka', meaning: { ja: 'スマホ決済の確認', en: 'Can I pay with PayPay?', vi: 'Có thể thanh toán bằng PayPay không?', zh: '可以用PayPay付款吗？', id: 'Bisakah bayar dengan PayPay?', tl: 'Pwede bang bayad sa PayPay?', my: 'PayPay နဲ့ ပေးလို့ရမလား?' } },
              { japanese: 'ふくろはいりますか', reading: 'fukuro wa irimasu ka', meaning: { ja: 'レジ袋が必要か', en: 'Do you need a bag?', vi: 'Bạn có cần túi không?', zh: '需要袋子吗？', id: 'Apakah perlu kantong?', tl: 'Kailangan mo ng bag?', my: 'အိတ်လိုအပ်လားဆိုတာ' } },
              { japanese: 'ふくろはけっこうです', reading: 'fukuro wa kekkou desu', meaning: { ja: '袋は不要', en: 'No bag needed', vi: 'Không cần túi', zh: '不需要袋子', id: 'Tidak perlu kantong', tl: 'Hindi na kailangan ng bag', my: 'အိတ်မလိုပါ' } },
            ],
          },
          {
            type: 'dialogue',
            title: { ja: '会話例：コンビニでの買い物', en: 'Dialogue: Shopping at a Convenience Store' },
            dialogue: [
              { speaker: '店員', japanese: 'いらっしゃいませ！', reading: 'Irasshaimase!', meaning: { ja: 'ようこそ', en: 'Welcome!', vi: 'Chào mừng!', zh: '欢迎光临！', id: 'Selamat datang!', tl: 'Maligayang pagdating!', my: 'ကြိုဆိုပါသည်!' } },
              { speaker: 'あなた', japanese: 'これとこれをください。', reading: 'Kore to kore wo kudasai.', meaning: { ja: 'これとこれを買いたい', en: 'I\'ll take this one and this one.', vi: 'Cho tôi cái này và cái này.', zh: '请给我这个和这个。', id: 'Tolong berikan ini dan ini.', tl: 'Ibigay mo ito at ito.', my: 'ဒါနဲ့ ဒါပေးပါ' } },
              { speaker: '店員', japanese: '合計で548円になります。', reading: 'Goukei de go-hyaku-yonjuu-hachi-en ni narimasu.', meaning: { ja: '合計金額の案内', en: 'The total comes to 548 yen.', vi: 'Tổng cộng là 548 yên.', zh: '总共548日元。', id: 'Totalnya 548 yen.', tl: 'Kabuuan ay 548 yen.', my: 'စုစုပေါင်း 548 ယန်း ဖြစ်ပါသည်' } },
              { speaker: 'あなた', japanese: 'カードで払えますか？', reading: 'Kaado de haraemasu ka?', meaning: { ja: 'カード払い可能か', en: 'Can I pay by card?', vi: 'Có thể trả bằng thẻ không?', zh: '可以刷卡吗？', id: 'Bisa bayar pakai kartu?', tl: 'Pwede bang card?', my: 'ကတ်နဲ့ပေးလို့ရမလား?' } },
              { speaker: '店員', japanese: 'はい、こちらにタッチしてください。', reading: 'Hai, kochira ni tatch shite kudasai.', meaning: { ja: 'カードリーダーにタッチ', en: 'Yes, please tap here.', vi: 'Vâng, vui lòng chạm vào đây.', zh: '好的，请在这里刷卡。', id: 'Ya, silakan tap di sini.', tl: 'Oo, i-tap dito.', my: 'ဟုတ်ကဲ့၊ ဒီမှာ တို့ပါ' } },
              { speaker: 'あなた', japanese: 'レシートをお願いします。', reading: 'Reshiito wo onegaishimasu.', meaning: { ja: 'レシートをもらう', en: 'Receipt please.', vi: 'Cho tôi hóa đơn.', zh: '请给我收据。', id: 'Tolong kuitansinya.', tl: 'Pakibigay ang resibo.', my: 'ဘောင်ချာပေးပါ' } },
            ],
          },
          {
            type: 'quiz',
            quiz: [
              { question: { ja: '値段を聞くときは何と言いますか？', en: 'What do you say when asking the price?' }, options: ['これをください', 'いくらですか', 'おつりはいりません', 'レシートをください'], correct: 1, explanation: { ja: '「いくらですか」で値段を聞きます。', en: '"Ikura desu ka" means "How much is it?"', vi: '"Ikura desu ka" có nghĩa là "Bao nhiêu tiền?"', zh: '「いくらですか」用于询问价格。', id: '"Ikura desu ka" artinya "Berapa harganya?"', tl: '"Ikura desu ka" ay ibig sabihin "Magkano?"', my: '"Ikura desu ka" ဆိုသည်မှာ "ဘယ်လောက်လဲ?" ဟု မေးသည်' } },
              { question: { ja: '袋が不要なとき何と言いますか？', en: 'What do you say when you don\'t need a bag?' }, options: ['ふくろをください', 'ふくろはけっこうです', 'ふくろはいりますか', 'ふくろをどうぞ'], correct: 1, explanation: { ja: '「ふくろはけっこうです」は「袋は不要です」の丁寧な表現。', en: '"Fukuro wa kekkou desu" politely means "No bag needed".', vi: '"Fukuro wa kekkou desu" nghĩa là không cần túi.', zh: '「ふくろはけっこうです」礼貌地表示不需要袋子。', id: '"Fukuro wa kekkou desu" berarti tidak perlu kantong.', tl: '"Fukuro wa kekkou desu" ay ibig sabihin hindi na kailangan ng bag.', my: '"Fukuro wa kekkou desu" ဆိုသည်မှာ အိတ်မလိုဟု ယဉ်ကျေးစွာ ပြောသည်' } },
            ],
          },
        ],
      },
      {
        id: 'supermarket-japanese',
        title: { ja: 'スーパーでの買い物', en: 'Shopping at the Supermarket', vi: 'Mua sắm ở siêu thị', zh: '在超市购物' },
        duration: 15,
        content: [
          {
            type: 'vocab',
            title: { ja: 'スーパーで使う言葉', en: 'Supermarket Vocabulary' },
            items: [
              { japanese: '売り場／うりば', reading: 'uriba', meaning: { ja: '商品を売っているコーナー', en: 'sales floor / product section', vi: 'khu vực bán hàng', zh: '销售区域', id: 'area penjualan', tl: 'lugar ng pagbebenta', my: 'ရောင်းဝယ်ရာနေရာ' } },
              { japanese: '野菜売り場／やさいうりば', reading: 'yasai uriba', meaning: { ja: '野菜コーナー', en: 'vegetable section', vi: 'khu rau củ', zh: '蔬菜区', id: 'bagian sayuran', tl: 'seksyon ng gulay', my: 'ဟင်းသီးဟင်းရွက် ဌာနခွဲ' } },
              { japanese: '賞味期限／しょうみきげん', reading: 'shoumi kigen', meaning: { ja: '食べられる期限', en: 'best-by date', vi: 'hạn sử dụng', zh: '最佳食用期限', id: 'tanggal kadaluarsa', tl: 'petsa ng expiry', my: 'ကုန်ဆုံးရက်' }, example: '賞味期限を確認してください。', exampleReading: 'Shoumi kigen wo kakunin shite kudasai.', exampleMeaning: { en: 'Please check the best-by date.', vi: 'Hãy kiểm tra hạn sử dụng.' } },
              { japanese: 'セール中／セールちゅう', reading: 'seeru chuu', meaning: { ja: 'セール実施中', en: 'on sale now', vi: 'đang sale', zh: '正在特卖', id: 'sedang sale', tl: 'sale ngayon', my: 'Sale ရောင်းနေသည်' } },
              { japanese: '半額／はんがく', reading: 'hangaku', meaning: { ja: '50%オフ', en: 'half price / 50% off', vi: 'nửa giá', zh: '半价', id: 'setengah harga', tl: 'kalahating presyo', my: 'တစ်ဝက်ဈေး' }, example: '半額シールが貼ってあります。', exampleReading: 'Hangaku shiiru ga hatte arimasu.', exampleMeaning: { en: 'There is a half-price sticker on it.', vi: 'Có nhãn giá một nửa.' } },
              { japanese: '〜円引き', reading: '〜en biki', meaning: { ja: '〜円割引', en: '〜 yen off (discount)', vi: 'giảm 〜 yên', zh: '减〜日元', id: 'diskon 〜 yen', tl: '〜 yen ang bawas', my: '〜 ယန်းလျှော့' }, example: '100円引きになります。', exampleReading: '100-en biki ni narimasu.', exampleMeaning: { en: 'That\'s 100 yen off.', vi: 'Giảm 100 yên.' } },
              { japanese: 'ポイントカード', reading: 'pointo kaado', meaning: { ja: 'ポイントをためるカード', en: 'loyalty / points card', vi: 'thẻ tích điểm', zh: '积分卡', id: 'kartu poin', tl: 'points card', my: 'ပွိုင့်ကတ်' }, example: 'ポイントカードはお持ちですか？', exampleReading: 'Pointo kaado wa omochi desu ka?', exampleMeaning: { en: 'Do you have a points card?', vi: 'Bạn có thẻ tích điểm không?' } },
            ],
          },
          {
            type: 'grammar',
            title: { ja: '「〜はありますか」で商品を探す', en: 'Finding products with 「〜wa arimasu ka」' },
            grammar: [
              {
                pattern: '〜はどこにありますか',
                explanation: { ja: '商品の場所を聞くときに使います。「どこ」は場所を聞く言葉です。', en: 'Use this to ask where a product is located. "Doko" means "where".', vi: 'Dùng để hỏi vị trí của sản phẩm. "Doko" nghĩa là "ở đâu".', zh: '用于询问商品在哪里。"どこ"表示"哪里"。', id: 'Digunakan untuk menanyakan lokasi produk.', tl: 'Gamitin ito para magtanong kung saan ang produkto.', my: 'ထုတ်ကုန်ဘယ်နေရာမှာ ရှိသလဲ မေးရန်' },
                examples: [
                  { japanese: 'お米はどこにありますか？', reading: 'Okome wa doko ni arimasu ka?', meaning: { ja: 'お米の売り場を聞く', en: 'Where is the rice?', vi: 'Gạo ở đâu ạ?', zh: '大米在哪里？', id: 'Beras ada di mana?', tl: 'Nasaan ang bigas?', my: 'ဆန် ဘယ်မှာ ရှိသလဲ?' } },
                  { japanese: '冷凍食品はどこにありますか？', reading: 'Reitou shokuhin wa doko ni arimasu ka?', meaning: { ja: '冷凍食品の場所を聞く', en: 'Where are the frozen foods?', vi: 'Thức ăn đông lạnh ở đâu?', zh: '冷冻食品在哪里？', id: 'Makanan beku di mana?', tl: 'Nasaan ang frozen food?', my: 'အေးခဲအစားအစာ ဘယ်မှာ ရှိသလဲ?' } },
                ],
              },
              {
                pattern: '〜を2つください',
                explanation: { ja: '数量を指定して商品を頼む表現。「ひとつ・ふたつ・みっつ」など和語で数えます。', en: 'Use this to request a specific quantity. Count using hitotsu, futatsu, mittsu...', vi: 'Điểm quan trọng: Dùng để yêu cầu số lượng cụ thể. Trong tiếng Nhật có 2 hệ đếm: hệ Nhật thuần (ひとつ・ふたつ・みっつ) dùng cho đồ vật thông thường, và hệ Hán-Nhật (一・二・三ichi・ni・san) dùng với đơn vị đếm. Ví dụ: りんごを3つ (3 quả táo) vs. ジュースを3本 (3 chai nước).', zh: '用于指定数量购买。使用一个、两个、三个等日本数词。', id: 'Gunakan ini untuk meminta jumlah tertentu.', tl: 'Gamitin ito para humiling ng partikular na dami.', my: 'အရေအတွက် သတ်မှတ်၍ ထုတ်ကုန် တောင်းရန်' },
                examples: [
                  { japanese: 'りんごを3つください。', reading: 'Ringo wo mittsu kudasai.', meaning: { ja: 'リンゴを3個', en: 'Three apples please.', vi: 'Cho tôi 3 quả táo.', zh: '请给我3个苹果。', id: 'Tolong tiga apel.', tl: 'Tatlong mansanas po.', my: 'ပန်းသီး ၃ လုံးပေးပါ' } },
                  { japanese: 'このジュースを2本ください。', reading: 'Kono juusu wo nihon kudasai.', meaning: { ja: 'ジュース2本', en: 'Two bottles of this juice please.', vi: 'Cho tôi 2 chai nước này.', zh: '请给我两瓶这个果汁。', id: 'Dua botol jus ini.', tl: 'Dalawang bote ng juice na ito.', my: 'ဒီရေသီးရည် ၂ ဘူးပေးပါ' } },
                ],
              },
            ],
          },
          {
            type: 'quiz',
            quiz: [
              { question: { ja: '「半額」の意味は？', en: 'What does "hangaku" mean?' }, options: ['10% off', '25% off', '50% off', '75% off'], correct: 2, explanation: { ja: '「半額」は「はんがく」と読み、50%オフの意味です。', en: '"Hangaku" means half price, which is 50% off.', vi: '"Hangaku" nghĩa là nửa giá, tức là giảm 50%.', zh: '「半額」读作"hangaku"，意为五折。', id: '"Hangaku" berarti setengah harga, diskon 50%.', tl: '"Hangaku" ay ibig sabihin kalahating presyo, 50% diskwento.', my: '"Hangaku" ဆိုသည်မှာ တစ်ဝက်ဈေး ၅၀% လျှော့ဟု အဓိပ္ပာယ်ရသည်' } },
              { question: { ja: 'りんごを2個買いたいとき何と言う？', en: 'When you want to buy 2 apples, what do you say?' }, options: ['りんごを2本ください', 'りんごをふたつください', 'りんごを2冊ください', 'りんごを2枚ください'], correct: 1, explanation: { ja: 'りんごなど個数を数えるときは「ひとつ・ふたつ」を使います。', en: 'For counting items like fruit, use "hitotsu, futatsu". 2 is "futatsu".', vi: 'Đếm vật phẩm như quả táo dùng "hitotsu, futatsu". 2 là "futatsu".', zh: '数水果等物品时使用"一つ・二つ"。', id: 'Untuk menghitung benda seperti buah, gunakan "hitotsu, futatsu".', tl: 'Para sa pagbibilang ng prutas, gamitin ang "hitotsu, futatsu".', my: 'သစ်သီးကဲ့သို့ ပစ္စည်းများ ရေတွက်ရာတွင် "hitotsu, futatsu" ကိုသုံးသည်' } },
            ],
          },
        ],
      },
      {
        id: 'sale-discount',
        title: { ja: 'セール・割引の表現', en: 'Sales & Discount Expressions', vi: 'Biểu hiện giảm giá và sale', zh: '促销与折扣表达' },
        duration: 12,
        content: [
          {
            type: 'vocab',
            title: { ja: 'セール・割引の言葉', en: 'Sale & Discount Vocabulary' },
            items: [
              { japanese: 'セール／sale', reading: 'seeru', meaning: { ja: '特売・値引きセール', en: 'sale', vi: 'đợt giảm giá', zh: '促销', id: 'penjualan', tl: 'sale', my: 'ဈေးလျော့ရောင်း' } },
              { japanese: '割引／わりびき', reading: 'waribiki', meaning: { ja: '値段を引くこと', en: 'discount', vi: 'chiết khấu / giảm giá', zh: '折扣', id: 'diskon', tl: 'diskwento', my: 'လျှော့ဈေး' }, example: '10%割引になります。', exampleReading: 'Juu-paasento waribiki ni narimasu.', exampleMeaning: { en: 'There is a 10% discount.', vi: 'Giảm giá 10%.' } },
              { japanese: '特売／とくばい', reading: 'tokubai', meaning: { ja: '特別価格で売ること', en: 'special sale', vi: 'khuyến mãi đặc biệt', zh: '特卖', id: 'penjualan spesial', tl: 'espesyal na sale', my: 'အထူးရောင်းချ' } },
              { japanese: 'タイムセール', reading: 'taimu seeru', meaning: { ja: '時間限定セール', en: 'time-limited sale', vi: 'sale có thời hạn', zh: '限时特卖', id: 'penjualan terbatas waktu', tl: 'time-limited sale', my: 'အချိန်ကန့်သတ် ဈေးလျော့ရောင်း' } },
              { japanese: '〜%オフ', reading: '〜paasento ofu', meaning: { ja: '〜%値引き', en: '〜% off', vi: 'giảm 〜%', zh: '打〜折', id: 'diskon 〜%', tl: '〜% off', my: '〜% လျှော့' } },
              { japanese: 'お得／おとく', reading: 'otoku', meaning: { ja: 'お買い得、コスパが良い', en: 'good deal / bargain', vi: 'hời / tiết kiệm', zh: '划算', id: 'hemat / murah meriah', tl: 'sulit', my: 'ဈေးသင့်' }, example: 'これはお得ですね！', exampleReading: 'Kore wa otoku desu ne!', exampleMeaning: { en: 'This is a good deal!', vi: 'Cái này hời thật!' } },
            ],
          },
          {
            type: 'dialogue',
            title: { ja: '会話例：セールの商品を買う', en: 'Dialogue: Buying Sale Items' },
            dialogue: [
              { speaker: 'あなた', japanese: 'このジャケット、セール中ですか？', reading: 'Kono jaketto, seeru chuu desu ka?', meaning: { ja: 'セール中か確認', en: 'Is this jacket on sale?', vi: 'Cái áo khoác này có đang sale không?', zh: '这件夹克正在打折吗？', id: 'Jaket ini sedang sale?', tl: 'Naka-sale ba ang jacket na ito?', my: 'ဒီဂျာကင်က Sale ရောင်းနေသလား?' } },
              { speaker: '店員', japanese: 'はい、今週末まで30%オフです！', reading: 'Hai, konshuu-matsu made sanjuu-paasento ofu desu!', meaning: { ja: '週末まで30%割引', en: 'Yes, it\'s 30% off until this weekend!', vi: 'Vâng, giảm 30% đến cuối tuần này!', zh: '是的，到这个周末前打七折！', id: 'Ya, diskon 30% sampai akhir minggu ini!', tl: 'Oo, 30% off hanggang katapusan ng linggo!', my: 'ဟုတ်ကဲ့၊ ဒီသောကြာနေ့အထိ ၃၀% လျှော့ပါ!' } },
              { speaker: 'あなた', japanese: 'じゃあ、これをください。サイズはMです。', reading: 'Jaa, kore wo kudasai. Saizu wa M desu.', meaning: { ja: 'Mサイズを購入', en: 'Then I\'ll take this one. Size M.', vi: 'Vậy thì cho tôi cái này. Cỡ M.', zh: '那么给我这件，尺寸M。', id: 'Kalau begitu saya ambil ini. Ukuran M.', tl: 'Sige, ito na. Size M.', my: 'ဒါဆိုရင် ဒါပေးပါ။ Size M ပါ' } },
              { speaker: '店員', japanese: '元値が5,000円で、割引後は3,500円になります。', reading: 'Motone ga go-sen-en de, waribiki go wa san-zen-go-hyaku-en ni narimasu.', meaning: { ja: '元値5000円、割引後3500円', en: 'The original price is 5,000 yen, and after discount it\'s 3,500 yen.', vi: 'Giá gốc 5.000 yên, sau giảm còn 3.500 yên.', zh: '原价5000日元，折扣后3500日元。', id: 'Harga asli 5.000 yen, setelah diskon 3.500 yen.', tl: 'Ang original na presyo ay 5,000 yen, at pagkatapos ng diskwento ay 3,500 yen.', my: 'မူလဈေးနှုန်း ၅၀၀၀ ယန်း ဖြစ်ပြီး လျှော့ပြီးနောက် ၃၅၀၀ ယန်း ဖြစ်ပါသည်' } },
            ],
          },
          {
            type: 'quiz',
            quiz: [
              { question: { ja: '「タイムセール」とはどういう意味ですか？', en: 'What does "taimu seeru" mean?', vi: '「タイムセール」có nghĩa là gì?' }, options: ['時間通りの営業', '時間限定の特売', '時間の節約', '営業時間'], correct: 1, explanation: { ja: '「タイムセール」は時間限定の特売のことです。閉店前などに行われることが多いです。', en: '"Taimu seeru" is a time-limited sale, often done before closing time.', vi: 'Đúng rồi! 「タイムセール」(taimu seeru) là đợt giảm giá có thời hạn, thường diễn ra trước giờ đóng cửa. Đặc biệt ở siêu thị Nhật, khoảng 18-20 giờ tối thường có タイムセール cho thực phẩm tươi sống — rất tiết kiệm!', zh: '「タイムセール」是限时特卖，经常在关店前进行。', id: '"Taimu seeru" adalah penjualan terbatas waktu, sering dilakukan sebelum toko tutup.', tl: '"Taimu seeru" ay time-limited sale, kadalasan bago magsara ang tindahan.', my: '"Taimu seeru" ဆိုသည်မှာ အချိန်ကန့်သတ် ဈေးလျော့ရောင်းချမှု ဖြစ်သည်' } },
              { question: { ja: '「30%オフ」の元値5000円の商品はいくらですか？', en: 'With 30% off, how much is a product originally priced at 5000 yen?' }, options: ['1500円', '3000円', '3500円', '4000円'], correct: 2, explanation: { ja: '5000円 × 70% = 3500円です。30%オフは70%の値段になります。', en: '5000 yen × 70% = 3500 yen. 30% off means you pay 70%.', vi: '5000 yên × 70% = 3500 yên. Giảm 30% tức là trả 70%.', zh: '5000日元×70%=3500日元。打七折即原价的70%。', id: '5000 yen × 70% = 3500 yen.', tl: '5000 yen × 70% = 3500 yen.', my: '5000 ယန်း × 70% = 3500 ယန်း ဖြစ်သည်' } },
            ],
          },
        ],
      },
      {
        id: 'receipt-complaint',
        title: { ja: '領収書・返品・クレーム', en: 'Receipts, Returns & Complaints', vi: 'Biên lai, trả hàng và khiếu nại', zh: '收据、退货与投诉' },
        duration: 12,
        content: [
          {
            type: 'vocab',
            title: { ja: '返品・クレームの言葉', en: 'Return & Complaint Vocabulary' },
            items: [
              { japanese: '領収書／りょうしゅうしょ', reading: 'ryoushuusho', meaning: { ja: '正式な領収書（税務用）', en: 'official receipt (for tax purposes)', vi: 'hóa đơn chính thức', zh: '正式收据（用于税务）', id: 'kuitansi resmi', tl: 'opisyal na resibo', my: 'တရားဝင် ငွေလက်ခံပြေစာ' } },
              { japanese: '返品／へんぴん', reading: 'henpin', meaning: { ja: '商品を返すこと', en: 'product return', vi: 'trả hàng', zh: '退货', id: 'retur produk', tl: 'ibalik ang produkto', my: 'ကုန်ပစ္စည်း ပြန်အမ်း' }, example: 'これを返品したいのですが。', exampleReading: 'Kore wo henpin shitai no desu ga.', exampleMeaning: { en: 'I\'d like to return this.', vi: 'Tôi muốn trả lại cái này.' } },
              { japanese: '交換／こうかん', reading: 'koukan', meaning: { ja: '商品を別のものと替える', en: 'exchange', vi: 'đổi hàng', zh: '换货', id: 'tukar produk', tl: 'palitan ang produkto', my: 'ကုန်ပစ္စည်း လဲလှယ်' } },
              { japanese: 'レシートはありますか', reading: 'reshiito wa arimasu ka', meaning: { ja: 'レシートの有無確認', en: 'Do you have your receipt?', vi: 'Bạn có hóa đơn không?', zh: '您有收据吗？', id: 'Apakah ada struk belanja?', tl: 'Mayroon kang resibo?', my: 'ဘောင်ချာ ရှိပါသလား?' } },
              { japanese: '壊れている／こわれている', reading: 'kowarete iru', meaning: { ja: '商品が壊れている', en: 'broken / damaged', vi: 'bị hỏng', zh: '坏掉了', id: 'rusak', tl: 'sira', my: 'ပျက်နေသည်' }, example: '買ったとき、すでに壊れていました。', exampleReading: 'Katta toki, sude ni kowarete imashita.', exampleMeaning: { en: 'It was already broken when I bought it.', vi: 'Khi mua đã bị hỏng rồi.' } },
            ],
          },
          {
            type: 'dialogue',
            title: { ja: '会話例：商品の返品', en: 'Dialogue: Returning a Product' },
            dialogue: [
              { speaker: 'あなた', japanese: 'すみません、これを返品したいのですが。', reading: 'Sumimasen, kore wo henpin shitai no desu ga.', meaning: { ja: '返品を申し出る', en: 'Excuse me, I\'d like to return this.', vi: 'Xin lỗi, tôi muốn trả lại cái này.', zh: '打扰一下，我想退这个商品。', id: 'Permisi, saya ingin mengembalikan ini.', tl: 'Excuse me, gusto ko itong ibalik.', my: 'တောင်းပန်ပါသည်၊ ဒါကို ပြန်အမ်းချင်ပါတယ်' } },
              { speaker: '店員', japanese: 'レシートはお持ちですか？', reading: 'Reshiito wa omochi desu ka?', meaning: { ja: 'レシートの確認', en: 'Do you have your receipt?', vi: 'Bạn có mang hóa đơn không?', zh: '您带了收据吗？', id: 'Apakah membawa struk?', tl: 'Mayroon ka bang resibo?', my: 'ဘောင်ချာ ပါလာသလား?' } },
              { speaker: 'あなた', japanese: 'はい、こちらです。買ったとき壊れていました。', reading: 'Hai, kochira desu. Katta toki kowarete imashita.', meaning: { ja: 'レシートを渡し、壊れていた旨を伝える', en: 'Yes, here it is. It was broken when I bought it.', vi: 'Vâng, đây ạ. Khi mua nó đã bị hỏng rồi.', zh: '在这里。购买时它就是坏的。', id: 'Ya, ini dia. Sudah rusak saat dibeli.', tl: 'Oo, ito. Sira na siya nang bilhin ko.', my: 'ဟုတ်ကဲ့၊ ဒီမှာပါ။ ဝယ်တုန်းက ပျက်နေပြီ ဖြစ်ပါသည်' } },
              { speaker: '店員', japanese: '申し訳ございません。交換いたします。', reading: 'Moushiwake gozaimasen. Koukan itashimasu.', meaning: { ja: '謝罪して交換を提案', en: 'I sincerely apologize. We will exchange it.', vi: 'Tôi thành thật xin lỗi. Chúng tôi sẽ đổi hàng cho bạn.', zh: '非常抱歉。我们将为您换货。', id: 'Mohon maaf. Kami akan menggantinya.', tl: 'Humihingi kami ng paumanhin. Papalitan namin ito.', my: 'တောင်းပန်ပါသည်။ လဲပေးပါမည်' } },
            ],
          },
          {
            type: 'quiz',
            quiz: [
              { question: { ja: '「領収書」と「レシート」の違いは？', en: 'What is the difference between "ryoushuusho" and "reshiito"?', vi: '「領収書」và「レシート」khác nhau như thế nào?' }, options: ['同じ意味', '領収書は税務用の正式書類', 'レシートは海外用', '領収書はスーパーのみ'], correct: 1, explanation: { ja: '「レシート」はレジで発行する簡易書類。「領収書」は宛名と印鑑が入った税務用の正式な書類です。', en: '"Reshiito" is a simple cash register receipt. "Ryoushuusho" is an official receipt with the recipient\'s name and stamp, used for tax purposes.', vi: 'Đúng rồi! 「レシート」là biên lai đơn giản từ máy tính tiền. 「領収書」là hóa đơn chính thức ghi tên người nhận và có con dấu, dùng cho mục đích thuế hoặc xin hoàn tiền từ công ty. Khi cần 領収書, hãy nói:「領収書をお願いします」(Cho tôi hóa đơn chính thức).', zh: '「レシート」是简单的收银机凭据。「領収書」是含有收件人和印章的正式税务收据。', id: '"Reshiito" adalah struk kasir sederhana. "Ryoushuusho" adalah kuitansi resmi untuk keperluan pajak.', tl: '"Reshiito" ay simpleng resibo mula sa cash register. "Ryoushuusho" ay opisyal na resibo para sa buwis.', my: '"Reshiito" သည် ကက်ရှ်ရာ ပြေစာ ဖြစ်ပြီး "Ryoushuusho" သည် အခွန်ရည်ရွယ်ချက်အတွက် တရားဝင် ပြေစာ ဖြစ်သည်' } },
            ],
          },
        ],
      },
    ],
  },

  // ============================
  // COURSE 8: 数字・時間・日付
  // ============================
  {
    id: 'numbers-time',
    title: { ja: '数字・時間・日付', en: 'Numbers, Time & Dates', vi: 'Số, Thời gian & Ngày tháng', zh: '数字、时间与日期', id: 'Angka, Waktu & Tanggal', tl: 'Mga Numero, Oras at Petsa', my: 'ဂဏန်းများ၊ အချိန်နှင့် ရက်စွဲ' },
    description: { ja: '日本語の数え方（和語数詞・漢語数詞）、時間の読み方、曜日・月・年号を完全マスター', en: 'Master Japanese counting (native and Sino-Japanese numbers), telling time, days, months, and years', vi: 'Thành thạo cách đếm (số thuần Nhật và Hán-Nhật), đọc giờ, ngày trong tuần, tháng, năm', zh: '完全掌握日语数数（和语数词・汉语数词）、时间、星期、月份和年号', id: 'Kuasai cara berhitung Jepang, membaca jam, hari, bulan, dan tahun', tl: 'Master ang Japanese na pagbibilang, pagbabasa ng oras, araw, buwan, at taon', my: 'ဂျပန် ဂဏန်းရေတွက်နည်း၊ အချိန်ဖတ်နည်း၊ ရက်သတ္တပတ်၊ လ၊ နှစ်တို့ကို တတ်မြောက်' },
    level: 'beginner',
    jlptLevel: 'N5',
    color: 'from-yellow-400 to-orange-500',
    totalLessons: 4,
    estimatedHours: 3,
    lessons: [
      {
        id: 'wago-numbers',
        title: { ja: '和語数詞（ひとつ・ふたつ）', en: 'Native Japanese Numbers (hitotsu, futatsu...)', vi: 'Số đếm thuần Nhật (hitotsu, futatsu...)', zh: '日本固有数词（一つ・二つ...）' },
        duration: 15,
        content: [
          {
            type: 'intro',
            title: { ja: '和語数詞とは？', en: 'What are Native Japanese Numbers?' },
            text: { ja: '日本語には2種類の数え方があります。「いち・に・さん」（漢語数詞）と「ひとつ・ふたつ・みっつ」（和語数詞）です。和語数詞は1〜10のものを数えるときに使います。', en: 'Japanese has two counting systems: "ichi, ni, san..." (Sino-Japanese) and "hitotsu, futatsu, mittsu..." (native Japanese). Native numbers are used for counting 1-10 objects.', vi: 'Điểm thú vị: Tiếng Nhật có 2 hệ đếm! Hệ Hán-Nhật (một, hai, ba → いち・に・さん) và hệ Nhật thuần (ひとつ・ふたつ・みっつ). Hệ Nhật thuần dùng để đếm đồ vật từ 1 đến 10 khi không có đơn vị đếm cụ thể. Hãy luyện tập cả hai nhé!' },
          },
          {
            type: 'vocab',
            title: { ja: '和語数詞 1〜10', en: 'Native Japanese Numbers 1–10' },
            items: [
              { japanese: 'ひとつ（一つ）', reading: 'hitotsu', meaning: { ja: '1個・1つ', en: 'one (item)', vi: 'một (đồ vật)', zh: '一个', id: 'satu (benda)', tl: 'isa', my: 'တစ်ခု' }, example: 'りんごをひとつください。', exampleReading: 'Ringo wo hitotsu kudasai.', exampleMeaning: { en: 'One apple please.', vi: 'Cho tôi một quả táo.' } },
              { japanese: 'ふたつ（二つ）', reading: 'futatsu', meaning: { ja: '2個・2つ', en: 'two (items)', vi: 'hai', zh: '两个', id: 'dua', tl: 'dalawa', my: 'နှစ်ခု' } },
              { japanese: 'みっつ（三つ）', reading: 'mittsu', meaning: { ja: '3個・3つ', en: 'three (items)', vi: 'ba', zh: '三个', id: 'tiga', tl: 'tatlo', my: 'သုံးခု' } },
              { japanese: 'よっつ（四つ）', reading: 'yottsu', meaning: { ja: '4個・4つ', en: 'four (items)', vi: 'bốn', zh: '四个', id: 'empat', tl: 'apat', my: 'လေးခု' } },
              { japanese: 'いつつ（五つ）', reading: 'itsutsu', meaning: { ja: '5個・5つ', en: 'five (items)', vi: 'năm', zh: '五个', id: 'lima', tl: 'lima', my: 'ငါးခု' } },
              { japanese: 'むっつ（六つ）', reading: 'muttsu', meaning: { ja: '6個・6つ', en: 'six (items)', vi: 'sáu', zh: '六个', id: 'enam', tl: 'anim', my: 'ခြောက်ခု' } },
              { japanese: 'ななつ（七つ）', reading: 'nanatsu', meaning: { ja: '7個・7つ', en: 'seven (items)', vi: 'bảy', zh: '七个', id: 'tujuh', tl: 'pito', my: 'ခုနစ်ခု' } },
              { japanese: 'やっつ（八つ）', reading: 'yattsu', meaning: { ja: '8個・8つ', en: 'eight (items)', vi: 'tám', zh: '八个', id: 'delapan', tl: 'walo', my: 'ရှစ်ခု' } },
              { japanese: 'ここのつ（九つ）', reading: 'kokonotsu', meaning: { ja: '9個・9つ', en: 'nine (items)', vi: 'chín', zh: '九个', id: 'sembilan', tl: 'siyam', my: 'ကိုးခု' } },
              { japanese: 'とお（十）', reading: 'too', meaning: { ja: '10個・10', en: 'ten (items)', vi: 'mười', zh: '十个', id: 'sepuluh', tl: 'sampu', my: 'ဆယ်ခု' } },
            ],
          },
          {
            type: 'grammar',
            title: { ja: '助数詞（数え方）', en: 'Japanese Counters' },
            grammar: [
              {
                pattern: '〜枚（まい）— 薄いもの',
                explanation: { ja: '紙・シャツなど薄くて平らなものを数えます。', en: 'Used for counting flat, thin objects like paper and shirts.', vi: 'Điểm quan trọng: 〜枚 (mai) dùng để đếm những thứ mỏng và phẳng như giấy, áo, đĩa, tấm ảnh. Đây là một trong những đơn vị đếm phổ biến nhất cần nhớ!', zh: '用于计数薄而平的物品，如纸张、衬衫。', id: 'Digunakan untuk benda tipis dan datar.', tl: 'Ginagamit para sa manipis at patag na bagay.', my: 'စာရွက်၊ အင်္ကျီကဲ့သို့ ပါးသော၊ ပြားသော ပစ္စည်းများ ရေတွက်ရာတွင် သုံးသည်' },
                examples: [
                  { japanese: '紙を3枚ください。', reading: 'Kami wo san-mai kudasai.', meaning: { en: 'Three sheets of paper please.', vi: 'Cho tôi 3 tờ giấy.' } },
                  { japanese: 'シャツを2枚買いました。', reading: 'Shatsu wo ni-mai kaimashita.', meaning: { en: 'I bought 2 shirts.', vi: 'Tôi mua 2 cái áo.' } },
                ],
              },
              {
                pattern: '〜本（ほん）— 細長いもの',
                explanation: { ja: 'ペン・ペットボトルなど細長いものを数えます。', en: 'Used for counting long, thin objects like pens and bottles.', vi: 'Điểm quan trọng: 〜本 (hon/bon/pon) dùng để đếm những thứ dài và mỏng như bút, chai nước, ô dù, cây cối. Chú ý cách đọc thay đổi: 1本 (ippon), 2本 (nihon), 3本 (sanbon), 6本 (roppon)...', zh: '用于计数细长物品，如钢笔、瓶子。', id: 'Digunakan untuk benda panjang dan tipis.', tl: 'Ginagamit para sa mahaba at manipis na bagay.', my: 'ဘောပင်၊ ဘူးကဲ့သို့ ရှည်သော ပစ္စည်းများ ရေတွက်ရာတွင် သုံးသည်' },
                examples: [
                  { japanese: 'ジュースを1本ください。', reading: 'Juusu wo ip-pon kudasai.', meaning: { en: 'One juice please.', vi: 'Cho tôi một chai nước.' } },
                  { japanese: 'ペンを2本持っています。', reading: 'Pen wo ni-hon motte imasu.', meaning: { en: 'I have 2 pens.', vi: 'Tôi có 2 cái bút.' } },
                ],
              },
            ],
          },
          {
            type: 'quiz',
            quiz: [
              { question: { ja: '「ふたつ」はいくつですか？', en: 'How many is "futatsu"?', vi: '「ふたつ」là bao nhiêu?' }, options: ['1', '2', '3', '4'], correct: 1, explanation: { ja: '「ふたつ」は「二つ」で2個を意味します。', en: '"Futatsu" means two items.', vi: 'Đúng rồi! 「ふたつ」= hai. Hãy nhớ cả dãy: ひとつ(1)、ふたつ(2)、みっつ(3)、よっつ(4)、いつつ(5)... Hệ đếm này rất hữu ích khi mua sắm!', zh: '「ふたつ」即"二つ"，表示两个。', id: '"Futatsu" berarti dua.', tl: '"Futatsu" ay ibig sabihin dalawa.', my: '"Futatsu" ဆိုသည်မှာ နှစ်ခု ဟု အဓိပ္ပာယ်ရသည်' } },
              { question: { ja: 'シャツ3枚は何と言いますか？', en: 'How do you say "3 shirts"?' }, options: ['シャツ3本', 'シャツ3枚', 'シャツ3個', 'シャツ3冊'], correct: 1, explanation: { ja: 'シャツなど薄くて平らなものは「〜枚（まい）」を使います。', en: 'Use 〜mai (枚) for flat, thin objects like shirts.', vi: 'Dùng 〜mai (枚) cho đồ mỏng như áo.', zh: '薄而平的物品如衬衫使用「〜枚（まい）」。', id: 'Gunakan 〜mai untuk benda tipis seperti baju.', tl: 'Gamitin ang 〜mai para sa manipis na bagay tulad ng damit.', my: 'အင်္ကျီကဲ့သို့ ပါးသောပစ္စည်းများတွင် 〜mai ကိုသုံးသည်' } },
            ],
          },
        ],
      },
      {
        id: 'telling-time',
        title: { ja: '時間の読み方', en: 'Telling Time', vi: 'Đọc giờ', zh: '读时间' },
        duration: 15,
        content: [
          {
            type: 'vocab',
            title: { ja: '時間に関する言葉', en: 'Time Vocabulary' },
            items: [
              { japanese: '〜時（じ）', reading: '〜ji', meaning: { ja: '〜時（時刻）', en: '〜 o\'clock', vi: '〜 giờ', zh: '〜点钟', id: '〜 jam', tl: '〜 ng oras', my: '〜 နာရီ' }, example: '今、何時ですか？', exampleReading: 'Ima, nanji desu ka?', exampleMeaning: { en: 'What time is it now?', vi: 'Bây giờ mấy giờ rồi?' } },
              { japanese: '〜分（ふん・ぷん）', reading: '〜fun / pun', meaning: { ja: '〜分（分刻み）', en: '〜 minutes', vi: '〜 phút', zh: '〜分钟', id: '〜 menit', tl: '〜 minuto', my: '〜 မိနစ်' }, example: '3時15分です。', exampleReading: 'San-ji juu-go-fun desu.', exampleMeaning: { en: 'It is 3:15.', vi: '3 giờ 15 phút.' } },
              { japanese: '午前／ごぜん', reading: 'gozen', meaning: { ja: '午前（AM）', en: 'AM / morning', vi: 'sáng (AM)', zh: '上午/AM', id: 'pagi (AM)', tl: 'umaga (AM)', my: 'နံနက် (AM)' } },
              { japanese: '午後／ごご', reading: 'gogo', meaning: { ja: '午後（PM）', en: 'PM / afternoon', vi: 'chiều (PM)', zh: '下午/PM', id: 'sore (PM)', tl: 'hapon (PM)', my: 'နေ့လည်ပိုင်း (PM)' } },
              { japanese: 'ちょうど', reading: 'choudo', meaning: { ja: 'ちょうど〜時（きっかり）', en: 'exactly (〜 o\'clock sharp)', vi: 'đúng 〜 giờ', zh: '正好〜点', id: 'tepat pukul 〜', tl: 'eksaktong 〜 oras', my: 'တိတိ 〜 နာရီ' }, example: 'ちょうど9時です。', exampleMeaning: { en: 'It is exactly 9 o\'clock.', vi: 'Đúng 9 giờ.' } },
              { japanese: '〜分前／〜ふんまえ', reading: '〜fun mae', meaning: { ja: '〜分前の時刻', en: '〜 minutes before (to the hour)', vi: 'trước 〜 phút', zh: '差〜分', id: '〜 menit sebelum', tl: '〜 minuto bago', my: '〜 မိနစ်ကြို' }, example: '3時5分前です。', exampleReading: 'San-ji go-fun mae desu.', exampleMeaning: { en: '5 minutes to 3 (= 2:55).', vi: 'Còn 5 phút nữa là 3 giờ (= 2:55).' } },
              { japanese: '〜時間（じかん）', reading: '〜jikan', meaning: { ja: '〜時間（期間）', en: '〜 hours (duration)', vi: '〜 tiếng đồng hồ', zh: '〜小时', id: '〜 jam (durasi)', tl: '〜 oras (tagal)', my: '〜 နာရီ (ကြာချိန်)' }, example: '2時間かかります。', exampleReading: 'Ni-jikan kakarimasu.', exampleMeaning: { en: 'It takes 2 hours.', vi: 'Mất 2 tiếng.' } },
            ],
          },
          {
            type: 'grammar',
            title: { ja: '「〜から〜まで」時間の幅を表す', en: 'Expressing time ranges with 〜kara〜made' },
            grammar: [
              {
                pattern: '〜時から〜時まで',
                explanation: { ja: '「から」は開始時刻、「まで」は終了時刻を表します。', en: '"Kara" marks the start time and "made" marks the end time.', vi: 'Điểm quan trọng: 「〜から〜まで」dùng để nói khoảng thời gian. 「から」(kara) = từ (bắt đầu), 「まで」(made) = đến (kết thúc). Cấu trúc này cũng dùng cho địa điểm: 「〜から〜まで」= từ 〜 đến 〜. Rất hữu ích khi nói về giờ làm việc hoặc lịch trình!', zh: '「から」表示开始时间，「まで」表示结束时间。', id: '"Kara" menandai waktu mulai, "made" menandai waktu selesai.', tl: '"Kara" ang simula ng oras, "made" ang katapusan.', my: '"Kara" သည် စတင်သောအချိန် ဖြစ်ပြီး "made" သည် ပြီးဆုံးသောအချိန် ဖြစ်သည်' },
                examples: [
                  { japanese: '9時から5時まで働きます。', reading: 'Ku-ji kara go-ji made hatarakimasu.', meaning: { en: 'I work from 9 to 5.', vi: 'Tôi làm việc từ 9 đến 5 giờ.', zh: '我从9点工作到5点。' } },
                  { japanese: '店は10時から20時まで営業しています。', reading: 'Mise wa juu-ji kara ni-juu-ji made eigyou shite imasu.', meaning: { en: 'The store is open from 10am to 8pm.', vi: 'Cửa hàng mở cửa từ 10 giờ đến 20 giờ.' } },
                ],
              },
            ],
          },
          {
            type: 'quiz',
            quiz: [
              { question: { ja: '「午後3時30分」を正しく読むと？', en: 'How do you read "午後3時30分"?', vi: '「午後3時30分」đọc như thế nào?' }, options: ['ごごさんじさんじゅっぷん', 'ごぜんさんじさんじっぷん', 'ごごみっつさんじゅう', 'ごごさんじはんじかん'], correct: 0, explanation: { ja: '午後3時30分は「ごごさんじさんじゅっぷん」です。「半（はん）」を使って「さんじはん」とも言います。', en: '"Gogo san-ji sanjuppun" = 3:30 PM. You can also say "san-ji han" (half past 3).', vi: 'Đúng rồi! 「午後3時30分」đọc là "gogo san-ji sanjuppun" = 3 giờ 30 phút chiều. Mẹo: 30 phút còn có thể nói là 「半」(han) → 「さんじはん」(3 giờ rưỡi). Rất tiện phải không?', zh: '下午3时30分读作"ごごさんじさんじゅっぷん"，也可说"さんじはん"。' } },
            ],
          },
        ],
      },
      {
        id: 'days-months',
        title: { ja: '曜日・月・日付', en: 'Days of Week, Months & Dates', vi: 'Ngày trong tuần, tháng và ngày tháng', zh: '星期、月份与日期' },
        duration: 15,
        content: [
          {
            type: 'vocab',
            title: { ja: '曜日', en: 'Days of the Week' },
            items: [
              { japanese: '月曜日／げつようび', reading: 'getsuyoubi', meaning: { ja: '月曜日', en: 'Monday', vi: 'Thứ Hai', zh: '星期一', id: 'Senin', tl: 'Lunes', my: 'တနင်္လာ' } },
              { japanese: '火曜日／かようび', reading: 'kayoubi', meaning: { ja: '火曜日', en: 'Tuesday', vi: 'Thứ Ba', zh: '星期二', id: 'Selasa', tl: 'Martes', my: 'အင်္ဂါ' } },
              { japanese: '水曜日／すいようび', reading: 'suiyoubi', meaning: { ja: '水曜日', en: 'Wednesday', vi: 'Thứ Tư', zh: '星期三', id: 'Rabu', tl: 'Miyerkules', my: 'ဗုဒ္ဓဟူး' } },
              { japanese: '木曜日／もくようび', reading: 'mokuyoubi', meaning: { ja: '木曜日', en: 'Thursday', vi: 'Thứ Năm', zh: '星期四', id: 'Kamis', tl: 'Huwebes', my: 'ကြာသပတေး' } },
              { japanese: '金曜日／きんようび', reading: 'kinyoubi', meaning: { ja: '金曜日', en: 'Friday', vi: 'Thứ Sáu', zh: '星期五', id: 'Jumat', tl: 'Biyernes', my: 'သောကြာ' } },
              { japanese: '土曜日／どようび', reading: 'doyoubi', meaning: { ja: '土曜日', en: 'Saturday', vi: 'Thứ Bảy', zh: '星期六', id: 'Sabtu', tl: 'Sabado', my: 'စနေ' } },
              { japanese: '日曜日／にちようび', reading: 'nichiyoubi', meaning: { ja: '日曜日', en: 'Sunday', vi: 'Chủ nhật', zh: '星期日', id: 'Minggu', tl: 'Linggo', my: 'တနင်္ဂနွေ' } },
            ],
          },
          {
            type: 'vocab',
            title: { ja: '月の言い方', en: 'Months of the Year' },
            items: [
              { japanese: '1月／いちがつ', reading: 'ichigatsu', meaning: { ja: '1月', en: 'January', vi: 'Tháng 1', zh: '一月', id: 'Januari', tl: 'Enero', my: 'ဇန်နဝါရီ' } },
              { japanese: '2月／にがつ', reading: 'nigatsu', meaning: { ja: '2月', en: 'February', vi: 'Tháng 2', zh: '二月', id: 'Februari', tl: 'Pebrero', my: 'ဖေဖော်ဝါရီ' } },
              { japanese: '3月／さんがつ', reading: 'sangatsu', meaning: { ja: '3月', en: 'March', vi: 'Tháng 3', zh: '三月', id: 'Maret', tl: 'Marso', my: 'မတ်' } },
              { japanese: '4月／しがつ', reading: 'shigatsu', meaning: { ja: '4月（新年度）', en: 'April (new fiscal year in Japan)', vi: 'Tháng 4', zh: '四月（日本新学年/财年）', id: 'April', tl: 'Abril', my: 'ဧပြီ' } },
              { japanese: '12月／じゅうにがつ', reading: 'juunigatsu', meaning: { ja: '12月', en: 'December', vi: 'Tháng 12', zh: '十二月', id: 'Desember', tl: 'Disyembre', my: 'ဒီဇင်ဘာ' } },
            ],
          },
          {
            type: 'vocab',
            title: { ja: '日本の年号', en: 'Japanese Era Names' },
            items: [
              { japanese: '令和（れいわ）', reading: 'Reiwa', meaning: { ja: '現在の元号（2019年〜）', en: 'Current era (2019–present)', vi: 'Niên hiệu hiện tại (2019–nay)', zh: '当前年号（2019年至今）', id: 'Era saat ini (2019–sekarang)', tl: 'Kasalukuyang era (2019–kasalukuyan)', my: 'လက်ရှိ ခေတ်ကာလ (2019–ပစ္စုပ္ပန်)' }, example: '令和8年 = 2026年', exampleMeaning: { en: 'Reiwa 8 = 2026', vi: 'Reiwa 8 = 2026', zh: '令和8年 = 2026年' } },
              { japanese: '平成（へいせい）', reading: 'Heisei', meaning: { ja: '前の元号（1989〜2019年）', en: 'Previous era (1989–2019)', vi: 'Niên hiệu trước (1989–2019)', zh: '上一个年号（1989–2019）', id: 'Era sebelumnya (1989–2019)', tl: 'Nakaraang era (1989–2019)', my: 'ယခင် ခေတ်ကာလ (1989–2019)' } },
              { japanese: '西暦／せいれき', reading: 'seireki', meaning: { ja: 'グレゴリオ暦（西暦）', en: 'Western calendar (CE)', vi: 'Lịch Tây (Dương lịch)', zh: '公历', id: 'Kalender Masehi', tl: 'Kalendaryo ng Kanluran', my: 'နေ့တန်ဖိုး ပြက္ခဒိန်' } },
            ],
          },
          {
            type: 'quiz',
            quiz: [
              { question: { ja: '「水曜日」は何曜日ですか？', en: 'What day is 「水曜日」?', vi: '「水曜日」là thứ mấy?' }, options: ['Monday', 'Tuesday', 'Wednesday', 'Thursday'], correct: 2, explanation: { ja: '水曜日（すいようび）はWednesdayです。水→水（みず）→Water（水の記号）で覚えましょう。', en: '"Suiyoubi" is Wednesday. The kanji 水 means water.', vi: 'Đúng rồi! 「水曜日」(Suiyoubi) là thứ Tư. Mẹo nhớ: 水 (mizu) = nước, và thứ Tư (Water Day). Hãy nhớ theo chủ đề: 月=Mặt trăng=Thứ Hai, 火=Lửa=Thứ Ba, 水=Nước=Thứ Tư, 木=Gỗ=Thứ Năm, 金=Vàng=Thứ Sáu, 土=Đất=Thứ Bảy, 日=Mặt trời=Chủ nhật.', zh: '水曜日（すいようび）是星期三，汉字"水"表示水。' } },
              { question: { ja: '令和8年は西暦何年ですか？', en: 'What year in the Western calendar is Reiwa 8?', vi: 'Năm Reiwa 8 tương đương năm dương lịch nào?' }, options: ['2025', '2026', '2027', '2028'], correct: 1, explanation: { ja: '令和1年 = 2019年です。令和8年 = 2019 + 7 = 2026年。', en: 'Reiwa 1 = 2019. Reiwa 8 = 2019 + 7 = 2026.', vi: 'Đúng rồi! Công thức: Năm Reiwa + 2018 = Năm dương lịch. Vậy Reiwa 8 = 2018 + 8 = 2026. Hiện tại (2026) là năm Reiwa 8 — hãy nhớ để điền vào các giấy tờ nhé!', zh: '令和1年=2019年，令和8年=2026年。' } },
            ],
          },
        ],
      },
      {
        id: 'date-expressions',
        title: { ja: '日付の表現と予定の伝え方', en: 'Date Expressions & Scheduling', vi: 'Biểu đạt ngày tháng và lịch trình', zh: '日期表达与日程安排' },
        duration: 12,
        content: [
          {
            type: 'vocab',
            title: { ja: '日にちの読み方（特殊なもの）', en: 'Special Date Readings' },
            items: [
              { japanese: '1日／ついたち', reading: 'tsuitachi', meaning: { ja: '1日（月の最初の日）', en: '1st of the month', vi: 'ngày 1', zh: '1日（每月第一天）', id: 'tanggal 1', tl: 'ika-1 ng buwan', my: 'လ၏ ၁ ရက်' } },
              { japanese: '2日／ふつか', reading: 'futsuka', meaning: { ja: '2日', en: '2nd', vi: 'ngày 2', zh: '2日', id: 'tanggal 2', tl: 'ika-2', my: '၂ ရက်' } },
              { japanese: '14日／じゅうよっか', reading: 'juuyokka', meaning: { ja: '14日', en: '14th', vi: 'ngày 14', zh: '14日', id: 'tanggal 14', tl: 'ika-14', my: '၁၄ ရက်' } },
              { japanese: '20日／はつか', reading: 'hatsuka', meaning: { ja: '20日（特殊な読み）', en: '20th (special reading)', vi: 'ngày 20 (đọc đặc biệt)', zh: '20日（特殊读法）', id: 'tanggal 20 (bacaan khusus)', tl: 'ika-20 (espesyal na pagbabasa)', my: '၂၀ ရက် (အထူး ဖတ်ပုံ)' } },
              { japanese: '〜年〜月〜日', reading: '〜nen 〜gatsu 〜nichi', meaning: { ja: '日付のフルフォーマット', en: 'Full date format: year-month-day', vi: 'Định dạng ngày đầy đủ: năm-tháng-ngày', zh: '完整日期格式：年月日', id: 'Format tanggal lengkap: tahun-bulan-tanggal', tl: 'Buong format ng petsa: taon-buwan-araw', my: 'ရက်စွဲ ပြည့်ဝသော ဖော်မတ်: နှစ်-လ-ရက်' }, example: '2026年3月20日（令和8年3月20日）', exampleMeaning: { en: 'March 20, 2026 (Reiwa 8)', vi: 'Ngày 20 tháng 3 năm 2026 (Reiwa 8)' } },
            ],
          },
          {
            type: 'dialogue',
            title: { ja: '会話例：予定を確認する', en: 'Dialogue: Confirming a Schedule' },
            dialogue: [
              { speaker: 'A', japanese: '次の面接はいつですか？', reading: 'Tsugi no mensetsu wa itsu desu ka?', meaning: { ja: '次の面接日を確認', en: 'When is the next interview?', vi: 'Buổi phỏng vấn tiếp theo là khi nào?', zh: '下次面试是什么时候？', id: 'Wawancara berikutnya kapan?', tl: 'Kailan ang susunod na interview?', my: 'နောက် အင်တာဗျူး ဘယ်တော့လဲ?' } },
              { speaker: 'B', japanese: '来週の火曜日、4月15日の午後2時です。', reading: 'Raishuu no kayoubi, shi-gatsu juu-go-nichi no gogo ni-ji desu.', meaning: { ja: '具体的な日時を伝える', en: 'Next Tuesday, April 15th at 2:00 PM.', vi: 'Thứ Ba tuần sau, ngày 15 tháng 4 lúc 2 giờ chiều.', zh: '下周二，4月15日下午2点。', id: 'Selasa depan, 15 April jam 2 siang.', tl: 'Susunod na Martes, Abril 15 ng 2:00 PM.', my: 'နောက်အပတ် အင်္ဂါနေ့၊ ဧပြီလ ၁၅ ရက် နေ့လည် ၂ နာရီ' } },
              { speaker: 'A', japanese: 'わかりました。カレンダーに入れておきます。', reading: 'Wakarimashita. Karendaa ni irete okimasu.', meaning: { ja: '了解してカレンダーに記録', en: 'Understood. I\'ll put it in my calendar.', vi: 'Tôi hiểu rồi. Tôi sẽ ghi vào lịch.', zh: '明白了。我会记在日历里。', id: 'Mengerti. Akan saya masukkan ke kalender.', tl: 'Naiintindihan. Ilalagay ko sa aking kalendaryo.', my: 'နားလည်ပါသည်။ ပြက္ခဒိန်တွင် ထည့်ထားပါမည်' } },
            ],
          },
          {
            type: 'quiz',
            quiz: [
              { question: { ja: '「ついたち」は何日ですか？', en: 'What date is "tsuitachi"?', vi: '「ついたち」là ngày mấy?' }, options: ['10日', '20日', '1日', '30日'], correct: 2, explanation: { ja: '「ついたち」は「1日」で、月の最初の日です。', en: '"Tsuitachi" is the 1st day of the month.', vi: 'Đúng rồi! 「ついたち」= ngày 1 của tháng. Tiếng Nhật có nhiều cách đọc ngày đặc biệt: 1日=ついたち, 2日=ふつか, 14日=じゅうよっか, 20日=はつか. Hãy nhớ những ngày đặc biệt này để không bị nhầm lẫn khi đọc lịch!', zh: '「ついたち」是「1日」，即每月第一天。' } },
            ],
          },
        ],
      },
    ],
  },

  // ============================
  // COURSE 9: 緊急・病院の日本語
  // ============================
  {
    id: 'emergency-japanese',
    title: { ja: '緊急・病院の日本語', en: 'Emergency & Hospital Japanese', vi: 'Tiếng Nhật cấp cứu & bệnh viện', zh: '紧急情况与医院日语', id: 'Bahasa Jepang Darurat & Rumah Sakit', tl: 'Japanese para sa Emergency at Ospital', my: 'အရေးပေါ် နှင့် ဆေးရုံ ဂျပန်ဘာသာ' },
    description: { ja: '緊急時に命を守るための日本語。体調の伝え方から救急・警察への連絡、薬局での会話まで', en: 'Japanese to protect your life in emergencies — describing symptoms, calling ambulance/police, and pharmacy conversations', vi: 'Tiếng Nhật để bảo vệ tính mạng khi khẩn cấp — mô tả triệu chứng, gọi cứu thương/cảnh sát, hội thoại nhà thuốc', zh: '紧急时刻保护生命的日语——描述症状、联系救护车/警察、药局对话', id: 'Bahasa Jepang untuk kedaruratan — gejala, ambulans/polisi, apotek', tl: 'Japanese para maprotektahan ang iyong buhay sa emergency', my: 'အရေးပေါ်အချိန်တွင် အသက်ကာကွယ်ရန် ဂျပန်ဘာသာ' },
    level: 'beginner',
    jlptLevel: 'N5',
    color: 'from-red-500 to-red-600',
    totalLessons: 4,
    estimatedHours: 3,
    lessons: [
      {
        id: 'describing-symptoms',
        title: { ja: '体調を伝える', en: 'Describing Your Condition', vi: 'Mô tả tình trạng sức khỏe', zh: '描述身体状况' },
        duration: 15,
        content: [
          {
            type: 'intro',
            title: { ja: 'なぜ大切か', en: 'Why this matters' },
            text: { ja: '体調が悪いとき、日本語で正確に伝えることが、早く適切な治療を受けるための鍵です。「〜が痛いです」「〜から〜が続いています」などの表現を覚えましょう。', en: 'When you are unwell, being able to accurately describe your condition in Japanese is key to receiving proper treatment quickly. Learn expressions like "〜ga itai desu" (My 〜 hurts).', vi: 'Khi bạn bị ốm hay gặp sự cố, khả năng truyền đạt chính xác bằng tiếng Nhật là điều thiết yếu để được điều trị kịp thời. Hãy luyện tập kỹ những câu như 「〜が痛いです」(bộ phận 〜 đau) và 「〜から続いています」(triệu chứng liên tục từ 〜). Đây có thể là những câu quan trọng nhất bạn học được!' },
          },
          {
            type: 'vocab',
            title: { ja: '体調を表す言葉', en: 'Health Condition Vocabulary' },
            items: [
              { japanese: '〜が痛いです', reading: '〜ga itai desu', meaning: { ja: '〜が痛い', en: 'My 〜 hurts', vi: '〜 của tôi đau', zh: '我的〜疼', id: '〜 saya sakit', tl: 'Masakit ang aking 〜', my: 'ကျွန်တော်/ကျွန်မ ၏ 〜 နာကျင်သည်' }, example: '胃が痛いです。', exampleReading: 'I ga itai desu.', exampleMeaning: { en: 'My stomach hurts.', vi: 'Dạ dày tôi đau.' } },
              { japanese: '気分が悪いです', reading: 'kibun ga warui desu', meaning: { ja: '気持ちが悪い・吐き気', en: 'I feel sick / nauseous', vi: 'Tôi cảm thấy buồn nôn', zh: '我感觉不舒服/恶心', id: 'Saya merasa mual', tl: 'Masama ang pakiramdam ko', my: 'ကျွန်တော်/ကျွန်မ မကောင်းဘူး' } },
              { japanese: '熱があります', reading: 'netsu ga arimasu', meaning: { ja: '発熱している', en: 'I have a fever', vi: 'Tôi bị sốt', zh: '我发烧了', id: 'Saya demam', tl: 'May lagnat ako', my: 'ကျွန်တော်/ကျွန်မ အဖျားရှိသည်' }, example: '39度の熱があります。', exampleReading: 'Sanjuu-kyuu-do no netsu ga arimasu.', exampleMeaning: { en: 'I have a 39°C fever.', vi: 'Tôi bị sốt 39 độ.' } },
              { japanese: '〜から続いています', reading: '〜kara tsuzuite imasu', meaning: { ja: '〜から症状が続く', en: 'It has been continuing since 〜', vi: 'Liên tục từ 〜', zh: '从〜开始持续', id: 'Sudah berlanjut sejak 〜', tl: 'Nagpapatuloy mula noong 〜', my: '〜 မှ ဆက်လက် ဖြစ်နေသည်' }, example: '昨日の夜から続いています。', exampleReading: 'Kinou no yoru kara tsuzuite imasu.', exampleMeaning: { en: 'It has been continuing since last night.', vi: 'Liên tục từ tối hôm qua.' } },
              { japanese: 'アレルギーがあります', reading: 'arerugii ga arimasu', meaning: { ja: 'アレルギーがある', en: 'I have allergies', vi: 'Tôi bị dị ứng', zh: '我有过敏', id: 'Saya punya alergi', tl: 'Mayroon akong allergy', my: 'ကျွန်တော်/ကျွန်မ အာလာဂျီရှိသည်' }, example: '卵アレルギーがあります。', exampleReading: 'Tamago arerugii ga arimasu.', exampleMeaning: { en: 'I have an egg allergy.', vi: 'Tôi bị dị ứng trứng.' } },
              { japanese: '持病があります', reading: 'jibyou ga arimasu', meaning: { ja: '慢性の病気を持っている', en: 'I have a chronic condition', vi: 'Tôi có bệnh mãn tính', zh: '我有慢性病', id: 'Saya punya penyakit kronis', tl: 'Mayroon akong chronic na sakit', my: 'ကျွန်တော်/ကျွန်မ နာတာရှည် ရောဂါရှိသည်' } },
            ],
          },
          {
            type: 'dialogue',
            title: { ja: '会話例：問診で', en: 'Dialogue: Medical Interview' },
            dialogue: [
              { speaker: '医師', japanese: 'どうされましたか？どこが痛いですか？', reading: 'Dou saremashita ka? Doko ga itai desu ka?', meaning: { ja: '症状と痛みの場所を聞く', en: 'What\'s wrong? Where does it hurt?', vi: 'Bạn bị làm sao? Đau ở đâu?', zh: '怎么了？哪里疼？', id: 'Ada apa? Mana yang sakit?', tl: 'Ano ang nangyari? Saan masakit?', my: 'ဘာဖြစ်သလဲ? ဘယ်နေရာ နာကျင်သလဲ?' } },
              { speaker: 'あなた', japanese: '昨日の夜から、お腹が痛くて、下痢もしています。', reading: 'Kinou no yoru kara, onaka ga itakute, geri mo shite imasu.', meaning: { ja: '症状を具体的に説明', en: 'Since last night, I\'ve had stomach pain and also diarrhea.', vi: 'Từ tối hôm qua, tôi bị đau bụng và cũng bị tiêu chảy.', zh: '从昨晚开始，肚子疼，还有腹泻。', id: 'Sejak semalam, perut sakit dan juga diare.', tl: 'Mula kagabi, sumasakit ang tiyan ko at nagtatae rin ako.', my: '昨晩 မှ ဝမ်းနာကာ ဝမ်းလည်း ပျက်သည်' } },
              { speaker: '医師', japanese: '熱はありますか？アレルギーはありますか？', reading: 'Netsu wa arimasu ka? Arerugii wa arimasu ka?', meaning: { ja: '熱とアレルギーを確認', en: 'Do you have a fever? Do you have any allergies?', vi: 'Bạn có sốt không? Bạn có dị ứng gì không?', zh: '有发烧吗？有过敏吗？', id: 'Ada demam? Ada alergi?', tl: 'Mayroon kang lagnat? Mayroon kang allergy?', my: 'အဖျားရှိသလား? အာလာဂျီ ရှိသလား?' } },
              { speaker: 'あなた', japanese: '熱は37.8度あります。薬のアレルギーはありません。', reading: 'Netsu wa sanjuu-nana-ten-hachi-do arimasu. Kusuri no arerugii wa arimasen.', meaning: { ja: '熱の度数とアレルギーなしを伝える', en: 'I have a 37.8°C fever. I don\'t have any medication allergies.', vi: 'Tôi bị sốt 37.8°C. Tôi không bị dị ứng thuốc.', zh: '发烧37.8度。对药物没有过敏。', id: 'Demam 37.8°C. Tidak ada alergi obat.', tl: 'May lagnat ako ng 37.8°C. Wala akong allergy sa gamot.', my: 'အဖျား ၃၇.၈ ဒီဂရီ ရှိသည်။ ဆေး အာလာဂျီ မရှိပါ' } },
            ],
          },
          {
            type: 'quiz',
            quiz: [
              { question: { ja: '「頭が痛いです」を英語にすると？', en: 'What does "atama ga itai desu" mean?' }, options: ['I have a fever', 'My head hurts', 'I feel dizzy', 'I have a cold'], correct: 1, explanation: { ja: '「頭（あたま）」は「head」、「が痛いです」は「hurts」なので「My head hurts」です。', en: '"Atama" means head, "ga itai desu" means hurts, so it means "My head hurts".', vi: '"Atama" là đầu, "ga itai desu" là đau. Tức là "Đầu tôi đau".', zh: '「頭（あたま）」是"头"，「が痛いです」是"疼"，所以是"我头疼"。' } },
            ],
          },
        ],
      },
      {
        id: 'emergency-calls',
        title: { ja: '救急・警察への連絡', en: 'Calling Ambulance & Police', vi: 'Gọi cứu thương & cảnh sát', zh: '联系救护车和警察' },
        duration: 15,
        content: [
          {
            type: 'vocab',
            title: { ja: '緊急連絡に必要な言葉', en: 'Emergency Contact Vocabulary' },
            items: [
              { japanese: '救急車を呼んでください', reading: 'kyuukyuusha wo yonde kudasai', meaning: { ja: '救急車を要請する', en: 'Please call an ambulance', vi: 'Hãy gọi xe cứu thương', zh: '请叫救护车', id: 'Tolong panggil ambulans', tl: 'Pakitawagan ang ambulansya', my: 'အမ်ဗူလင်း ခေါ်ပေးပါ' }, example: '救急車を呼んでください！急いで！', exampleMeaning: { en: 'Call an ambulance! Hurry!', vi: 'Gọi xe cứu thương! Mau lên!' } },
              { japanese: '警察を呼んでください', reading: 'keisatsu wo yonde kudasai', meaning: { ja: '警察を要請する', en: 'Please call the police', vi: 'Hãy gọi cảnh sát', zh: '请叫警察', id: 'Tolong panggil polisi', tl: 'Pakitawagan ang pulis', my: 'ရဲခေါ်ပေးပါ' } },
              { japanese: '119番（ひゃくじゅうきゅうばん）', reading: 'hyaku-juu-kyuu-ban', meaning: { ja: '救急・消防の番号', en: 'Japan emergency number (ambulance/fire)', vi: 'Số khẩn cấp Nhật (cứu thương/cứu hỏa)', zh: '日本急救/消防电话号码', id: 'Nomor darurat Jepang (ambulans/pemadam)', tl: 'Emergency number ng Japan (ambulansya/bumbero)', my: 'ဂျပန် အရေးပေါ် နံပါတ် (အမ်ဗူလင်း/မီးသတ်)' } },
              { japanese: '110番（ひゃくとおばん）', reading: 'hyaku-too-ban', meaning: { ja: '警察の番号', en: 'Japan police number', vi: 'Số cảnh sát Nhật', zh: '日本警察电话号码', id: 'Nomor polisi Jepang', tl: 'Numero ng pulisya sa Japan', my: 'ဂျပန် ရဲ နံပါတ်' } },
              { japanese: '助けてください', reading: 'tasukete kudasai', meaning: { ja: '助けを求める', en: 'Help me please / Save me', vi: 'Cứu tôi với', zh: '救我 / 帮帮我', id: 'Tolong saya', tl: 'Tulungan mo ako', my: 'ကူညီပါ' } },
              { japanese: '意識がありません', reading: 'ishiki ga arimasen', meaning: { ja: '意識がない状態', en: 'Unconscious / No consciousness', vi: 'Mất ý thức', zh: '失去意识', id: 'Tidak sadar', tl: 'Walang malay', my: 'သတိမရှိပါ' } },
              { japanese: '呼吸をしていません', reading: 'kokyuu wo shite imasen', meaning: { ja: '呼吸停止', en: 'Not breathing', vi: 'Không thở', zh: '没有呼吸', id: 'Tidak bernafas', tl: 'Hindi humihinga', my: 'မသက်မဝင်ပါ' } },
              { japanese: '大量に出血しています', reading: 'tairyou ni shukketsu shite imasu', meaning: { ja: '出血が多い', en: 'Heavy bleeding', vi: 'Chảy máu nhiều', zh: '大量出血', id: 'Pendarahan hebat', tl: 'Malaking dugo', my: 'သွေးများစွာ ထွက်နေသည်' } },
            ],
          },
          {
            type: 'grammar',
            title: { ja: '119番への通報の仕方', en: 'How to Report to 119' },
            grammar: [
              {
                pattern: '場所 + 住所の伝え方',
                explanation: { ja: '119番や110番では、まず現在地を伝えることが最重要です。「〜にいます」「〜の前です」などの表現を使います。', en: 'When calling 119 or 110, giving your location is the most important first step. Use "〜ni imasu" (I am at 〜) or "〜no mae desu" (I am in front of 〜).', vi: 'Điểm cực kỳ quan trọng: Khi gọi 119 hoặc 110, việc đầu tiên phải làm là nói địa điểm của bạn! Dùng 「〜にいます」(tôi đang ở 〜) hoặc 「〜の前にいます」(tôi đang đứng trước 〜). Nếu không biết địa chỉ chính xác, hãy tìm dấu hiệu gần đó (cửa hàng, biển số nhà) và mô tả.', zh: '打119或110时，首先告知所在位置最为重要。使用"〜にいます"（我在〜）或"〜の前です"（我在〜前面）。' },
                examples: [
                  { japanese: '東京都新宿区〇〇1-2-3にいます。', reading: 'Toukyou-to Shinjuku-ku ××× ichi-ni-san ni imasu.', meaning: { en: 'I am at 1-2-3 XXX, Shinjuku-ku, Tokyo.', vi: 'Tôi đang ở 1-2-3 XXX, Shinjuku, Tokyo.' } },
                  { japanese: 'コンビニの前で人が倒れています。', reading: 'Konbini no mae de hito ga taorete imasu.', meaning: { en: 'A person has collapsed in front of the convenience store.', vi: 'Có người ngã trước cửa hàng tiện lợi.' } },
                ],
              },
            ],
          },
          {
            type: 'quiz',
            quiz: [
              { question: { ja: '日本で救急車を呼ぶ番号は？', en: 'What number do you call for an ambulance in Japan?', vi: 'Số gọi xe cứu thương ở Nhật là gì?' }, options: ['110', '119', '118', '117'], correct: 1, explanation: { ja: '日本の救急・消防は「119番」です。警察は「110番」、海上保安庁は「118番」です。', en: 'In Japan, ambulance and fire are 119. Police is 110. Coast guard is 118.', vi: 'Đúng rồi! Hãy nhớ kỹ các số này: 119 = cứu thương và cứu hỏa, 110 = cảnh sát, 118 = cảnh sát biển. Đây là thông tin quan trọng nhất để bảo vệ bản thân khi sống tại Nhật!', zh: '日本救护车和消防是119，警察是110，海上保安厅是118。' } },
              { question: { ja: '「助けてください」の意味は？', en: 'What does "tasukete kudasai" mean?', vi: '「助けてください」có nghĩa là gì?' }, options: ['I need water', 'Help me please', 'I am lost', 'Call a doctor'], correct: 1, explanation: { ja: '「助けてください」は緊急時に使う「Help me please」です。', en: '"Tasukete kudasai" means "Help me please" used in emergencies.', vi: 'Đúng rồi! 「助けてください」(Tasukete kudasai) nghĩa là "Cứu tôi với! / Giúp tôi với!" — câu này cực kỳ quan trọng khi gặp nguy hiểm. Hãy ghi nhớ ngay bây giờ!', zh: '「助けてください」是紧急时使用的"救救我/帮帮我"。' } },
            ],
          },
        ],
      },
      {
        id: 'pharmacy-japanese',
        title: { ja: '薬局での会話', en: 'Pharmacy Conversations', vi: 'Hội thoại ở nhà thuốc', zh: '药局对话' },
        duration: 12,
        content: [
          {
            type: 'vocab',
            title: { ja: '薬局で使う言葉', en: 'Pharmacy Vocabulary' },
            items: [
              { japanese: '薬局／やっきょく', reading: 'yakkyoku', meaning: { ja: '薬を売るお店', en: 'pharmacy / drugstore', vi: 'nhà thuốc', zh: '药局', id: 'apotek', tl: 'parmasya', my: 'ဆေးဆိုင်' } },
              { japanese: '処方箋／しょほうせん', reading: 'shohousen', meaning: { ja: '医師が書いた薬の指示書', en: 'prescription', vi: 'đơn thuốc', zh: '处方', id: 'resep dokter', tl: 'reseta ng doktor', my: 'ဆရာဝန် ဆေးစာ' }, example: '処方箋を持っています。', exampleMeaning: { en: 'I have a prescription.', vi: 'Tôi có đơn thuốc.' } },
              { japanese: '痛み止め／いたみどめ', reading: 'itamidome', meaning: { ja: '鎮痛剤', en: 'painkiller', vi: 'thuốc giảm đau', zh: '止痛药', id: 'pereda nyeri', tl: 'pampawi ng sakit', my: 'နာကျင်မှုသက်သာဆေး' } },
              { japanese: '解熱剤／げねつざい', reading: 'genetsuzai', meaning: { ja: '熱を下げる薬', en: 'fever reducer', vi: 'thuốc hạ sốt', zh: '退烧药', id: 'obat penurun demam', tl: 'gamot para sa lagnat', my: 'အဖျားသက်သာဆေး' } },
              { japanese: '飲み方／のみかた', reading: 'nomikata', meaning: { ja: '薬の服用方法', en: 'how to take (the medicine)', vi: 'cách uống thuốc', zh: '服用方法', id: 'cara minum obat', tl: 'paraan ng pag-inom ng gamot', my: 'ဆေးသောက်နည်း' }, example: '1日3回、食後に飲んでください。', exampleReading: 'Ichinichi san-kai, shokugo ni nonde kudasai.', exampleMeaning: { en: 'Take 3 times a day, after meals.', vi: 'Uống 3 lần mỗi ngày, sau bữa ăn.' } },
              { japanese: '副作用／ふくさよう', reading: 'fukusayou', meaning: { ja: '薬の副作用', en: 'side effect', vi: 'tác dụng phụ', zh: '副作用', id: 'efek samping', tl: 'side effect', my: 'ဆေး ဘေးထွက်ဆိုးကျိုး' } },
            ],
          },
          {
            type: 'dialogue',
            title: { ja: '会話例：薬局で薬を受け取る', en: 'Dialogue: Picking Up Medicine at the Pharmacy' },
            dialogue: [
              { speaker: 'あなた', japanese: '処方箋をお願いします。', reading: 'Shohousen wo onegaishimasu.', meaning: { ja: '処方箋を渡す', en: 'Here is my prescription.', vi: 'Đây là đơn thuốc của tôi.', zh: '这是我的处方。', id: 'Ini resep saya.', tl: 'Ito ang aking reseta.', my: 'ဆေးစာပါ' } },
              { speaker: '薬剤師', japanese: 'お名前をお聞きしてもよいですか？', reading: 'Onamae wo okiki shite mo yoi desu ka?', meaning: { ja: '名前の確認', en: 'May I ask your name?', vi: 'Tôi có thể hỏi tên bạn không?', zh: '可以告诉我您的姓名吗？', id: 'Boleh saya tanya nama Anda?', tl: 'Maaari ko bang malaman ang iyong pangalan?', my: 'နာမည် မေးလို့ ရပါသလား?' } },
              { speaker: 'あなた', japanese: 'アンです。', reading: 'An desu.', meaning: { ja: '名前を伝える', en: 'My name is An.', vi: 'Tôi là An.', zh: '我叫An。', id: 'Nama saya An.', tl: 'An po ako.', my: 'ကျွန်တော်/ကျွန်မ An ပါ' } },
              { speaker: '薬剤師', japanese: 'こちらの薬は1日3回、食後に飲んでください。眠くなることがあります。', reading: 'Kochira no kusuri wa ichinichi san-kai, shokugo ni nonde kudasai. Nemuku naru koto ga arimasu.', meaning: { ja: '服用法と副作用を説明', en: 'Take this medicine 3 times a day after meals. It may cause drowsiness.', vi: 'Uống thuốc này 3 lần mỗi ngày sau bữa ăn. Có thể gây buồn ngủ.', zh: '这个药请每天3次，饭后服用。可能会犯困。', id: 'Minum obat ini 3 kali sehari setelah makan. Mungkin menyebabkan kantuk.', tl: 'Inumin ang gamot na ito 3 beses sa isang araw pagkatapos kumain. Maaaring maging antok.', my: 'ဤဆေးကို တစ်နေ့ ၃ ကြိမ် ထမင်းစားပြီး သောက်ပါ။ အိပ်ငိုက်နိုင်သည်' } },
            ],
          },
          {
            type: 'quiz',
            quiz: [
              { question: { ja: '「1日3回、食後に飲んでください」の「食後」の意味は？', en: 'What does "shokugo" mean in "ichinichi san-kai, shokugo ni nonde kudasai"?', vi: 'Trong câu「1日3回、食後に飲んでください」, 「食後」có nghĩa là gì?' }, options: ['before meals', 'after meals', 'between meals', 'with meals'], correct: 1, explanation: { ja: '「食後（しょくご）」は「食べた後」、つまり「after meals」です。食前（しょくぜん）は「before meals」です。', en: '"Shokugo" (食後) means after meals. "Shokuzen" (食前) means before meals.', vi: 'Đúng rồi! 「食後」(shokugo) = sau bữa ăn. Hãy nhớ thêm: 「食前」(shokuzen) = trước bữa ăn, 「食間」(shokukan) = giữa các bữa ăn. Khi nhận thuốc, hãy xác nhận cách uống để đảm bảo hiệu quả điều trị!', zh: '「食後（しょくご）」是饭后的意思。「食前（しょくぜん）」是饭前。' } },
            ],
          },
        ],
      },
      {
        id: 'hospital-navigation',
        title: { ja: '病院での手続き', en: 'Hospital Procedures', vi: 'Thủ tục tại bệnh viện', zh: '医院手续' },
        duration: 12,
        content: [
          {
            type: 'vocab',
            title: { ja: '病院でよく使う言葉', en: 'Common Hospital Words' },
            items: [
              { japanese: '受付／うけつけ', reading: 'uketsuke', meaning: { ja: '最初に行くカウンター', en: 'reception / check-in', vi: 'lễ tân', zh: '挂号处', id: 'resepsionis', tl: 'reception', my: 'လက်ခံကောင်တာ' } },
              { japanese: '初診／しょしん', reading: 'shoshin', meaning: { ja: '初めての受診', en: 'first visit / new patient', vi: 'khám lần đầu', zh: '初诊', id: 'kunjungan pertama', tl: 'unang pagbisita', my: 'ပထမဆုံး လာရောက်စစ်ဆေးမှု' } },
              { japanese: '保険証／ほけんしょう', reading: 'hokenshou', meaning: { ja: '健康保険証', en: 'health insurance card', vi: 'thẻ bảo hiểm y tế', zh: '健康保险证', id: 'kartu asuransi kesehatan', tl: 'health insurance card', my: 'ကျန်းမာရေး အာမခံကတ်' } },
              { japanese: '問診票／もんしんひょう', reading: 'monshin-hyou', meaning: { ja: '症状を記入する用紙', en: 'medical questionnaire form', vi: 'phiếu hỏi bệnh', zh: '问诊表', id: 'formulir pertanyaan medis', tl: 'medical questionnaire', my: 'ဆေးဘက်ဆိုင်ရာ မေးခွန်းလွှာ' }, example: '問診票に記入してください。', exampleMeaning: { en: 'Please fill in the medical questionnaire.', vi: 'Vui lòng điền vào phiếu hỏi bệnh.' } },
              { japanese: '何科を受診しますか', reading: 'nanika wo jusshin shimasu ka', meaning: { ja: '受診する科を聞かれる', en: 'Which department are you visiting?', vi: 'Bạn khám ở khoa nào?', zh: '您要看哪个科室？', id: 'Departemen mana yang akan Anda kunjungi?', tl: 'Anong department ang bibisitahin mo?', my: 'ဘယ်ဌာနခွဲ သွားမလဲ?' } },
              { japanese: '内科／ないか', reading: 'naika', meaning: { ja: '内科（一般的な病気）', en: 'internal medicine / general doctor', vi: 'khoa nội', zh: '内科', id: 'penyakit dalam', tl: 'internal medicine', my: 'အတွင်းဆေးဌာနခွဲ' } },
              { japanese: '外科／げか', reading: 'geka', meaning: { ja: '外科（手術など）', en: 'surgery / surgical department', vi: 'khoa ngoại', zh: '外科', id: 'bedah', tl: 'surgery', my: 'ခွဲစိတ်ဌာနခွဲ' } },
            ],
          },
          {
            type: 'dialogue',
            title: { ja: '会話例：病院の受付', en: 'Dialogue: Hospital Reception' },
            dialogue: [
              { speaker: '受付', japanese: 'こんにちは。保険証はお持ちですか？', reading: 'Konnichiwa. Hokenshou wa omochi desu ka?', meaning: { en: 'Hello. Do you have your insurance card?', vi: 'Xin chào. Bạn có mang thẻ bảo hiểm không?', zh: '你好。您有健康保险证吗？' } },
              { speaker: 'あなた', japanese: 'はい、こちらです。今日が初診です。', reading: 'Hai, kochira desu. Kyou ga shoshin desu.', meaning: { en: 'Yes, here it is. This is my first visit.', vi: 'Vâng, đây ạ. Hôm nay là lần đầu tôi khám.', zh: '是的，给您。今天是第一次来看诊。' } },
              { speaker: '受付', japanese: 'では、この問診票に記入してください。何科を受診されますか？', reading: 'Dewa, kono monshin-hyou ni kinyuu shite kudasai. Nanika wo jusshin saremasu ka?', meaning: { en: 'Then please fill in this medical form. Which department are you visiting?', vi: 'Vậy hãy điền vào phiếu này. Bạn khám ở khoa nào?', zh: '那么请填写这张问诊表。您要看什么科？' } },
              { speaker: 'あなた', japanese: '内科をお願いします。おなかが痛いので。', reading: 'Naika wo onegaishimasu. Onaka ga itai node.', meaning: { en: 'Internal medicine please. I have stomach pain.', vi: 'Cho tôi khám nội khoa. Vì tôi bị đau bụng.', zh: '请帮我预约内科，因为肚子疼。' } },
            ],
          },
          {
            type: 'quiz',
            quiz: [
              { question: { ja: '「初診」の意味は？', en: 'What does "shoshin" mean?', vi: '「初診」có nghĩa là gì?' }, options: ['second visit', 'first visit / new patient', 'check-up', 'surgery'], correct: 1, explanation: { ja: '「初診（しょしん）」は「初めての受診」、つまり「first visit」です。2回目以降は「再診（さいしん）」と言います。', en: '"Shoshin" means first visit or new patient. Subsequent visits are called "saishin".', vi: 'Đúng rồi! 「初診」(shoshin) = lần khám đầu tiên (bệnh nhân mới). Từ lần thứ hai trở đi gọi là 「再診」(saishin). Khi đến bệnh viện lần đầu, hãy nói: 「初診なのですが...」(Tôi đến khám lần đầu...)' , zh: '「初診（しょしん）」是初次就诊的意思。第二次之后称"再診（さいしん）"。' } },
            ],
          },
        ],
      },
    ],
  },

  // ============================
  // COURSE 10: 交通・移動の日本語
  // ============================
  {
    id: 'transportation-japanese',
    title: { ja: '交通・移動の日本語', en: 'Transportation Japanese', vi: 'Tiếng Nhật giao thông', zh: '交通出行日语', id: 'Bahasa Jepang Transportasi', tl: 'Japanese para sa Transportasyon', my: 'သယ်ယူပို့ဆောင်ရေး ဂျပန်ဘာသာ' },
    description: { ja: '電車・バス・タクシーの乗り方、道の聞き方・教え方。日本の交通機関を使いこなす', en: 'How to use trains, buses, and taxis in Japan — buying tickets, asking directions, and navigating the city', vi: 'Cách sử dụng tàu điện, xe buýt, taxi ở Nhật — mua vé, hỏi đường, di chuyển trong thành phố', zh: '如何在日本乘坐电车、公交、出租车——购票、问路、城市导航', id: 'Cara menggunakan kereta, bus, dan taksi di Jepang', tl: 'Paano gumamit ng tren, bus, at taxi sa Japan', my: 'ဂျပန်တွင် ရထား၊ ဘတ်စ်ကား၊ တက္ကစီ စီးနင်းနည်း' },
    level: 'beginner',
    jlptLevel: 'N5',
    color: 'from-blue-400 to-indigo-500',
    totalLessons: 4,
    estimatedHours: 3,
    lessons: [
      {
        id: 'train-japanese',
        title: { ja: '電車の乗り方', en: 'How to Ride the Train', vi: 'Cách đi tàu điện', zh: '乘坐电车' },
        duration: 15,
        content: [
          {
            type: 'intro',
            title: { ja: '日本の電車について', en: 'About Japanese Trains' },
            text: { ja: '日本の電車は複雑ですが、いくつかのキーワードを覚えれば安心です。「〜番線」「乗り換え」「終点」などの表現を学びましょう。', en: 'Japanese trains can seem complex, but learning key words makes it manageable. Learn expressions like "〜bansen" (platform number), "norikae" (transfer), and "shuuten" (terminus).', vi: 'Hệ thống tàu điện Nhật Bản có vẻ phức tạp, nhưng chỉ cần nhớ một số từ khóa là đủ! Chúng ta sẽ học những từ như 「〜番線」(số sân ga), 「乗り換え」(chuyển tàu), và 「終点」(điểm cuối). Hãy luyện tập nhé, đây là kỹ năng cực kỳ hữu ích khi di chuyển tại Nhật!' },
          },
          {
            type: 'vocab',
            title: { ja: '電車でよく使う言葉', en: 'Common Train Vocabulary' },
            items: [
              { japanese: '〜番線／〜ばんせん', reading: '〜bansen', meaning: { ja: 'ホームの番号', en: 'Platform number 〜', vi: 'Sân ga số 〜', zh: '第〜站台', id: 'jalur 〜', tl: 'platform 〜', my: '〜 နံပါတ် ပလပ်ဖောင်' }, example: '2番線から乗ってください。', exampleReading: 'Ni-bansen kara notte kudasai.', exampleMeaning: { en: 'Please board from platform 2.', vi: 'Hãy lên tàu từ sân ga số 2.' } },
              { japanese: '乗り換え／のりかえ', reading: 'norikae', meaning: { ja: '電車を乗り継ぐこと', en: 'transfer (change trains)', vi: 'chuyển tàu', zh: '换乘', id: 'pindah kereta', tl: 'transfer ng tren', my: 'ရထားပြောင်းတည်' }, example: '渋谷で乗り換えてください。', exampleReading: 'Shibuya de norikae te kudasai.', exampleMeaning: { en: 'Please transfer at Shibuya.', vi: 'Hãy chuyển tàu ở Shibuya.' } },
              { japanese: '終点／しゅうてん', reading: 'shuuten', meaning: { ja: 'その電車の最後の駅', en: 'terminus / last stop', vi: 'điểm cuối cùng', zh: '终点站', id: 'stasiun terakhir', tl: 'huling hinto', my: 'နောက်ဆုံးမှတ်တိုင်' } },
              { japanese: 'Suica・PASMO', reading: 'suika / pasmo', meaning: { ja: '交通系ICカード', en: 'IC transport cards', vi: 'thẻ IC giao thông', zh: '交通IC卡', id: 'kartu IC transportasi', tl: 'IC transport card', my: 'IC သယ်ယူပို့ဆောင်ရေး ကတ်' } },
              { japanese: '自動改札／じどうかいさつ', reading: 'jidou kaisatsu', meaning: { ja: '自動改札機', en: 'automatic ticket gate', vi: 'cổng kiểm soát tự động', zh: '自动检票口', id: 'gerbang tiket otomatis', tl: 'automatic ticket gate', my: 'အလိုအလျောက် လက်မှတ်စစ်ဆေးကိရိယာ' } },
              { japanese: '急行／きゅうこう', reading: 'kyuukou', meaning: { ja: '各駅を止まらない速い電車', en: 'express train (skips some stations)', vi: 'tàu tốc hành', zh: '急行列车', id: 'kereta ekspres', tl: 'express train', my: 'အမြန်ရထား' } },
              { japanese: '各駅停車／かくえきていしゃ', reading: 'kakueki teisha', meaning: { ja: '全ての駅に止まる電車', en: 'local train (stops at every station)', vi: 'tàu dừng mọi ga', zh: '各站停靠列车', id: 'kereta lokal (berhenti di semua stasiun)', tl: 'lokal na tren (humihinto sa lahat ng istasyon)', my: 'ဘုတ်တိုင်တိုင်ရပ်သည့် ရထား' } },
            ],
          },
          {
            type: 'grammar',
            title: { ja: '「〜行き」で行き先を確認する', en: 'Checking the destination with 〜yuki' },
            grammar: [
              {
                pattern: '〜行き（ゆき）',
                explanation: { ja: '「〜行き」は電車やバスの終着駅・行き先を示します。乗る前に必ず確認しましょう。', en: '"〜yuki" indicates the train or bus destination. Always check before boarding.', vi: 'Điểm quan trọng: 「〜行き」(〜yuki) chỉ điểm đến cuối cùng của tàu hoặc xe buýt. Ví dụ: 「新宿行き」= đi Shinjuku. Luôn kiểm tra bảng chỉ dẫn trước khi lên tàu để tránh đi nhầm hướng!', zh: '「〜行き」表示列车或公交的终点站/目的地。上车前一定要确认。', id: '"〜yuki" menunjukkan tujuan kereta atau bus.', tl: '"〜yuki" ay nagpapakita ng destinasyon ng tren o bus.', my: '"〜yuki" သည် ရထား သို့မဟုတ် ဘတ်စ်ကားသွားသောနေရာ ပြသည်' },
                examples: [
                  { japanese: '新宿行きの電車はどれですか？', reading: 'Shinjuku-yuki no densha wa dore desu ka?', meaning: { en: 'Which is the train going to Shinjuku?', vi: 'Tàu đến Shinjuku là cái nào?' } },
                  { japanese: 'この電車は渋谷行きですか？', reading: 'Kono densha wa Shibuya-yuki desu ka?', meaning: { en: 'Is this train going to Shibuya?', vi: 'Tàu này đến Shibuya không?' } },
                ],
              },
            ],
          },
          {
            type: 'dialogue',
            title: { ja: '会話例：駅員に聞く', en: 'Dialogue: Asking a Station Staff' },
            dialogue: [
              { speaker: 'あなた', japanese: 'すみません、渋谷に行きたいのですが、何番線ですか？', reading: 'Sumimasen, Shibuya ni ikitai no desu ga, nani-bansen desu ka?', meaning: { ja: '渋谷へのホームを聞く', en: 'Excuse me, I want to go to Shibuya. Which platform?', vi: 'Xin lỗi, tôi muốn đến Shibuya. Sân ga số mấy?', zh: '打扰一下，我想去涩谷，请问几号站台？', id: 'Permisi, saya mau ke Shibuya. Jalur berapa?', tl: 'Excuse me, gusto kong pumunta sa Shibuya. Anong platform?', my: 'တောင်းပန်ပါသည်၊ Shibuya သွားချင်ပါတယ်။ ဘယ် platform လဲ?' } },
              { speaker: '駅員', japanese: '5番線から山手線に乗ってください。渋谷まで直通です。', reading: 'Go-bansen kara Yamate-sen ni notte kudasai. Shibuya made chokutsu desu.', meaning: { ja: 'ホームと乗り換え不要を案内', en: 'Take the Yamanote Line from platform 5. It goes directly to Shibuya.', vi: 'Đi tuyến Yamanote từ sân ga số 5. Thẳng đến Shibuya.', zh: '请从5号站台乘山手线，直达涩谷。', id: 'Naik Jalur Yamanote dari platform 5, langsung ke Shibuya.', tl: 'Sakay sa Yamanote Line mula sa platform 5. Diretso sa Shibuya.', my: 'Platform 5 မှ Yamanote Line စီးပါ။ Shibuya အထိ တိုက်ရိုက်သွားသည်' } },
              { speaker: 'あなた', japanese: 'ありがとうございます。何分くらいかかりますか？', reading: 'Arigatou gozaimasu. Nan-fun kurai kakarimasu ka?', meaning: { ja: '所要時間を確認', en: 'Thank you. How long does it take?', vi: 'Cảm ơn. Mất khoảng bao lâu?', zh: '谢谢。大约需要多少分钟？', id: 'Terima kasih. Berapa menit kira-kira?', tl: 'Salamat. Gaano katagal?', my: 'ကျေးဇူးတင်ပါသည်။ ဘယ်နှစ်မိနစ် ကြာမလဲ?' } },
              { speaker: '駅員', japanese: '10分くらいです。', reading: 'Jup-pun kurai desu.', meaning: { ja: 'おおよその所要時間', en: 'About 10 minutes.', vi: 'Khoảng 10 phút.', zh: '大约10分钟。', id: 'Kira-kira 10 menit.', tl: 'Mga 10 minuto.', my: 'ခန့်မှန်း ၁၀ မိနစ် ကြာသည်' } },
            ],
          },
          {
            type: 'quiz',
            quiz: [
              { question: { ja: '「乗り換え」の意味は？', en: 'What does "norikae" mean?', vi: '「乗り換え」có nghĩa là gì?' }, options: ['final destination', 'platform number', 'transfer (change trains)', 'ticket machine'], correct: 2, explanation: { ja: '「乗り換え（のりかえ）」は他の路線・電車に乗り換えることです。', en: '"Norikae" means to transfer from one train line to another.', vi: 'Đúng rồi! 「乗り換え」(norikae) = chuyển tàu sang tuyến khác. Khi nhân viên ga nói 「〜で乗り換えてください」, hãy xuống tàu ở ga đó và tìm tàu tiếp theo. Ứng dụng Google Maps hoặc Yahoo! Transit rất hữu ích để tìm đường!', zh: '「乗り換え（のりかえ）」是换乘其他路线/电车的意思。' } },
            ],
          },
        ],
      },
      {
        id: 'taxi-bus',
        title: { ja: 'タクシー・バスの使い方', en: 'Using Taxis & Buses', vi: 'Sử dụng taxi và xe buýt', zh: '乘坐出租车和公交车' },
        duration: 12,
        content: [
          {
            type: 'vocab',
            title: { ja: 'タクシー・バスの言葉', en: 'Taxi & Bus Vocabulary' },
            items: [
              { japanese: '〜までお願いします', reading: '〜made onegaishimasu', meaning: { ja: '目的地を伝える', en: 'To 〜 please (telling destination)', vi: 'Cho đến 〜 (nói điểm đến)', zh: '请送我去〜', id: 'ke 〜 tolong', tl: 'sa 〜 po', my: '〜 ကို သွားပေးပါ' }, example: '新宿駅までお願いします。', exampleReading: 'Shinjuku-eki made onegaishimasu.', exampleMeaning: { en: 'To Shinjuku station please.', vi: 'Đến ga Shinjuku nhé.' } },
              { japanese: 'ここで降ろしてください', reading: 'koko de oroshite kudasai', meaning: { ja: 'ここで止めてほしい', en: 'Please let me off here', vi: 'Cho tôi xuống ở đây', zh: '请在这里让我下车', id: 'tolong turunkan saya di sini', tl: 'pakibaba ako dito', my: 'ဒီနေရာမှာ ချပေးပါ' } },
              { japanese: 'メーターで', reading: 'meetaa de', meaning: { ja: 'メーター料金で', en: 'by the meter (metered fare)', vi: 'tính theo đồng hồ', zh: '按计价器', id: 'sesuai argo', tl: 'sa meter', my: 'မီတာနှင့် တွက်ချက်' } },
              { japanese: 'バス停／バスてい', reading: 'basu tei', meaning: { ja: 'バスが止まる場所', en: 'bus stop', vi: 'trạm xe buýt', zh: '公交站', id: 'halte bus', tl: 'bus stop', my: 'ဘတ်စ်ကား မှတ်တိုင်' } },
              { japanese: '〜バス停で降りてください', reading: '〜basu tei de orite kudasai', meaning: { ja: '〜のバス停で降りる指示', en: 'Get off at 〜 bus stop', vi: 'Xuống ở trạm 〜', zh: '在〜公交站下车', id: 'turun di halte bus 〜', tl: 'bumaba sa 〜 bus stop', my: '〜 မှတ်တိုင်မှာ ဆင်းပါ' } },
              { japanese: '均一料金／きんいつりょうきん', reading: 'kinitsu ryoukin', meaning: { ja: 'どこまで乗っても同じ値段', en: 'flat rate (same fare regardless of distance)', vi: 'giá cố định (không phân biệt khoảng cách)', zh: '一律票价', id: 'tarif tetap', tl: 'flat rate', my: 'တစ်မျှတ နှုန်းထား' } },
            ],
          },
          {
            type: 'dialogue',
            title: { ja: '会話例：タクシーに乗る', en: 'Dialogue: Taking a Taxi' },
            dialogue: [
              { speaker: 'あなた', japanese: '新宿駅の南口までお願いします。', reading: 'Shinjuku-eki no minami-guchi made onegaishimasu.', meaning: { ja: '目的地を指定（入口まで）', en: 'To the south exit of Shinjuku station please.', vi: 'Đến cổng nam ga Shinjuku nhé.', zh: '请送我到新宿站南口。', id: 'ke pintu selatan Shinjuku tolong.', tl: 'Sa south exit ng Shinjuku station po.', my: 'Shinjuku ဘူတာရုံ တောင်ဝင်ပေါက်အထိ သွားပေးပါ' } },
              { speaker: '運転手', japanese: 'かしこまりました。高速は使いますか？', reading: 'Kashikomarimashita. Kousoku wa tsukaimasu ka?', meaning: { ja: '高速道路を使うか確認', en: 'Understood. Would you like to use the expressway?', vi: 'Tôi hiểu rồi. Bạn có muốn đi đường cao tốc không?', zh: '明白了。要走高速公路吗？', id: 'Baik. Apakah mau menggunakan jalan tol?', tl: 'Naiintindihan. Gusto mo bang gumamit ng expressway?', my: 'နားလည်ပါသည်။ အမြန်လမ်းသုံးမလား?' } },
              { speaker: 'あなた', japanese: '使わなくて大丈夫です。', reading: 'Tsukawanakute daijoubu desu.', meaning: { ja: '高速道路不要', en: 'That\'s fine without it.', vi: 'Không cần đâu, không sao.', zh: '不用高速也没关系。', id: 'Tidak apa-apa tanpa tol.', tl: 'Okay lang walang expressway.', my: 'မသုံးလည်း ရပါတယ်' } },
              { speaker: '運転手', japanese: '着きました。1,240円になります。', reading: 'Tsukimashita. Sen-nihyaku-yonjuu-en ni narimasu.', meaning: { ja: '到着と料金の案内', en: 'We\'ve arrived. That will be 1,240 yen.', vi: 'Chúng ta đã đến nơi. Tổng cộng 1.240 yên.', zh: '到了，一共1240日元。', id: 'Sudah sampai. 1.240 yen.', tl: 'Nakarating na tayo. 1,240 yen.', my: 'ရောက်ပါပြီ။ ၁,၂၄၀ ယန်း ဖြစ်ပါသည်' } },
            ],
          },
          {
            type: 'quiz',
            quiz: [
              { question: { ja: 'タクシーで目的地を伝えるとき何と言いますか？', en: 'How do you tell a taxi driver your destination?', vi: 'Khi nói điểm đến cho tài xế taxi, bạn dùng câu nào?' }, options: ['〜に行きたい', '〜はどこですか', '〜までお願いします', '〜で降ります'], correct: 2, explanation: { ja: 'タクシーで「〜までお願いします」が最も自然な表現です。', en: '"〜made onegaishimasu" is the most natural way to tell a taxi your destination.', vi: 'Đúng rồi! 「〜までお願いします」(〜made onegaishimasu) là cách nói tự nhiên nhất khi lên taxi: "Cho tôi đến 〜". Ví dụ: 「新宿駅までお願いします」= Cho tôi đến ga Shinjuku. Nếu không biết tên địa điểm, bạn cũng có thể đưa điện thoại cho tài xế xem bản đồ!', zh: '在出租车中，「〜までお願いします」是最自然的表达方式。' } },
            ],
          },
        ],
      },
      {
        id: 'asking-directions',
        title: { ja: '道を聞く・教える', en: 'Asking & Giving Directions', vi: 'Hỏi và chỉ đường', zh: '问路与指路' },
        duration: 12,
        content: [
          {
            type: 'vocab',
            title: { ja: '方向・位置を表す言葉', en: 'Direction & Position Words' },
            items: [
              { japanese: '右に曲がる／みぎにまがる', reading: 'migi ni magaru', meaning: { ja: '右折する', en: 'turn right', vi: 'rẽ phải', zh: '右转', id: 'belok kanan', tl: 'lumiko sa kanan', my: 'ညာဘက် ကွေ့' } },
              { japanese: '左に曲がる／ひだりにまがる', reading: 'hidari ni magaru', meaning: { ja: '左折する', en: 'turn left', vi: 'rẽ trái', zh: '左转', id: 'belok kiri', tl: 'lumiko sa kaliwa', my: 'ဘယ်ဘက် ကွေ့' } },
              { japanese: 'まっすぐ行く', reading: 'massugu iku', meaning: { ja: '直進する', en: 'go straight', vi: 'đi thẳng', zh: '直行', id: 'jalan lurus', tl: 'diretso', my: 'တည့်တည့် သွား' } },
              { japanese: '〜を越えたら', reading: '〜wo koetara', meaning: { ja: '〜を通り過ぎたら', en: 'once you pass 〜', vi: 'khi đi qua 〜', zh: '过了〜之后', id: 'setelah melewati 〜', tl: 'pagdaan ng 〜', my: '〜 ကျော်သွားပြီဆိုရင်' }, example: '信号を越えたら右です。', exampleReading: 'Shingou wo koetara migi desu.', exampleMeaning: { en: 'After you pass the traffic light, it\'s on the right.', vi: 'Qua đèn giao thông rồi rẽ phải.' } },
              { japanese: '〜の角を曲がる', reading: '〜no kado wo magaru', meaning: { ja: '〜の角を曲がる', en: 'turn at the corner of 〜', vi: 'rẽ ở góc phố 〜', zh: '在〜的拐角处转弯', id: 'belok di sudut 〜', tl: 'lumiko sa kanto ng 〜', my: '〜 မှောင်ထောင့်မှ ကွေ့' } },
              { japanese: '歩いて〜分', reading: 'aruite 〜fun', meaning: { ja: '徒歩〜分', en: '〜 minutes on foot / walking', vi: 'đi bộ 〜 phút', zh: '步行〜分钟', id: 'jalan kaki 〜 menit', tl: '〜 minuto sa paglalakad', my: 'လမ်းလျှောက် 〜 မိနစ်' } },
            ],
          },
          {
            type: 'grammar',
            title: { ja: '道を教えるときの表現', en: 'Giving Directions Phrases' },
            grammar: [
              {
                pattern: '〜たら（条件）+ 方向',
                explanation: { ja: '「〜たら」は「〜した後に」の意味で、道案内でよく使います。「信号を越えたら右に曲がってください」のように使います。', en: '"〜tara" means "after you do 〜" and is commonly used in directions. Example: "After you pass the traffic light, turn right."', vi: 'Điểm quan trọng: 「〜たら」có nghĩa là "sau khi 〜" và rất hay được dùng khi chỉ đường. Cấu trúc: [mốc tham chiếu] + たら + [hướng đi]. Ví dụ: 「信号を越えたら右に曲がってください」= Sau khi qua đèn giao thông, hãy rẽ phải.', zh: '「〜たら」表示"做了〜之后"，常用于道路指引。例如"过了信号灯右转"。' },
                examples: [
                  { japanese: 'この道をまっすぐ行ったら、左手にコンビニが見えます。', reading: 'Kono michi wo massugu ittara, hidarite ni konbini ga miemasu.', meaning: { en: 'If you go straight down this road, you\'ll see a convenience store on the left.', vi: 'Đi thẳng con đường này, bạn sẽ thấy một cửa hàng tiện lợi ở bên trái.' } },
                  { japanese: '橋を渡ったら、すぐそこです。', reading: 'Hashi wo watattara, sugu soko desu.', meaning: { en: 'Once you cross the bridge, it\'s right there.', vi: 'Qua cầu rồi là ngay đó.' } },
                ],
              },
            ],
          },
          {
            type: 'dialogue',
            title: { ja: '会話例：道を聞く', en: 'Dialogue: Asking for Directions' },
            dialogue: [
              { speaker: 'あなた', japanese: 'すみません、郵便局はどこですか？', reading: 'Sumimasen, yuubinkyoku wa doko desu ka?', meaning: { ja: '郵便局の場所を聞く', en: 'Excuse me, where is the post office?', vi: 'Xin lỗi, bưu điện ở đâu ạ?', zh: '打扰一下，邮局在哪里？', id: 'Permisi, kantor pos di mana?', tl: 'Excuse me, nasaan ang post office?', my: 'တောင်းပန်ပါသည်၊ စာတိုက် ဘယ်မှာ ရှိသလဲ?' } },
              { speaker: '人', japanese: 'この道をまっすぐ行って、信号を渡ったら右に曲がってください。歩いて5分くらいです。', reading: 'Kono michi wo massugu itte, shingou wo watattara migi ni magatte kudasai. Aruite go-fun kurai desu.', meaning: { ja: '具体的な道案内', en: 'Go straight down this road, cross the traffic light, then turn right. It\'s about 5 minutes on foot.', vi: 'Đi thẳng con đường này, qua đèn giao thông rồi rẽ phải. Đi bộ khoảng 5 phút.', zh: '沿这条路直走，过了信号灯后右转，步行约5分钟。', id: 'Jalan lurus, setelah lampu merah belok kanan. Sekitar 5 menit jalan kaki.', tl: 'Diretso sa daan na ito, pagdaan ng traffic light lumiko sa kanan. Mga 5 minuto sa paglalakad.', my: 'ဒီလမ်းမကြီးတည့်တည့် သွားပြီး မီးပွိုင့်ကျော်လျှင် ညာဘက်ကွေ့ပါ။ လမ်းလျှောက်ရင် ၅ မိနစ်ခန့် ကြာသည်' } },
              { speaker: 'あなた', japanese: 'ありがとうございます。この先の信号ですか？', reading: 'Arigatou gozaimasu. Kono saki no shingou desu ka?', meaning: { ja: '確認の質問', en: 'Thank you. The traffic light just up ahead?', vi: 'Cảm ơn. Đèn giao thông phía trước kia à?', zh: '谢谢。是前面那个信号灯吗？', id: 'Terima kasih. Lampu merah yang di depan?', tl: 'Salamat. Ang traffic light sa harap?', my: 'ကျေးဇူးတင်ပါသည်။ ဆက်သွားရင် ရှိတဲ့ မီးပွိုင့် ဟုတ်သလား?' } },
              { speaker: '人', japanese: 'そうです、そこです。頑張ってください！', reading: 'Sou desu, soko desu. Ganbatte kudasai!', meaning: { ja: '確認して激励', en: 'Yes, that\'s it. Good luck!', vi: 'Đúng rồi, đó rồi. Chúc may mắn!', zh: '是的，就是那里。加油！', id: 'Ya, itu dia. Semangat!', tl: 'Oo, doon nga. Ingat!', my: 'ဟုတ်ကဲ့၊ ဒီနေရာပါပဲ။ ကြိုးစားပါ!' } },
            ],
          },
          {
            type: 'quiz',
            quiz: [
              { question: { ja: '「まっすぐ行ってください」の意味は？', en: 'What does "massugu itte kudasai" mean?', vi: '「まっすぐ行ってください」có nghĩa là gì?' }, options: ['Please turn right', 'Please turn left', 'Please go straight', 'Please stop here'], correct: 2, explanation: { ja: '「まっすぐ」は「straight」、「行ってください」は「please go」なので、「Please go straight」です。', en: '"Massugu" means straight, "itte kudasai" means please go, so it means "Please go straight".', vi: 'Đúng rồi! 「まっすぐ」= thẳng, 「行ってください」= hãy đi. Vậy câu này có nghĩa là "Hãy đi thẳng". Cùng với 「右に曲がって」(rẽ phải) và 「左に曲がって」(rẽ trái), bạn đã có đủ từ vựng cơ bản để hiểu chỉ đường!', zh: '「まっすぐ」是"直走"，「行ってください」是"请走"，合起来就是"请直走"。' } },
            ],
          },
        ],
      },
      {
        id: 'buying-tickets',
        title: { ja: '切符・チケットの買い方', en: 'Buying Train Tickets', vi: 'Mua vé tàu', zh: '购买车票' },
        duration: 10,
        content: [
          {
            type: 'vocab',
            title: { ja: '切符購入に関する言葉', en: 'Ticket Purchase Vocabulary' },
            items: [
              { japanese: '切符／きっぷ', reading: 'kippu', meaning: { ja: '電車・バスの乗車券', en: 'ticket', vi: 'vé', zh: '车票', id: 'tiket', tl: 'tiket', my: 'လက်မှတ်' } },
              { japanese: '片道／かたみち', reading: 'katamichi', meaning: { ja: '片道（行きだけ）', en: 'one-way', vi: 'một chiều', zh: '单程', id: 'satu arah', tl: 'isang daan', my: 'တစ်ဖက်တည်း' } },
              { japanese: '往復／おうふく', reading: 'oufuku', meaning: { ja: '往復（行きと帰り）', en: 'round trip', vi: 'khứ hồi', zh: '往返', id: 'pulang pergi', tl: 'round trip', my: 'သွားလာ' } },
              { japanese: '自由席／じゆうせき', reading: 'jiyuuseki', meaning: { ja: '座席指定なし', en: 'unreserved seat', vi: 'ghế tự do', zh: '自由席（不对号入座）', id: 'kursi bebas', tl: 'unreserved seat', my: 'ယူချင်ရာ ထိုင်ခုံ' } },
              { japanese: '指定席／していせき', reading: 'shiteiseki', meaning: { ja: '座席を予約した席', en: 'reserved seat', vi: 'ghế đã đặt trước', zh: '指定席（对号入座）', id: 'kursi reservasi', tl: 'reserved seat', my: 'ကြိုတင်မှာထားသော ထိုင်ခုံ' } },
              { japanese: 'IC カードにチャージする', reading: 'IC kaado ni chaaji suru', meaning: { ja: 'ICカードに金額を入金する', en: 'charge/load money onto IC card', vi: 'nạp tiền vào thẻ IC', zh: '向IC卡充值', id: 'isi ulang IC card', tl: 'mag-charge ng IC card', my: 'IC ကတ်တွင် ငွေဖြည့်' }, example: 'SuicaにICカードに1,000円チャージしました。', exampleMeaning: { en: 'I loaded 1,000 yen onto my Suica card.', vi: 'Tôi nạp 1.000 yên vào thẻ Suica.' } },
            ],
          },
          {
            type: 'dialogue',
            title: { ja: '会話例：みどりの窓口で', en: 'Dialogue: At the JR Ticket Counter' },
            dialogue: [
              { speaker: 'あなた', japanese: '新大阪まで新幹線の指定席を2枚お願いします。', reading: 'Shin-Osaka made Shinkansen no shiteiseki wo ni-mai onegaishimasu.', meaning: { ja: '新幹線の指定席を購入', en: 'Two reserved Shinkansen seats to Shin-Osaka please.', vi: 'Cho tôi 2 vé Shinkansen ghế đặt trước đến Shin-Osaka.', zh: '两张新大阪的新干线指定席。', id: 'Dua tiket Shinkansen kursi reservasi ke Shin-Osaka.', tl: 'Dalawang reserved seat sa Shinkansen papunta Shin-Osaka.', my: 'Shin-Osaka ထိ Shinkansen ကြိုတင်မှာ ထိုင်ခုံ ၂ ခုပါ' } },
              { speaker: '窓口', japanese: '日時はいつですか？', reading: 'Nichiji wa itsu desu ka?', meaning: { ja: '日時の確認', en: 'What date and time?', vi: 'Ngày giờ nào?', zh: '请问几月几号几点？', id: 'Tanggal dan waktu berapa?', tl: 'Anong petsa at oras?', my: 'ဘယ် ရက်ချိန်မှာ?' } },
              { speaker: 'あなた', japanese: '3月25日の午前10時発でお願いします。', reading: 'San-gatsu nijuu-go-nichi no gozen juu-ji hatsu de onegaishimasu.', meaning: { ja: '日時の指定', en: 'Departing March 25th at 10:00 AM please.', vi: 'Khởi hành ngày 25 tháng 3, lúc 10 giờ sáng.', zh: '3月25日上午10点发车的。', id: 'Berangkat tanggal 25 Maret jam 10 pagi.', tl: 'Alis ng Marso 25 ng 10:00 AM.', my: 'မတ်လ ၂၅ ရက် နံနက် ၁၀ နာရီ ထွက်ဖို့ပါ' } },
            ],
          },
          {
            type: 'quiz',
            quiz: [
              { question: { ja: '「往復」と「片道」の違いは？', en: 'What is the difference between "oufuku" and "katamichi"?', vi: '「往復」và「片道」khác nhau như thế nào?' }, options: ['oufuku=one-way, katamichi=round trip', 'oufuku=round trip, katamichi=one-way', 'both mean one-way', 'both mean round trip'], correct: 1, explanation: { ja: '「往復（おうふく）」は行きと帰りのセット（round trip）。「片道（かたみち）」は行きだけまたは帰りだけ（one-way）です。', en: '"Oufuku" is round trip (there and back). "Katamichi" is one-way (only one direction).', vi: 'Đúng rồi! 「往復」(oufuku) = khứ hồi (đi và về). 「片道」(katamichi) = một chiều. Khi mua vé Shinkansen, hãy hỏi「往復で買うと安くなりますか？」(Mua vé khứ hồi có rẻ hơn không?)', zh: '「往復（おうふく）」是往返（round trip）；「片道（かたみち）」是单程（one-way）。' } },
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
