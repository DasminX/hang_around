import { AppError } from "../../../shared/errors";
import { LocationVO } from "../../../shared/value-objects/location";
import { Place } from "../../models/place";
import { TYPE_OF_FOOD_ARRAY } from "../../schema";

export type PlacesFindArgs = {
  location: LocationVO;
  typesOfFood: Array<(typeof TYPE_OF_FOOD_ARRAY)[number]>;
  radius: number;
  minRating: number;
};

export interface PlacesFinderI {
  find(_args: PlacesFindArgs): Promise<Place[] | AppError>;
}
