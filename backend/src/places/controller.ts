import { AppError } from "../shared/errors";
import { parseInputBySchemaOrThrow } from "../shared/validators/validate-zod-schema";
import { ExpressMiddlewareCaught } from "../utils/types";
import { DistanceConverter } from "./distance-converter";
import { PlacesFinder } from "./finder";
import { FindPlaceResponse } from "./responses";
import { FIND_PLACES_SCHEMA } from "./schema";

export const findPlacesController: ExpressMiddlewareCaught = async (req, res) => {
  const { location, typeOfFood, howFar } = parseInputBySchemaOrThrow(req.body, FIND_PLACES_SCHEMA);
  // throw new Error("Functionality is temporary disabled.");

  const result = await PlacesFinder.find({
    location,
    typeOfFood,
    radius: new DistanceConverter(howFar).getInMeters(),
  });

  if (result instanceof AppError) {
    throw result;
  }

  return res.json(new FindPlaceResponse(result));
};
