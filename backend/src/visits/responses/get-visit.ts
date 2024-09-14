import { APIResponseSuccess } from "../../../../libs/hang-around-contracts/src/classes";
import { Visit } from "../models/visit";

export class GetVisitResponse extends APIResponseSuccess {
  constructor(data: Visit | null) {
    super(data);
  }
}
