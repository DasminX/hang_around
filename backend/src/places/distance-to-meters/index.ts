import { HowFar } from "../schema";

export class DistanceInMeters {
  private _value: number;
  constructor(howFar: HowFar) {
    this._value = howFar.unit === "yd" ? howFar.distance * 0.9144 : howFar.distance;
  }

  public getValue() {
    return this._value;
  }
}
