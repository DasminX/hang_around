import { AUTH_RESPONSE_ENUM } from "./../../utils/enums";
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AUTH_MODE_ENUM } from "../../utils/enums";
import { FIREBASE_AUTH } from "../../../../../firebaseConfig";
import { AuthServiceAbstract } from "./AuthService";
import { AUTH_TOKEN, AUTH_TOKEN_EXP } from "../../../../utils/constants";
import { FirebaseAuthError } from "../../utils/types";
import { BACKEND_URL_DEV } from "./config";

type FirebaseCallSuccess = {
  mode: keyof typeof AUTH_MODE_ENUM;
  status: AUTH_RESPONSE_ENUM.SUCCESS;
  message: `auth.successful${string}`;
};

export class AuthServiceFactory {
  public static getProperInstance(mode: keyof typeof AUTH_MODE_ENUM) {
    switch (mode) {
      case AUTH_MODE_ENUM.LOGIN:
        return new AuthServiceLogin();
      case AUTH_MODE_ENUM.REGISTER:
        return new AuthServiceRegister();
      case AUTH_MODE_ENUM.FORGOT_PASSWORD:
        return new AuthServiceForgotPassword();
      case AUTH_MODE_ENUM.CHANGE_FORGOTTEN_PASSWORD:
        return new AuthServiceChangeForgottenPassword();
    }
  }
}

// TODO CHANGE TO BACKEND API
export class AuthServiceLogin extends AuthServiceAbstract {
  public async authorize(
    email: string,
    password: string,
  ): Promise<
    (FirebaseCallSuccess & { token: string; expirationTime: number }) | FirebaseAuthError
  > {
    try {
      const res = await fetch(BACKEND_URL_DEV, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      console.log("przechodzi");
      const data = await res.json();
      console.log(data);
      if (+data.code.startsWith(4)) {
        if (data.message === "Email has not been verified yet!") {
          throw AUTH_RESPONSE_ENUM.EMAIL_VERIFICATION_REQUIRED;
        }
      }

      await AsyncStorage.multiSet([
        [AUTH_TOKEN, data.token],
        [AUTH_TOKEN_EXP, data.data.exp.toString()],
      ]);

      return {
        mode: AUTH_MODE_ENUM.LOGIN,
        status: AUTH_RESPONSE_ENUM.SUCCESS,
        message: "auth.successfulSignin",
        token: data.data.token,
        expirationTime: data.data.exp,
      };
    } catch (error) {
      console.log(error);
      return this._sendError(error, AUTH_MODE_ENUM.LOGIN);
    }
  }
}

// TODO ERRORY Z FIREBASE

export class AuthServiceRegister extends AuthServiceAbstract {
  public async authorize(
    email: string,
    password: string,
  ): Promise<FirebaseCallSuccess | FirebaseAuthError> {
    try {
      const response = await createUserWithEmailAndPassword(FIREBASE_AUTH, email, password);

      await sendEmailVerification(response.user);

      return {
        mode: AUTH_MODE_ENUM.REGISTER,
        status: AUTH_RESPONSE_ENUM.SUCCESS,
        message: "auth.successfulSignup",
      };
    } catch (error) {
      return this._sendError(error, AUTH_MODE_ENUM.REGISTER);
    }
  }
}

export class AuthServiceForgotPassword extends AuthServiceAbstract {
  public async authorize(
    _email: string,
    _password: string,
  ): Promise<FirebaseCallSuccess | FirebaseAuthError> {
    try {
      // todo

      return {
        mode: AUTH_MODE_ENUM.FORGOT_PASSWORD,
        status: AUTH_RESPONSE_ENUM.SUCCESS,
        message: "auth.successfulForgotPassword",
      };
    } catch (error) {
      return this._sendError(error, AUTH_MODE_ENUM.FORGOT_PASSWORD);
    }
  }
}

export class AuthServiceChangeForgottenPassword extends AuthServiceAbstract {
  public async authorize(
    _email: string,
    _password: string,
  ): Promise<FirebaseCallSuccess | FirebaseAuthError> {
    try {
      // todo
      return {
        mode: AUTH_MODE_ENUM.CHANGE_FORGOTTEN_PASSWORD,
        status: AUTH_RESPONSE_ENUM.SUCCESS,
        message: "auth.successfulChangeForgottenPassword",
      };
    } catch (error) {
      return this._sendError(error, AUTH_MODE_ENUM.CHANGE_FORGOTTEN_PASSWORD);
    }
  }
}
