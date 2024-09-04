import { useTranslation } from "react-i18next";
import { AuthHeadline } from "../../src/features/auth/components/atoms/AuthHeadline";
import { LoginForm } from "../../src/features/auth/components/organisms/LoginForm";
import { KeyboardAvoidingView, Platform, StyleSheet } from "react-native";
import { useAuthFormStore } from "../../src/features/auth/slices/authFormInputsStore";
import { login } from "../../src/features/auth/api/fetchers";
import { router } from "expo-router";
import { useTokenStore } from "../../src/shared/slices/tokenStore";
import { ErrorModal } from "../../src/shared/components/error-modal/ErrorModal";
import { useEffect } from "react";
import { useErrorModalStore } from "../../src/shared/components/error-modal/errorModalStore";
import { setAsyncStorageAuthTokenProps } from "../../src/utils/async-storage-helpers";
import { getApiErrorCode } from "../../src/utils/functions";

export default function Login() {
  const { t } = useTranslation();

  const email = useAuthFormStore((state) => state.email);
  const password = useAuthFormStore((state) => state.password);
  const resetInputs = useAuthFormStore((state) => state.resetInputValues);

  const setError = useErrorModalStore((state) => state.setError);

  const setTokenCredentials = useTokenStore((state) => state.setTokenCredentials);

  useEffect(() => {
    return () => resetInputs();
  }, []);

  async function loginHandler() {
    const res = await login(email, password);

    if (res instanceof Error) {
      return setError({
        title: t("errors.occured"),
        description: res.message,
      });
    }

    switch (res.status) {
      case "ok":
        await setAsyncStorageAuthTokenProps(
          res.data.token as string,
          res.data.expirationTime as number,
        );

        setTokenCredentials({
          token: res.data.token as string,
          expirationTime: res.data.expirationTime as number,
        });

        return router.push("/dashboard");
      case "fail":
        console.log(res);
        return setError({
          title: t("errors.occured"),
          description: t(getApiErrorCode(res)),
        });
    }
  }

  return (
    <KeyboardAvoidingView
      style={styles.root}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <AuthHeadline headlineText={t("auth.loginTo")} showAppName={true} />
      <LoginForm onSubmit={loginHandler} />
      <ErrorModal />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  root: {
    top: "10%",
    height: "65%",
    width: "90%",
    alignSelf: "center",
    justifyContent: "space-evenly",
  },
});
