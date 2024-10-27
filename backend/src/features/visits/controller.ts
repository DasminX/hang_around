import { CREATE_VISIT_SCHEMA, GET_VISITS_SCHEMA, Location, Timestamp } from "@dasminx/hang-around-common";
import { StatusCodes } from "http-status-codes";

import { DataSource } from "../../shared/data-source";
import { parseInputBySchemaOrThrow } from "../../shared/validators/validate-zod-schema";
import { ExpressMiddlewareCaught } from "../../utils/types";
import { CreateVisitResponse, GetAllVisitsForAuthUserResponse, GetVisitResponse } from "./responses";

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
  const { name, location, rating, mapsUri, isAccessible, priceLevel } = parseInputBySchemaOrThrow(
    req.body,
    CREATE_VISIT_SCHEMA,
  );

  const createdVisit = await DataSource.visits.createVisit({
    name,
    rating,
    mapsUri,
    isAccessible,
    priceLevel,
    userId: res.locals.user.uid,
    location: new Location(location),
    happenedAt: Date.now() as Timestamp,
  });

  return res.status(StatusCodes.CREATED).json(new CreateVisitResponse(createdVisit));
};
