import { APIResponseSuccess } from "../../../../libs/hang-around-contracts/src/classes";
import { Place } from "../models/place";

export class FindPlaceResponse extends APIResponseSuccess {
  constructor(result: Place[]) {
    super(result);
  }
}
