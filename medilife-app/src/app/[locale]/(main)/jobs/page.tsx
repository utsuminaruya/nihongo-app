'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';

const C = {
  blue: '#0A5FFF', blueFaint: '#EEF4FF',
  green: '#30D158', amber: '#FF9F0A', red: '#FF3B30', purple: '#BF5AF2',
  ink: '#1D1D1F', ink2: '#3A3A3C', ink3: '#636366', ink4: '#8E8E93', ink5: '#AEAEB2',
  line: '#E5E5EA', lineFaint: '#F2F2F7', surface: '#FFFFFF', bg: '#F5F5F7', white: '#FFFFFF',
};

function SearchIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={C.ink4} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8"/>
      <path d="m21 21-4.35-4.35"/>
    </svg>
  );
}

function SlidersHIcon({ color = C.white }: { color?: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="21" x2="14" y1="4" y2="4"/>
      <line x1="10" x2="3" y1="4" y2="4"/>
      <line x1="21" x2="12" y1="12" y2="12"/>
      <line x1="8" x2="3" y1="12" y2="12"/>
      <line x1="21" x2="16" y1="20" y2="20"/>
      <line x1="12" x2="3" y1="20" y2="20"/>
      <circle cx="12" cy="4" r="2"/>
      <circle cx="10" cy="12" r="2"/>
      <circle cx="14" cy="20" r="2"/>
    </svg>
  );
}

function MapPinIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={C.ink4} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z"/>
      <circle cx="12" cy="10" r="3"/>
    </svg>
  );
}

function HeartIcon({ filled }: { filled: boolean }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill={filled ? '#E11D48' : 'none'} stroke={filled ? '#E11D48' : C.ink5} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
    </svg>
  );
}

type JobItem = {
  id: string;
  title: string;
  location: string;
  salary: string;
  type: '介護' | '医療' | 'IT' | '飲食' | '製造';
  urgent: boolean;
  distance: string;
};

const jobs: JobItem[] = [
  { id: '1', title: '介護スタッフ（正社員）', location: '相模原市', salary: '月給 22〜26万円', type: '介護', urgent: true, distance: '2.3km' },
  { id: '2', title: '看護助手', location: '東京都町田市', salary: '時給 1,400円〜', type: '医療', urgent: false, distance: '8.1km' },
  { id: '3', title: 'グループホームスタッフ', location: '神奈川県厚木市', salary: '月給 20〜24万円', type: '介護', urgent: false, distance: '12km' },
  { id: '4', title: '病院受付（バイリンガル）', location: '東京都八王子市', salary: '時給 1,350円〜', type: '医療', urgent: true, distance: '15km' },
  { id: '5', title: 'ITエンジニア（特定技能）', location: '東京都港区', salary: '月給 35〜55万円', type: 'IT', urgent: false, distance: '5km' },
  { id: '6', title: '工場作業員', location: '神奈川県川崎市', salary: '時給 1,200円〜', type: '製造', urgent: true, distance: '3km' },
  { id: '7', title: 'ラーメン店スタッフ', location: '東京都新宿区', salary: '時給 1,150円〜', type: '飲食', urgent: true, distance: '1km' },
  { id: '8', title: 'デイサービスパート', location: '横浜市', salary: '時給 1,250円〜', type: '介護', urgent: false, distance: '4km' },
  { id: '9', title: '訪問介護スタッフ', location: '東京都世田谷区', salary: '時給 1,300円〜', type: '介護', urgent: false, distance: '6.5km' },
  { id: '10', title: '薬局スタッフ', location: '神奈川県横須賀市', salary: '時給 1,180円〜', type: '医療', urgent: false, distance: '18km' },
  { id: '11', title: 'システムエンジニア', location: '東京都渋谷区', salary: '月給 40〜60万円', type: 'IT', urgent: true, distance: '7km' },
  { id: '12', title: 'カフェスタッフ', location: '東京都品川区', salary: '時給 1,100円〜', type: '飲食', urgent: false, distance: '9km' },
];

const filterTabs = ['すべて', '介護', '医療', 'IT', '飲食', '製造'] as const;
type FilterTab = typeof filterTabs[number];

