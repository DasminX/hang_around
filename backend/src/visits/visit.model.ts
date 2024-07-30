import { Location } from "../shared/location";

export type VisitArgs = {
  id: string;
  name: string;
  location: Location;
  rating: number;
  mapsUri: URL | string;
  isAccessible: boolean;
  userId: string;
};

export class Visit {
  public readonly id: string;
  public readonly name: string;
  public readonly location: Location;
  public readonly rating: number;
  public readonly mapsUri: URL | string;
  public readonly isAccessible: boolean;
  public readonly userId: string;

  constructor(args: VisitArgs) {
    this.id = args.id;
    this.name = args.name;
    this.location = args.location;
    this.rating = args.rating;
    this.mapsUri = args.mapsUri;
    this.isAccessible = args.isAccessible;
    this.userId = args.userId;
  }
}
