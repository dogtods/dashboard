import { create } from 'zustand';

interface AppState {
  dateRange: { start: string; end: string };
  setDateRange: (range: { start: string; end: string }) => void;
  activeCategory: string | null;
  setActiveCategory: (category: string | null) => void;
}

export const useStore = create<AppState>((set) => ({
  dateRange: { start: '2026-04-01', end: '2026-05-25' },
  setDateRange: (dateRange) => set({ dateRange }),
  activeCategory: null,
  setActiveCategory: (activeCategory) => set({ activeCategory }),
}));
