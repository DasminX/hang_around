import { create } from "zustand";

export const DEFAULT_ERROR_CREDENTIALS = { occured: false, title: "", description: "" };

type ErrorCredentials = typeof DEFAULT_ERROR_CREDENTIALS;

type ErrorStateChangers = {
  setDefaultError: () => void;
  setError: (payload: Partial<Omit<ErrorCredentials, "occured">>) => void;
};

export const useErrorModalStore = create<ErrorCredentials & ErrorStateChangers>((set) => ({
  ...DEFAULT_ERROR_CREDENTIALS,
  setDefaultError: () => set(() => DEFAULT_ERROR_CREDENTIALS),
  setError: (payload) =>
    set((state: ErrorCredentials) => ({ ...state, ...payload, occured: true })),
}));
