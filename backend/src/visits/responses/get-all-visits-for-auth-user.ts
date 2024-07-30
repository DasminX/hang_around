import { APIResponseSuccess } from "../../shared/api-response-success";

export class GetAllVisitsForAuthUserResponse extends APIResponseSuccess {
  constructor(data: unknown) {
    super(data);
  }
}
