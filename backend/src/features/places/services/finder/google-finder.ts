import { AppError, Location } from "@dasminx/hang-around-common";
import { PlacesClient } from "@googlemaps/places";

import { Place } from "../../models/place";
import { getPriceLevelNumeric } from "../../utils/price-level-numeric";
import { PlacesFinderError, PlacesFinderNotInitializedError } from "./../../../../shared/errors";
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
      const res = await this._client.searchNearby(
        {
          includedTypes: ["restaurant"],
          maxResultCount: 20,
          locationRestriction: {
            circle: {
              center: {
                latitude: lat,
                longitude: lng,
              },
              radius: args.radius,
            },
          },
          includedPrimaryTypes: args.typesOfFood,
          languageCode: "en-GB",
          rankPreference: "POPULARITY",
        },
        {
          otherArgs: {
            headers: {
              "X-Goog-FieldMask":
                "places.id,places.accessibilityOptions,places.displayName,places.googleMapsUri,places.location,places.types,places.rating,places.priceLevel",
              // "*",
            },
          },
        },
      );

      if (!Array.isArray(res[0].places) || !res[0].places.length) {
        return [];
      }

      return res[0].places
        .filter((place) => {
          if (args.openOnly && !(place.currentOpeningHours?.openNow || place.regularOpeningHours?.openNow)) {
            return false;
          }

          if (args.minRating && (typeof place.rating !== "number" || +place.rating < args.minRating)) {
            return false;
          }

          const placePriceLevelNumeric = getPriceLevelNumeric(place.priceLevel);

          if (
            typeof placePriceLevelNumeric !== "number" ||
            placePriceLevelNumeric < args.priceLevels[0] ||
            placePriceLevelNumeric > args.priceLevels[1]
          ) {
            return false;
          }

          return true;
        })
        .map(
          (place) =>
            new Place({
              id: place.id ?? "Not specified",
              name: place.displayName?.text ?? "Not specified",
              location: new Location({
                lat: place.location?.latitude ?? Number.NaN,
                lng: place.location?.longitude ?? Number.NaN,
              }),
              rating: place.rating ?? Number.NaN,
              mapsUri: place.googleMapsUri ?? "",
              isAccessible: Boolean(place.accessibilityOptions?.wheelchairAccessibleEntrance),
              priceLevel: getPriceLevelNumeric(place.priceLevel),
            }),
        );
    } catch (e) {
      console.log(e);
      return new PlacesFinderError(e);
    }
  }
}
