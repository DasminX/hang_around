import { Redirect } from "expo-router";
import { ElementType, useEffect } from "react";

import { resetAsyncStorageAuthTokenProps } from "../../utils/async-storage-helpers";
import { isKeptTokenValid } from "../../utils/functions";
import { useTokenStore } from "../slices/tokenStore";

export const withAuth = (BaseComponent: ElementType) =>
  function authenticateHOC() {
    const token = useTokenStore((state) => state.token);
    const expirationTime = useTokenStore((state) => state.expirationTime);
    const resetTokenCredentials = useTokenStore((state) => state.resetTokenCredentials);

    const isTokenValid = isKeptTokenValid(token, expirationTime);

    useEffect(() => {
      if (!isTokenValid) {
        resetTokenCredentials();
        resetAsyncStorageAuthTokenProps();
      }
    }, []);

    if (!isTokenValid) {
      return <Redirect href={"/auth/login"} />;
    }

    return <BaseComponent />;
  };
