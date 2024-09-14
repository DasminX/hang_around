import { APIResponseSuccess } from "../../../../libs/hang-around-contracts/src/classes";

export class ResetPasswordResponse extends APIResponseSuccess {
  constructor() {
    super({
      message: "The password reset link will come to your email if the email you provided is correct.",
    });
  }
}
