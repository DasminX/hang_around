import z from "zod";

export const SIGN_IN_SCHEMA = z
  .object({
    email: z.string().email(),
    password: z.string(),
  })
  .strict();

//prettier-ignore
export const SIGN_UP_SCHEMA = z
  .object({
    email: z.string().email(),
    password: z.string().min(8, {
      message: "Password must be at least 8 characters long!"
    }).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z\d]).*$/, {
      message: "Password is too weak. It must include uppercase letters, lowercase letters, digits, and special characters."
    }),
    repeatPassword: z.string()
  }).strict().refine(data => data.password === data.repeatPassword, {
    message: "Password and repeat password fields must be the same!",
    path: ["repeatPassword"]
  });

export const RESET_PASSWORD_SCHEMA = z
  .object({
    email: z.string().email(),
  })
  .strict();
