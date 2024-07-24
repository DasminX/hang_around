import { FirebaseService } from "../shared/firebase.service";
import { ExpressMiddlewareCaught } from "../utils/types";
import { GetAllVisitsForUserResponse, GetAllVisitsResponse, GetVisitResponse } from "./responses";

export const getAllVisits: ExpressMiddlewareCaught = async (req, res) => {
  return res.json(new GetAllVisitsResponse(null));
};
export const getVisit: ExpressMiddlewareCaught = async (req, res) => {
  return res.json(new GetVisitResponse(null));
};
export const getAllUserVisits: ExpressMiddlewareCaught = async (req, res) => {
  return res.json(new GetAllVisitsForUserResponse(null));
};
