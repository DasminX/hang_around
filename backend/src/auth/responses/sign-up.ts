import { APIResponseSuccess } from "../../shared/api-responses";

export class SignUpResponse extends APIResponseSuccess {
  constructor() {
    super({
      message: "Thank you for signing up! Please confirm your email address to complete your registration.",
    });
  }
}
