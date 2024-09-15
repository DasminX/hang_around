import { z } from "zod";
import { CommonValidationErrors } from "../messages";

export const location = z.union([
  z.object({
    lat: z
      .number({
        message: CommonValidationErrors.INVALID_LOCATION,
      })
      .gte(-90, {
        message: CommonValidationErrors.INVALID_LOCATION,
      })
      .lte(90, {
        message: CommonValidationErrors.INVALID_LOCATION,
      }),
    lng: z
      .number({
        message: CommonValidationErrors.INVALID_LOCATION,
      })
      .gte(-180, {
        message: CommonValidationErrors.INVALID_LOCATION,
      })
      .lte(180, {
        message: CommonValidationErrors.INVALID_LOCATION,
      }),
  }),
  z.tuple([
    z
      .number({
        message: CommonValidationErrors.INVALID_LOCATION,
      })
      .gte(-90, {
        message: CommonValidationErrors.INVALID_LOCATION,
      })
      .lte(90, {
        message: CommonValidationErrors.INVALID_LOCATION,
      }),
    z
      .number({
        message: CommonValidationErrors.INVALID_LOCATION,
      })
      .gte(-180, {
        message: CommonValidationErrors.INVALID_LOCATION,
      })
      .lte(180, {
        message: CommonValidationErrors.INVALID_LOCATION,
      }),
  ]),
]);

export const rating = z
  .number({
    message: CommonValidationErrors.INVALID_RATING_TYPE,
  })
  .gte(1, {
    message: CommonValidationErrors.TOO_SMALL_RATING,
  })
  .lte(5, {
    message: CommonValidationErrors.TOO_BIG_RATING,
  });
