import { AuthValidationErrors } from "@dasminx/hang-around-common";
import z from "zod";

export const SIGN_IN_SCHEMA = z
  .object({
    email: z
      .string({
        message: AuthValidationErrors.INVALID_EMAIL,
      })
      .email({
        message: AuthValidationErrors.INVALID_EMAIL,
      }),
    password: z.string({
      message: AuthValidationErrors.INVALID_PASSWORD_TYPE,
    }),
  })
  .strict();

//prettier-ignore
export const SIGN_UP_SCHEMA = z
  .object({
    email: z.string({
      message: AuthValidationErrors.INVALID_EMAIL
    }).email({
      message: AuthValidationErrors.INVALID_EMAIL
    }),
    password: z.string().min(8, {
      message: AuthValidationErrors.WEAK_PASSWORD
    }).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z\d]).*$/, {
      message: AuthValidationErrors.WEAK_PASSWORD
    }),
    repeatPassword: z.string({
      message: AuthValidationErrors.INVALID_PASSWORD_TYPE
    })
  }).strict().refine(data => data.password === data.repeatPassword, {
    message: AuthValidationErrors.PASSWORD_NOT_EQUAL,
    path: ["repeatPassword"]
  })

export const RESET_PASSWORD_SCHEMA = z
  .object({
    email: z
      .string({
        message: AuthValidationErrors.INVALID_EMAIL,
      })
      .email({
        message: AuthValidationErrors.INVALID_EMAIL,
      }),
  })
  .strict();
