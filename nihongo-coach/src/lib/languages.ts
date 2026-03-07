import type { UILanguage } from './types';

export interface LanguageConfig {
  name: string;
  flag: string;
  catchphrase: string;
  helpButton: string;
  placeholder: string;
  speechLang: string;
}

export const LANGUAGES: Record<UILanguage, LanguageConfig> = {
  vi: {
    name: 'Ti\u1ebfng Vi\u1ec7t',
    flag: '\ud83c\uddfb\ud83c\uddf3',
    catchphrase: 'B\u1ea1n g\u1eb7p kh\u00f3 kh\u0103n g\u00ec h\u00f4m nay? H\u00e3y n\u00f3i cho t\u00f4i bi\u1ebft!',
    helpButton: 'Gi\u00fap t\u00f4i!',
    placeholder: 'Nh\u1eadp v\u1ea5n \u0111\u1ec1 c\u1ee7a b\u1ea1n...\nV\u00ed d\u1ee5: T\u00f4i b\u1ecb \u0111au \u0111\u1ea7u nh\u01b0ng kh\u00f4ng bi\u1ebft n\u00f3i g\u00ec \u1edf b\u1ec7nh vi\u1ec7n',
    speechLang: 'ja-JP',
  },
  en: {
    name: 'English',
    flag: '\ud83c\uddec\ud83c\udde7',
    catchphrase: "What's troubling you today? Tell me!",
    helpButton: 'Help me!',
    placeholder: "Describe your problem...\nExample: I don't know how to tell the doctor I have a headache",
    speechLang: 'ja-JP',
  },
  tl: {
    name: 'Filipino',
    flag: '\ud83c\uddf5\ud83c\udded',
    catchphrase: 'Ano ang problema mo ngayon? Sabihin mo sa akin!',
    helpButton: 'Tulungan ako!',
    placeholder: 'Ilarawan ang iyong problema...',
    speechLang: 'ja-JP',
  },
  id: {
    name: 'Bahasa',
    flag: '\ud83c\uddee\ud83c\udde9',
    catchphrase: 'Apa masalahmu hari ini? Ceritakan padaku!',
    helpButton: 'Tolong saya!',
    placeholder: 'Ceritakan masalahmu...',
    speechLang: 'ja-JP',
  },
  my: {
    name: '\u1019\u103c\u1014\u103a\u1019\u102c',
    flag: '\ud83c\uddf2\ud83c\uddf2',
    catchphrase: '\u1012\u102e\u1014\u1031\u1037 \u1018\u102c\u1021\u1001\u1000\u103a\u1021\u1001\u1032\u101b\u103e\u102d\u101c\u1032? \u1015\u103c\u1031\u102c\u1015\u103c\u1015\u102b!',
    helpButton: '\u1000\u1030\u100a\u103a\u100a\u100a\u103a\u1015\u1031\u102c\u1015\u102b!',
    placeholder: '\u101e\u1004\u103a\u1000\u1032\u101b\u103e\u102d\u101c\u103b\u102c\u1038\u101e\u102d\u102f \u1016\u103c\u1031\u102c\u1016\u100a\u103a\u1015\u103c\u1015\u102b...',
    speechLang: 'ja-JP',
  },
  ja: {
    name: '\u65e5\u672c\u8a9e',
    flag: '\ud83c\uddef\ud83c\uddf5',
    catchphrase: '\u4eca\u65e5\u3001\u4f55\u306b\u56f0\u3063\u3066\u3044\u307e\u3059\u304b\uff1f\u6559\u3048\u3066\u304f\u3060\u3055\u3044\uff01',
    helpButton: '\u52a9\u3051\u3066\uff01',
    placeholder: '\u56f0\u308a\u3054\u3068\u3092\u5165\u529b\u3057\u3066\u304f\u3060\u3055\u3044...',
    speechLang: 'ja-JP',
  },
};

export const LANGUAGE_ORDER: UILanguage[] = ['vi', 'en', 'tl', 'id', 'my', 'ja'];
