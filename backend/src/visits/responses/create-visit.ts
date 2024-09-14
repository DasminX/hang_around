import { APIResponseSuccess } from "../../shared/api-responses";
import { Visit } from "../models/visit";

export class CreatevisitResponse extends APIResponseSuccess {
  constructor(data: Visit) {
    super(data);
  }
}
