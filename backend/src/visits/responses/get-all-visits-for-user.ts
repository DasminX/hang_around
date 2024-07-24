import { APIResponseSuccess } from "../../shared/api-response-success";

export class GetAllVisitsForUserResponse extends APIResponseSuccess {
  constructor(data: unknown) {
    super(data);
  }
}
