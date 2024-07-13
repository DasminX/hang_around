import { FirebaseApp, initializeApp } from "firebase/app";
import { Auth, getAuth } from "firebase/auth";
import { Firestore, getFirestore } from "firebase/firestore";

export class FirebaseService {
  private static _app: FirebaseApp;
  private static _auth: Auth;
  private static _firestore: Firestore;

  private constructor() {}

  public static initializeApp() {
    if (!FirebaseService._app) {
      FirebaseService._app = initializeApp(FirebaseService.getConfig());
      FirebaseService._auth = getAuth(FirebaseService._app);
      FirebaseService._firestore = getFirestore(FirebaseService._app);
    }
  }

  public static get app(): FirebaseApp {
    if (!this._app) {
      this.initializeApp();
    }
    return this._app;
  }

  public static get auth(): Auth {
    if (!this._auth) {
      this.initializeApp();
    }
    return this._auth;
  }

  public static get firestore(): Firestore {
    if (!this._firestore) {
      this.initializeApp();
    }
    return this._firestore;
  }

  private static getConfig() {
    return {
      apiKey: process.env.FIREBASE_API_KEY as string,
      authDomain: process.env.FIREBASE_AUTH_DOMAIN as string,
      projectId: process.env.FIREBASE_PROJECT_ID as string,
      storageBucket: process.env.FIREBASE_STORAGE_BUCKET as string,
      messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID as string,
      appId: process.env.FIREBASE_APP_ID as string,
    };
  }
}
