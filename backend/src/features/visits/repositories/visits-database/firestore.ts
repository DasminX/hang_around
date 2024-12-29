import { VisitArgs } from "@dasminx/hang-around-common";
import { Firestore } from "firebase-admin/firestore";

import { Visit } from "../../models/visit";
import { VisitsDatabaseI } from "./abstract";

export class VisitsFirestore implements VisitsDatabaseI {
  constructor(private readonly _db: Firestore) {}

  async createVisit(visitArgs: Omit<VisitArgs, "id">): Promise<Visit> {
    const addedVisit = await this._db.collection("visits").add({
      ...visitArgs,
      location: visitArgs.location.toTuple(),
    });

    return new Visit({
      id: addedVisit.id,
      ...visitArgs,
    });
  }

  async getVisitById(visitId: string, userId: string): Promise<Visit | null> {
    const visitDocuments = await this._db
      .collection("visits")
      .where("userId", "==", userId)
      .where("__name__", "==", visitId)
      .get();

    let visit = null;

    const visitDocument = visitDocuments.docs.at(0);
    if (visitDocument) {
      visit = new Visit({ id: visitDocument.id, ...(visitDocument.data() as Omit<VisitArgs, "id">) });
    }

    return visit;
  }

  async getVisitsForUser(userId: string): Promise<Visit[]> {
    const visitsDocuments = await this._db.collection("visits").where("userId", "==", userId).get();

    return [
      ...visitsDocuments.docs.map((visit) => new Visit({ id: visit.id, ...(visit.data() as Omit<VisitArgs, "id">) })),
    ].sort((a: Visit, b: Visit) => a.happenedAt - b.happenedAt);
  }
}
