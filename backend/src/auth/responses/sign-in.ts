import { APIResponseSuccess } from "../../../../libs/hang-around-contracts/src/classes";
import { Token } from "../models/token";

export class SignInResponse extends APIResponseSuccess {
  constructor(data: Token) {
    super(data);
  }
}
