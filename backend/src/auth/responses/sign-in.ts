import { APIResponseSuccess } from "../../shared/api-response-success";
import { Token } from "../token/token.model";

export class SignInResponse extends APIResponseSuccess {
  constructor(data: Token) {
    super(data);
  }
}
