import { create } from "zustand";

export interface TimingFilter {
  minTime: string; // "06:20"
  maxTime: string; // "18:45"
  dows: string; // "M, T, W"
}

export interface PassFilterState {
  minVisibleElevation?: string; // degrees
  minVisibleDuration?: string; // seconds
  browserLocalTzOffsetMinutes?: string;
  timingFilters?: TimingFilter[];
}

interface PassFilterStore {
  filters: PassFilterState;
  setFilters: (filters: PassFilterState) => void;
  clearFilters: () => void;
}

export const usePassEventsFilterStore = create<PassFilterStore>((set) => ({
  filters: {},
  setFilters: (filters) => set({ filters }),
  clearFilters: () => set({ filters: {} }),
}));
