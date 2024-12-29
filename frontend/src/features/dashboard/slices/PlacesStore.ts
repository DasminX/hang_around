import { Location } from "@dasminx/hang-around-common";
import { create } from "zustand";

import { FindPlacesSchemaType } from "../../../../../libs/hang-around-common/src/schema/places";

type PlacesCredentialsType = FindPlacesSchemaType & {
  setHowFar: (value: FindPlacesSchemaType["howFar"]) => void;
  setLocation: (value: FindPlacesSchemaType["location"]) => void;
  setMinRating: (value: FindPlacesSchemaType["minRating"]) => void;
  setTypesOfFood: (value: FindPlacesSchemaType["typesOfFood"]) => void;
  setPriceLevels: (value: FindPlacesSchemaType["priceLevels"]) => void;
  setOpenOnly: (value: FindPlacesSchemaType["openOnly"]) => void;
  resetPlacesCredentials: () => void;
};

const DEFAULT_PLACES_FIELDS: FindPlacesSchemaType = {
  howFar: {
    distance: 1000,
    unit: "m",
  },
  location: new Location([0, 0]),
  typesOfFood: [],
  priceLevels: [-1, 4],
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
  setPriceLevels: (priceLevels: FindPlacesSchemaType["priceLevels"]) =>
    set((state: FindPlacesSchemaType) => ({ ...state, priceLevels })),
  setOpenOnly: (openOnly: FindPlacesSchemaType["openOnly"]) =>
    set((state: FindPlacesSchemaType) => ({ ...state, openOnly })),
  resetPlacesCredentials: () => set(() => DEFAULT_PLACES_FIELDS),
}));
