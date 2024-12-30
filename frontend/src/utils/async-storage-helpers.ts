import AsyncStorage from "@react-native-async-storage/async-storage";

import { AUTH_TOKEN, AUTH_TOKEN_EMAIL, AUTH_TOKEN_EXP } from "./constants";

export const getAsyncStorageAuthTokenProps = async (): Promise<[string, number, string]> => {
  try {
    const authTokenProperties = await AsyncStorage.multiGet([
      AUTH_TOKEN,
      AUTH_TOKEN_EXP,
      AUTH_TOKEN_EMAIL,
    ]);
    if (authTokenProperties.length < 3) {
      throw null;
    }

    const [tokenTuple, tokenExpTuple, tokenEmailTuple] = authTokenProperties;
    return [tokenTuple?.at(1) ?? "", Number(tokenExpTuple?.at(1)), tokenEmailTuple?.at(1) ?? ""];
  } catch (_e) {
    return ["", 0, ""];
  }
};

export const setAsyncStorageAuthTokenProps = async (
  token: string,
  exp: number,
  email: string,
): Promise<void> => {
  await AsyncStorage.multiSet([
    [AUTH_TOKEN, String(token)],
    [AUTH_TOKEN_EXP, String(exp)],
    [AUTH_TOKEN_EMAIL, String(email)],
  ]);
};

export const resetAsyncStorageAuthTokenProps = async (): Promise<void> => {
  await AsyncStorage.multiRemove([AUTH_TOKEN, AUTH_TOKEN_EXP, AUTH_TOKEN_EMAIL]);
};
