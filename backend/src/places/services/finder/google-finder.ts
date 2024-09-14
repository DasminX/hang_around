import { AppError, LocationVO } from "@dasminx/hang-around-contracts";
import { PlacesClient } from "@googlemaps/places";

import { PlacesFinderError, PlacesFinderNotInitializedError } from "../../../shared/errors";
import { Place } from "../../models/place";
import { PlacesFindArgs, PlacesFinderI } from "./abstract";

export class GooglePlacesFinder implements PlacesFinderI {
  private _client: PlacesClient;

  constructor() {
    this._client = new PlacesClient({
      credentials: {
        private_key: ((process.env.GOOGLE_PLACES_API_PRIVATE_KEY as string) || "").split(String.raw`\n`).join("\n"),
        client_email: process.env.GOOGLE_PLACES_API_CLIENT_EMAIL,
      },
    });
  }

  public async find(args: PlacesFindArgs): Promise<Place[] | AppError> {
    if (!this._client) {
      return new PlacesFinderNotInitializedError();
    }

    const [lat, lng] = args.location.toTuple();

    try {
      const res = await this._client.searchText(
        {
          locationBias: {
            circle: {
              center: {
                latitude: lat,
                longitude: lng,
              },
              radius: args.radius,
            },
          },
          textQuery: args.typesOfFood.join(","),
          includedType: "restaurant",
          maxResultCount: 20,
          openNow: true,
          minRating: args.minRating,
        },
        {
          otherArgs: {
            headers: {
              "X-Goog-FieldMask":
                "places.id,places.accessibilityOptions,places.businessStatus,places.displayName,places.formattedAddress,places.googleMapsUri,places.iconBackgroundColor,places.iconMaskBaseUri,places.location,places.primaryType,places.shortFormattedAddress,places.types,places.utcOffsetMinutes,places.rating",
              // "*",
            },
          },
        },
      );

      if (!Array.isArray(res[0].places) || !res[0].places.length) {
        return [];
      }

      return res[0].places.map(
        (place) =>
          new Place({
            id: place.id ?? "Not specified",
            name: place.displayName?.text ?? "Not specified",
            location: new LocationVO({
              lat: place.location?.latitude ?? Number.NaN,
              lng: place.location?.longitude ?? Number.NaN,
            }),
            rating: place.rating ?? Number.NaN,
            mapsUri: place.googleMapsUri ?? "",
            isAccessible: Boolean(place.accessibilityOptions?.wheelchairAccessibleEntrance),
          }),
      );
    } catch (e) {
      console.log(e);
      return new PlacesFinderError(e);
    }
  }
}
