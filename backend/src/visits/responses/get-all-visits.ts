import { APIResponseSuccess } from "../../shared/api-response-success";

export class GetAllVisitsResponse extends APIResponseSuccess {
  constructor(data: unknown) {
    super(data);
  }
}
