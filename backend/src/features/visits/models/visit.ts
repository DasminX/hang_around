import { Location, Timestamp, VisitArgs } from "@dasminx/hang-around-common";

export class Visit {
  public readonly id: string;
  public readonly name: string;
  public readonly location: Location;
  public readonly rating: number;
  public readonly priceLevel: number;
  public readonly mapsUri: URL | string;
  public readonly isAccessible: boolean;
  public readonly userId: string;
  public readonly happenedAt: Timestamp;

  constructor(_args: VisitArgs) {
    this.id = _args.id;
    this.name = _args.name;
    this.location = _args.location;
    this.rating = _args.rating;
    this.priceLevel = _args.priceLevel;
    this.mapsUri = _args.mapsUri;
    this.isAccessible = _args.isAccessible;
    this.userId = _args.userId;
    this.happenedAt = _args.happenedAt;
  }
}
