import { GeoPoint } from "firebase/firestore";

export type LocationArgs =
  | [number, number]
  | GeoPoint
  | LocationVO
  | { lat: number; lng: number };

export class LocationVO {
  public readonly lat: number;
  public readonly lng: number;

  constructor(args: LocationArgs) {
    if (Array.isArray(args)) {
      this.lat = args[0];
      this.lng = args[1];
    } else if (args instanceof GeoPoint) {
      this.lat = args.latitude;
      this.lng = args.longitude;
    } else {
      this.lat = args.lat;
      this.lng = args.lng;
    }
  }

  public equals(other: LocationVO) {
    return this.lat === other.lat && this.lng === other.lng;
  }

  public toGeoPoint(): GeoPoint {
    return new GeoPoint(this.lat, this.lng);
  }

  public toTuple(): [number, number] {
    return [this.lat, this.lng];
  }
}
