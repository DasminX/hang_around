import { NextFunction, Request, Response } from "express";
import { PlacesFinder } from "./finder";
import { AppError } from "../shared/errors";
import { FIND_PLACES_SCHEMA } from "./schema";
import { parseInputBySchemaOrThrow } from "../shared/validators/validate-zod-schema";
import { FindPlaceResponse } from "./responses";
import { FindPlaceResult } from "./finder/types";
import { ExpressMiddlewareCaught } from "../utils/types";
import { DistanceInMeters } from "./distance-to-meters";

export const findPlacesController: ExpressMiddlewareCaught = async (req, res) => {
  const { location, typeOfFood, howFar } = parseInputBySchemaOrThrow(req.body, FIND_PLACES_SCHEMA);
  // throw new Error("Functionality is temporary disabled.");

  const result = await PlacesFinder.find({
    location,
    typeOfFood,
    radius: new DistanceInMeters(howFar).getValue(),
  });

  if (result instanceof AppError) {
    throw result;
  }

  return res.json(new FindPlaceResponse(result as FindPlaceResult));
};
