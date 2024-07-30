import { APIResponseSuccess } from "../../shared/api-response-success";
import { Place } from "../place.model";

export class FindPlaceResponse extends APIResponseSuccess {
  constructor(result: Place[]) {
    super(result);
  }
}
