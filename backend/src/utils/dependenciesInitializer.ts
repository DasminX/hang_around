import { FirebaseService } from "./firebaseInitializer";

export const initializeDependencies = () => {
  FirebaseService.initializeApp();
};
