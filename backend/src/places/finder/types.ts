import { google } from "@googlemaps/places/build/protos/protos";

export type FindPlaceResult = google.maps.places.v1.IPlace[] | null | undefined;
