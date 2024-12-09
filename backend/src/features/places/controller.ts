import { AppError, FIND_PLACES_SCHEMA, Location, TYPE_OF_FOOD_ARRAY } from "@dasminx/hang-around-common";
import { StatusCodes } from "http-status-codes";

import { DataSource } from "../../data-source";
import { parseInputBySchemaOrThrow } from "../../shared/validators/validate-zod-schema";
import { ExpressMiddlewareCaught } from "../../utils/types";
import { FindPlaceResponse } from "./responses";
import { DistanceConverter } from "./utils/distance-converter";

export const findPlacesController: ExpressMiddlewareCaught = async (req, res) => {
  const { location, howFar, typesOfFood, minRating, openOnly, priceLevels } = parseInputBySchemaOrThrow(
    req.body,
    FIND_PLACES_SCHEMA,
  );

  const result = await DataSource.places.find({
    location: new Location(location),
    radius: new DistanceConverter(howFar).getInMeters(),
    typesOfFood: typesOfFood as Array<(typeof TYPE_OF_FOOD_ARRAY)[number]>,
    minRating,
    openOnly,
    priceLevels,
  });

  if (result instanceof AppError) {
    throw result;
  }

  return res.status(StatusCodes.OK).json(new FindPlaceResponse(result));
};
