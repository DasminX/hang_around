import { PlaceArgs } from "@dasminx/hang-around-common";
import { create } from "zustand";

type FoundPlaceCredentialsType = {
  places: PlaceArgs[] | null;
  setPlaces: (places: PlaceArgs[]) => void;
  resetPlaces: () => void;
};

export const useFoundPlaceStore = create<FoundPlaceCredentialsType>((set) => ({
  places: null,
  setPlaces: (places: PlaceArgs[]) =>
    set((state: FoundPlaceCredentialsType) => ({ ...state, places: [...places] })),
  resetPlaces: () => set((state) => ({ ...state, places: null })),
}));
