import { APIResponseErrorI, APIResponseSuccessI } from "@dasminx/hang-around-common";

enum HTTPMethod {
  DELETE = "DELETE",
  GET = "GET",
  HEAD = "HEAD",
  OPTIONS = "OPTIONS",
  PATCH = "PATCH",
  POST = "POST",
  PUT = "PUT",
}

type OptsType = {
  method: keyof typeof HTTPMethod;
  send?: unknown;
  headers?: Record<string, string>;
};

export const fetchData = async (
  path: string,
  opts: OptsType,
): Promise<APIResponseSuccessI | APIResponseErrorI | Error> => {
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
    return (await res.json()) as APIResponseSuccessI | APIResponseErrorI;
  } catch (error) {
    return error as Error;
  }
};
