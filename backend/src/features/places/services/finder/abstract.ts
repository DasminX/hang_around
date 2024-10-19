import { AppError, Location, TYPE_OF_FOOD_ARRAY } from "@dasminx/hang-around-common";

import { Place } from "../../models/place";

export type PlacesFindArgs = {
  location: Location;
  typesOfFood: Array<(typeof TYPE_OF_FOOD_ARRAY)[number]>;
  radius: number;
  minRating: number;
};

export interface PlacesFinderI {
  find(_args: PlacesFindArgs): Promise<Place[] | AppError>;
}
