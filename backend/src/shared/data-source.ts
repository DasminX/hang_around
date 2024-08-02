import { Logger } from "winston";

import { AuthDatabaseI } from "../auth/repositories/auth-database/abstract";
import { AuthFirebase } from "../auth/repositories/auth-database/firebase-auth";
import { AuthInMemoryDatabase } from "../auth/repositories/auth-database/in-memory";
import { PlacesFinderI } from "../places/services/finder/abstract";
import { GooglePlacesFinder } from "../places/services/finder/google-finder";
import { VisitsDatabaseI } from "../visits/repositories/visits-database/abstract";
import { VisitsFirestore } from "../visits/repositories/visits-database/firestore";
import { InMemoryVisitsDatabase } from "../visits/repositories/visits-database/in-memory";
import { DataSourceError } from "./errors";
import { FirebaseProvider } from "./firebase-provider";
import { TokenVerifierI } from "./services/token-verifier/abstract";
import { FirebaseTokenVerifier } from "./services/token-verifier/firebase-token-verifier";
import { InMemoryTokenVerifier } from "./services/token-verifier/in-memory";

export class DataSource {
  public static visits: VisitsDatabaseI;
  public static places: PlacesFinderI;
  public static tokenVerifier: TokenVerifierI;
  public static auth: AuthDatabaseI;

  public static setup(logger: Logger): void {
    const pickedDataSource = process.env.HA_APP_DATA_SOURCE as string;

    if (pickedDataSource == "IN_MEMORY") {
      this.setInMemory();
    } else if (pickedDataSource == "FIREBASE") {
      this.setFromFirebase(logger);
    } else {
      throw new DataSourceError(pickedDataSource);
    }

    this.places = new GooglePlacesFinder();
  }

  private static setInMemory() {
    this.visits = new InMemoryVisitsDatabase();
    this.tokenVerifier = new InMemoryTokenVerifier();
    this.auth = new AuthInMemoryDatabase();
  }

  private static setFromFirebase(logger: Logger) {
    const firebase = FirebaseProvider.initialize(logger);

    this.visits = new VisitsFirestore(firebase.db);
    this.tokenVerifier = new FirebaseTokenVerifier(firebase.adminAuth);
    this.auth = new AuthFirebase(firebase.clientAuth);
  }
}