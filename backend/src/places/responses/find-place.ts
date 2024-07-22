import { APIResponseSuccess } from "../../shared/api-response-success";
import { Place } from "../finder/place.model";

export class FindPlaceResponse extends APIResponseSuccess {
  constructor(result: Place[]) {
    super(result);
  }
}
