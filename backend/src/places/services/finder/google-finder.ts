import { PlacesClient } from "@googlemaps/places";
import { Logger } from "winston";

import { AppError, PlacesFinderError, PlacesFinderNotInitializedError } from "../../../shared/errors";
import { LocationVO } from "../../../shared/value-objects/location";
import { Place } from "../../models/place";
import { PlacesFindArgs, PlacesFinderI } from "./abstract";

export class GooglePlacesFinder implements PlacesFinderI {
  private static client: PlacesClient;

  protected constructor() {}

  public static initialize(logger: Logger): void {
    if (!this.client) {
      this.client = new PlacesClient({
        credentials: {
          private_key: ((process.env.GOOGLE_PLACES_API_PRIVATE_KEY as string) || "").split(String.raw`\n`).join("\n"),
          client_email: process.env.GOOGLE_PLACES_API_CLIENT_EMAIL,
        },
      });

      logger.info(`Google Places Finder initialized...`);
    }
  }

  public static async find(args: PlacesFindArgs): Promise<Place[] | AppError> {
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
            id: place.id!,
            name: place.displayName!.text!,
            location: new LocationVO({ lat: place.location!.latitude!, lng: place.location!.longitude! }),
            rating: place.rating!,
            mapsUri: place.googleMapsUri!,
            isAccessible: Boolean(place.accessibilityOptions?.wheelchairAccessibleEntrance),
          }),
      );
    } catch (e) {
      return new PlacesFinderError(e);
    }
  }
}
