import { IdTokenResult } from "firebase/auth";
import { ONE_HOUR_MS } from "../utils/constants";
import { APIResponseSuccess } from "../utils/response";

export class SignInResponse extends APIResponseSuccess {
  constructor(data: IdTokenResult) {
    super({
      token: data.token,
      expirationTime: Number.isNaN(Number(data.claims.exp)) ? Date.now() + 2 * ONE_HOUR_MS : Number(data.claims.exp),
    });
  }
}
