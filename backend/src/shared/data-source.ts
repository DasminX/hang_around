import { AuthDatabaseI } from "../features/auth/repositories/auth-database/abstract";
import { AuthFirebase } from "../features/auth/repositories/auth-database/firebase-auth";
import { AuthInMemoryDatabase } from "../features/auth/repositories/auth-database/in-memory";
import { PlacesFinderI } from "../features/places/services/finder/abstract";
import { GooglePlacesFinder } from "../features/places/services/finder/google-finder";
import { VisitsDatabaseI } from "../features/visits/repositories/visits-database/abstract";
import { VisitsFirestore } from "../features/visits/repositories/visits-database/firestore";
import { InMemoryVisitsDatabase } from "../features/visits/repositories/visits-database/in-memory";
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

  public static setup(): void {
    const pickedDataSource = process.env.HA_APP_DATA_SOURCE as string;

    if (pickedDataSource == "IN_MEMORY") {
      this._setInMemory();
    } else if (pickedDataSource == "FIREBASE") {
      this._setFromFirebase();
    } else {
      throw new DataSourceError(pickedDataSource);
    }

    this.places = new GooglePlacesFinder();
  }

  private static _setInMemory() {
    this.visits = new InMemoryVisitsDatabase();
    this.tokenVerifier = new InMemoryTokenVerifier();
    this.auth = new AuthInMemoryDatabase();
  }

  private static _setFromFirebase() {
    const firebase = FirebaseProvider.initialize();

    this.visits = new VisitsFirestore(firebase.db);
    this.tokenVerifier = new FirebaseTokenVerifier(firebase.adminAuth);
    this.auth = new AuthFirebase(firebase.clientAuth);
  }
}
