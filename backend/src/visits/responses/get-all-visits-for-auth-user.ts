import { APIResponseSuccess } from "../../shared/api-responses";
import { Visit } from "../models/visit";

export class GetAllVisitsForAuthUserResponse extends APIResponseSuccess {
  constructor(data: Visit[]) {
    super(data);
  }
}
