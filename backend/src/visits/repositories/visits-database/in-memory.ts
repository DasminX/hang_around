import crypto from "crypto";

import { Visit, VisitArgs } from "../../models/visit";
import { VisitsDatabaseI } from "./abstract";

export class InMemoryVisitsDatabase implements VisitsDatabaseI {
  private static _visits: Visit[];

  async createVisit(visitArgs: Omit<VisitArgs, "id">): Promise<Visit> {
    const visit = new Visit({
      id: crypto.randomUUID(),
      ...visitArgs,
    });
    InMemoryVisitsDatabase._visits.push(visit);

    return visit;
  }

  async getVisitById(visitId: string, userId: string): Promise<Visit | null> {
    return InMemoryVisitsDatabase._visits.find((visit) => visit.id === visitId && visit.userId === userId) ?? null;
  }

  async getVisitsForUser(userId: string): Promise<Visit[]> {
    return InMemoryVisitsDatabase._visits.filter((visits) => visits.userId === userId);
  }
}
