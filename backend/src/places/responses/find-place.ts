import { APIResponseSuccess } from "../../shared/api-response-success";
import { FindPlaceResult } from "../finder/types";

export class FindPlaceResponse extends APIResponseSuccess {
  constructor(result: FindPlaceResult) {
    super(result);
  }
}
