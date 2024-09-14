import { AppError, LocationVO } from "@dasminx/hang-around-contracts";
import { StatusCodes } from "http-status-codes";

import { DataSource } from "../shared/data-source";
import { parseInputBySchemaOrThrow } from "../shared/validators/validate-zod-schema";
import { ExpressMiddlewareCaught } from "../utils/types";
import { FindPlaceResponse } from "./responses";
import { FIND_PLACES_SCHEMA } from "./schema";
import { DistanceConverter } from "./utils/distance-converter";

export const findPlacesController: ExpressMiddlewareCaught = async (req, res) => {
  const { location, typesOfFood, howFar, minRating } = parseInputBySchemaOrThrow(req.body, FIND_PLACES_SCHEMA);

  const result = await DataSource.places.find({
    location: new LocationVO(location),
    radius: new DistanceConverter(howFar).getInMeters(),
    typesOfFood,
    minRating,
  });

  if (result instanceof AppError) {
    throw result;
  }

  return res.status(StatusCodes.OK).json(new FindPlaceResponse(result));
};
