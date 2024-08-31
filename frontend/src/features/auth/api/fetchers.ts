import { HTTPMethod } from "http-method-enum";
import { BACKEND_API_PATH } from "./config";
import { APIDataResponse, APIDetailsResponse } from "../../../utils/types";

type OptsType = {
  method: keyof typeof HTTPMethod;
  send: unknown;
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

export const login = async (email: string, password: string) => {
  return await fetchData(`${BACKEND_API_PATH}/auth/signin`, {
    method: "POST",
    send: { email, password },
  });
};

export const signup = async (email: string, password: string, repeatPassword: string) => {
  return await fetchData(`${BACKEND_API_PATH}/auth/signup`, {
    method: "POST",
    send: { email, password, repeatPassword },
  });
};

export const forgotPassword = async (email: string) => {
  return await fetchData(`${BACKEND_API_PATH}/auth/reset-password`, {
    method: "POST",
    send: { email },
  });
};

// export const changeForgottenPassword = async (email: string) => {
//   return await fetchData(`${BACKEND_API_PATH}/auth/reset-password`, {
//     method: "POST",
//     send: { email },
//   });
// };
