import { Location } from "../shared/location";
import { parseInputBySchemaOrThrow } from "../shared/validators/validate-zod-schema";
import { ExpressMiddlewareCaught, Timestamp } from "../utils/types";
import { CreatevisitResponse, GetAllVisitsForAuthUserResponse, GetVisitResponse } from "./responses";
import { CREATE_VISIT_SCHEMA, GET_VISITS_SCHEMA } from "./schema";
import { VisitsFirestore } from "./services/visits-database/firestore";

export const getVisitsForAuthUser: ExpressMiddlewareCaught = async (_req, res) => {
  const visits = await new VisitsFirestore().getVisitsForUser(res.locals.user.user_id);

  return res.json(new GetAllVisitsForAuthUserResponse(visits));
};

export const getVisit: ExpressMiddlewareCaught = async (req, res) => {
  const { id: visitId } = parseInputBySchemaOrThrow(req.params, GET_VISITS_SCHEMA);

  const visit = await new VisitsFirestore().getVisitById(visitId, res.locals.user.user_id);

  return res.json(new GetVisitResponse(visit));
};

export const createVisit: ExpressMiddlewareCaught = async (req, res) => {
  const { name, location, rating, mapsUri, isAccessible } = parseInputBySchemaOrThrow(req.body, CREATE_VISIT_SCHEMA);

  const createdVisit = await new VisitsFirestore().createVisit({
    name,
    rating,
    mapsUri,
    isAccessible,
    userId: res.locals.user.user_id,
    location: new Location(location),
    happenedAt: Date.now() as Timestamp,
  });

  return res.json(new CreatevisitResponse(createdVisit));
};
