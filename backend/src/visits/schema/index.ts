import z from "zod";

export const GET_VISITS_SCHEMA = z
  .object({
    id: z.string(),
  })
  .strict();

export const CREATE_VISIT_SCHEMA = z
  .object({
    name: z.string().min(1),
    location: z.union([
      z.object({ lat: z.number().gte(-90).lte(90), lng: z.number().gte(-180).lte(180) }),
      z.tuple([z.number().gte(-90).lte(90), z.number().gte(-180).lte(180)]),
    ]),
    rating: z.number().min(0).max(5),
    mapsUri: z.string().url(),
    isAccessible: z.boolean(),
  })
  .strict();
