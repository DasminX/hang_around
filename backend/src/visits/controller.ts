import { LocationVO } from "@dasminx/hang-around-contracts";
import { StatusCodes } from "http-status-codes";

import { TimestampBrand } from "../../../libs/hang-around-contracts/src/types";
import { DataSource } from "../shared/data-source";
import { parseInputBySchemaOrThrow } from "../shared/validators/validate-zod-schema";
import { ExpressMiddlewareCaught } from "../utils/types";
import { CreatevisitResponse, GetAllVisitsForAuthUserResponse, GetVisitResponse } from "./responses";
import { CREATE_VISIT_SCHEMA, GET_VISITS_SCHEMA } from "./schema";

export const getVisitsForAuthUser: ExpressMiddlewareCaught = async (_req, res) => {
  const visits = await DataSource.visits.getVisitsForUser(res.locals.user.uid);

  return res.status(StatusCodes.OK).json(new GetAllVisitsForAuthUserResponse(visits));
};

export const getVisit: ExpressMiddlewareCaught = async (req, res) => {
  const { id: visitId } = parseInputBySchemaOrThrow(req.params, GET_VISITS_SCHEMA);

  const visit = await DataSource.visits.getVisitById(visitId, res.locals.user.uid);

  return res.status(StatusCodes.OK).json(new GetVisitResponse(visit));
};

export const createVisit: ExpressMiddlewareCaught = async (req, res) => {
  const { name, location, rating, mapsUri, isAccessible } = parseInputBySchemaOrThrow(req.body, CREATE_VISIT_SCHEMA);

  const createdVisit = await DataSource.visits.createVisit({
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
