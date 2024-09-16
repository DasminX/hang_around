import { APIResponseSuccess } from "../../../shared/api-responses";
import { Visit } from "../models/visit";

export class GetVisitResponse extends APIResponseSuccess {
  constructor(data: Visit | null) {
    super(data);
  }
}
