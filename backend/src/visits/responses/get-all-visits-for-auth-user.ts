import { APIResponseSuccess } from "../../shared/api-response-success";
import { Visit } from "../models/visit";

export class GetAllVisitsForAuthUserResponse extends APIResponseSuccess {
  constructor(data: Visit[]) {
    super(data);
  }
}
