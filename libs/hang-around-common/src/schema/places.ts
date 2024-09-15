import z from "zod";
import { PlacesValidationErrors } from "../messages";
import { TYPE_OF_FOOD_ARRAY } from "../data";
import { location, rating } from "./common";

const typesOfFood = z.array(z.enum(TYPE_OF_FOOD_ARRAY), {
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
    .lte(10 * 1000, {
      message: PlacesValidationErrors.TOO_BIG_DISTANCE,
    }),
  unit: z.enum(["m", "yd"], {
    required_error: PlacesValidationErrors.UNIT_REQUIRED,
    invalid_type_error: PlacesValidationErrors.WRONG_UNIT,
  }),
});

// Wrap the schema with z.lazy to avoid circular dependencies
export const FIND_PLACES_SCHEMA = z.lazy(() =>
  z
    .object({
      location,
      typesOfFood,
      howFar,
      minRating: rating,
    })
    .strict()
);

export type FindPlacesSchemaType = z.infer<typeof FIND_PLACES_SCHEMA>;
