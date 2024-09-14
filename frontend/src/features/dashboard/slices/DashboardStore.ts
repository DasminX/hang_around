import { create } from "zustand";

type PlacesType = {
  howFar: {
    distance: number;
    unit: "yd" | "m";
  };
  location: { lat: number; lng: number };
  minRating: number;
  typesOfFood: string;
};

type PlacesCredentialsType = PlacesType & {
  setHowFar: (value: PlacesType["howFar"]) => void;
  setLocation: (value: PlacesType["location"]) => void;
  setMinRating: (value: PlacesType["minRating"]) => void;
  setTypesOfFood: (value: PlacesType["typesOfFood"]) => void;
  resetPlacesCredentials: () => void;
};

const DEFAULT_PLACES_FIELDS: PlacesType = {
  howFar: {
    distance: -1,
    unit: "m",
  },
  location: { lat: 0, lng: 0 },
  minRating: 0,
  typesOfFood: "",
};

export const usePlacesStore = create<PlacesCredentialsType>((set) => ({
  ...DEFAULT_PLACES_FIELDS,
  setHowFar: (howFar: PlacesType["howFar"]) =>
    set((state: PlacesType) => ({ ...state, ...howFar })),
  setLocation: (location: PlacesType["location"]) =>
    set((state: PlacesType) => ({ ...state, ...location })),
  setMinRating: (minRating: PlacesType["minRating"]) =>
    set((state: PlacesType) => ({ ...state, minRating })),
  setTypesOfFood: (typesOfFood: PlacesType["typesOfFood"]) =>
    set((state: PlacesType) => ({ ...state, typesOfFood })),
  resetPlacesCredentials: () => set(() => DEFAULT_PLACES_FIELDS),
}));
