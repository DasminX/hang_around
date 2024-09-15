import { PlacesValidationErrors, TYPE_OF_FOOD_ARRAY } from "@dasminx/hang-around-common";
import z from "zod";

import { THOUSAND } from "../../utils/constants";

export const FIND_PLACES_SCHEMA = z
  .object({
    location: z.union(
      [
        z.object({
          lat: z
            .number({
              message: PlacesValidationErrors.INVALID_LOCATION,
            })
            .gte(-90, {
              message: PlacesValidationErrors.INVALID_LOCATION,
            })
            .lte(90, {
              message: PlacesValidationErrors.INVALID_LOCATION,
            }),
          lng: z
            .number({
              message: PlacesValidationErrors.INVALID_LOCATION,
            })
            .gte(-180, {
              message: PlacesValidationErrors.INVALID_LOCATION,
            })
            .lte(180, {
              message: PlacesValidationErrors.INVALID_LOCATION,
            }),
        }),
        z.tuple([
          z
            .number({
              message: PlacesValidationErrors.INVALID_LOCATION,
            })
            .gte(-90, {
              message: PlacesValidationErrors.INVALID_LOCATION,
            })
            .lte(90, {
              message: PlacesValidationErrors.INVALID_LOCATION,
            }),
          z
            .number({
              message: PlacesValidationErrors.INVALID_LOCATION,
            })
            .gte(-180, {
              message: PlacesValidationErrors.INVALID_LOCATION,
            })
            .lte(180, {
              message: PlacesValidationErrors.INVALID_LOCATION,
            }),
        ]),
      ],
      {
        message: PlacesValidationErrors.INVALID_LOCATION,
      },
    ),
    typesOfFood: z.array(z.enum(TYPE_OF_FOOD_ARRAY), {
      message: PlacesValidationErrors.INVALID_TYPES_OF_FOOD,
    }),
    howFar: z.object({
      distance: z
        .number({
          message: PlacesValidationErrors.INVALID_DISTANCE,
        })
        .positive({
          message: PlacesValidationErrors.INVALID_DISTANCE,
        })
        .lte(10 * THOUSAND, {
          message: PlacesValidationErrors.TOO_BIG_DISTANCE,
        }),
      unit: z.enum(["m", "yd"], {
        required_error: PlacesValidationErrors.UNIT_REQUIRED,
        invalid_type_error: PlacesValidationErrors.WRONG_UNIT,
      }),
    }),
    minRating: z
      .number({
        message: PlacesValidationErrors.INVALID_RATING_TYPE,
      })
      .gte(1, {
        message: PlacesValidationErrors.TOO_SMALL_RATING,
      })
      .lte(5, {
        message: PlacesValidationErrors.TOO_BIG_RATING,
      }),
  })
  .strict();
