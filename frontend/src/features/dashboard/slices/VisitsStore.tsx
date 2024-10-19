import { Timestamp, VisitArgs } from "@dasminx/hang-around-common";
import { create } from "zustand";

type VisitsCredentialsType = {
  visits: VisitArgs[] | null;
  setVisits: (visit: VisitArgs[] | VisitArgs) => void;
  resetVisits: () => void;
  refreshedAt: Timestamp;
};

export const useVisitsStore = create<VisitsCredentialsType>((set) => ({
  visits: null,
  refreshedAt: 0 as Timestamp,
  setVisits: (visit: VisitArgs[] | VisitArgs) =>
    set((state: VisitsCredentialsType) => ({
      ...state,
      visits: Array.isArray(visit)
        ? [...visit, ...(state.visits || [])]
        : [visit, ...(state.visits || [])],
      refreshedAt: Date.now() as Timestamp,
    })),
  resetVisits: () => set((state) => ({ ...state, visits: null })), // TODO tu też update rfAt?
}));
