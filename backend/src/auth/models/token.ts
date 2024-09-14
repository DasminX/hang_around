import { TimestampBrand } from "../../../../libs/hang-around-contracts/src/types";

export class Token {
  constructor(
    public readonly token: string,
    public readonly expirationTime: TimestampBrand,
  ) {}
}
