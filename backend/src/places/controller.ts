import { NextFunction, Request, Response } from "express";
import { PlacesFinder } from "./finder";
import { APIResponseSuccess } from "../utils/response";
import { AppError, BadCredentialsError } from "../shared/errors";
import { FIND_PLACES_SCHEMA } from "./schema";
import { parseInputBySchema } from "../shared/validateZodSchema";

export const findPlaces = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { location, queryText } = parseInputBySchema(req.body, FIND_PLACES_SCHEMA);
    return next(new Error("Elo"));

    const result = await PlacesFinder.find({
      location,
      query: queryText,
    });

    if (result instanceof AppError) {
      throw result;
    }

    return res.json(new APIResponseSuccess(result));
  } catch (e) {
    next(e);
  }
};