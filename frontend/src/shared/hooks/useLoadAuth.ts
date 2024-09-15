import { useEffect, useState } from "react";
import { isKeptTokenValid as isTokenValid } from "../../utils/functions";
import { useTokenStore } from "../slices/tokenStore";
import { getAsyncStorageAuthTokenProps } from "../../utils/async-storage-helpers";
import { TimestampBrand } from "@dasminx/hang-around-common";

export const useLoadAuth = () => {
  const [isAsyncStorageLoaded, setIsAsyncStorageLoaded] = useState(false);

  const setTokenCredentials = useTokenStore((state) => state.setTokenCredentials);
  const resetTokenCredentials = useTokenStore((state) => state.resetTokenCredentials);

  useEffect(() => {
    (async () => {
      try {
        const [token, expirationTime] = await getAsyncStorageAuthTokenProps();

        if (isTokenValid(token, expirationTime)) {
          setTokenCredentials({ token, expirationTime: expirationTime as TimestampBrand });
        }
      } catch (e) {
        console.log(`Error in getting auth token properties: ${e}`);
        resetTokenCredentials();
      }

      setIsAsyncStorageLoaded(true);
    })();
  }, [setTokenCredentials, isAsyncStorageLoaded]);

  return isAsyncStorageLoaded;
};
