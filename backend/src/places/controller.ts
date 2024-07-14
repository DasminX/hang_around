import { NextFunction, Request, Response } from "express";
import { PlacesFinder } from "./finder";
import { APIResponseSuccess } from "../utils/response";
import { AppError, BadCredentialsError } from "../shared/errors";
import { findPlacesRequestBodySchema } from "./schema";

export const findPlaces = async (req: Request, res: Response, next: NextFunction) => {
  try {
    return next(new Error("Elo"));

    const parseResult = findPlacesRequestBodySchema.safeParse(req.body);
    if ("error" in parseResult) {
      throw new BadCredentialsError();
    }

    /* DOROBIĆ SPRAWDZENIE BEARER AUTH I ODRZUCANIE JEŚLI NIE MA !!!!! */
    const result = await PlacesFinder.find({
      location: req.body.location,
      query: req.body.queryText,
    });

    if (result instanceof AppError) {
      throw result;
    }

    return res.json(new APIResponseSuccess(result));
  } catch (e) {
    next(e);
  }
};
