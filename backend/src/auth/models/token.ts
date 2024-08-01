import { TimestampBrand } from "../../utils/types";

export class Token {
  constructor(
    public readonly token: string,
    public readonly expirationTime: TimestampBrand,
  ) {}
}
