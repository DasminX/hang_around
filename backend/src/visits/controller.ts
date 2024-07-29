import { FirebaseService } from "../shared/firebase.service";
import { ExpressMiddlewareCaught } from "../utils/types";
import { GetVisitResponse } from "./responses";
import { parseInputBySchemaOrThrow } from "../shared/validators/validate-zod-schema";
import { CREATE_VISIT_SCHEMA, GET_VISITS_SCHEMA } from "./schema";
import { Location } from "./location";

export const getVisitsForAuthUser: ExpressMiddlewareCaught = async (req, res) => {
  const visits = await FirebaseService.db.collection("visits").where("userId", "==", res.locals.user.user_id).get();

  const data = visits.docs.map((visit) => ({ id: visit.id, ...visit.data() }));

  return res.json(new GetVisitResponse(data));
};

export const getVisit: ExpressMiddlewareCaught = async (req, res) => {
  const { id: visitId } = parseInputBySchemaOrThrow(req.params, GET_VISITS_SCHEMA);

  const documents = await FirebaseService.db
    .collection("visits")
    .where("userId", "==", res.locals.user.user_id)
    .where("__name__", "==", visitId)
    .get();

  let data = null;
  if (documents.size > 0) {
    const visit = documents.docs.at(0);
    data = { id: visit!.id, ...visit!.data() };
  }

  return res.json(new GetVisitResponse(data));
};

export const createVisit: ExpressMiddlewareCaught = async (req, res) => {
  const { name, location, rating, mapsUri, isAccessible } = parseInputBySchemaOrThrow(req.body, CREATE_VISIT_SCHEMA);

  const addedVisit = await FirebaseService.db.collection("visits").add({
    name,
    location: new Location(location).toGeoPoint(),
    rating,
    mapsUri,
    isAccessible,
    userId: res.locals.user.user_id,
  });

  const place = await addedVisit.get();
  return res.json(new GetVisitResponse({ id: place.id, userId: res.locals.user.user_id, ...place.data() }));
};

// export const getAllUserVisits: ExpressMiddlewareCaught = async (req, res) => {

//   return res.json(new GetAllVisitsForUserResponse(null));
// };

// export const getAllVisits: ExpressMiddlewareCaught = async (req, res) => {
//   // const visitsCollection = await FirebaseService.db.collection("visits").get();

//   // const visits = visitsCollection.docs.map((doc) => Place.fromDoc(doc.data()));
//   // console.log(visits);

//   return res.json(new GetAllVisitsResponse(/* [...visits].map((visit) => new Place(visit.data())) */ null));
// };
