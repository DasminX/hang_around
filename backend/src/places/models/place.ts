import { LocationVO } from "../../shared/value-objects/location";

export interface PlaceArgs {
  id: string;
  name: string;
  rating: number;
  mapsUri: string;
  location: LocationVO;
  isAccessible: boolean;
}

export class Place {
  public id: PlaceArgs["id"];
  public name: string;
  public location: PlaceArgs["location"];
  public rating: PlaceArgs["rating"];
  public mapsUri: PlaceArgs["mapsUri"];
  public isAccessible: boolean;

  constructor(_place: PlaceArgs) {
    this.id = _place.id;
    this.name = _place.name;
    this.location = _place.location;
    this.rating = _place.rating;
    this.mapsUri = _place.mapsUri;
    this.isAccessible = _place.isAccessible;
  }
}