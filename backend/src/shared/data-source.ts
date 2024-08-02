import { AuthDatabaseI } from "../auth/repositories/auth-database/abstract";
import { AuthFirebase } from "../auth/repositories/auth-database/firebase-auth";
import { AuthInMemoryDatabase } from "../auth/repositories/auth-database/in-memory";
import { PlacesFinderI } from "../places/services/finder/abstract";
import { GooglePlacesFinder } from "../places/services/finder/google-finder";
import { VisitsDatabaseI } from "../visits/repositories/visits-database/abstract";
import { VisitsFirestore } from "../visits/repositories/visits-database/firestore";
import { InMemoryVisitsDatabase } from "../visits/repositories/visits-database/in-memory";
import { logger } from "./logger";
import { TokenVerifierI } from "./services/token-verifier/abstract";
import { FirebaseTokenVerifier } from "./services/token-verifier/firebase-token-verifier";
import { InMemoryTokenVerifier } from "./services/token-verifier/in-memory";

export class DataSource {
  public static visits: VisitsDatabaseI;
  public static places: PlacesFinderI;
  public static tokenVerifier: TokenVerifierI;
  public static auth: AuthDatabaseI;

  public static setup(): void {
    if (process.env.USE_IN_MEMORY) {
      this.visits = new InMemoryVisitsDatabase();
      this.tokenVerifier = new InMemoryTokenVerifier();
      this.auth = new AuthInMemoryDatabase();
    } else {
      this.visits = new VisitsFirestore();
      this.tokenVerifier = new FirebaseTokenVerifier();
      this.auth = new AuthFirebase();
    }

    this.places = new GooglePlacesFinder(logger);
  }
}
