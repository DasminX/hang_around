import { initializeApp as initializeClientApp } from "firebase/app";
import { Auth as ClientAuth, getAuth as getClientAuth } from "firebase/auth";
import { initializeApp as initializeAdminApp } from "firebase-admin/app";
import { Auth as AdminAuth, getAuth as getAdminAuth } from "firebase-admin/auth";
import { type Firestore, getFirestore } from "firebase-admin/firestore";

import { logger } from "./logger";

type FirebaseServices = { db: Firestore; clientAuth: ClientAuth; adminAuth: AdminAuth };
export class FirebaseProvider {
  private constructor() {}

  public static initialize(): FirebaseServices {
    const adminApp = initializeAdminApp(this._getAppConfig());
    const adminAuth = getAdminAuth(adminApp);
    logger.info("Admin firebase initialized...");

    const clientApp = initializeClientApp(this._getAppConfig());
    const clientAuth = getClientAuth(clientApp);
    logger.info("Client firebase initialized...");

    const db = getFirestore(adminApp, process.env.DB_ID as string);
    db.settings({
      credentials: {
        client_email: process.env.DB_CLIENT_EMAIL,
        private_key: (process.env.DB_PRIVATE_KEY as string)?.split(String.raw`\n`).join("\n") || "",
      },
    });
    logger.info("Firestore db initialized...");

    return { adminAuth, clientAuth, db };
  }

  private static _getAppConfig() {
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
