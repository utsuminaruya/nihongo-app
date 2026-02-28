export type QuizType = "multiple-choice" | "fill-in-blank" | "kanji-reading";

export interface VocabularyItem {
  word: string;
  reading: string;
  meaning: string;
}

export interface GrammarPoint {
  pattern: string;
  explanation: string;
  examples: string[];
}

export interface ExampleSentence {
  japanese: string;
  reading: string;
  english: string;
}

export interface QuizQuestion {
  id: string;
  type: QuizType;
  question: string;
  options?: string[];
  correctAnswer: string;
  explanation: string;
}

export interface Lesson {
  id: string;
  title: string;
  titleJa: string;
  order: number;
  xpReward: number;
  grammar: GrammarPoint[];
  vocabulary: VocabularyItem[];
  examples: ExampleSentence[];
  quiz: QuizQuestion[];
}

export interface Course {
  id: string;
  slug: string;
  titleKey: string;
  descriptionEn: string;
  icon: string;
  color: string;
  lessonsCount: number;
  lessons: Lesson[];
}

export const courses: Course[] = [
  {
    id: "jlpt-n5",
    slug: "jlpt-n5",
    titleKey: "jlptGeneral",
    descriptionEn: "JLPT N5 General",
    icon: "BookOpen",
    color: "sakura",
    lessonsCount: 10,
    lessons: [
      {
        id: "n5-1",
        title: "Self Introduction",
        titleJa: "自己紹介",
        order: 1,
        xpReward: 50,
        grammar: [
          {
            pattern: "〜は〜です",
            explanation: "Used to describe or identify something. X wa Y desu means 'X is Y'.",
            examples: [
              "わたしは がくせい です。(I am a student.)",
              "これは ほん です。(This is a book.)",
            ],
          },
          {
            pattern: "〜の〜",
            explanation: "Particle 'no' connects two nouns, showing possession or relationship.",
            examples: [
              "わたしの なまえ (my name)",
              "にほんの りょうり (Japanese food)",
            ],
          },
        ],
        vocabulary: [
          { word: "名前", reading: "なまえ", meaning: "name" },
          { word: "学生", reading: "がくせい", meaning: "student" },
          { word: "仕事", reading: "しごと", meaning: "job / work" },
          { word: "国", reading: "くに", meaning: "country" },
          { word: "出身", reading: "しゅっしん", meaning: "hometown / origin" },
        ],
        examples: [
          {
            japanese: "はじめまして。わたしは リンです。",
            reading: "はじめまして。わたしは りんです。",
            english: "Nice to meet you. I am Lin.",
          },
          {
            japanese: "ベトナムの しゅっしんです。",
            reading: "べとなむの しゅっしんです。",
            english: "I am from Vietnam.",
          },
          {
            japanese: "かいごの しごとを しています。",
            reading: "かいごの しごとを しています。",
            english: "I work in nursing care.",
          },
        ],
        quiz: [
          {
            id: "n5-1-q1",
            type: "multiple-choice",
            question: "わたし___ がくせいです。",
            options: ["を", "は", "に", "で"],
            correctAnswer: "は",
            explanation: "The particle は (wa) marks the topic of the sentence.",
          },
          {
            id: "n5-1-q2",
            type: "kanji-reading",
            question: "名前",
            options: ["なまえ", "めいぜん", "みょうじ", "なまり"],
            correctAnswer: "なまえ",
            explanation: "名前 (なまえ) means 'name'.",
          },
          {
            id: "n5-1-q3",
            type: "fill-in-blank",
            question: "にほん___ りょうりが すきです。(I like Japanese food.)",
            options: ["の", "を", "は", "が"],
            correctAnswer: "の",
            explanation: "The particle の connects two nouns: にほんの りょうり (Japanese food).",
          },
          {
            id: "n5-1-q4",
            type: "multiple-choice",
            question: "「しごと」の意味は？ (What does しごと mean?)",
            options: ["school", "job / work", "house", "food"],
            correctAnswer: "job / work",
            explanation: "仕事 (しごと) means 'job' or 'work'.",
          },
        ],
      },
      {
        id: "n5-2",
        title: "Numbers & Counting",
        titleJa: "数字と数え方",
        order: 2,
        xpReward: 50,
        grammar: [
          {
            pattern: "〜つ (counter for general objects)",
            explanation: "The つ counter is used for counting general objects from 1-10.",
            examples: [
              "ひとつ (one thing)",
              "みっつ ください。(Three, please.)",
            ],
          },
        ],
        vocabulary: [
          { word: "一", reading: "いち", meaning: "one" },
          { word: "二", reading: "に", meaning: "two" },
          { word: "三", reading: "さん", meaning: "three" },
          { word: "百", reading: "ひゃく", meaning: "hundred" },
          { word: "千", reading: "せん", meaning: "thousand" },
        ],
        examples: [
          {
            japanese: "りんごを みっつ ください。",
            reading: "りんごを みっつ ください。",
            english: "Three apples, please.",
          },
          {
            japanese: "これは いくらですか。",
            reading: "これは いくらですか。",
            english: "How much is this?",
          },
        ],
        quiz: [
          {
            id: "n5-2-q1",
            type: "kanji-reading",
            question: "三百",
            options: ["さんひゃく", "さんびゃく", "さんぴゃく", "みひゃく"],
            correctAnswer: "さんびゃく",
            explanation: "三百 is read さんびゃく (300). Note the sound change from ひゃく to びゃく.",
          },
          {
            id: "n5-2-q2",
            type: "multiple-choice",
            question: "How do you say 'five things' using the つ counter?",
            options: ["ごつ", "いつつ", "ごこ", "いつこ"],
            correctAnswer: "いつつ",
            explanation: "Five things = いつつ (itsutsu) using the つ counter.",
          },
          {
            id: "n5-2-q3",
            type: "fill-in-blank",
            question: "コーヒーを ___ください。(Two coffees, please.)",
            options: ["ふたつ", "にこ", "にほん", "ふたり"],
            correctAnswer: "ふたつ",
            explanation: "ふたつ is the つ counter for two things.",
          },
        ],
      },
      {
        id: "n5-3",
        title: "Daily Activities",
        titleJa: "日常の活動",
        order: 3,
        xpReward: 50,
        grammar: [
          {
            pattern: "〜ます / 〜ません",
            explanation: "Polite verb endings. ます for positive, ません for negative.",
            examples: [
              "たべます (eat - polite)",
              "たべません (do not eat - polite)",
            ],
          },
        ],
        vocabulary: [
          { word: "食べる", reading: "たべる", meaning: "to eat" },
          { word: "飲む", reading: "のむ", meaning: "to drink" },
          { word: "起きる", reading: "おきる", meaning: "to wake up" },
          { word: "寝る", reading: "ねる", meaning: "to sleep" },
          { word: "行く", reading: "いく", meaning: "to go" },
        ],
        examples: [
          {
            japanese: "まいにち ろくじに おきます。",
            reading: "まいにち ろくじに おきます。",
            english: "I wake up at 6 o'clock every day.",
          },
          {
            japanese: "あさごはんを たべます。",
            reading: "あさごはんを たべます。",
            english: "I eat breakfast.",
          },
        ],
        quiz: [
          {
            id: "n5-3-q1",
            type: "multiple-choice",
            question: "「飲む」のます形は？ (What is the masu form of 飲む?)",
            options: ["のみます", "のむます", "のめます", "のまます"],
            correctAnswer: "のみます",
            explanation: "飲む (nomu) becomes 飲みます (nomimasu) in polite form.",
          },
          {
            id: "n5-3-q2",
            type: "kanji-reading",
            question: "食べる",
            options: ["たべる", "くべる", "しょくべる", "はべる"],
            correctAnswer: "たべる",
            explanation: "食べる is read たべる (taberu) meaning 'to eat'.",
          },
          {
            id: "n5-3-q3",
            type: "fill-in-blank",
            question: "コーヒーを ___。(I drink coffee.)",
            options: ["のみます", "たべます", "みます", "ききます"],
            correctAnswer: "のみます",
            explanation: "飲みます (nomimasu) means 'drink' in polite form.",
          },
        ],
      },
      // Lessons 4-10 abbreviated for brevity - same structure
      ...Array.from({ length: 7 }, (_, i) => ({
        id: `n5-${i + 4}`,
        title: [
          "Time & Date",
          "Shopping",
          "Directions",
          "Family",
          "Adjectives",
          "Past Tense",
          "Review & Practice",
        ][i],
        titleJa: [
          "時間と日付",
          "買い物",
          "道案内",
          "家族",
          "形容詞",
          "過去形",
          "復習と練習",
        ][i],
        order: i + 4,
        xpReward: 50,
        grammar: [
          {
            pattern: ["〜じ (time)", "〜を ください", "〜は どこですか", "〜がいます", "〜い / 〜な", "〜ました / 〜ませんでした", "総復習"][i],
            explanation: "Grammar point for this lesson.",
            examples: ["Example sentence 1.", "Example sentence 2."],
          },
        ],
        vocabulary: [
          { word: ["時間", "値段", "駅", "母", "大きい", "昨日", "全部"][i], reading: ["じかん", "ねだん", "えき", "はは", "おおきい", "きのう", "ぜんぶ"][i], meaning: ["time", "price", "station", "mother", "big", "yesterday", "all"][i] },
        ],
        examples: [
          {
            japanese: "これは れんしゅうの ぶんです。",
            reading: "これは れんしゅうの ぶんです。",
            english: "This is a practice sentence.",
          },
        ],
        quiz: [
          {
            id: `n5-${i + 4}-q1`,
            type: "multiple-choice" as QuizType,
            question: "Practice question for this lesson.",
            options: ["A", "B", "C", "D"],
            correctAnswer: "A",
            explanation: "This is the explanation.",
          },
        ],
      })),
    ],
  },
  {
    id: "jlpt-n4",
    slug: "jlpt-n4",
    titleKey: "jlptGeneral",
    descriptionEn: "JLPT N4 General",
    icon: "BookOpen",
    color: "navy",
    lessonsCount: 8,
    lessons: [
      {
        id: "n4-1",
        title: "Te-form Verbs",
        titleJa: "て形動詞",
        order: 1,
        xpReward: 60,
        grammar: [
          {
            pattern: "〜てください",
            explanation: "Polite request form. 'Please do ~'.",
            examples: [
              "ここに すわって ください。(Please sit here.)",
              "なまえを かいて ください。(Please write your name.)",
            ],
          },
          {
            pattern: "〜ている",
            explanation: "Ongoing action or state. 'Is doing ~' or 'has done ~'.",
            examples: [
              "いま たべて います。(I am eating now.)",
              "東京に すんで います。(I live in Tokyo.)",
            ],
          },
        ],
        vocabulary: [
          { word: "座る", reading: "すわる", meaning: "to sit" },
          { word: "書く", reading: "かく", meaning: "to write" },
          { word: "住む", reading: "すむ", meaning: "to live" },
          { word: "待つ", reading: "まつ", meaning: "to wait" },
          { word: "持つ", reading: "もつ", meaning: "to hold / have" },
        ],
        examples: [
          {
            japanese: "すこし まって ください。",
            reading: "すこし まって ください。",
            english: "Please wait a moment.",
          },
          {
            japanese: "にほんに すんで います。",
            reading: "にほんに すんで います。",
            english: "I live in Japan.",
          },
        ],
        quiz: [
          {
            id: "n4-1-q1",
            type: "multiple-choice",
            question: "「書く」のて形は？ (What is the te-form of 書く?)",
            options: ["かって", "かいて", "かきて", "かして"],
            correctAnswer: "かいて",
            explanation: "書く (kaku) becomes 書いて (kaite) in te-form. く→いて pattern.",
          },
          {
            id: "n4-1-q2",
            type: "fill-in-blank",
            question: "ここに ___ください。(Please sit here.)",
            options: ["すわって", "すわて", "すわりて", "すわんで"],
            correctAnswer: "すわって",
            explanation: "座る (suwaru) becomes 座って (suwatte) in te-form.",
          },
          {
            id: "n4-1-q3",
            type: "kanji-reading",
            question: "待つ",
            options: ["まつ", "もつ", "たつ", "かつ"],
            correctAnswer: "まつ",
            explanation: "待つ (まつ) means 'to wait'.",
          },
        ],
      },
      ...Array.from({ length: 7 }, (_, i) => ({
        id: `n4-${i + 2}`,
        title: [
          "Giving & Receiving",
          "Conditional Form",
          "Potential Form",
          "Volitional Form",
          "Passive Form",
          "Causative Form",
          "Review",
        ][i],
        titleJa: [
          "あげる・もらう",
          "条件形",
          "可能形",
          "意志形",
          "受身形",
          "使役形",
          "復習",
        ][i],
        order: i + 2,
        xpReward: 60,
        grammar: [
          {
            pattern: ["〜てあげる", "〜たら", "〜ことができる", "〜よう", "〜られる", "〜させる", "総復習"][i],
            explanation: "Grammar point for this lesson.",
            examples: ["Example 1.", "Example 2."],
          },
        ],
        vocabulary: [
          { word: ["手伝う", "天気", "泳ぐ", "決める", "呼ぶ", "働く", "練習"][i], reading: ["てつだう", "てんき", "およぐ", "きめる", "よぶ", "はたらく", "れんしゅう"][i], meaning: ["to help", "weather", "to swim", "to decide", "to call", "to work", "practice"][i] },
        ],
        examples: [
          {
            japanese: "これは N4の れんしゅうです。",
            reading: "これは えぬよんの れんしゅうです。",
            english: "This is N4 practice.",
          },
        ],
        quiz: [
          {
            id: `n4-${i + 2}-q1`,
            type: "multiple-choice" as QuizType,
            question: "N4 practice question.",
            options: ["A", "B", "C", "D"],
            correctAnswer: "A",
            explanation: "Explanation for this question.",
          },
        ],
      })),
    ],
  },
  {
    id: "kaigo-basics",
    slug: "kaigo-basics",
    titleKey: "nursingCare",
    descriptionEn: "Nursing Care Japanese Basics",
    icon: "Heart",
    color: "rose",
    lessonsCount: 6,
    lessons: [
      {
        id: "kaigo-1",
        title: "Greetings at Care Facility",
        titleJa: "施設での挨拶",
        order: 1,
        xpReward: 55,
        grammar: [
          {
            pattern: "〜ましょうか",
            explanation: "Offering to do something. 'Shall I ~?'",
            examples: [
              "てつだいましょうか。(Shall I help you?)",
              "お茶を いれましょうか。(Shall I make tea?)",
            ],
          },
        ],
        vocabulary: [
          { word: "利用者", reading: "りようしゃ", meaning: "facility user / resident" },
          { word: "介護士", reading: "かいごし", meaning: "care worker" },
          { word: "施設", reading: "しせつ", meaning: "facility" },
          { word: "体調", reading: "たいちょう", meaning: "physical condition" },
          { word: "声掛け", reading: "こえかけ", meaning: "calling out / speaking to" },
        ],
        examples: [
          {
            japanese: "おはようございます。たいちょうは いかがですか。",
            reading: "おはようございます。たいちょうは いかがですか。",
            english: "Good morning. How are you feeling?",
          },
          {
            japanese: "なにか おてつだい しましょうか。",
            reading: "なにか おてつだい しましょうか。",
            english: "Can I help you with something?",
          },
        ],
        quiz: [
          {
            id: "kaigo-1-q1",
            type: "multiple-choice",
            question: "How do you ask 'How are you feeling?' politely?",
            options: [
              "たいちょうは いかがですか",
              "げんきですか",
              "だいじょうぶですか",
              "おなかは すきましたか",
            ],
            correctAnswer: "たいちょうは いかがですか",
            explanation: "体調はいかがですか is a polite way to ask about someone's condition in a care setting.",
          },
          {
            id: "kaigo-1-q2",
            type: "kanji-reading",
            question: "介護士",
            options: ["かいごし", "かんごし", "いごし", "かいごじ"],
            correctAnswer: "かいごし",
            explanation: "介護士 (かいごし) means 'care worker'.",
          },
          {
            id: "kaigo-1-q3",
            type: "fill-in-blank",
            question: "お茶を ___か。(Shall I make tea?)",
            options: ["いれましょう", "いれます", "いれました", "いれません"],
            correctAnswer: "いれましょう",
            explanation: "〜ましょうか is used to offer to do something.",
          },
        ],
      },
      ...Array.from({ length: 5 }, (_, i) => ({
        id: `kaigo-${i + 2}`,
        title: [
          "Bathing Assistance",
          "Meal Assistance",
          "Transfer & Mobility",
          "Recording & Reporting",
          "Emergency Response",
        ][i],
        titleJa: [
          "入浴介助",
          "食事介助",
          "移乗と移動",
          "記録と報告",
          "緊急時の対応",
        ][i],
        order: i + 2,
        xpReward: 55,
        grammar: [
          {
            pattern: ["〜てもいいですか", "〜ながら", "〜ように", "〜について", "〜なければなりません"][i],
            explanation: "Nursing care grammar point.",
            examples: ["Example 1.", "Example 2."],
          },
        ],
        vocabulary: [
          { word: ["入浴", "食事", "車椅子", "記録", "緊急"][i], reading: ["にゅうよく", "しょくじ", "くるまいす", "きろく", "きんきゅう"][i], meaning: ["bathing", "meal", "wheelchair", "record", "emergency"][i] },
        ],
        examples: [
          {
            japanese: "かいごの にほんご れんしゅうです。",
            reading: "かいごの にほんご れんしゅうです。",
            english: "This is nursing care Japanese practice.",
          },
        ],
        quiz: [
          {
            id: `kaigo-${i + 2}-q1`,
            type: "multiple-choice" as QuizType,
            question: "Nursing care practice question.",
            options: ["A", "B", "C", "D"],
            correctAnswer: "A",
            explanation: "Explanation.",
          },
        ],
      })),
    ],
  },
  {
    id: "business",
    slug: "business",
    titleKey: "business",
    descriptionEn: "Business Japanese",
    icon: "Briefcase",
    color: "navy",
    lessonsCount: 5,
    lessons: [
      {
        id: "biz-1",
        title: "Business Greetings",
        titleJa: "ビジネス挨拶",
        order: 1,
        xpReward: 55,
        grammar: [
          {
            pattern: "〜と申します",
            explanation: "Humble form of self-introduction. 'My name is ~' (formal).",
            examples: [
              "田中と もうします。(My name is Tanaka.)",
              "メディフローの 田中と もうします。(I'm Tanaka from Mediflow.)",
            ],
          },
        ],
        vocabulary: [
          { word: "会社", reading: "かいしゃ", meaning: "company" },
          { word: "名刺", reading: "めいし", meaning: "business card" },
          { word: "部長", reading: "ぶちょう", meaning: "department manager" },
          { word: "失礼", reading: "しつれい", meaning: "rudeness / excuse me" },
          { word: "承知", reading: "しょうち", meaning: "understood / acknowledged" },
        ],
        examples: [
          {
            japanese: "はじめまして。田中と もうします。",
            reading: "はじめまして。たなかと もうします。",
            english: "Nice to meet you. My name is Tanaka.",
          },
          {
            japanese: "めいしを ちょうだいできますか。",
            reading: "めいしを ちょうだいできますか。",
            english: "May I have your business card?",
          },
        ],
        quiz: [
          {
            id: "biz-1-q1",
            type: "multiple-choice",
            question: "Which is the most formal way to introduce yourself?",
            options: [
              "田中と もうします",
              "田中です",
              "田中と いいます",
              "田中だよ",
            ],
            correctAnswer: "田中と もうします",
            explanation: "〜と申します is the humble (keigo) form used in business settings.",
          },
          {
            id: "biz-1-q2",
            type: "kanji-reading",
            question: "名刺",
            options: ["めいし", "なし", "めいさつ", "なふだ"],
            correctAnswer: "めいし",
            explanation: "名刺 (めいし) means 'business card'.",
          },
          {
            id: "biz-1-q3",
            type: "fill-in-blank",
            question: "メディフローの 田中と ___。(I'm Tanaka from Mediflow.)",
            options: ["もうします", "いいます", "おもいます", "はなします"],
            correctAnswer: "もうします",
            explanation: "と申します is humble speech for introducing yourself.",
          },
        ],
      },
      ...Array.from({ length: 4 }, (_, i) => ({
        id: `biz-${i + 2}`,
        title: ["Phone Etiquette", "Email Writing", "Meeting Participation", "Business Keigo"][i],
        titleJa: ["電話対応", "メールの書き方", "会議参加", "ビジネス敬語"][i],
        order: i + 2,
        xpReward: 55,
        grammar: [
          {
            pattern: ["〜でございます", "〜いたします", "〜させていただきます", "お〜になる"][i],
            explanation: "Business Japanese grammar.",
            examples: ["Example 1.", "Example 2."],
          },
        ],
        vocabulary: [
          { word: ["電話", "件名", "議題", "敬語"][i], reading: ["でんわ", "けんめい", "ぎだい", "けいご"][i], meaning: ["telephone", "subject line", "agenda", "polite language"][i] },
        ],
        examples: [
          {
            japanese: "ビジネスの にほんご れんしゅうです。",
            reading: "びじねすの にほんご れんしゅうです。",
            english: "This is business Japanese practice.",
          },
        ],
        quiz: [
          {
            id: `biz-${i + 2}-q1`,
            type: "multiple-choice" as QuizType,
            question: "Business Japanese practice question.",
            options: ["A", "B", "C", "D"],
            correctAnswer: "A",
            explanation: "Explanation.",
          },
        ],
      })),
    ],
  },
  {
    id: "daily-life",
    slug: "daily-life",
    titleKey: "dailyLife",
    descriptionEn: "Daily Life Japanese",
    icon: "Coffee",
    color: "gold",
    lessonsCount: 7,
    lessons: [
      {
        id: "daily-1",
        title: "At the Supermarket",
        titleJa: "スーパーで",
        order: 1,
        xpReward: 45,
        grammar: [
          {
            pattern: "〜はどこですか",
            explanation: "Asking where something is. 'Where is ~?'",
            examples: [
              "トイレはどこですか。(Where is the bathroom?)",
              "おにくは どこですか。(Where is the meat?)",
            ],
          },
        ],
        vocabulary: [
          { word: "野菜", reading: "やさい", meaning: "vegetables" },
          { word: "肉", reading: "にく", meaning: "meat" },
          { word: "魚", reading: "さかな", meaning: "fish" },
          { word: "果物", reading: "くだもの", meaning: "fruit" },
          { word: "袋", reading: "ふくろ", meaning: "bag" },
        ],
        examples: [
          {
            japanese: "すみません、やさいは どこですか。",
            reading: "すみません、やさいは どこですか。",
            english: "Excuse me, where are the vegetables?",
          },
          {
            japanese: "ふくろは いりますか。",
            reading: "ふくろは いりますか。",
            english: "Do you need a bag?",
          },
        ],
        quiz: [
          {
            id: "daily-1-q1",
            type: "multiple-choice",
            question: "How do you ask where the vegetables are?",
            options: [
              "やさいは どこですか",
              "やさいは なんですか",
              "やさいを ください",
              "やさいが すきです",
            ],
            correctAnswer: "やさいは どこですか",
            explanation: "〜はどこですか is the pattern for asking locations.",
          },
          {
            id: "daily-1-q2",
            type: "kanji-reading",
            question: "野菜",
            options: ["やさい", "のさい", "やな", "のな"],
            correctAnswer: "やさい",
            explanation: "野菜 (やさい) means 'vegetables'.",
          },
          {
            id: "daily-1-q3",
            type: "fill-in-blank",
            question: "___は いりますか。(Do you need a bag?)",
            options: ["ふくろ", "さいふ", "かばん", "はこ"],
            correctAnswer: "ふくろ",
            explanation: "袋 (ふくろ) means 'bag' - commonly asked at Japanese stores.",
          },
        ],
      },
      ...Array.from({ length: 6 }, (_, i) => ({
        id: `daily-${i + 2}`,
        title: [
          "At the Restaurant",
          "Using Transportation",
          "At the Hospital",
          "At the Post Office",
          "Talking to Neighbors",
          "On the Phone",
        ][i],
        titleJa: [
          "レストランで",
          "交通機関の利用",
          "病院で",
          "郵便局で",
          "近所の人と話す",
          "電話で",
        ][i],
        order: i + 2,
        xpReward: 45,
        grammar: [
          {
            pattern: ["〜をください", "〜に乗る", "〜が痛い", "〜を送りたい", "〜ですね", "〜と伝えてください"][i],
            explanation: "Daily life grammar point.",
            examples: ["Example 1.", "Example 2."],
          },
        ],
        vocabulary: [
          { word: ["注文", "切符", "薬", "荷物", "天気", "伝言"][i], reading: ["ちゅうもん", "きっぷ", "くすり", "にもつ", "てんき", "でんごん"][i], meaning: ["order", "ticket", "medicine", "luggage", "weather", "message"][i] },
        ],
        examples: [
          {
            japanese: "にちじょうの にほんご れんしゅうです。",
            reading: "にちじょうの にほんご れんしゅうです。",
            english: "This is daily life Japanese practice.",
          },
        ],
        quiz: [
          {
            id: `daily-${i + 2}-q1`,
            type: "multiple-choice" as QuizType,
            question: "Daily life practice question.",
            options: ["A", "B", "C", "D"],
            correctAnswer: "A",
            explanation: "Explanation.",
          },
        ],
      })),
    ],
  },
];

export function getCourseBySlug(slug: string): Course | undefined {
  return courses.find((c) => c.slug === slug);
}

export function getLessonById(courseSlug: string, lessonId: string): Lesson | undefined {
  const course = getCourseBySlug(courseSlug);
  return course?.lessons.find((l) => l.id === lessonId);
}
