import { create } from 'zustand';

interface VisaState {
  daysRemaining: number | null;
  status: 'ACTIVE' | 'EXPIRING_SOON' | 'RENEWAL_PENDING' | 'EXPIRED' | 'CHANGED' | null;
  expiryDate: string | null;
  residenceStatus: string | null;
  setVisaInfo: (info: Partial<VisaState>) => void;
  clearVisaInfo: () => void;
}

export const useVisaStore = create<VisaState>()((set) => ({
  daysRemaining: null,
  status: null,
  expiryDate: null,
  residenceStatus: null,
  setVisaInfo: (info) => set((state) => ({ ...state, ...info })),
  clearVisaInfo: () =>
    set({ daysRemaining: null, status: null, expiryDate: null, residenceStatus: null }),
}));
