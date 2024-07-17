import path from "path";
import { PlacesClient } from "@googlemaps/places";
import { PlacesFinderError, PlacesFinderNotInitializedError } from "../../shared/errors";

export class PlacesFinder {
  private static client: PlacesClient | null = null;

  public static initialize() {
    if (!PlacesFinder.client) {
      PlacesFinder.client = new PlacesClient({
        keyFile: path.join(process.cwd(), (process.env.GOOGLE_PLACES_API_JSON_PATH as string) || ""),
      });
    }
  }

  public static async find({ location, queryText }: { location: [number, number]; queryText: string }) {
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
              radius: 1000,
            },
          },
          textQuery: queryText,
          includedType: "restaurant",
          maxResultCount: 5,
          // openNow: true, // TODO prod uncomment
          // minRating: 3.5,
        },
        {
          otherArgs: {
            headers: {
              "X-Goog-FieldMask":
                "places.id,places.accessibilityOptions,places.businessStatus,places.displayName,places.formattedAddress,places.googleMapsUri,places.iconBackgroundColor,places.iconMaskBaseUri,places.location,places.primaryType,places.shortFormattedAddress,places.types,places.utcOffsetMinutes",
            },
          },
        },
      );

      return res[0].places;
    } catch (e) {
      return new PlacesFinderError(e);
    }
  }
}
