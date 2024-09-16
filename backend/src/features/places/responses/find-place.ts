import { APIResponseSuccess } from "../../../shared/api-responses";
import { Place } from "../models/place";

export class FindPlaceResponse extends APIResponseSuccess {
  constructor(result: Place[]) {
    super(result);
  }
}
