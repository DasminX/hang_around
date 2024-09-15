import z from "zod";
import { VisitsValidationErrors } from "../messages";
import { location, rating } from "./common";

// Wrap schemas with z.lazy to avoid circular dependencies
export const GET_VISITS_SCHEMA = z.lazy(() =>
  z
    .object({
      id: z.string({
        message: VisitsValidationErrors.INVALID_ID_TYPE,
      }),
    })
    .strict()
);

export const CREATE_VISIT_SCHEMA = z.lazy(() =>
  z
    .object({
      name: z
        .string({
          message: VisitsValidationErrors.INVALID_NAME_TYPE,
        })
        .min(1, {
          message: VisitsValidationErrors.TOO_SHORT_NAME,
        }),
      location,
      rating,
      mapsUri: z
        .string({
          message: VisitsValidationErrors.INVALID_URL,
        })
        .url({
          message: VisitsValidationErrors.INVALID_URL,
        }),
      isAccessible: z.boolean({
        message: VisitsValidationErrors.INVALID_ACCESSIBLE_VALUE,
      }),
    })
    .strict()
);

export type GetVisitsSchemaType = z.infer<typeof GET_VISITS_SCHEMA>;
export type CreateVisitSchemaType = z.infer<typeof CREATE_VISIT_SCHEMA>;
