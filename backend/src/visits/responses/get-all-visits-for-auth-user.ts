import { APIResponseSuccess } from "../../../../libs/hang-around-contracts/src/classes";
import { Visit } from "../models/visit";

export class GetAllVisitsForAuthUserResponse extends APIResponseSuccess {
  constructor(data: Visit[]) {
    super(data);
  }
}
