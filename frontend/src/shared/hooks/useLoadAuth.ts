import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { AUTH_TOKEN, AUTH_TOKEN_EXP } from "../../utils/constants";
import { validateAuth } from "../../utils/validate-auth";
import { useAuthStore } from "../slices/authStore";
import { KeyValuePair } from "@react-native-async-storage/async-storage/lib/typescript/types";

const getAuthTokenProperties = async () => {
  const authTokenProperties = await AsyncStorage.multiGet([AUTH_TOKEN, AUTH_TOKEN_EXP]);
  if (!authTokenProperties.length) return [];

  const transformedATP = authTokenProperties.map((tuple: KeyValuePair) => ({
    key: tuple[0],
    value: tuple[1],
  }));

  const propsAuthToken = transformedATP.find((obj) => obj.key === AUTH_TOKEN)?.value;
  const propsAuthTokenExp = transformedATP.find((obj) => obj.key === AUTH_TOKEN_EXP)?.value;
  return [propsAuthToken, propsAuthTokenExp];
};

export const useLoadAuth = () => {
  const [isAsyncStorageLoaded, setIsAsyncStorageLoaded] = useState(false);
  const setTokenCredentials = useAuthStore((state) => state.setTokenCredentials);

  useEffect(() => {
    getAuthTokenProperties()
      .then(([token, expirationTime]) => {
        if (token && expirationTime && validateAuth(token, +expirationTime)) {
          setTokenCredentials({ token: token, expirationTime: +expirationTime });
        }
      })
      .catch((e) => {
        console.log(`Error in getting auth token properties: ${e}`);
      })
      .finally(() => {
        setIsAsyncStorageLoaded(true);
      });
  }, [setTokenCredentials, isAsyncStorageLoaded]);

  return isAsyncStorageLoaded;
};
