import { randomUUID } from "crypto";

import { VisitArgs } from "../../../../../libs/hang-around-contracts/src/interfaces";
import { Visit } from "../../models/visit";
import { VisitsDatabaseI } from "./abstract";

export class InMemoryVisitsDatabase implements VisitsDatabaseI {
  private _db: Visit[] = [];

  async createVisit(visitArgs: Omit<VisitArgs, "id">): Promise<Visit> {
    const visit = new Visit({
      id: randomUUID(),
      ...visitArgs,
    });
    this._db.push(visit);

    return visit;
  }

  async getVisitById(visitId: string, userId: string): Promise<Visit | null> {
    return this._db.find((visit) => visit.id === visitId && visit.userId === userId) ?? null;
  }

  async getVisitsForUser(userId: string): Promise<Visit[]> {
    return this._db.filter((visits) => visits.userId === userId);
  }
}
