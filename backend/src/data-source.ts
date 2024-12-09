import { AuthDatabaseI } from "./features/auth/repositories/auth-database/abstract";
import { AuthFirebase } from "./features/auth/repositories/auth-database/firebase-auth";
import { AuthInMemoryDatabase } from "./features/auth/repositories/auth-database/in-memory";
import { PlacesFinderI } from "./features/places/services/finder/abstract";
import { GooglePlacesFinder } from "./features/places/services/finder/google-finder";
import { VisitsDatabaseI } from "./features/visits/repositories/visits-database/abstract";
import { VisitsFirestore } from "./features/visits/repositories/visits-database/firestore";
import { InMemoryVisitsDatabase } from "./features/visits/repositories/visits-database/in-memory";
import { DataSourceError } from "./shared/errors";
import { FirebaseProvider } from "./shared/firebase-provider";
import { TokenVerifierI } from "./shared/services/token-verifier/abstract";
import { FirebaseTokenVerifier } from "./shared/services/token-verifier/firebase";
import { InMemoryTokenVerifier } from "./shared/services/token-verifier/in-memory";

enum DataSourceEnum {
  IN_MEMORY = "IN_MEMORY",
  FIREBASE = "FIREBASE",
}

export class DataSource {
  public static visits: VisitsDatabaseI;
  public static places: PlacesFinderI;
  public static tokenVerifier: TokenVerifierI;
  public static auth: AuthDatabaseI;

  public static setup(): void {
    const pickedDataSource = process.env.HA_APP_DATA_SOURCE as string;

    if (pickedDataSource == DataSourceEnum.IN_MEMORY) {
      this._setInMemory();
    } else if (pickedDataSource == DataSourceEnum.FIREBASE) {
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
