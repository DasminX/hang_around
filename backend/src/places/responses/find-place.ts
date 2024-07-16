import { google } from "@googlemaps/places/build/protos/protos";
import { APIResponseSuccess } from "../../shared/api-response-success";

export class FindPlaceResponse extends APIResponseSuccess {
  constructor(result: google.maps.places.v1.IPlace[]) {
    // TODO typ !!!!
    super(result);
  }
}
