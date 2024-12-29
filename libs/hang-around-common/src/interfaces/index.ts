import { Timestamp } from "../types";
import { Location } from "../value-objects";

export interface PlaceArgs {
  id: string;
  name: string;
  rating: number;
  ratingCount: number;
  mapsUri: string;
  location: Location;
  isAccessible: boolean;
  priceLevel: number;
}

export interface VisitArgs {
  id: string;
  name: string;
  location: Location;
  rating: number;
  priceLevel: number;
  mapsUri: URL | string;
  isAccessible: boolean;
  userId: string;
  happenedAt: Timestamp;
}
