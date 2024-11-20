import { VisitArgs } from "@dasminx/hang-around-common";
import { create } from "zustand";

type VisitsCredentialsType = {
  visits: VisitArgs[] | null;
  setVisits: (visit: VisitArgs[] | VisitArgs) => void;
  resetVisits: () => void;
};

export const useVisitsStore = create<VisitsCredentialsType>((set) => ({
  visits: null,
  setVisits: (visit: VisitArgs[] | VisitArgs) =>
    set((state: VisitsCredentialsType) => ({
      ...state,
      visits: Array.isArray(visit)
        ? [...visit, ...(state.visits || [])]
        : [visit, ...(state.visits || [])],
    })),
  resetVisits: () => set((state) => ({ ...state, visits: null })),
}));
