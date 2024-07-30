import { APIResponseSuccess } from "../../shared/api-response-success";

export class CreatevisitResponse extends APIResponseSuccess {
  constructor(data: unknown) {
    super(data);
  }
}
