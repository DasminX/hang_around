import path from "path";
import { PlacesClient } from "@googlemaps/places";

import { AppError } from "../../utils/appError";

export class PlacesFinder {
  private static client: PlacesClient | null = null;

  private static initializeClient() {
    if (!PlacesFinder.client) {
      PlacesFinder.client = new PlacesClient({
        keyFile: path.join(
          process.cwd(),
          (process.env.GOOGLE_PLACES_API_JSON_PATH as string) || "empty.txt"
        ),
      });
    }
  }

  public static async find({
    location,
    query,
  }: {
    location: [number, number];
    query: string;
  }) {
    if (!PlacesFinder.client) {
      this.initializeClient();
    }
    if (this.client == null) {
      return new AppError("Error! Client not initialized...", 400);
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
              radius: 1000,
            },
          },
          textQuery: query,
          includedType: "restaurant",
          maxResultCount: 5,
          // openNow: true,
          // minRating: 3.5,
        },
        {
          otherArgs: {
            headers: {
              "X-Goog-FieldMask":
                "places.id,places.accessibilityOptions,places.businessStatus,places.displayName,places.formattedAddress,places.googleMapsUri,places.iconBackgroundColor,places.iconMaskBaseUri,places.location,places.primaryType,places.shortFormattedAddress,places.types,places.utcOffsetMinutes",
            },
          },
        }
      );

      return res[0].places;
    } catch (error) {
      return new AppError(error as string, 400);
    }
  }
}
