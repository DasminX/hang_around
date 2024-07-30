import { IdTokenResult } from "firebase/auth";

import { APIResponseSuccess } from "../../shared/api-response-success";
import { ONE_HOUR } from "../../utils/constants";

export class SignInResponse extends APIResponseSuccess {
  constructor(data: IdTokenResult) {
    super({
      token: data.token,
      expirationTime: Number.isNaN(Number(data.claims.exp)) ? Date.now() + 2 * ONE_HOUR : Number(data.claims.exp),
    });
  }
}
