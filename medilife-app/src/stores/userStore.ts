import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UserState {
  id: string | null;
  email: string | null;
  name: string | null;
  nationality: string | null;
  nativeLanguage: string;
  residenceStatus: string | null;
  prefecture: string | null;
  city: string | null;
  japaneseLevel: string | null;
  avatarUrl: string | null;
  subscriptionTier: 'FREE' | 'PLUS' | 'PRO';
  onboardingDone: boolean;
  setUser: (user: Partial<UserState>) => void;
  clearUser: () => void;
}

const initialState = {
  id: null,
  email: null,
  name: null,
  nationality: null,
  nativeLanguage: 'vi',
  residenceStatus: null,
  prefecture: null,
  city: null,
  japaneseLevel: null,
  avatarUrl: null,
  subscriptionTier: 'FREE' as const,
  onboardingDone: false,
};

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      ...initialState,
      setUser: (user) => set((state) => ({ ...state, ...user })),
      clearUser: () => set(initialState),
    }),
    {
      name: 'medilife-user',
    }
  )
);
