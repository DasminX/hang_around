import { create } from "zustand";
import { PlacesFindArgs } from "../api/fetchers";
import { LocationVO } from "@dasminx/hang-around-common";

// TODO CHANGE TO LIB
type PlacesCredentialsType = PlacesFindArgs & {
  setHowFar: (value: PlacesFindArgs["howFar"]) => void;
  setLocation: (value: PlacesFindArgs["location"]) => void;
  setMinRating: (value: PlacesFindArgs["minRating"]) => void;
  setTypesOfFood: (value: PlacesFindArgs["typesOfFood"]) => void;
  resetPlacesCredentials: () => void;
};

const DEFAULT_PLACES_FIELDS: PlacesFindArgs = {
  howFar: {
    distance: -1,
    unit: "m",
  },
  location: new LocationVO([0, 0]),
  minRating: 0,
  typesOfFood: [],
};

export const usePlacesStore = create<PlacesCredentialsType>((set) => ({
  ...DEFAULT_PLACES_FIELDS,
  setHowFar: (howFar: PlacesFindArgs["howFar"]) =>
    set((state: PlacesFindArgs) => ({ ...state, ...howFar })),
  setLocation: (location: PlacesFindArgs["location"]) =>
    set((state: PlacesFindArgs) => ({ ...state, ...location })),
  setMinRating: (minRating: PlacesFindArgs["minRating"]) =>
    set((state: PlacesFindArgs) => ({ ...state, minRating })),
  setTypesOfFood: (typesOfFood: PlacesFindArgs["typesOfFood"]) =>
    set((state: PlacesFindArgs) => ({ ...state, typesOfFood })),
  resetPlacesCredentials: () => set(() => DEFAULT_PLACES_FIELDS),
}));
