import { Timestamp } from "@dasminx/hang-around-common";
import { create } from "zustand";

export const DEFAULT_TOKEN_CREDENTIALS = {
  token: "",
  expirationTime: -1 as Timestamp,
};

type TokenCredentialsType = typeof DEFAULT_TOKEN_CREDENTIALS;

type TokenStateChangers = {
  setTokenCredentials: (payload: { token: string; expirationTime: Timestamp }) => void;
  resetTokenCredentials: () => void;
};

export const useTokenStore = create<TokenCredentialsType & TokenStateChangers>((set) => ({
  token: "",
  expirationTime: -1 as Timestamp,
  setTokenCredentials: ({ token, expirationTime }: TokenCredentialsType) =>
    set(() => ({ token, expirationTime })),
  resetTokenCredentials: () => set(() => DEFAULT_TOKEN_CREDENTIALS),
}));
