export const AUTH_TOKEN_COOKIE_NAME = "DX_HA_TOKEN_42020703";
export const APP_NAME = "DX_HA_APP_V1";

export const ONE_SECOND = 1000;
export const ONE_MINUTE = ONE_SECOND * 60;
export const ONE_HOUR = ONE_MINUTE * 60;
export const ONE_DAY = ONE_HOUR * 24;
export const ONE_WEEK = ONE_DAY * 7;

export const FIREBASE_ERRORS = {
  "auth/invalid-email": "Invalid email provided!",
  "auth/user-disabled": "User account has been disabled!",
  "auth/user-not-found": "User not found!",
  "auth/wrong-password": "Invalid password provided!",
  "auth/invalid-credential": "Invalid credentials!",
  "auth/weak-password": "Password should be at least 6 characters long.",
  "auth/email-already-in-use": "Email is already in use!",
  "auth/id-token-expired": "Session expired! Sign in again.",
  "auth/argument-error": "Authorization token is invalid or malformed. Try again.",
} as const;