import type { CategoryKey, UILanguage } from './types';

export interface CategoryConfig {
  icon: string;
  japanese: string;
  labels: Record<UILanguage, string>;
  subcategories: Record<UILanguage, string[]>;
}

export const CATEGORIES: Record<CategoryKey, CategoryConfig> = {
  hospital: {
    icon: '\ud83c\udfe5',
    japanese: '\u75c5\u9662\u30fb\u85ac\u5c40',
    labels: {
      vi: 'B\u1ec7nh vi\u1ec7n',
      en: 'Hospital',
      tl: 'Ospital',
      id: 'Rumah Sakit',
      my: '\u1006\u103c\u1031\u1038\u1005\u1031\u102c',
      ja: '\u75c5\u9662\u30fb\u85ac\u5c40',
    },
    subcategories: {
      vi: ['\u0110au \u0111\u1ea7u', '\u0110\u1eb7t l\u1ecbch', 'Thu\u1ed1c', 'B\u1ea3o hi\u1ec3m'],
      en: ['Symptoms', 'Appointment', 'Medicine', 'Insurance'],
      tl: ['Sintomas', 'Tipan', 'Gamot', 'Seguro'],
      id: ['Gejala', 'Janji', 'Obat', 'Asuransi'],
      my: ['\u101c\u1000\u103a\u1031\u101b\u102c', '\u1001\u103e\u102d\u1014\u103a\u1038', '\u1006\u1031\u1038\u101d\u102b', '\u1021\u102d\u1019\u102a\u1001\u103b\u1031\u102b'],
      ja: ['\u75c7\u72b6\u3092\u4f1d\u3048\u308b', '\u4e88\u7d04', '\u85ac', '\u4fdd\u967a\u8a3c'],
    },
  },
  government: {
    icon: '\ud83c\udfe2',
    japanese: '\u5f79\u6240\u30fb\u624b\u7d9a\u304d',
    labels: {
      vi: 'Th\u1ee7 t\u1ee5c',
      en: 'Government',
      tl: 'Pamahalaan',
      id: 'Pemerintahan',
      my: '\u1021\u1005\u102d\u102f\u1021\u1019\u103a\u1021\u1015\u102d\u102f\u1004\u103a',
      ja: '\u5f79\u6240\u30fb\u624b\u7d9a\u304d',
    },
    subcategories: {
      vi: ['\u0110\u0103ng k\u00fd c\u01b0 tr\u00fa', 'Th\u1ebb c\u01b0 tr\u00fa', 'BHYT', 'Chuy\u1ec3n h\u1ed9 kh\u1ea9u'],
      en: ['Registration', 'Residence card', 'Health insurance', 'Address change'],
      tl: ['Rehistrasyon', 'ID kard', 'Insurance', 'Paglipat'],
      id: ['Pendaftaran', 'Kartu tinggal', 'Asuransi', 'Pindah alamat'],
      my: ['\u1019\u103e\u1010\u103a\u1015\u102f\u1036\u101e\u1031\u102c', '\u1014\u1031\u101b\u1015\u102d\u102f\u1019\u103a\u1021\u1001\u1032', '\u1021\u102d\u1019\u102a\u1001\u103b\u1031\u102b', '\u1014\u1031\u101b\u1015\u102d\u102f\u1014\u1032\u101c\u102c'],
      ja: ['\u4f4f\u6c11\u767b\u9332', '\u5728\u7559\u30ab\u30fc\u30c9', '\u5065\u5eb7\u4fdd\u967a', '\u8ee2\u5c45\u5c4a'],
    },
  },
  daily: {
    icon: '\ud83c\udfe0',
    japanese: '\u751f\u6d3b\u30fb\u4f4f\u5c45',
    labels: {
      vi: 'Cu\u1ed9c s\u1ed1ng',
      en: 'Daily Life',
      tl: 'Pang-araw-araw',
      id: 'Kehidupan',
      my: '\u1014\u1031\u1037\u1001\u103c\u1031\u1038\u1018\u101d\u1004\u103a',
      ja: '\u751f\u6d3b\u30fb\u4f4f\u5c45',
    },
    subcategories: {
      vi: ['\u0110i\u1ec7n ch\u1ee7 nh\u00e0', 'R\u00e1c th\u1ea3i', 'H\u00e0ng x\u00f3m', 'Mua s\u1eafm'],
      en: ['Landlord', 'Garbage rules', 'Neighbors', 'Shopping'],
      tl: ['Panginaupa', 'Basura', 'Kapitbahay', 'Pamimili'],
      id: ['Pemilik rumah', 'Aturan sampah', 'Tetangga', 'Belanja'],
      my: ['\u1014\u1031\u101b\u1029\u101b\u103e\u1004\u103a\u101e\u102d\u102f\u1037', '\u1021\u1015\u1005\u103a\u1015\u1031\u102b', '\u1021\u1010\u103a\u1014\u102c\u1038', '\u101e\u103c\u1031\u102c\u101e\u1031\u102c'],
      ja: ['\u5927\u5bb6\u306b\u9023\u7d61', '\u30b4\u30df\u51fa\u3057', '\u8fd1\u6240', '\u8cb7\u3044\u7269'],
    },
  },
  work: {
    icon: '\ud83d\udcbc',
    japanese: '\u4ed5\u4e8b\u30fb\u8077\u5834',
    labels: {
      vi: 'C\u00f4ng vi\u1ec7c',
      en: 'Work',
      tl: 'Trabaho',
      id: 'Pekerjaan',
      my: '\u1021\u101c\u102f\u1015\u103a\u1001\u103b\u1031\u102b',
      ja: '\u4ed5\u4e8b\u30fb\u8077\u5834',
    },
    subcategories: {
      vi: ['\u0110\u1ed5i ca', 'B\u00e1o c\u00e1o s\u1ebfc', 'Ngh\u1ec9 \u1ed1m', 'L\u01b0\u01a1ng'],
      en: ['Shift change', 'Report to boss', 'Sick leave', 'Payslip'],
      tl: ['Shift', 'Ulat sa boss', 'Sick leave', 'Sweldo'],
      id: ['Ganti shift', 'Laporan', 'Sakit', 'Gaji'],
      my: ['\u1006\u103c\u1031\u1038\u1021\u1005\u1015\u103a\u1021\u101c\u102a\u1038\u1019\u103e', '\u1021\u1005\u102d\u102f\u1021\u1019\u103a\u1016\u1031\u102c\u1006\u103c\u102c', '\u1014\u102c\u1019\u1000\u103b\u102c\u1038', '\u101c\u1005\u102c\u1001'],
      ja: ['\u30b7\u30d5\u30c8\u5909\u66f4', '\u4e0a\u53f8\u3078\u5831\u544a', '\u75c5\u6b20\u7533\u8acb', '\u7d66\u4e0e\u660e\u7d30'],
    },
  },
  care: {
    icon: '\ud83d\udc68\u200d\u2695\ufe0f',
    japanese: '\u4ecb\u8b77\u306e\u4ed5\u4e8b',
    labels: {
      vi: 'Ch\u0103m s\u00f3c',
      en: 'Care Work',
      tl: 'Pag-aalaga',
      id: 'Perawatan',
      my: '\u1021\u1015\u101b\u1014\u103a\u1015\u100a\u103a\u101e\u1031\u102c\u1021\u101c\u102f\u1015\u103a',
      ja: '\u4ecb\u8b77\u306e\u4ed5\u4e8b',
    },
    subcategories: {
      vi: ['\u0110\u1ed9ng vi\u00ean', 'Ghi ch\u00e9p', 'B\u00e0n giao', 'Kh\u1ea9n c\u1ea5p'],
      en: ['Encouragement', 'Records', 'Handover', 'Emergency'],
      tl: ['Paghikayat', 'Tala', 'Handover', 'Emergency'],
      id: ['Semangati', 'Catatan', 'Serah terima', 'Darurat'],
      my: ['\u101c\u103e\u1036\u101a\u102c\u1006\u102c\u1038\u101e\u1031\u102c', '\u1019\u103e\u1010\u103a\u1010\u1019\u103a', '\u101c\u103d\u1032\u1021\u1015\u103a', '\u1021\u101b\u1031\u1038\u1015\u1031\u102a'],
      ja: ['\u58f0\u304b\u3051', '\u8a18\u9332', '\u7533\u3057\u9001\u308a', '\u7dca\u6025\u6642'],
    },
  },
  phone: {
    icon: '\ud83d\udcf1',
    japanese: '\u96fb\u8a71\u30fb\u9023\u7d61',
    labels: {
      vi: 'Li\u00ean l\u1ea1c',
      en: 'Phone/Contact',
      tl: 'Komunikasyon',
      id: 'Komunikasi',
      my: '\u1006\u1031\u102c\u101e\u103e\u101c\u103a\u101e\u1031\u102c',
      ja: '\u96fb\u8a71\u30fb\u9023\u7d61',
    },
    subcategories: {
      vi: ['Ng\u1eafm \u0111i\u1ec7n tho\u1ea1i', 'B\u00e1o \u0111i mu\u1ed9n', '\u0110\u1eb7t h\u1eb9n', 'C\u1ea3m \u01a1n / xin l\u1ed7i'],
      en: ['Answer call', 'Late notice', 'Make appointment', 'Thank/Apologize'],
      tl: ['Sumagot ng tawag', 'Huli', 'Tipan', 'Pasalamat/Humingi ng tawad'],
      id: ['Angkat telepon', 'Terlambat', 'Buat janji', 'Terima kasih/Maaf'],
      my: ['\u1016\u102f\u1014\u103a\u1000\u102d\u102f\u1004\u103a\u1038', '\u1014\u1031\u1037\u1000\u103b\u102c\u1014\u1031\u1037', '\u1001\u103b\u102d\u1014\u103a\u1038\u1015\u1031\u102a\u1015\u1031\u102a\u101e\u1031\u102c', '\u1000\u103b\u1031\u1038\u101c\u1031\u102c\u1005\u1019\u103a\u1014\u102c\u1038'],
      ja: ['\u96fb\u8a71\u306e\u53d7\u3051\u65b9', '\u9045\u523b\u306e\u9023\u7d61', '\u4e88\u7d04\u306e\u96fb\u8a71', '\u304a\u793a\u30fb\u304a\u8a6b\u3073'],
    },
  },
  transport: {
    icon: '\ud83d\ude83',
    japanese: '\u4ea4\u901a\u30fb\u79fb\u52d5',
    labels: {
      vi: 'Giao th\u00f4ng',
      en: 'Transport',
      tl: 'Transportasyon',
      id: 'Transportasi',
      my: '\u101e\u1010\u100a\u103a\u101e\u102c\u101b\u102c\u1005\u1014\u103a\u1038',
      ja: '\u4ea4\u901a\u30fb\u79fb\u52d5',
    },
    subcategories: {
      vi: ['L\u1ea1c \u1edf ga', 'B\u1eaft xe bu\u00edt', 'Taxi', 'Th\u1ebb xe th\u00e1ng'],
      en: ['Lost at station', 'Taking bus', 'Taxi', 'Monthly pass'],
      tl: ['Naliligaw sa istasyon', 'Bus', 'Taxi', 'Monthly pass'],
      id: ['Nyasar di stasiun', 'Naik bus', 'Taksi', 'Tiket bulanan'],
      my: ['\u1018\u1000\u103a\u101b\u1033\u1001\u103d\u1031\u1002\u1015\u103a\u1001\u103c\u102c', '\u1018\u1005\u103a\u1005\u1015\u102b\u1010\u1001\u102d', '\u1000\u102a\u101e\u101a\u103a\u101c\u1031\u102c\u1001\u103a', '\u101c\u1005\u102c\u1001\u1031\u1037\u1021\u1015\u103a'],
      ja: ['\u99c5\u3067\u8ff7\u3063\u305f', '\u30d0\u30b9\u306b\u4e57\u308b', '\u30bf\u30af\u30b7\u30fc', '\u5b9a\u671f\u5238'],
    },
  },
  emergency: {
    icon: '\ud83c\udd98',
    japanese: '\u7dca\u6025',
    labels: {
      vi: 'Kh\u1ea9n c\u1ea5p',
      en: 'Emergency',
      tl: 'Emergency',
      id: 'Darurat',
      my: '\u1021\u101b\u1031\u1038\u1015\u1031\u102a',
      ja: '\u7dca\u6025',
    },
    subcategories: {
      vi: ['G\u1ecdi c\u1ea3nh s\u00e1t', 'G\u1ecdi c\u1ee9u th\u01b0\u01a1ng', 'Tai n\u1ea1n', 'M\u1ea5t \u0111\u1ed3'],
      en: ['Call police', 'Call ambulance', 'Accident', 'Lost wallet'],
      tl: ['Tumawag ng pulis', 'Ambulansya', 'Aksidente', 'Nawala ang pitaka'],
      id: ['Hubungi polisi', 'Panggil ambulans', 'Kecelakaan', 'Dompet hilang'],
      my: ['\u101b\u1032\u1010\u1015\u103a\u1000\u102d\u102f\u1004\u103a\u1038', '\u1021\u101b\u1031\u1038\u101e\u100e\u103a\u101e\u102c\u1014\u1031\u101b', '\u1021\u1001\u1039\u1001\u101b\u102c\u1038', '\u1021\u1015\u102d\u102f\u1000\u103a\u100a\u1014\u103a\u1014\u1031\u1037'],
      ja: ['110\u756a', '119\u756a', '\u4e8b\u6545', '\u8ca1\u5e03\u3092\u843d\u3068\u3057\u305f'],
    },
  },
};

export const CATEGORY_ORDER: CategoryKey[] = [
  'hospital', 'government', 'daily', 'work',
  'care', 'phone', 'transport', 'emergency',
];
