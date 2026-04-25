'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useVisaStore } from '@/stores/visaStore';
import { useUserStore } from '@/stores/userStore';

// ─── カラー定数 ────────────────────────────────────────────────────────────────
const C = {
  blue: '#0A5FFF', blueDark: '#003FCC', blueDeep: '#001A6E', blueLight: '#4D8FFF',
  blueFaint: '#EEF4FF', blueTint: '#D6E6FF',
  green: '#30D158', greenDark: '#1A9E3F',
  amber: '#FF9F0A', amberDark: '#C47000', red: '#FF3B30', purple: '#BF5AF2',
  ink: '#1D1D1F', ink2: '#3A3A3C', ink3: '#636366', ink4: '#8E8E93', ink5: '#AEAEB2',
  line: '#E5E5EA', lineFaint: '#F2F2F7', surface: '#FFFFFF', bg: '#F5F5F7',
};

// ─── SVGアイコン ───────────────────────────────────────────────────────────────
function IconShield({ size = 20, color = 'currentColor' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  );
}

function IconChevronRight({ size = 16, color = 'currentColor' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
      <polyline points="9 18 15 12 9 6" />
    </svg>
  );
}

function IconBell({ size = 20, color = 'currentColor' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
      <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
    </svg>
  );
}

function IconMessageCircle({ size = 26, color = 'currentColor' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  );
}

function IconGraduationCap({ size = 26, color = 'currentColor' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
      <path d="M6 12v5c3 3 9 3 12 0v-5" />
    </svg>
  );
}

