import { google } from "@googlemaps/places/build/protos/protos";

import { Location } from "../../shared/location";

export type GooglePlace = google.maps.places.v1.IPlace;

export interface PlaceArgs {
  id: string;
  name: string;
  rating: number;
  mapsUri: string;
  location: Location;
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

  public static fromPlacesAPI(data: GooglePlace): Place {
    return new Place({
      id: data.id!,
      name: data.displayName!.text!,
      location: new Location({ lat: data.location!.latitude!, lng: data.location!.longitude! }),
      rating: data.rating!,
      mapsUri: data.googleMapsUri!,
      isAccessible: Boolean(data.accessibilityOptions?.wheelchairAccessibleEntrance),
    });
  }
}
