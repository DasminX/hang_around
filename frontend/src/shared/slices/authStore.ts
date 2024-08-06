import { create } from "zustand";

type AuthCredentialsType = {
  token: string;
  expirationTime: number;
  setTokenCredentials: (payload: { token: string; expirationTime: number }) => void;
  resetTokenCredentials: () => void;
};

export const useAuthStore = create<AuthCredentialsType>((set) => ({
  token: "",
  expirationTime: -1,
  setTokenCredentials: ({ token, expirationTime }) => set(() => ({ token, expirationTime })),
  resetTokenCredentials: () => set(() => ({ token: "", expirationTime: -1 })),
}));
