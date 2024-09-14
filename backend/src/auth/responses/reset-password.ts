import { APIResponseSuccess } from "../../shared/api-responses";

export class ResetPasswordResponse extends APIResponseSuccess {
  constructor() {
    super({
      message: "The password reset link will come to your email if the email you provided is correct.",
    });
  }
}
