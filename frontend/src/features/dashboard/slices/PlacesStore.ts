import { FindPlacesSchemaType } from "../../../../../libs/hang-around-common/src/schema/places";
import { create } from "zustand";
import { LocationVO } from "@dasminx/hang-around-common";

type PlacesCredentialsType = FindPlacesSchemaType & {
  setHowFar: (value: FindPlacesSchemaType["howFar"]) => void;
  setLocation: (value: FindPlacesSchemaType["location"]) => void;
  setMinRating: (value: FindPlacesSchemaType["minRating"]) => void;
  setTypesOfFood: (value: FindPlacesSchemaType["typesOfFood"]) => void;
  resetPlacesCredentials: () => void;
};

const DEFAULT_PLACES_FIELDS: FindPlacesSchemaType = {
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
  setHowFar: (howFar: FindPlacesSchemaType["howFar"]) =>
    set((state: FindPlacesSchemaType) => ({ ...state, howFar })),
  setLocation: (location: FindPlacesSchemaType["location"]) =>
    set((state: FindPlacesSchemaType) => ({ ...state, location })),
  setMinRating: (minRating: FindPlacesSchemaType["minRating"]) =>
    set((state: FindPlacesSchemaType) => ({ ...state, minRating })),
  setTypesOfFood: (typesOfFood: FindPlacesSchemaType["typesOfFood"]) =>
    set((state: FindPlacesSchemaType) => ({ ...state, typesOfFood })),
  resetPlacesCredentials: () => set(() => DEFAULT_PLACES_FIELDS),
}));
