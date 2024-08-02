import { StatusCodes } from "http-status-codes";

import { parseInputBySchemaOrThrow } from "../shared/validators/validate-zod-schema";
import { LocationVO } from "../shared/value-objects/location";
import { ExpressMiddlewareCaught, TimestampBrand } from "../utils/types";
import { VisitsFirestore } from "./repositories/visits-database/firestore";
import { CreatevisitResponse, GetAllVisitsForAuthUserResponse, GetVisitResponse } from "./responses";
import { CREATE_VISIT_SCHEMA, GET_VISITS_SCHEMA } from "./schema";

export const getVisitsForAuthUser: ExpressMiddlewareCaught = async (_req, res) => {
  const visits = await new VisitsFirestore().getVisitsForUser(res.locals.user.uid);

  return res.status(StatusCodes.OK).json(new GetAllVisitsForAuthUserResponse(visits));
};

export const getVisit: ExpressMiddlewareCaught = async (req, res) => {
  const { id: visitId } = parseInputBySchemaOrThrow(req.params, GET_VISITS_SCHEMA);

  const visit = await new VisitsFirestore().getVisitById(visitId, res.locals.user.uid);

  return res.status(StatusCodes.OK).json(new GetVisitResponse(visit));
};

// TODO INJECT DB FACTORY
export const createVisit: ExpressMiddlewareCaught = async (req, res) => {
  const { name, location, rating, mapsUri, isAccessible } = parseInputBySchemaOrThrow(req.body, CREATE_VISIT_SCHEMA);

  const createdVisit = await new VisitsFirestore().createVisit({
    name,
    rating,
    mapsUri,
    isAccessible,
    userId: res.locals.user.uid,
    location: new LocationVO(location),
    happenedAt: Date.now() as TimestampBrand,
  });

  return res.status(StatusCodes.CREATED).json(new CreatevisitResponse(createdVisit));
};
