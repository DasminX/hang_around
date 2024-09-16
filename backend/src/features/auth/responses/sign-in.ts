import { APIResponseSuccess } from "../../../shared/api-responses";
import { Token } from "../models/token";

export class SignInResponse extends APIResponseSuccess {
  constructor(data: Token) {
    super(data);
  }
}
