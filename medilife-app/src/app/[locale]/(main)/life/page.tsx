'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';

const C = {
  blue: '#0A5FFF', blueFaint: '#EEF4FF',
  ink: '#1D1D1F', ink2: '#3A3A3C', ink3: '#636366', ink4: '#8E8E93', ink5: '#AEAEB2',
  line: '#E5E5EA', lineFaint: '#F2F2F7', surface: '#FFFFFF', bg: '#F5F5F7',
};

// SVGアイコンコンポーネント
function SvgIcon({ size = 24, color = 'currentColor', children }: { size?: number; color?: string; children: React.ReactNode }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      {children}
    </svg>
  );
}

function IconHome({ size = 24, color = 'currentColor' }: { size?: number; color?: string }) {
  return (
    <SvgIcon size={size} color={color}>
      <path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5z" />
      <polyline points="9 21 9 12 15 12 15 21" />
    </SvgIcon>
  );
}

function IconUniversity({ size = 24, color = 'currentColor' }: { size?: number; color?: string }) {
  return (
    <SvgIcon size={size} color={color}>
      <circle cx="12" cy="10" r="1" />
      <path d="M22 20V8h-4l-6-4-6 4H2v12" />
      <path d="M6 20v-6" />
      <path d="M18 20v-6" />
      <path d="M2 20h20" />
    </SvgIcon>
  );
}

function IconTrain({ size = 24, color = 'currentColor' }: { size?: number; color?: string }) {
  return (
    <SvgIcon size={size} color={color}>
      <rect width="16" height="16" x="4" y="3" rx="2" />
      <path d="M4 11h16" />
      <path d="M12 3v8" />
      <path d="m8 19-2 3" />
      <path d="m18 22-2-3" />
    </SvgIcon>
  );
}

function IconCalculator({ size = 24, color = 'currentColor' }: { size?: number; color?: string }) {
  return (
    <SvgIcon size={size} color={color}>
      <rect width="16" height="20" x="4" y="2" rx="2" />
      <line x1="8" x2="16" y1="6" y2="6" />
      <line x1="16" x2="16" y1="14" y2="18" />
      <path d="M8 10h.01" />
      <path d="M12 10h.01" />
      <path d="M16 10h.01" />
      <path d="M8 14h.01" />
      <path d="M12 14h.01" />
    </SvgIcon>
  );
}

function IconTrash2({ size = 24, color = 'currentColor' }: { size?: number; color?: string }) {
  return (
    <SvgIcon size={size} color={color}>
      <path d="M3 6h18" />
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
    </SvgIcon>
  );
}

function IconAlert({ size = 24, color = 'currentColor' }: { size?: number; color?: string }) {
  return (
    <SvgIcon size={size} color={color}>
      <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
      <path d="M12 9v4" />
      <path d="M12 17h.01" />
    </SvgIcon>
  );
}

function IconShoppingCart({ size = 24, color = 'currentColor' }: { size?: number; color?: string }) {
  return (
    <SvgIcon size={size} color={color}>
      <circle cx="8" cy="21" r="1" />
      <circle cx="19" cy="21" r="1" />
      <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
    </SvgIcon>
  );
}

function IconSmartphone({ size = 24, color = 'currentColor' }: { size?: number; color?: string }) {
  return (
    <SvgIcon size={size} color={color}>
      <rect width="14" height="20" x="5" y="2" rx="2" />
      <path d="M12 18h.01" />
    </SvgIcon>
  );
}

function IconBaby({ size = 24, color = 'currentColor' }: { size?: number; color?: string }) {
  return (
    <SvgIcon size={size} color={color}>
      <path d="M9 12h.01" />
      <path d="M15 12h.01" />
      <path d="M10 16c.5.3 1.2.5 2 .5s1.5-.2 2-.5" />
      <path d="M19 6.3a9 9 0 0 1 1.8 3.9 2 2 0 0 1 0 3.6 9 9 0 0 1-17.6 0 2 2 0 0 1 0-3.6A9 9 0 0 1 12 3c2 0 3.5 1.1 3.5 2.5s-.9 2.5-2 2.5c-.8 0-1.5-.4-1.5-1" />
    </SvgIcon>
  );
}

function IconScale({ size = 24, color = 'currentColor' }: { size?: number; color?: string }) {
  return (
    <SvgIcon size={size} color={color}>
      <path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z" />
      <path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z" />
      <path d="M7 21h10" />
      <path d="M12 3v18" />
      <path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2" />
    </SvgIcon>
  );
}

function IconHeart({ size = 24, color = 'currentColor' }: { size?: number; color?: string }) {
  return (
    <SvgIcon size={size} color={color}>
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    </SvgIcon>
  );
}

function IconUtensils({ size = 24, color = 'currentColor' }: { size?: number; color?: string }) {
  return (
    <SvgIcon size={size} color={color}>
      <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2" />
      <path d="M7 2v20" />
      <path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7" />
    </SvgIcon>
  );
}

function IconStethoscope({ size = 24, color = 'currentColor' }: { size?: number; color?: string }) {
  return (
    <SvgIcon size={size} color={color}>
      <path d="M4.8 2.3A.3.3 0 1 0 5 2H4a2 2 0 0 0-2 2v5a6 6 0 0 0 6 6a6 6 0 0 0 6-6V4a2 2 0 0 0-2-2h-1a.2.2 0 1 0 .3.3" />
      <path d="M8 15v1a6 6 0 0 0 6 6a6 6 0 0 0 6-6v-4" />
      <circle cx="20" cy="10" r="2" />
    </SvgIcon>
  );
}

function IconGraduationCap({ size = 24, color = 'currentColor' }: { size?: number; color?: string }) {
  return (
    <SvgIcon size={size} color={color}>
      <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
      <path d="M6 12v5c3 3 9 3 12 0v-5" />
    </SvgIcon>
  );
}

