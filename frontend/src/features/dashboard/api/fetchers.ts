import { HTTPMethod } from "http-method-enum";
import { BACKEND_API_PATH } from "./config";
import { APIDataResponse, APIDetailsResponse } from "../../../utils/types";

type OptsType = {
  method: keyof typeof HTTPMethod;
  send?: unknown;
  headers?: Record<string, string>;
};

export const fetchData = async (
  path: string,
  opts: OptsType,
): Promise<APIDataResponse | APIDetailsResponse | Error> => {
  try {
    const res = await fetch(path, {
      method: opts.method,
      ...(opts.method !== "GET" && opts.method !== "HEAD" && { body: JSON.stringify(opts.send) }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        ...opts.headers,
      },
    });
    return (await res.json()) as APIDataResponse | APIDetailsResponse;
  } catch (error) {
    return error as Error;
  }
};

type FindPlaceProps = {
  location: { lat: number; lng: number };
  typesOfFood:
    | "pizza"
    | "burger"
    | "asian food"
    | "sushi"
    | "pasta"
    | "hungarian food"
    | "kebab"
    | "polish food"
    | "czech food"
    | "fish"
    | "mexican food"
    | "indian food"
    | "greek food"
    | "french food"
    | "italian food"
    | "spanish food"
    | "middle eastern food"
    | "thai food"
    | "vegan food"
    | "vegetarian food"
    | "bbq"
    | "fast food"
    | "comfort food"
    | "seafood"
    | "desserts"
    | "breakfast food"
    | "brunch food"
    | "mediterranean food";
  howFar: {
    distance: number;
    unit: "m" | "yd";
  };
  minRating: number;
};

export const findPlaces = async (props: FindPlaceProps) => {
  return await fetchData(`${BACKEND_API_PATH}/places/find`, {
    method: "POST",
    send: props,
  });
};

export const getVisits = async () => {
  return await fetchData(`${BACKEND_API_PATH}/visits`, {
    method: "GET",
  });
};

export const getVisitById = async (id: string) => {
  return await fetchData(`${BACKEND_API_PATH}/visits/${id}`, {
    method: "GET",
  });
};

type CreateVisitProps = {
  name: string;
  location: {
    lat: number;
    lng: number;
  };
  rating: number;
  mapsUri: string;
  isAccessible: boolean;
};
export const createVisit = async (props: CreateVisitProps) => {
  return await fetchData(`${BACKEND_API_PATH}/visits`, {
    method: "POST",
    send: props,
  });
};
