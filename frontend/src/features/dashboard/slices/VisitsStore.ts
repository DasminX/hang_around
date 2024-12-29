import { VisitArgs } from "@dasminx/hang-around-common";
import { create } from "zustand";

type VisitsCredentialsType = {
  visits: VisitArgs[] | null;
  setVisits: (visit: VisitArgs[]) => void;
  resetVisits: () => void;
};

export const useVisitsStore = create<VisitsCredentialsType>((set) => ({
  visits: null,
  setVisits: (newVisits: VisitArgs[]) =>
    set((state: VisitsCredentialsType) => {
      const output = [...(state.visits || [])];

      newVisits.forEach((visit) => {
        if (output.some((el) => el.id === visit.id)) return;
        output.unshift(visit);
      });

      return {
        ...state,
        visits: output,
      };
    }),
  resetVisits: () => set((state) => ({ ...state, visits: null })),
}));
