import { PlacesClient } from "@googlemaps/places";

import { PlacesFinderError, PlacesFinderNotInitializedError } from "../../shared/errors";
import { Place } from "./place.model";

export class PlacesFinder {
  private static client: PlacesClient | null = null;

  public static initialize() {
    if (!PlacesFinder.client) {
      PlacesFinder.client = new PlacesClient({
        credentials: {
          private_key: ((process.env.GOOGLE_PLACES_API_PRIVATE_KEY as string) || "").split(String.raw`\n`).join("\n"),
          client_email: process.env.GOOGLE_PLACES_API_CLIENT_EMAIL,
        },
      });
    }
  }

  public static async find({
    location,
    typeOfFood,
    radius,
  }: {
    location: [number, number];
    typeOfFood: string;
    radius: number;
  }) {
    if (!this.client) {
      return new PlacesFinderNotInitializedError();
    }

    try {
      const res = await this.client.searchText(
        {
          locationBias: {
            circle: {
              center: {
                latitude: location[0],
                longitude: location[1],
              },
              radius: radius,
            },
          },
          textQuery: typeOfFood,
          includedType: "restaurant",
          maxResultCount: 5,
          openNow: true,
          minRating: 4,
        },
        {
          otherArgs: {
            headers: {
              "X-Goog-FieldMask":
                "places.id,places.accessibilityOptions,places.businessStatus,places.displayName,places.formattedAddress,places.googleMapsUri,places.iconBackgroundColor,places.iconMaskBaseUri,places.location,places.primaryType,places.shortFormattedAddress,places.types,places.utcOffsetMinutes",
              // "*",
            },
          },
        },
      );

      return res[0].places?.map((place) => Place.fromPlacesAPI(place)) ?? [];
    } catch (e) {
      return new PlacesFinderError(e);
    }
  }
}
