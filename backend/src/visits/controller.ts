import { LocationVO } from "../shared/location";
import { parseInputBySchemaOrThrow } from "../shared/validators/validate-zod-schema";
import { ExpressMiddlewareCaught, TimestampBrand } from "../utils/types";
import { VisitsFirestore } from "./repositories/visits-database/firestore";
import { CreatevisitResponse, GetAllVisitsForAuthUserResponse, GetVisitResponse } from "./responses";
import { CREATE_VISIT_SCHEMA, GET_VISITS_SCHEMA } from "./schema";

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
    location: new LocationVO(location),
    happenedAt: Date.now() as TimestampBrand,
  });

  return res.json(new CreatevisitResponse(createdVisit));
};