function IconMapPin({ size = 26, color = 'currentColor' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function IconBriefcase({ size = 26, color = 'currentColor' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="7" width="20" height="14" rx="2" />
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </svg>
  );
}

function IconUniversity({ size = 22, color = 'currentColor' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="10" r="1" />
      <path d="M22 20V8h-4l-6-4-6 4H2v12" />
      <path d="M6 20v-6" />
      <path d="M18 20v-6" />
      <path d="M2 20h20" />
    </svg>
  );
}

function IconTrash2({ size = 22, color = 'currentColor' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 6h18" />
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
    </svg>
  );
}

function IconCreditCard({ size = 22, color = 'currentColor' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="14" x="2" y="5" rx="2" />
      <line x1="2" x2="22" y1="10" y2="10" />
    </svg>
  );
}

function IconStethoscope({ size = 22, color = 'currentColor' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M4.8 2.3A.3.3 0 1 0 5 2H4a2 2 0 0 0-2 2v5a6 6 0 0 0 6 6a6 6 0 0 0 6-6V4a2 2 0 0 0-2-2h-1a.2.2 0 1 0 .3.3" />
      <path d="M8 15v1a6 6 0 0 0 6 6a6 6 0 0 0 6-6v-4" />
      <circle cx="20" cy="10" r="2" />
    </svg>
  );
}

// ─── メインコンポーネント ──────────────────────────────────────────────────────
export default function HomePage() {
  const params = useParams();
  const locale = (params.locale as string) || 'ja';

  const { daysRemaining } = useVisaStore();
  const { name } = useUserStore();

  const days = daysRemaining ?? 127;
  const totalDays = 365;
  const elapsed = totalDays - days;
  const progressPct = Math.round((days / totalDays) * 100);

  const initial = name ? name.charAt(0).toUpperCase() : 'N';
  const displayName = name || 'Nguyen Van A';

  return (
    <>
      {/* パルスアニメーション */}
      <style>{`
        @keyframes pulse-dot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.55; transform: scale(0.8); }
        }
        .pulse-dot {
          animation: pulse-dot 1.8s ease-in-out infinite;
        }
      `}</style>

      {/* スクロールコンテナ */}
      <div style={{
        background: C.bg,
        minHeight: '100vh',
        overflowY: 'auto',
        paddingBottom: 112,
      }}>

        {/* ─── ヘッダー（sticky） ────────────────────────────────────────────── */}
        <div style={{
          position: 'sticky',
          top: 0,
          zIndex: 50,
          background: C.bg,
          padding: '52px 22px 14px',
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
        }}>
          {/* 左側 */}
          <div>
            <div style={{
              fontFamily: 'Montserrat, sans-serif',
              fontSize: 8.5,
              fontWeight: 700,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: C.ink5,
              marginBottom: 4,
            }}>
              mediflow LIFE OS
            </div>
            <div style={{
              fontSize: 24,
              fontWeight: 700,
              color: C.ink,
              lineHeight: 1.1,
              letterSpacing: '-0.3px',
            }}>
              おかえりなさい
            </div>
            <div style={{
              fontSize: 13,
              color: C.ink4,
              marginTop: 2,
            }}>
              {displayName}
            </div>
          </div>

          {/* 右側 */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            {/* ベルボタン */}
            <button style={{
              width: 40,
              height: 40,
              borderRadius: '50%',
              background: C.surface,
              border: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 2px 12px rgba(0,0,0,0.10)',
              cursor: 'pointer',
            }}>
              <IconBell size={18} color={C.ink3} />
            </button>

            {/* アバター */}
            <div style={{
              width: 40,
              height: 40,
              borderRadius: '50%',
              background: `linear-gradient(135deg, ${C.blueLight} 0%, ${C.blue} 100%)`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: 'Montserrat, sans-serif',
              fontSize: 15,
              fontWeight: 700,
              color: '#fff',
              letterSpacing: '0.02em',
            }}>
              {initial}
            </div>
          </div>
        </div>

        {/* ─── コンテンツ本体 ────────────────────────────────────────────────── */}
        <div style={{ padding: '8px 18px 0' }}>

          {/* ─── ビザステータスカード ─────────────────────────────────────────── */}
          <div style={{
            background: 'linear-gradient(145deg, #001A6E 0%, #003FCC 50%, #0A5FFF 100%)',
            borderRadius: 26,
            padding: '22px 24px 20px',
            boxShadow: '0 16px 48px rgba(0,26,110,0.5), 0 4px 12px rgba(10,95,255,0.3)',
            marginBottom: 24,
          }}>
            {/* 上段 */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <IconShield size={18} color="rgba(255,255,255,0.6)" />
                <span style={{
                  fontFamily: 'Montserrat, sans-serif',
                  fontSize: 10,
                  fontWeight: 700,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.55)',
                }}>
                  Visa Status
                </span>
              </div>
              <Link href={`/${locale}/visa`} style={{
                fontSize: 12,
                color: 'rgba(255,255,255,0.75)',
                background: 'rgba(255,255,255,0.1)',
                border: '1px solid rgba(255,255,255,0.18)',
                borderRadius: 20,
                padding: '4px 12px',
                textDecoration: 'none',
                backdropFilter: 'blur(8px)',
                display: 'flex',
                alignItems: 'center',
                gap: 3,
              }}>
                詳細
                <IconChevronRight size={11} color="rgba(255,255,255,0.75)" />
              </Link>
            </div>

            {/* 残り日数 */}
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8, marginBottom: 4 }}>
              <span style={{
                fontFamily: 'Montserrat, sans-serif',
                fontSize: 46,
                fontWeight: 800,
                color: '#fff',
                lineHeight: 1,
                letterSpacing: '-1px',
              }}>
                {days}
              </span>
              <span style={{
                fontSize: 15,
                color: 'rgba(255,255,255,0.7)',
                marginBottom: 6,
              }}>
                日残り
              </span>
            </div>

            {/* サブテキスト */}
            <div style={{
              fontSize: 12.5,
              color: 'rgba(255,255,255,0.55)',
              marginBottom: 16,
              letterSpacing: '0.01em',
            }}>
              特定技能 1号 — 2026年9月1日まで
            </div>

            {/* プログレスバー */}
            <div style={{
              height: 4,
              background: 'rgba(255,255,255,0.15)',
              borderRadius: 99,
              overflow: 'hidden',
              marginBottom: 8,
            }}>
              <div style={{
                height: '100%',
                width: `${progressPct}%`,
                background: 'linear-gradient(90deg, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0.9) 100%)',
                borderRadius: 99,
              }} />
            </div>

            {/* プログレス下テキスト */}
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
              <span style={{
                fontFamily: 'Montserrat, sans-serif',
                fontSize: 10,
                color: 'rgba(255,255,255,0.4)',
              }}>
                {progressPct}% 残り
              </span>
              <span style={{
                fontFamily: 'Montserrat, sans-serif',
                fontSize: 10,
                color: 'rgba(255,255,255,0.4)',
              }}>
                {elapsed}日経過
              </span>
            </div>

            {/* アラートバッジ */}
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 7,
              background: C.amber,
              borderRadius: 99,
              padding: '6px 13px',
            }}>
              <div className="pulse-dot" style={{
                width: 7,
                height: 7,
                borderRadius: '50%',
                background: '#fff',
                flexShrink: 0,
              }} />
              <span style={{
                fontSize: 11.5,
                fontWeight: 600,
                color: '#fff',
                letterSpacing: '0.01em',
              }}>
                準備を始めましょう
              </span>
            </div>
          </div>

          {/* ─── クイックアクション ───────────────────────────────────────────── */}
          <div style={{ marginBottom: 24 }}>
            <div style={{
              fontFamily: 'Montserrat, sans-serif',
              fontSize: 9.5,
              fontWeight: 700,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: C.ink5,
              marginBottom: 14,
            }}>
              クイックアクション
            </div>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: 12,
            }}>
              {/* AI相談 */}
              <Link href={`/${locale}/ask`} style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
                <div style={{
                  width: 64,
                  height: 64,
                  borderRadius: 20,
                  background: C.blueFaint,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <IconMessageCircle size={26} color={C.blue} />
                </div>
                <span style={{ fontSize: 10.5, fontWeight: 600, color: C.ink3, textAlign: 'center', lineHeight: 1.2 }}>
                  AI相談
                </span>
              </Link>

              {/* 学習 */}
              <Link href={`/${locale}/learn`} style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
                <div style={{
                  width: 64,
                  height: 64,
                  borderRadius: 20,
                  background: '#E8FAF0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <IconGraduationCap size={26} color={C.green} />
                </div>
                <span style={{ fontSize: 10.5, fontWeight: 600, color: C.ink3, textAlign: 'center', lineHeight: 1.2 }}>
                  学習
                </span>
              </Link>

              {/* ガイド */}
              <Link href={`/${locale}/life`} style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
                <div style={{
                  width: 64,
                  height: 64,
                  borderRadius: 20,
                  background: '#FFF4E6',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <IconMapPin size={26} color={C.amber} />
                </div>
                <span style={{ fontSize: 10.5, fontWeight: 600, color: C.ink3, textAlign: 'center', lineHeight: 1.2 }}>
                  ガイド
                </span>
              </Link>

              {/* 求人 */}
              <Link href={`/${locale}/jobs`} style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
                <div style={{
                  width: 64,
                  height: 64,
                  borderRadius: 20,
                  background: '#F2EEFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <IconBriefcase size={26} color={C.purple} />
                </div>
                <span style={{ fontSize: 10.5, fontWeight: 600, color: C.ink3, textAlign: 'center', lineHeight: 1.2 }}>
                  求人
                </span>
              </Link>
            </div>
          </div>

          {/* ─── 日本語学習進捗カード ─────────────────────────────────────────── */}
          <div style={{
            background: C.surface,
            borderRadius: 22,
            padding: '18px 20px',
            boxShadow: '0 2px 16px rgba(0,0,0,0.06)',
            marginBottom: 24,
          }}>
            {/* ヘッダー */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
              <span style={{ fontSize: 14, fontWeight: 700, color: C.ink }}>日本語学習</span>
              <span style={{
                fontSize: 10.5,
                fontWeight: 700,
                color: C.greenDark,
                background: '#E8FAF0',
                borderRadius: 99,
                padding: '3px 10px',
              }}>
                N3 目標
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
              {/* リングチャート */}
              <div style={{ flexShrink: 0 }}>
                <svg width="68" height="68" viewBox="0 0 68 68">
                  {/* 背景円 */}
                  <circle
                    cx="34" cy="34" r="28"
                    fill="none"
                    stroke={C.lineFaint}
                    strokeWidth="6"
                  />
                  {/* 進捗円 */}
                  <circle
                    cx="34" cy="34" r="28"
                    fill="none"
                    stroke={C.blue}
                    strokeWidth="6"
                    strokeLinecap="round"
                    strokeDasharray={`${2 * Math.PI * 28 * 0.68} ${2 * Math.PI * 28 * 0.32}`}
                    strokeDashoffset={2 * Math.PI * 28 * 0.25}
                    style={{ transform: 'rotate(-90deg)', transformOrigin: '34px 34px' }}
                  />
                  <text x="34" y="37" textAnchor="middle" fontSize="14" fontWeight="700" fill={C.ink} fontFamily="Montserrat, sans-serif">
                    68%
                  </text>
                </svg>
              </div>

              {/* 各スキル */}
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 10 }}>
                <ProgressBar label="語彙" value={80} color={C.blue} />
                <ProgressBar label="文法" value={55} color={C.green} />
                <ProgressBar label="読解" value={40} color={C.purple} />
              </div>
            </div>
          </div>

          {/* ─── おすすめ記事リスト ───────────────────────────────────────────── */}
          <div style={{
            background: C.surface,
            borderRadius: 22,
            boxShadow: '0 2px 16px rgba(0,0,0,0.06)',
            overflow: 'hidden',
            marginBottom: 24,
          }}>
            {/* ヘッダー */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '16px 20px 12px',
            }}>
              <span style={{ fontSize: 14, fontWeight: 700, color: C.ink }}>おすすめ記事</span>
              <Link href={`/${locale}/life`} style={{
                fontSize: 12,
                color: C.blue,
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: 2,
              }}>
                もっと見る
                <IconChevronRight size={13} color={C.blue} />
              </Link>
            </div>

            {/* 記事リスト */}
            <div>
              <ArticleRow
                href={`/${locale}/life/banking/open-bank-account`}
                icon={<IconCreditCard size={22} color={C.blue} />}
                iconBg={C.blueFaint}
                title="日本の銀行口座の開き方"
                category="BANKING"
                isLast={false}
              />
              <ArticleRow
                href={`/${locale}/life/garbage/garbage-sorting-rules`}
                icon={<IconTrash2 size={22} color={C.green} />}
                iconBg="#E8FAF0"
                title="ゴミの分別ルール"
                category="DAILY LIFE"
                isLast={false}
              />
              <ArticleRow
                href={`/${locale}/life/legal_rights/residence-card-update`}
                icon={<IconUniversity size={22} color={C.amber} />}
                iconBg="#FFF4E6"
                title="在留カードの更新手続き"
                category="LEGAL"
                isLast={false}
              />
              <ArticleRow
                href={`/${locale}/life/health/health-insurance`}
                icon={<IconStethoscope size={22} color={C.purple} />}
                iconBg="#F2EEFF"
                title="健康保険の加入と使い方"
                category="HEALTH"
                isLast={true}
              />
            </div>
          </div>

        </div>
      </div>
    </>
  );
}

// ─── サブコンポーネント ────────────────────────────────────────────────────────

function ProgressBar({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
        <span style={{ fontSize: 11.5, color: '#636366', fontWeight: 500 }}>{label}</span>
        <span style={{ fontSize: 11.5, color: '#636366', fontFamily: 'Montserrat, sans-serif', fontWeight: 600 }}>{value}%</span>
      </div>
      <div style={{
        height: 5,
        background: '#F2F2F7',
        borderRadius: 99,
        overflow: 'hidden',
      }}>
        <div style={{
          height: '100%',
          width: `${value}%`,
          background: color,
          borderRadius: 99,
          transition: 'width 0.6s ease',
        }} />
      </div>
    </div>
  );
}

function ArticleRow({
  href,
  icon,
  iconBg,
  title,
  category,
  isLast,
}: {
  href: string;
  icon: React.ReactNode;
  iconBg: string;
  title: string;
  category: string;
  isLast: boolean;
}) {
  return (
    <Link href={href} style={{ textDecoration: 'none', display: 'block' }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 14,
        padding: '12px 20px',
        borderBottom: isLast ? 'none' : `1px solid #F2F2F7`,
        background: 'transparent',
        transition: 'background 0.15s',
      }}>
        {/* アイコン枠 */}
        <div style={{
          width: 40,
          height: 40,
          borderRadius: 12,
          background: iconBg,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}>
          {icon}
        </div>

        {/* テキスト */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{
            fontSize: 13.5,
            fontWeight: 600,
            color: '#1D1D1F',
            letterSpacing: '-0.1px',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}>
            {title}
          </div>
          <div style={{
            fontFamily: 'Montserrat, sans-serif',
            fontSize: 9.5,
            fontWeight: 700,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: '#AEAEB2',
            marginTop: 2,
          }}>
            {category}
          </div>
        </div>

        {/* chevron */}
        <IconChevronRight size={14} color="#AEAEB2" />
      </div>
    </Link>
  );
}
