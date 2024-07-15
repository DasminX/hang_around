import { IdTokenResult } from "firebase/auth";
import { APIResponseSuccess } from "../../utils/response";
import { ONE_HOUR } from "../../utils/constants";

export class SignInResponse extends APIResponseSuccess {
  constructor(data: IdTokenResult) {
    super({
      token: data.token,
      expirationTime: Number.isNaN(Number(data.claims.exp)) ? Date.now() + 2 * ONE_HOUR : Number(data.claims.exp),
    });
  }
}

export class SignUpResponse extends APIResponseSuccess {
  constructor() {
    super({
      message: "Thank you for signing up! Please confirm your email address to complete your registration.",
    });
  }
}

export class ResetPasswordResponse extends APIResponseSuccess {
  constructor() {
    super({
      message: "The password reset link will come to your email if the email you provided is correct.",
    });
  }
}

export class SignOutResponse extends APIResponseSuccess {
  constructor() {
    super({
      message:
        "You should implement sign out functionality on client-side. Do it by removing Bearer token provided with Authorization Header.",
    });
  }
}
