export type APIDataResponse = {
  status: "ok";
  data: Record<string, unknown>;
};

export type APIDetailsResponse = {
  status: "fail";
  errorCode: string;
  message: string;
  details: Details[] | null;
};

export type Details = {
  path: string;
  code: string;
  expected?: string;
  received?: string;
};
