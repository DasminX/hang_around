type HowFar = {
  distance: number;
  unit: "m" | "yd";
};

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

  public getInYards() {
    if (this._unit == "m") {
      return this._distance * 1.0936133;
    }

    return this._distance;
  }
}
