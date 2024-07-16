import { NextFunction, Request, Response } from "express";
import { PlacesFinder } from "./finder";
import { AppError } from "../shared/errors";
import { FIND_PLACES_SCHEMA } from "./schema";
import { parseInputBySchemaOrThrow } from "../shared/validators/validate-zod-schema";
import { FindPlaceResponse } from "./responses";
import { google } from "@googlemaps/places/build/protos/protos";

export const findPlacesController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { location, queryText } = parseInputBySchemaOrThrow(req.body, FIND_PLACES_SCHEMA);
    return next(new Error("Elo"));

    const result = await PlacesFinder.find({
      location,
      query: queryText,
    });

    if (result instanceof AppError) {
      throw result;
    }

    // TODO typ i check w akcji!!!
    return res.json(new FindPlaceResponse(result as google.maps.places.v1.IPlace[]));
  } catch (e) {
    next(e);
  }
};
