import crypto from "crypto";

import { Visit, VisitArgs } from "../../models/visit";
import { VisitsDatabaseI } from "./abstract";

export class InMemoryVisitsDatabase implements VisitsDatabaseI {
  private db: Visit[] = [];

  async createVisit(visitArgs: Omit<VisitArgs, "id">): Promise<Visit> {
    const visit = new Visit({
      id: crypto.randomUUID(),
      ...visitArgs,
    });
    this.db.push(visit);

    return visit;
  }

  async getVisitById(visitId: string, userId: string): Promise<Visit | null> {
    return this.db.find((visit) => visit.id === visitId && visit.userId === userId) ?? null;
  }

  async getVisitsForUser(userId: string): Promise<Visit[]> {
    return this.db.filter((visits) => visits.userId === userId);
  }
}
