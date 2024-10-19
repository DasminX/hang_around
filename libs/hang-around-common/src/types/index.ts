export type HowFar = {
  distance: number;
  unit: "m" | "yd";
};

export type Brand<K, T> = K & { __brand: T };
export type Timestamp = Brand<number, "timestamp">;
