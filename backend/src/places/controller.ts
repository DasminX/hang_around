import { AppError } from "../shared/errors";
import { LocationVO } from "../shared/value-objects/location";
import { parseInputBySchemaOrThrow } from "../shared/validators/validate-zod-schema";
import { ExpressMiddlewareCaught } from "../utils/types";
import { FindPlaceResponse } from "./responses";
import { FIND_PLACES_SCHEMA } from "./schema";
import { GooglePlacesFinder } from "./services/finder/google-finder";
import { DistanceConverter } from "./utils/distance-converter";

export const findPlacesController: ExpressMiddlewareCaught = async (req, res) => {
  const { location, typesOfFood, howFar, minRating } = parseInputBySchemaOrThrow(req.body, FIND_PLACES_SCHEMA);

  const result = await GooglePlacesFinder.find({
    location: new LocationVO(location),
    radius: new DistanceConverter(howFar).getInMeters(),
    typesOfFood,
    minRating,
  });

  if (result instanceof AppError) {
    throw result;
  }

  return res.json(new FindPlaceResponse(result));
};
