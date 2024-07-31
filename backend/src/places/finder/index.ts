import { PlacesClient } from "@googlemaps/places";

import { PlacesFinderError, PlacesFinderNotInitializedError } from "../../shared/errors";
import { Location } from "../../shared/location";
import { ElementType } from "../../utils/types";
import { Place } from "../place.model";
import { TYPE_OF_FOOD_ARRAY } from "./../schema";

// TODO change typeOfFood to array of items instead of single items
type PlacesFindArgs = {
  location: Location;
  typeOfFood: ElementType<typeof TYPE_OF_FOOD_ARRAY>;
  radius: number;
  minRating: number;
};

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

  public static async find(args: PlacesFindArgs) {
    if (!this.client) {
      return new PlacesFinderNotInitializedError();
    }

    const [lat, lng] = args.location.toTuple();

    try {
      const res = await this.client.searchText(
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
          textQuery: args.typeOfFood,
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

      return res[0].places?.map((place) => Place.fromPlacesAPI(place)) ?? [];
    } catch (e) {
      return new PlacesFinderError(e);
    }
  }
}
