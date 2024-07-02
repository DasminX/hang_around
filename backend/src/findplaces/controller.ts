import { NextFunction, Request, Response } from "express";
import { PlacesFinder } from "./domain/placesFinder";
import { APIResponse } from "../shared/response";
import { AppError } from "../utils/appError";
import { findplacesRequestBodySchema } from "./schema";

export const findPlaces = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const parseResult = findplacesRequestBodySchema.safeParse(req.body);
    if ("error" in parseResult) {
      throw new AppError("Invalid request body.", 400);
    }

    const result = await PlacesFinder.find({
      location: req.body.location,
      query: req.body.queryText,
    });

    if (result instanceof AppError) {
      throw result;
    }

    return res.json(new APIResponse(result));
  } catch (error) {
    return next(error);
  }
};
