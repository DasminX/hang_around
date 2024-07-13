import z from "zod";

export const findPlacesRequestBodySchema = z
  .object({
    location: z.tuple([z.number().gte(-90).lte(90), z.number().gte(-180).lte(180)]),
    queryText: z.string(),
  })
  .strict();
