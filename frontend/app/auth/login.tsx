import { Timestamp } from "@dasminx/hang-around-common";
import { router } from "expo-router";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { KeyboardAvoidingView, Platform, StyleSheet, View } from "react-native";

import { login } from "../../src/features/auth/api/fetchers";
import { AuthHeadline } from "../../src/features/auth/components/common/AuthHeadline";
import { LoginForm } from "../../src/features/auth/components/login/LoginForm";
import { useAuthFormStore } from "../../src/features/auth/slices/authFormInputsStore";
import { useErrorModalStore } from "../../src/shared/components/error-modal/errorModalStore";
import { useTokenStore } from "../../src/shared/slices/tokenStore";
import { setAsyncStorageAuthTokenProps } from "../../src/utils/async-storage-helpers";
import { getApiErrorCode, isObjectWithAllProperties } from "../../src/utils/functions";

export default function Login() {
  const { t } = useTranslation();

  const email = useAuthFormStore((state) => state.email);
  const password = useAuthFormStore((state) => state.password);
  const resetInputs = useAuthFormStore((state) => state.resetInputValues);

  const setError = useErrorModalStore((state) => state.setError);

  const setTokenCredentials = useTokenStore((state) => state.setTokenCredentials);

  useEffect(() => {
    resetInputs();
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
      case "fail":
        return setError({
          title: t("errors.occured"),
          description: t(getApiErrorCode(res)),
        });
      case "ok":
        if (isObjectWithAllProperties(res.data, "token", "expirationTime")) {
          await setAsyncStorageAuthTokenProps(
            res.data.token as string,
            res.data.expirationTime as Timestamp,
          );

          setTokenCredentials({
            token: res.data.token as string,
            expirationTime: res.data.expirationTime as Timestamp,
          });
          return router.push("/dashboard/places/find");
        }
        return setError({
          title: t("errors.occured"),
          description: t("errors.unknown"),
        });
    }
  }

  return (
    <KeyboardAvoidingView
      style={styles.root}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View>
        <AuthHeadline headlineText={t("auth.welcomeTo")} showAppName={true} />
        <LoginForm onSubmit={loginHandler} />
      </View>
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
