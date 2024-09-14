import { LocationVO } from "../../../../../libs/hang-around-contracts/src/value-objects";
import { AppError } from "../../../shared/errors";
import { Place } from "../../models/place";
import { TYPE_OF_FOOD_ARRAY } from "./../../../../../libs/hang-around-contracts/src/data/index";

export type PlacesFindArgs = {
  location: LocationVO;
  typesOfFood: Array<(typeof TYPE_OF_FOOD_ARRAY)[number]>;
  radius: number;
  minRating: number;
};

export interface PlacesFinderI {
  find(_args: PlacesFindArgs): Promise<Place[] | AppError>;
}
