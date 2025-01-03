import { PlaceArgs } from "@dasminx/hang-around-common";

export class Place {
  public id: PlaceArgs["id"];
  public name: PlaceArgs["name"];
  public location: PlaceArgs["location"];
  public rating: PlaceArgs["rating"];
  public ratingCount: PlaceArgs["ratingCount"];
  public mapsUri: PlaceArgs["mapsUri"];
  public isAccessible: PlaceArgs["isAccessible"];
  public priceLevel: PlaceArgs["priceLevel"];

  constructor(_place: PlaceArgs) {
    this.id = _place.id;
    this.name = _place.name;
    this.location = _place.location;
    this.rating = _place.rating;
    this.ratingCount = _place.ratingCount;
    this.mapsUri = _place.mapsUri;
    this.isAccessible = _place.isAccessible;
    this.priceLevel = _place.priceLevel;
  }
}
