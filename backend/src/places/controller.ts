import { AppError } from "../shared/errors";
import { Location } from "../shared/location";
import { parseInputBySchemaOrThrow } from "../shared/validators/validate-zod-schema";
import { ExpressMiddlewareCaught } from "../utils/types";
import { DistanceConverter } from "./distance-converter";
import { PlacesFinder } from "./finder";
import { FindPlaceResponse } from "./responses";
import { FIND_PLACES_SCHEMA } from "./schema";

export const findPlacesController: ExpressMiddlewareCaught = async (req, res) => {
  const { location, typeOfFood, howFar, minRating } = parseInputBySchemaOrThrow(req.body, FIND_PLACES_SCHEMA);

  // TODO change typeOfFood to array of items instead of single items
  const result = await PlacesFinder.find({
    location: new Location(location),
    radius: new DistanceConverter(howFar).getInMeters(),
    typeOfFood,
    minRating,
  });

  if (result instanceof AppError) {
    throw result;
  }

  return res.json(new FindPlaceResponse(result));
};
