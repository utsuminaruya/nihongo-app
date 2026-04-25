'use client';

import { useParams } from 'next/navigation';

const C = {
  blue: '#0A5FFF', blueFaint: '#EEF4FF',
  green: '#30D158', greenDark: '#1A9E3F',
  amber: '#FF9F0A', purple: '#BF5AF2',
  ink: '#1D1D1F', ink2: '#3A3A3C', ink3: '#636366', ink4: '#8E8E93', ink5: '#AEAEB2',
  line: '#E5E5EA', lineFaint: '#F2F2F7', surface: '#FFFFFF', bg: '#F5F5F7', white: '#FFFFFF',
};

const cardShadow = '0 2px 14px rgba(0,0,0,0.05), 0 0 0 0.5px rgba(0,0,0,0.04)';

function SparklesIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={C.blue} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3z"/>
    </svg>
  );
}

function ChevronRightIcon({ color }: { color: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="9 18 15 12 9 6"/>
    </svg>
  );
}

const courses = [
  {
    title: 'JLPT N3 完全対策',
    desc: '文法・語彙・読解',
    percent: 68,
    done: 16,
    total: 24,
    color: C.blue,
    colorFaint: C.blueFaint,
  },
  {
    title: '介護専門日本語',
    desc: '現場で使う表現',
    percent: 40,
    done: 7,
    total: 18,
    color: C.green,
    colorFaint: '#E8F8ED',
  },
  {
    title: '国家試験対策 介護福祉士',
    desc: '試験合格を目指す',
    percent: 15,
    done: 5,
    total: 32,
    color: C.purple,
    colorFaint: '#F5EEFF',
  },
];

export default function LearnPage() {
  const params = useParams();
  // locale is available if needed for future i18n
  void params;

  return (
    <div
      style={{
        background: C.bg,
        minHeight: '100vh',
        paddingBottom: 100,
      }}
    >
      <div style={{ padding: '16px 18px', display: 'flex', flexDirection: 'column', gap: 24 }}>

        {/* ページヘッダー */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <span
            style={{
              fontFamily: 'Montserrat, sans-serif',
              fontSize: 9.5,
              fontWeight: 600,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: C.ink5,
            }}
          >
            mediflow
          </span>
          <h1
            style={{
              fontSize: 24,
              fontWeight: 700,
              color: C.ink,
              letterSpacing: '-0.6px',
              margin: 0,
              lineHeight: 1.15,
            }}
          >
            学習
          </h1>
          <p style={{ fontSize: 13, color: C.ink4, margin: 0, marginTop: 2 }}>
            スキルを磨いて未来を切り拓こう
          </p>
        </div>

        {/* ストリークバナー */}
        <div
          style={{
            background: 'linear-gradient(135deg, #5E17EB 0%, #9B5EF5 100%)',
            borderRadius: 22,
            padding: '18px 22px',
            boxShadow: '0 12px 32px rgba(94,23,235,0.28)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          {/* 左側 */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ fontSize: 40, lineHeight: 1 }}>🔥</span>
            <div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
                <span
                  style={{
                    fontFamily: 'Montserrat, sans-serif',
                    fontSize: 28,
                    fontWeight: 700,
                    color: C.white,
                    lineHeight: 1,
                  }}
                >
                  7
                </span>
                <span
                  style={{
                    fontSize: 12,
                    color: 'rgba(255,255,255,0.75)',
                    fontWeight: 500,
                  }}
                >
                  日連続学習中
                </span>
              </div>
            </div>
          </div>

          {/* 右側 */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 6 }}>
            <div style={{ display: 'flex', gap: 5, alignItems: 'center' }}>
              {Array.from({ length: 7 }).map((_, i) => (
                <div
                  key={i}
                  style={{
                    width: 7,
                    height: 7,
                    borderRadius: '50%',
                    background: C.white,
                  }}
                />
              ))}
            </div>
            <span
              style={{
                fontFamily: 'Montserrat, sans-serif',
                fontSize: 9,
                fontWeight: 600,
                letterSpacing: '0.08em',
                color: 'rgba(255,255,255,0.65)',
                textTransform: 'uppercase',
              }}
            >
              THIS WEEK
            </span>
          </div>
        </div>

        {/* 受講中のコース */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <span
            style={{
              fontFamily: 'Montserrat, sans-serif',
              fontSize: 9.5,
              fontWeight: 600,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: C.ink5,
            }}
          >
            受講中のコース
          </span>

          {courses.map((course, i) => (
            <div
              key={i}
              style={{
                background: C.white,
                borderRadius: 20,
                padding: 18,
                boxShadow: cardShadow,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
                {/* 進捗% バッジ */}
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 14,
                    background: course.colorFaint,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'Montserrat, sans-serif',
                      fontSize: 13,
                      fontWeight: 700,
                      color: course.color,
                      letterSpacing: '-0.3px',
                    }}
                  >
                    {course.percent}%
                  </span>
                </div>

                {/* テキスト + プログレス */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p
                    style={{
                      fontSize: 14,
                      fontWeight: 700,
                      color: C.ink,
                      margin: 0,
                      lineHeight: 1.25,
                    }}
                  >
                    {course.title}
                  </p>
                  <p
                    style={{
                      fontSize: 11.5,
                      color: C.ink4,
                      margin: '3px 0 10px',
                    }}
                  >
                    {course.desc}
                  </p>

                  {/* プログレスバー */}
                  <div
                    style={{
                      height: 4,
                      background: C.lineFaint,
                      borderRadius: 99,
                      overflow: 'hidden',
                      marginBottom: 10,
                    }}
                  >
                    <div
                      style={{
                        height: '100%',
                        width: `${course.percent}%`,
                        background: course.color,
                        borderRadius: 99,
                      }}
                    />
                  </div>

                  {/* フッター */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}
                  >
                    <span style={{ fontSize: 11.5, color: C.ink4 }}>
                      {course.done}/{course.total} レッスン完了
                    </span>
                    <button
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 2,
                        background: 'none',
                        border: 'none',
                        padding: 0,
                        cursor: 'pointer',
                        fontSize: 12,
                        fontWeight: 600,
                        color: course.color,
                      }}
                    >
                      続ける
                      <ChevronRightIcon color={course.color} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 今日のチャレンジ */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <span
            style={{
              fontFamily: 'Montserrat, sans-serif',
              fontSize: 9.5,
              fontWeight: 600,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: C.ink5,
            }}
          >
            今日のチャレンジ
          </span>

          <div
            style={{
              background: C.white,
              borderRadius: 20,
              padding: 18,
              boxShadow: cardShadow,
              display: 'flex',
              alignItems: 'center',
              gap: 14,
            }}
          >
            {/* アイコン */}
            <div
              style={{
                width: 50,
                height: 50,
                borderRadius: 16,
                background: C.blueFaint,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <SparklesIcon />
            </div>

            {/* テキスト */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <p
                style={{
                  fontSize: 14,
                  fontWeight: 700,
                  color: C.ink,
                  margin: 0,
                  lineHeight: 1.25,
                }}
              >
                10問クイズ
              </p>
              <p
                style={{
                  fontSize: 11.5,
                  color: C.ink4,
                  margin: '3px 0 0',
                }}
              >
                語彙 N3レベル — 本日未挑戦
              </p>
            </div>

            {/* 開始ボタン */}
            <button
              style={{
                background: C.blue,
                border: 'none',
                borderRadius: 22,
                padding: '8px 18px',
                fontSize: 13,
                fontWeight: 600,
                color: C.white,
                cursor: 'pointer',
                flexShrink: 0,
                letterSpacing: '-0.1px',
              }}
            >
              開始
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
