import z from "zod";
import { PlacesValidationErrors } from "../messages";
import { TYPE_OF_FOOD_ARRAY } from "../data";
import { location, rating } from "./common";

const typesOfFood = z
  .array(z.enum(TYPE_OF_FOOD_ARRAY), {
    message: PlacesValidationErrors.INVALID_TYPES_OF_FOOD,
  })
  .optional()
  .refine((arr) => arr && arr.length > 0, {
    message: PlacesValidationErrors.INVALID_TYPES_OF_FOOD,
  });

const howFar = z.object({
  distance: z
    .number({
      message: PlacesValidationErrors.INVALID_DISTANCE,
    })
    .positive({
      message: PlacesValidationErrors.INVALID_DISTANCE,
    })
    .lte(10 * 5000, {
      message: PlacesValidationErrors.TOO_BIG_DISTANCE,
    }),
  unit: z.enum(["m", "yd"], {
    required_error: PlacesValidationErrors.UNIT_REQUIRED,
    invalid_type_error: PlacesValidationErrors.WRONG_UNIT,
  }),
});

export const FIND_PLACES_SCHEMA = z.lazy(() =>
  z
    .object({
      location,
      typesOfFood,
      howFar,
      minRating: rating,
      isOpen: z
        .boolean({
          message: PlacesValidationErrors.INVALID_ISOPEN_TYPE,
        })
        .optional(),
      priceLevels: z
        .tuple(
          [
            z
              .number({
                message: PlacesValidationErrors.INVALID_PRICE_LEVELS,
              })
              .min(-1, {
                message: PlacesValidationErrors.INVALID_PRICE_LEVELS,
              })
              .max(4, {
                message: PlacesValidationErrors.INVALID_PRICE_LEVELS,
              }),
            z
              .number({
                message: PlacesValidationErrors.INVALID_PRICE_LEVELS,
              })
              .min(-1, {
                message: PlacesValidationErrors.INVALID_PRICE_LEVELS,
              })
              .max(4, {
                message: PlacesValidationErrors.INVALID_PRICE_LEVELS,
              }),
          ],
          {
            message: PlacesValidationErrors.INVALID_PRICE_LEVELS,
          }
        )
        .refine((data) => data[0] > data[1], {
          message: PlacesValidationErrors.INVALID_PRICE_LEVELS,
          path: ["priceLevels"],
        }),
    })
    .strict()
);

export type FindPlacesSchemaType = z.infer<typeof FIND_PLACES_SCHEMA>;
