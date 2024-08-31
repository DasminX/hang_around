export type APIDataResponse = {
  status: "ok";
  data: Record<string, unknown>;
};

export type APIDetailsResponse = {
  status: "fail";
  message: string;
  details: string[] | Record<string, any> | undefined | null;
};
