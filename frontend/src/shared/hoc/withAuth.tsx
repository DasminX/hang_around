import { useEffect, type ElementType } from "react";
import { Redirect } from "expo-router";
import { useTokenStore } from "../slices/tokenStore";
import { isKeptTokenValid } from "../../utils/functions";
import { resetAsyncStorageAuthTokenProps } from "../../utils/async-storage-helpers";

export const withAuth = (BaseComponent: ElementType) =>
  function authenticateHOC() {
    const token = useTokenStore((state) => state.token);
    const expirationTime = useTokenStore((state) => state.expirationTime);
    const resetTokenCredentials = useTokenStore((state) => state.resetTokenCredentials);

    const isTokenValid = !isKeptTokenValid(token, expirationTime);

    useEffect(() => {
      if (!isTokenValid) {
        resetTokenCredentials();
        resetAsyncStorageAuthTokenProps();
      }
    }, []);

    if (!isKeptTokenValid(token, expirationTime)) {
      resetTokenCredentials();
      resetAsyncStorageAuthTokenProps();
    }

    if (!isTokenValid) {
      return <Redirect href={"/auth/login"} />;
    }

    return <BaseComponent />;
  };
