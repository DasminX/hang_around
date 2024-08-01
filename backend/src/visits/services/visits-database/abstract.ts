import { Visit, VisitArgs } from "../../models/visit";

export interface VisitsDatabaseI {
  getVisitsForUser(userId: string): Promise<Visit[]>;
  getVisitById(visitId: string, userId: string): Promise<Visit | null>;
  createVisit(visitArgs: Omit<VisitArgs, "id">): Promise<Visit>;
}
