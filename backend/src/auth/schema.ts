import z from "zod";

export const SIGN_IN_SCHEMA = z
  .object({
    email: z.string().email(),
    password: z.string(),
  })
  .strict();

export const SIGN_UP_SCHEMA = z
  .object({
    email: z.string().email(),
    password: z.string(),
  })
  .strict();
