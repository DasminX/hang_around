import { Timestamp } from "../types";
import { Location } from "../value-objects";

export interface PlaceArgs {
  id: string;
  name: string;
  rating: number;
  mapsUri: string;
  location: Location;
  isAccessible: boolean;
}

export interface VisitArgs {
  id: string;
  name: string;
  location: Location;
  rating: number;
  mapsUri: URL | string;
  isAccessible: boolean;
  userId: string;
  happenedAt: Timestamp;
}
