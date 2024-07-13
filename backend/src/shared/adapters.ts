import { FirebaseError } from "firebase/app";
import { ObjectOrNull } from "../utils/response";
import { isObjectAndContainsProperties } from "../utils/helpers";

export class FirebaseErrorAdapter {
  public message: string;
  public statusCode = 400;

  constructor(adaptee: FirebaseError) {
    this.message = this._getMessage(adaptee.code);
  }

  public static isFirebaseError(object: ObjectOrNull): boolean {
    return isObjectAndContainsProperties(object, "message", "code");
  }

  private _getMessage(code: string) {
    if (code.startsWith("auth")) return this._authMessage(code);

    return this._unknownError;
  }

  private _authMessage(code: string) {
    switch (code) {
      case "auth/invalid-email":
        return "Invalid email provided!";
      case "auth/user-disabled":
        return "User account has been disabled!";
      case "auth/user-not-found":
        return "User not found!";
      case "auth/wrong-password":
        return "Invalid password provided!";
      case "auth/invalid-credential":
        return "Invalid credentials!";
      case "auth/weak-password":
        return "Password should be at least 6 characters long.";
      case "auth/email-already-in-use":
        return "Email is already in use!";
    }

    return this._unknownError;
  }

  private get _unknownError() {
    return "Unknown error";
  }
}
