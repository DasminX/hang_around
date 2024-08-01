import { LocationVO } from "../../../shared/value-objects/location";
import { Place } from "../../models/place";
import { TYPE_OF_FOOD_ARRAY } from "../../schema";

export type PlacesFindArgs = {
  location: LocationVO;
  typesOfFood: Array<(typeof TYPE_OF_FOOD_ARRAY)[number]>;
  radius: number;
  minRating: number;
};

export abstract class PlacesFinderI {
  protected constructor() {}

  public static initialize(): void {
    throw new Error("Method not implemented yet!");
  }
  public static find(_args: PlacesFindArgs): Place[] {
    throw new Error("Method not implemented yet!");
  }
}
