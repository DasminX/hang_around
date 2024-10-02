import { BACKEND_API_PATH } from "../../../shared/config";
import { fetchData } from "../../../shared/fetcher";

export const login = async (email: string, password: string) => {
  return await fetchData(`${BACKEND_API_PATH}/auth/signin`, {
    method: "POST",
    send: { email, password },
  });
};

export const signup = async (email: string, password: string, repeatPassword: string) => {
  return await fetchData(`${BACKEND_API_PATH}/auth/signup`, {
    method: "POST",
    send: { email, password, repeatPassword },
  });
};

export const forgotPassword = async (email: string) => {
  return await fetchData(`${BACKEND_API_PATH}/auth/reset-password`, {
    method: "POST",
    send: { email },
  });
};

export const signOut = async () => {
  return await fetchData(`${BACKEND_API_PATH}/auth/signout`, {
    method: "GET",
  });
};

// export const changeForgottenPassword = async (email: string) => {
//   return await fetchData(`${BACKEND_API_PATH}/auth/reset-password`, {
//     method: "POST",
//     send: { email },
//   });
// };
