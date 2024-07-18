import z from "zod";
import { THOUSAND } from "../utils/constants";

//prettier-ignore
export const TYPE_OF_FOOD_ARRAY = [
  "pizza", "burger", "asian food", "sushi", "pasta", "hungarian food", "kebab", 
  "polish food", "czech food", "fish", "mexican food", "indian food", "greek food", 
  "french food", "italian food", "spanish food", "middle eastern food", "thai food", 
  "vegan food", "vegetarian food", "bbq", "fast food", "comfort food", "seafood", 
  "desserts", "breakfast food", "brunch food", "mediterranean food"
] as const;

export const FIND_PLACES_SCHEMA = z
  .object({
    location: z.tuple([z.number().gte(-90).lte(90), z.number().gte(-180).lte(180)]),
    typeOfFood: z.enum(TYPE_OF_FOOD_ARRAY),
    howFar: z.object({
      distance: z
        .number()
        .positive()
        .lte(10 * THOUSAND, {
          message: "Limit for a distance is 10000.",
        }),
      unit: z.enum(["m", "yd"], {
        required_error: "Unit is required",
        invalid_type_error: "Unit must be either m (meter) or yd (yard)",
      }),
    }),
  })
  .strict();

export type HowFar = z.infer<typeof FIND_PLACES_SCHEMA>["howFar"];
export type HowFarUnits = HowFar["unit"];
