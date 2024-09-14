import { VisitArgs } from "../../../../libs/hang-around-contracts/src/interfaces";
import { TimestampBrand } from "../../../../libs/hang-around-contracts/src/types";
import { LocationVO } from "../../../../libs/hang-around-contracts/src/value-objects";

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
