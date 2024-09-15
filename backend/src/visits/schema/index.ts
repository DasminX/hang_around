import { VisitsValidationErrors } from "@dasminx/hang-around-common";
import z from "zod";

export const GET_VISITS_SCHEMA = z
  .object({
    id: z.string({
      message: VisitsValidationErrors.INVALID_ID_TYPE,
    }),
  })
  .strict();

export const CREATE_VISIT_SCHEMA = z.object({
  name: z
    .string({
      message: VisitsValidationErrors.INVALID_NAME_TYPE,
    })
    .min(1, {
      message: VisitsValidationErrors.TOO_SHORT_NAME,
    }),
  location: z.union(
    [
      z.object({
        lat: z
          .number({
            message: VisitsValidationErrors.INVALID_LOCATION,
          })
          .gte(-90, {
            message: VisitsValidationErrors.INVALID_LOCATION,
          })
          .lte(90, {
            message: VisitsValidationErrors.INVALID_LOCATION,
          }),
        lng: z
          .number({
            message: VisitsValidationErrors.INVALID_LOCATION,
          })
          .gte(-180, {
            message: VisitsValidationErrors.INVALID_LOCATION,
          })
          .lte(180, {
            message: VisitsValidationErrors.INVALID_LOCATION,
          }),
      }),
      z.tuple([
        z
          .number({
            message: VisitsValidationErrors.INVALID_LOCATION,
          })
          .gte(-90, {
            message: VisitsValidationErrors.INVALID_LOCATION,
          })
          .lte(90, {
            message: VisitsValidationErrors.INVALID_LOCATION,
          }),
        z
          .number({
            message: VisitsValidationErrors.INVALID_LOCATION,
          })
          .gte(-180, {
            message: VisitsValidationErrors.INVALID_LOCATION,
          })
          .lte(180, {
            message: VisitsValidationErrors.INVALID_LOCATION,
          }),
      ]),
    ],
    {
      message: VisitsValidationErrors.INVALID_LOCATION,
    },
  ),
  rating: z
    .number({
      message: VisitsValidationErrors.INVALID_RATING_TYPE,
    })
    .gte(1, {
      message: VisitsValidationErrors.TOO_SMALL_RATING,
    })
    .lte(5, {
      message: VisitsValidationErrors.TOO_BIG_RATING,
    }),
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
});
