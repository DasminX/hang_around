import { Firestore } from "firebase-admin/firestore";

import { Visit, VisitArgs } from "../../models/visit";
import { VisitsDatabaseI } from "./abstract";

export class VisitsFirestore implements VisitsDatabaseI {
  constructor(private readonly db: Firestore) {}

  async createVisit(visitArgs: Omit<VisitArgs, "id">): Promise<Visit> {
    const addedVisit = await this.db.collection("visits").add({
      ...visitArgs,
      location: visitArgs.location.toGeoPoint(),
    });

    return new Visit({
      id: addedVisit.id,
      ...visitArgs,
    });
  }

  async getVisitById(visitId: string, userId: string): Promise<Visit | null> {
    const visitDocuments = await this.db
      .collection("visits")
      .where("userId", "==", userId)
      .where("__name__", "==", visitId)
      .get();

    let visit = null;

    const visitDocument = visitDocuments.docs.at(0);
    if (visitDocuments.size > 0 && visitDocument) {
      visit = new Visit({ id: visitDocument.id, ...(visitDocument.data() as Omit<VisitArgs, "id">) });
    }

    return visit;
  }

  async getVisitsForUser(userId: string): Promise<Visit[]> {
    const visitsDocuments = await this.db.collection("visits").where("userId", "==", userId).get();

    return visitsDocuments.docs.map((visit) => new Visit({ id: visit.id, ...(visit.data() as Omit<VisitArgs, "id">) }));
  }
}
