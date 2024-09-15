import { FindPlacesSchemaType, PlaceArgs } from "@dasminx/hang-around-common";
import { fetchData } from "../../../shared/fetcher";
import { BACKEND_API_PATH } from "../../../shared/config";

export const findPlaces = async (props: FindPlacesSchemaType) => {
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
