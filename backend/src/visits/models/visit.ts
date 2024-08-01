import { LocationVO } from "../../shared/location";
import { TimestampBrand } from "../../utils/types";

export type VisitArgs = {
  id: string;
  name: string;
  location: LocationVO;
  rating: number;
  mapsUri: URL | string;
  isAccessible: boolean;
  userId: string;
  happenedAt: TimestampBrand;
};

export class Visit {
  public readonly id: string;
  public readonly name: string;
  public readonly location: LocationVO;
  public readonly rating: number;
  public readonly mapsUri: URL | string;
  public readonly isAccessible: boolean;
  public readonly userId: string;
  public readonly happenedAt: TimestampBrand;

  constructor(_args: VisitArgs) {
    this.id = _args.id;
    this.name = _args.name;
    this.location = _args.location;
    this.rating = _args.rating;
    this.mapsUri = _args.mapsUri;
    this.isAccessible = _args.isAccessible;
    this.userId = _args.userId;
    this.happenedAt = _args.happenedAt;
  }
}
