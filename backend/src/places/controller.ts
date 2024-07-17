import { NextFunction, Request, Response } from "express";
import { PlacesFinder } from "./finder";
import { AppError } from "../shared/errors";
import { FIND_PLACES_SCHEMA } from "./schema";
import { parseInputBySchemaOrThrow } from "../shared/validators/validate-zod-schema";
import { FindPlaceResponse } from "./responses";
import { FindPlaceResult } from "./finder/types";

export const findPlacesController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { location, queryText } = parseInputBySchemaOrThrow(req.body, FIND_PLACES_SCHEMA);
    return next(new Error("Functionality is temporary disabled."));

    const result = await PlacesFinder.find({
      location,
      queryText,
    });

    if (result instanceof AppError) {
      throw result;
    }

    return res.json(new FindPlaceResponse(result as FindPlaceResult));
  } catch (e) {
    next(e);
  }
};
