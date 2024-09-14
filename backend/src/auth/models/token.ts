import { TimestampBrand } from "@dasminx/hang-around-contracts";

export class Token {
  constructor(
    public readonly token: string,
    public readonly expirationTime: TimestampBrand,
  ) {}
}
