export type HowFar = {
  distance: number;
  unit: "m" | "yd";
};

export class DistanceConverter {
  private _distance: HowFar["distance"];
  private _unit: HowFar["unit"];

  constructor(howFar: HowFar) {
    this._distance = howFar.distance;
    this._unit = howFar.unit;
  }

  public getInMeters(): number {
    if (this._unit == "yd") {
      return this._distance * 0.9144;
    }

    return this._distance;
  }

  public getInYards(): number {
    if (this._unit == "m") {
      return this._distance * 1.0936133;
    }

    return this._distance;
  }
}
