import { TimestampBrand } from "@dasminx/hang-around-common";

export class Token {
  constructor(
    public readonly token: string,
    public readonly expirationTime: TimestampBrand,
  ) {}
}
