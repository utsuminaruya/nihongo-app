export const APP_NAME = 'MediLife';
export const APP_DESCRIPTION = '外国人労働者の日本生活をワンストップで支えるスーパーアプリ';

export const LOCALES = ['ja', 'vi', 'en', 'zh', 'id', 'tl', 'my'] as const;
export type Locale = (typeof LOCALES)[number];

export const LOCALE_NAMES: Record<Locale, string> = {
  ja: '日本語',
  vi: 'Tiếng Việt',
  en: 'English',
  zh: '中文',
  id: 'Bahasa Indonesia',
  tl: 'Tagalog',
  my: 'မြန်မာဘာသာ',
};

export const LOCALE_FLAGS: Record<Locale, string> = {
  ja: '🇯🇵',
  vi: '🇻🇳',
  en: '🇺🇸',
  zh: '🇨🇳',
  id: '🇮🇩',
  tl: '🇵🇭',
  my: '🇲🇲',
};

export const DEFAULT_LOCALE: Locale = 'ja';

export const COLORS = {
  primary: '#2563EB',
  secondary: '#10B981',
  accent: '#F59E0B',
  danger: '#EF4444',
  background: '#F8FAFC',
  card: '#FFFFFF',
  text: '#1E293B',
  textLight: '#64748B',
} as const;

export const EMERGENCY_CONTACTS = {
  police: '110',
  ambulance: '119',
  fire: '119',
  yorisoi: '0120-279-338',
} as const;

export const MEDIFLOW_LINES = {
  caregiverEmployer: 'https://lin.ee/R3ytJln',
  foreignWorker: 'https://lin.ee/xUocVyI',
} as const;

export const SUBSCRIPTION_PLANS = {
  FREE: { price: 0, name: 'FREE' },
  PLUS: { price: 490, name: 'PLUS' },
  PRO: { price: 980, name: 'PRO' },
} as const;
