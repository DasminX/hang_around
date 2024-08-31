import { create } from "zustand";

export const DEFAULT_TOKEN_CREDENTIALS = {
  token: "",
  expirationTime: -1,
};

type TokenCredentialsType = typeof DEFAULT_TOKEN_CREDENTIALS;

type TokenStateChangers = {
  setTokenCredentials: (payload: { token: string; expirationTime: number }) => void;
  resetTokenCredentials: () => void;
};

export const useTokenStore = create<TokenCredentialsType & TokenStateChangers>((set) => ({
  token: "",
  expirationTime: -1,
  setTokenCredentials: ({ token, expirationTime }: TokenCredentialsType) =>
    set(() => ({ token, expirationTime })),
  resetTokenCredentials: () => set(() => DEFAULT_TOKEN_CREDENTIALS),
}));
