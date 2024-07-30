import { FirebaseService } from "../shared/firebase.service";
import { Location } from "../shared/location";
import { parseInputBySchemaOrThrow } from "../shared/validators/validate-zod-schema";
import { ExpressMiddlewareCaught } from "../utils/types";
import { CreatevisitResponse, GetAllVisitsForAuthUserResponse, GetVisitResponse } from "./responses";
import { CREATE_VISIT_SCHEMA, GET_VISITS_SCHEMA } from "./schema";
import { Visit, VisitArgs } from "./visit.model";

export const getVisitsForAuthUser: ExpressMiddlewareCaught = async (_req, res) => {
  const visits = await FirebaseService.db.collection("visits").where("userId", "==", res.locals.user.user_id).get();

  const data = visits.docs.map((visit) => new Visit({ id: visit.id, ...(visit.data() as Omit<VisitArgs, "id">) }));

  return res.json(new GetAllVisitsForAuthUserResponse(data));
};

export const getVisit: ExpressMiddlewareCaught = async (req, res) => {
  const { id: visitId } = parseInputBySchemaOrThrow(req.params, GET_VISITS_SCHEMA);

  const documents = await FirebaseService.db
    .collection("visits")
    .where("userId", "==", res.locals.user.user_id)
    .where("__name__", "==", visitId)
    .get();

  let data = null;
  const visit = documents.docs.at(0);
  if (documents.size > 0 && visit) {
    data = new Visit({ id: visit.id, ...(visit.data() as Omit<VisitArgs, "id">) });
  }

  return res.json(new GetVisitResponse(data));
};

export const createVisit: ExpressMiddlewareCaught = async (req, res) => {
  const { name, location, rating, mapsUri, isAccessible } = parseInputBySchemaOrThrow(req.body, CREATE_VISIT_SCHEMA);

  const commonArgs = {
    name,
    rating,
    mapsUri,
    isAccessible,
    userId: res.locals.user.user_id,
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
