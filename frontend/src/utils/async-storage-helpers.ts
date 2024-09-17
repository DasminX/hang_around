import AsyncStorage from "@react-native-async-storage/async-storage";

import { AUTH_TOKEN, AUTH_TOKEN_EXP } from "./constants";

export const getAsyncStorageAuthTokenProps = async (): Promise<[string, number]> => {
  try {
    const authTokenProperties = await AsyncStorage.multiGet([AUTH_TOKEN, AUTH_TOKEN_EXP]);
    if (authTokenProperties.length < 2) {
      throw null;
    }

    const [tokenTuple, tokenExpTuple] = authTokenProperties;
    return [tokenTuple?.at(1) ?? "", Number(tokenExpTuple?.at(1))];
  } catch (_e) {
    return ["", 0];
  }
};

export const setAsyncStorageAuthTokenProps = async (token: string, exp: number): Promise<void> => {
  await AsyncStorage.multiSet([
    [AUTH_TOKEN, String(token)],
    [AUTH_TOKEN_EXP, String(exp)],
  ]);
};

export const resetAsyncStorageAuthTokenProps = async (): Promise<void> => {
  await AsyncStorage.multiRemove([AUTH_TOKEN, AUTH_TOKEN_EXP]);
};
