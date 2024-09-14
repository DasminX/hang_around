import { AppError, LocationVO, TYPE_OF_FOOD_ARRAY } from "@dasminx/hang-around-contracts";

import { Place } from "../../models/place";

export type PlacesFindArgs = {
  location: LocationVO;
  typesOfFood: Array<(typeof TYPE_OF_FOOD_ARRAY)[number]>;
  radius: number;
  minRating: number;
};

export interface PlacesFinderI {
  find(_args: PlacesFindArgs): Promise<Place[] | AppError>;
}
