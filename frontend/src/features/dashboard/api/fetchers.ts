import { FindPlacesSchemaType, PlaceArgs } from "@dasminx/hang-around-common";
import { fetchData } from "../../../shared/fetcher";
import { BACKEND_API_PATH } from "../../../shared/config";

export const findPlaces = async (props: FindPlacesSchemaType, authToken: string) => {
  return await fetchData(`${BACKEND_API_PATH}/places/find`, {
    method: "POST",
    send: props,
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });
};

export const getVisits = async (authToken: string) => {
  return await fetchData(`${BACKEND_API_PATH}/visits`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });
};

export const getVisitById = async (id: string, authToken: string) => {
  return await fetchData(`${BACKEND_API_PATH}/visits/${id}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });
};

export const createVisit = async (props: Omit<PlaceArgs, "id">, authToken: string) => {
  return await fetchData(`${BACKEND_API_PATH}/visits`, {
    method: "POST",
    send: props,
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });
};