function IconBanknote({ size = 24, color = 'currentColor' }: { size?: number; color?: string }) {
  return (
    <SvgIcon size={size} color={color}>
      <rect width="20" height="12" x="2" y="6" rx="2" />
      <circle cx="12" cy="12" r="2" />
      <path d="M6 12h.01M18 12h.01" />
    </SvgIcon>
  );
}

function IconSearch({ size = 24, color = 'currentColor' }: { size?: number; color?: string }) {
  return (
    <SvgIcon size={size} color={color}>
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.35-4.35" />
    </SvgIcon>
  );
}

type CategoryItem = {
  label: string;
  color: string;
  bgColor: string;
  href: string;
  icon: React.FC<{ size?: number; color?: string }>;
};

export default function LifeGuidePage() {
  const params = useParams();
  const locale = params.locale as string;
  const [searchQuery, setSearchQuery] = useState('');

  const categories: CategoryItem[] = [
    { label: '住居', color: '#1D6ADE', bgColor: '#EEF4FF', href: `/${locale}/life/housing`, icon: IconHome },
    { label: '行政手続', color: '#7B2FBE', bgColor: '#F3EEFF', href: `/${locale}/life/legal_rights`, icon: IconUniversity },
    { label: '交通', color: '#0891B2', bgColor: '#E0F5FB', href: `/${locale}/life/transport`, icon: IconTrain },
    { label: '税金・年金', color: '#B45309', bgColor: '#FEF3C7', href: `/${locale}/life/tax_pension`, icon: IconCalculator },
    { label: 'ゴミ出し', color: '#059669', bgColor: '#D1FAE5', href: `/${locale}/life/garbage`, icon: IconTrash2 },
    { label: '緊急対応', color: '#DC2626', bgColor: '#FEE2E2', href: `/${locale}/life/emergency`, icon: IconAlert },
    { label: '買い物', color: '#D97706', bgColor: '#FEF3C7', href: `/${locale}/life/shopping`, icon: IconShoppingCart },
    { label: '通信', color: '#4F46E5', bgColor: '#EEF2FF', href: `/${locale}/life/communication`, icon: IconSmartphone },
    { label: '育児', color: '#DB2777', bgColor: '#FCE7F3', href: `/${locale}/life/childcare`, icon: IconBaby },
    { label: '法律・権利', color: '#374151', bgColor: '#F3F4F6', href: `/${locale}/life/legal_rights`, icon: IconScale },
    { label: '文化・慣習', color: '#E11D48', bgColor: '#FFF1F2', href: `/${locale}/life/culture`, icon: IconHeart },
    { label: '食事', color: '#65A30D', bgColor: '#F7FEE7', href: `/${locale}/life/food`, icon: IconUtensils },
    { label: '医療', color: '#DC2626', bgColor: '#FEE2E2', href: `/${locale}/life/healthcare`, icon: IconStethoscope },
    { label: '教育', color: '#1D6ADE', bgColor: '#EEF4FF', href: `/${locale}/life/work`, icon: IconGraduationCap },
    { label: '銀行', color: '#059669', bgColor: '#D1FAE5', href: `/${locale}/life/banking`, icon: IconBanknote },
  ];

  const filtered = searchQuery
    ? categories.filter((c) => c.label.includes(searchQuery))
    : categories;

  return (
    <div style={{ backgroundColor: C.bg, minHeight: '100vh', paddingBottom: 100 }}>
      <div style={{ padding: '24px 16px 0' }}>
        {/* ページヘッダー */}
        <div style={{ marginBottom: 20 }}>
          <p style={{ fontSize: 9.5, fontFamily: 'Montserrat, sans-serif', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: C.ink5, marginBottom: 4 }}>
            mediflow
          </p>
          <h1 style={{ fontSize: 24, fontWeight: 700, color: C.ink, margin: 0, lineHeight: 1.2 }}>
            生活ガイド
          </h1>
          <p style={{ fontSize: 13, color: C.ink4, marginTop: 4, marginBottom: 0 }}>
            日本生活のすべてがここに
          </p>
        </div>

        {/* 検索バー */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          backgroundColor: C.surface,
          borderRadius: 16,
          padding: '13px 16px',
          marginBottom: 20,
          boxShadow: '0 2px 12px rgba(0,0,0,0.05), 0 0 0 0.5px rgba(0,0,0,0.04)',
        }}>
          <IconSearch size={16} color={C.ink5} />
          <input
            type="text"
            placeholder="カテゴリを検索..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              flex: 1,
              border: 'none',
              outline: 'none',
              fontSize: 15,
              color: C.ink,
              backgroundColor: 'transparent',
            }}
          />
        </div>

        {/* カテゴリグリッド */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 10,
        }}>
          {filtered.map((cat) => {
            const Icon = cat.icon;
            return (
              <Link
                key={cat.label}
                href={cat.href}
                style={{ textDecoration: 'none' }}
              >
                <div style={{
                  backgroundColor: C.surface,
                  borderRadius: 18,
                  padding: '16px 8px 14px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 8,
                  boxShadow: '0 2px 10px rgba(0,0,0,0.05), 0 0 0 0.5px rgba(0,0,0,0.04)',
                }}>
                  <div style={{
                    width: 50,
                    height: 50,
                    borderRadius: 15,
                    backgroundColor: cat.bgColor,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}>
                    <Icon size={24} color={cat.color} />
                  </div>
                  <span style={{
                    fontSize: 11,
                    fontWeight: 500,
                    color: C.ink2,
                    textAlign: 'center',
                    lineHeight: 1.3,
                  }}>
                    {cat.label}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
