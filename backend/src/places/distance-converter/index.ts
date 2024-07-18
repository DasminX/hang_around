import { HowFar } from "../schema";

export class DistanceConverter {
  private _distance: HowFar["distance"];
  private _unit: HowFar["unit"];

  constructor({ distance, unit }: HowFar) {
    this._distance = distance;
    this._unit = unit;
  }

  public getInMeters() {
    if (this._unit == "yd") {
      return this._distance * 0.9144;
    }

    return this._distance;
  }
}
