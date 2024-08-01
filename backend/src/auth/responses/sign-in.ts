import { APIResponseSuccess } from "../../shared/api-response-success";
import { Token } from "../models/token";

export class SignInResponse extends APIResponseSuccess {
  constructor(data: Token) {
    super(data);
  }
}
