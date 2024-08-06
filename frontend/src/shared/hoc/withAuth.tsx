import { type ElementType } from "react";
import { Redirect } from "expo-router";
import { validateAuth } from "../../utils/validate-auth";
import { useAuthStore } from "../slices/authStore";

export const withAuth = (BaseComponent: ElementType) => {
  return function authenticateHOC() {
    const token = useAuthStore((state) => state.token);
    const expirationTime = useAuthStore((state) => state.expirationTime);
    const resetTokenCredentials = useAuthStore((state) => state.resetTokenCredentials);

    if (!validateAuth(token, expirationTime)) {
      resetTokenCredentials();
      return <Redirect href={"/auth/login"} />;
    }

    return <BaseComponent />;
  };
};
