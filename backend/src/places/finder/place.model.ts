import { google } from "@googlemaps/places/build/protos/protos";

export type GooglePlace = google.maps.places.v1.IPlace;

export class Place {
  public name: string;
  public id: GooglePlace["id"];
  public location: GooglePlace["location"];
  public rating: GooglePlace["rating"];
  public mapsUri: GooglePlace["googleMapsUri"];
  public isAccessible: boolean;

  constructor(_place: GooglePlace) {
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
