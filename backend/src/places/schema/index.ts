import z from "zod";

import { THOUSAND } from "../../utils/constants";

//prettier-ignore
export const TYPE_OF_FOOD_ARRAY = [
  "pizza", "burger", "asian food", "sushi", "pasta", "hungarian food", "kebab", 
  "polish food", "czech food", "fish", "mexican food", "indian food", "greek food", 
  "french food", "italian food", "spanish food", "middle eastern food", "thai food", 
  "vegan food", "vegetarian food", "bbq", "fast food", "comfort food", "seafood", 
  "desserts", "breakfast food", "brunch food", "mediterranean food"
] as const;

export enum PlacesValidationErrors {
  INVALID_LOCATION = "INVALID_LOCATION",
  INVALID_TYPES_OF_FOOD = "INVALID_TYPES_OF_FOOD",

  INVALID_DISTANCE = "INVALID_DISTANCE",
  TOO_BIG_DISTANCE = "TOO_BIG_DISTANCE",
  UNIT_REQUIRED = "UNIT_REQUIRED",
  WRONG_UNIT = "WRONG_UNIT",

  INVALID_RATING_TYPE = "INVALID_RATING_TYPE",
  TOO_SMALL_RATING = "TOO_SMALL_RATING",
  TOO_BIG_RATING = "TOO_BIG_RATING",
}

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