const typeColor: Record<string, string> = {
  '介護': C.blue,
  '医療': C.green,
  'IT': C.purple,
  '飲食': C.amber,
  '製造': C.ink3,
};

export default function JobsPage() {
  const params = useParams();
  const locale = (params?.locale as string) || 'ja';
  const [activeFilter, setActiveFilter] = useState<FilterTab>('すべて');
  const [searchText, setSearchText] = useState('');
  const [savedJobs, setSavedJobs] = useState<Set<string>>(new Set());

  void locale;

  const filteredJobs = jobs.filter((job) => {
    const matchType = activeFilter === 'すべて' || job.type === activeFilter;
    const matchSearch =
      searchText === '' ||
      job.title.includes(searchText) ||
      job.location.includes(searchText);
    return matchType && matchSearch;
  });

  const toggleSave = (id: string) => {
    setSavedJobs((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  return (
    <div style={{ backgroundColor: C.bg, minHeight: '100vh', paddingBottom: 100 }}>
      {/* Page Header */}
      <div style={{ padding: '52px 20px 20px' }}>
        <p style={{
          fontFamily: 'Montserrat, sans-serif',
          fontSize: 9.5,
          fontWeight: 600,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          color: C.ink5,
          margin: '0 0 6px',
        }}>
          mediflow
        </p>
        <h1 style={{ fontSize: 24, fontWeight: 700, color: C.ink, margin: '0 0 4px', lineHeight: 1.2 }}>
          求人検索
        </h1>
        <p style={{ fontSize: 13, color: C.ink4, margin: 0 }}>
          あなたに最適な仕事が見つかります
        </p>
      </div>

      {/* Search Bar */}
      <div style={{ padding: '0 20px 16px' }}>
        <div style={{
          display: 'flex',
          gap: 10,
          alignItems: 'center',
        }}>
          <div style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            backgroundColor: C.white,
            borderRadius: 14,
            padding: '0 14px',
            height: 44,
            boxShadow: '0 2px 12px rgba(0,0,0,0.05), 0 0 0 0.5px rgba(0,0,0,0.04)',
          }}>
            <SearchIcon />
            <input
              type="text"
              placeholder="職種・エリアで検索..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              style={{
                flex: 1,
                border: 'none',
                outline: 'none',
                fontSize: 14,
                color: C.ink,
                backgroundColor: 'transparent',
                fontFamily: 'inherit',
              }}
            />
          </div>
          <button
            style={{
              width: 34,
              height: 34,
              borderRadius: 11,
              backgroundColor: C.blue,
              border: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              flexShrink: 0,
              boxShadow: '0 2px 12px rgba(0,0,0,0.05), 0 0 0 0.5px rgba(0,0,0,0.04)',
            }}
          >
            <SlidersHIcon />
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div style={{ padding: '0 0 16px' }}>
        <div style={{
          display: 'flex',
          overflowX: 'auto',
          gap: 8,
          padding: '0 20px',
          scrollbarWidth: 'none',
          alignItems: 'center',
        }}>
          {filterTabs.map((tab) => {
            const isActive = activeFilter === tab;
            return (
              <button
                key={tab}
                onClick={() => setActiveFilter(tab)}
                style={{
                  flexShrink: 0,
                  height: 32,
                  padding: '0 14px',
                  borderRadius: 20,
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: 13,
                  fontWeight: isActive ? 600 : 400,
                  backgroundColor: isActive ? C.blue : C.white,
                  color: isActive ? C.white : C.ink3,
                  boxShadow: isActive
                    ? '0 2px 8px rgba(10,95,255,0.25)'
                    : '0 1px 4px rgba(0,0,0,0.06), 0 0 0 0.5px rgba(0,0,0,0.04)',
                  transition: 'all 0.18s ease',
                  fontFamily: 'inherit',
                }}
              >
                {tab}
              </button>
            );
          })}
          {/* Location pill */}
          <div style={{ flexShrink: 0, display: 'flex', alignItems: 'center', gap: 4, marginLeft: 4 }}>
            <span style={{ fontSize: 12, color: C.blue, whiteSpace: 'nowrap', fontWeight: 500 }}>
              📍 現在地周辺
            </span>
          </div>
        </div>
      </div>

      {/* Job Count */}
      <div style={{ padding: '0 20px 12px' }}>
        <p style={{ fontSize: 12, color: C.ink4, margin: 0 }}>
          <span style={{ color: C.ink, fontWeight: 600 }}>{filteredJobs.length}</span> 件の求人
        </p>
      </div>

      {/* Job Cards */}
      <div style={{ padding: '0 20px', display: 'flex', flexDirection: 'column', gap: 14 }}>
        {filteredJobs.map((job) => {
          const isSaved = savedJobs.has(job.id);
          return (
            <div
              key={job.id}
              style={{
                backgroundColor: C.white,
                borderRadius: 20,
                padding: 18,
                boxShadow: '0 2px 16px rgba(0,0,0,0.06), 0 0 0 0.5px rgba(0,0,0,0.04)',
              }}
            >
              {/* Top row: badges + title + heart */}
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginBottom: 10 }}>
                <div style={{ flex: 1 }}>
                  {/* Badges */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginBottom: 7 }}>
                    {job.urgent && (
                      <span style={{
                        fontSize: 10,
                        fontWeight: 700,
                        color: C.white,
                        backgroundColor: C.red,
                        borderRadius: 6,
                        padding: '2px 7px',
                        letterSpacing: '0.03em',
                      }}>
                        急募
                      </span>
                    )}
                    <span style={{
                      fontSize: 10,
                      fontWeight: 600,
                      color: C.white,
                      backgroundColor: typeColor[job.type] || C.blue,
                      borderRadius: 6,
                      padding: '2px 7px',
                    }}>
                      {job.type}
                    </span>
                  </div>
                  {/* Title */}
                  <p style={{ fontSize: 14, fontWeight: 700, color: C.ink, margin: 0, lineHeight: 1.3 }}>
                    {job.title}
                  </p>
                </div>
                {/* Heart button */}
                <button
                  onClick={() => toggleSave(job.id)}
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 11,
                    border: 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: isSaved ? '#FFF1F2' : C.lineFaint,
                    flexShrink: 0,
                    transition: 'background-color 0.18s ease',
                  }}
                >
                  <HeartIcon filled={isSaved} />
                </button>
              </div>

              {/* Location row */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: 10 }}>
                <MapPinIcon />
                <span style={{ fontSize: 12, color: C.ink3 }}>{job.location}</span>
                <span style={{ fontSize: 11, color: C.ink5, marginLeft: 4 }}>{job.distance}</span>
              </div>

              {/* Salary */}
              <p style={{
                fontFamily: 'Montserrat, sans-serif',
                fontSize: 14,
                fontWeight: 700,
                color: C.blue,
                margin: '0 0 14px',
              }}>
                {job.salary}
              </p>

              {/* Action buttons */}
              <div style={{ display: 'flex', gap: 8 }}>
                <button style={{
                  flex: 1,
                  height: 38,
                  borderRadius: 12,
                  border: `1.5px solid ${C.line}`,
                  backgroundColor: 'transparent',
                  color: C.ink2,
                  fontSize: 13,
                  fontWeight: 600,
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                  transition: 'background-color 0.15s ease',
                }}>
                  詳細を見る
                </button>
                <button style={{
                  flex: 1,
                  height: 38,
                  borderRadius: 12,
                  border: 'none',
                  backgroundColor: C.blue,
                  color: C.white,
                  fontSize: 13,
                  fontWeight: 600,
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                  boxShadow: '0 2px 8px rgba(10,95,255,0.28)',
                  transition: 'opacity 0.15s ease',
                }}>
                  応募する
                </button>
              </div>
            </div>
          );
        })}

        {filteredJobs.length === 0 && (
          <div style={{
            textAlign: 'center',
            padding: '60px 20px',
            color: C.ink4,
          }}>
            <p style={{ fontSize: 40, marginBottom: 12 }}>🔍</p>
            <p style={{ fontSize: 15, fontWeight: 600, color: C.ink3, marginBottom: 6 }}>
              求人が見つかりませんでした
            </p>
            <p style={{ fontSize: 13, color: C.ink4, margin: 0 }}>
              検索条件を変えてお試しください
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
