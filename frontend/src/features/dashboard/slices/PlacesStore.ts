import { Location } from "@dasminx/hang-around-common";
import { create } from "zustand";

import { FindPlacesSchemaType } from "../../../../../libs/hang-around-common/src/schema/places";

type PlacesCredentialsType = FindPlacesSchemaType & {
  setHowFar: (value: FindPlacesSchemaType["howFar"]) => void;
  setLocation: (value: FindPlacesSchemaType["location"]) => void;
  setMinRating: (value: FindPlacesSchemaType["minRating"]) => void;
  setTypesOfFood: (value: FindPlacesSchemaType["typesOfFood"]) => void;
  setPriceLevels: (value: FindPlacesSchemaType["priceLevels"]) => void;
  setIsOpen: (value: FindPlacesSchemaType["isOpen"]) => void;
  resetPlacesCredentials: () => void;
};

const DEFAULT_PLACES_FIELDS: FindPlacesSchemaType = {
  howFar: {
    distance: 0,
    unit: "m",
  },
  location: new Location([-181, -181]),
  minRating: 0,
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
  setIsOpen: (isOpen: FindPlacesSchemaType["isOpen"]) =>
    set((state: FindPlacesSchemaType) => ({ ...state, isOpen })),
  resetPlacesCredentials: () => set(() => DEFAULT_PLACES_FIELDS),
}));
