import { create } from "zustand";

export interface FrequencyFilter {
  min: number;
  max: number;
  direction: "downlink" | "uplink";
}

export interface FilterState {
  tracked?: string;
  tag?: string;
  name?: string;
  frequencyFilters?: FrequencyFilter[];
}

interface FilterStore {
  filters: FilterState;
  setFilters: (filters: FilterState) => void;
  clearFilters: () => void;
}

export const useFilterStore = create<FilterStore>((set) => ({
  filters: {},
  setFilters: (filters) => set({ filters }),
  clearFilters: () => set({ filters: {} }),
}));
