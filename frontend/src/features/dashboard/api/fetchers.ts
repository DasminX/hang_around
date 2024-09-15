import { HowFar, LocationVO, PlaceArgs, TYPE_OF_FOOD_ARRAY } from "@dasminx/hang-around-common";
import { fetchData } from "../../../shared/functions";
import { BACKEND_API_PATH } from "../../../shared/config";

export type PlacesFindArgs = {
  location: LocationVO;
  typesOfFood: Array<(typeof TYPE_OF_FOOD_ARRAY)[number]>;
  howFar: HowFar;
  minRating: number;
};

export const findPlaces = async (props: PlacesFindArgs) => {
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

export const createVisit = async (props: Omit<PlaceArgs, "id">) => {
  return await fetchData(`${BACKEND_API_PATH}/visits`, {
    method: "POST",
    send: props,
  });
};
