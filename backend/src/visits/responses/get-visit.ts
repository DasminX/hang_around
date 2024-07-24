import { APIResponseSuccess } from "../../shared/api-response-success";

export class GetVisitResponse extends APIResponseSuccess {
  constructor(data: unknown) {
    super(data);
  }
}
