import { App as AdminApp, initializeApp as initializeAdminApp } from "firebase-admin/app";
import { Auth as AdminAuth, getAuth as getAdminAuth } from "firebase-admin/auth";
import { Firestore as AdminFirestore, getFirestore as getAdminFirestore } from "firebase-admin/firestore";

import { FirebaseApp as ClientApp, initializeApp as initializeClientApp } from "firebase/app";
import { Auth as ClientAuth, getAuth as getClientAuth } from "firebase/auth";
import { Firestore as ClientFirestore, getFirestore as getClientFirestore } from "firebase/firestore";

export class FirebaseService {
  private static _adminApp: AdminApp;
  private static _adminAuth: AdminAuth;
  private static _adminFirestore: AdminFirestore;
  private static _clientApp: ClientApp;
  private static _clientAuth: ClientAuth;
  private static _clientFirestore: ClientFirestore;

  private constructor() {}

  public static initializeApp() {
    if (!FirebaseService._adminApp) {
      FirebaseService._adminApp = initializeAdminApp(FirebaseService.getConfig());
      FirebaseService._adminAuth = getAdminAuth(FirebaseService._adminApp);
      FirebaseService._adminFirestore = getAdminFirestore(FirebaseService._adminApp);
      console.log("Admin firebase initialized...");
    }

    if (!FirebaseService._clientApp) {
      FirebaseService._clientApp = initializeClientApp(FirebaseService.getConfig());
      FirebaseService._clientAuth = getClientAuth(FirebaseService._clientApp);
      FirebaseService._clientFirestore = getClientFirestore(FirebaseService._clientApp);
      console.log("Client firebase initialized...");
    }
  }

  public static get adminApp(): AdminApp {
    if (!this._adminApp) {
      this.initializeApp();
    }
    return this._adminApp;
  }

  public static get adminAuth(): AdminAuth {
    if (!this._adminAuth) {
      this.initializeApp();
    }
    return this._adminAuth;
  }

  public static get adminFirestore(): AdminFirestore {
    if (!this._adminFirestore) {
      this.initializeApp();
    }
    return this._adminFirestore;
  }

  public static get clientApp(): ClientApp {
    if (!this._clientApp) {
      this.initializeApp();
    }
    return this._clientApp;
  }

  public static get clientAuth(): ClientAuth {
    if (!this._clientAuth) {
      this.initializeApp();
    }
    return this._clientAuth;
  }

  public static get clientFirestore(): ClientFirestore {
    if (!this._clientFirestore) {
      this.initializeApp();
    }
    return this._clientFirestore;
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
