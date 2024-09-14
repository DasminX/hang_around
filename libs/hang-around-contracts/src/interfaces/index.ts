import { TimestampBrand } from "../types";
import { LocationVO } from "../value-objects";

export interface PlaceArgs {
  id: string;
  name: string;
  rating: number;
  mapsUri: string;
  location: LocationVO;
  isAccessible: boolean;
}

export interface VisitArgs {
  id: string;
  name: string;
  location: LocationVO;
  rating: number;
  mapsUri: URL | string;
  isAccessible: boolean;
  userId: string;
  happenedAt: TimestampBrand;
}
