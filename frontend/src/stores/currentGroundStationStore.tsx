import { create } from "zustand";

export const useCurrentGroundStationStore = create<{
  currentGroundStationId: number | null;
  setCurrentGroundStationId: (id: number | null) => void;
}>((set) => ({
  currentGroundStationId: null,
  setCurrentGroundStationId: (id: number | null) =>
    set({ currentGroundStationId: id }),
}));
