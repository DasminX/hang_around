import { google } from "@googlemaps/places/build/protos/protos";

export type PlaceI = google.maps.places.v1.IPlace;

export class Place {
  public name: string;
  public id: PlaceI["id"];
  public location: PlaceI["location"];
  public rating: PlaceI["rating"];
  public mapsUri: PlaceI["googleMapsUri"];
  public isAccessible: boolean;

  constructor(_place: PlaceI) {
    this.name = _place.displayName!.text!;
    this.id = _place.id;
    this.location = _place.location;
    this.rating = _place.rating;
    this.mapsUri = _place.googleMapsUri;
    this.isAccessible = _place.accessibilityOptions!.wheelchairAccessibleEntrance!;
  }

  public static empty() {
    return [];
  }
}
