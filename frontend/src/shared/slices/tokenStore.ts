import { Timestamp } from "@dasminx/hang-around-common";
import { create } from "zustand";

export const DEFAULT_TOKEN_CREDENTIALS = {
  token: "",
  expirationTime: -1 as Timestamp,
  email: "",
};

type TokenCredentialsType = typeof DEFAULT_TOKEN_CREDENTIALS;

type TokenStateChangers = {
  setTokenCredentials: (payload: {
    token: string;
    expirationTime: Timestamp;
    email: string;
  }) => void;
  resetTokenCredentials: () => void;
};

export const useTokenStore = create<TokenCredentialsType & TokenStateChangers>((set) => ({
  token: "",
  expirationTime: -1 as Timestamp,
  email: "",
  setTokenCredentials: ({ token, expirationTime, email }: TokenCredentialsType) =>
    set(() => ({ token, expirationTime, email })),
  resetTokenCredentials: () => set(() => DEFAULT_TOKEN_CREDENTIALS),
}));
