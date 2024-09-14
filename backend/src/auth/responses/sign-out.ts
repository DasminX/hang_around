import { APIResponseSuccess } from "../../shared/api-responses";

export class SignOutResponse extends APIResponseSuccess {
  constructor() {
    super({
      message:
        "You should implement sign out functionality on client-side. Do it by removing Bearer token provided with Authorization Header.",
    });
  }
}
