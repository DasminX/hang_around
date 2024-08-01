import { FirebaseService } from "../shared/firebase.service";
import { Location } from "../shared/location";
import { parseInputBySchemaOrThrow } from "../shared/validators/validate-zod-schema";
import { ExpressMiddlewareCaught, Timestamp } from "../utils/types";
import { CreatevisitResponse, GetAllVisitsForAuthUserResponse, GetVisitResponse } from "./responses";
import { CREATE_VISIT_SCHEMA, GET_VISITS_SCHEMA } from "./schema";
import { Visit, VisitArgs } from "./visit.model";

export const getVisitsForAuthUser: ExpressMiddlewareCaught = async (_req, res) => {
  const visitsDocuments = await FirebaseService.db
    .collection("visits")
    .where("userId", "==", res.locals.user.user_id)
    .get();

  const visits = visitsDocuments.docs.map(
    (visit) => new Visit({ id: visit.id, ...(visit.data() as Omit<VisitArgs, "id">) }),
  );

  return res.json(new GetAllVisitsForAuthUserResponse(visits));
};

export const getVisit: ExpressMiddlewareCaught = async (req, res) => {
  const { id: visitId } = parseInputBySchemaOrThrow(req.params, GET_VISITS_SCHEMA);

  const visitDocuments = await FirebaseService.db
    .collection("visits")
    .where("userId", "==", res.locals.user.user_id)
    .where("__name__", "==", visitId)
    .get();

  let visit = null;

  const visitDocument = visitDocuments.docs.at(0);
  if (visitDocuments.size > 0 && visitDocument) {
    visit = new Visit({ id: visitDocument.id, ...(visitDocument.data() as Omit<VisitArgs, "id">) });
  }

  return res.json(new GetVisitResponse(visit));
};

export const createVisit: ExpressMiddlewareCaught = async (req, res) => {
  const { name, location, rating, mapsUri, isAccessible } = parseInputBySchemaOrThrow(req.body, CREATE_VISIT_SCHEMA);

  const commonArgs = {
    name,
    rating,
    mapsUri,
    isAccessible,
    userId: res.locals.user.user_id,
    happenedAt: Date.now() as Timestamp,
  };
  const locationObject = new Location(location);

  const addedVisit = await FirebaseService.db.collection("visits").add({
    location: locationObject.toGeoPoint(),
    ...commonArgs,
  });

  return res.json(
    new CreatevisitResponse(
      new Visit({
        id: addedVisit.id,
        location: locationObject,
        ...commonArgs,
      }),
    ),
  );
};
