import { router } from "expo-router";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { KeyboardAvoidingView, Platform, StyleSheet, View } from "react-native";

import { signup } from "../../src/features/auth/api/fetchers";
import { AuthHeadline } from "../../src/features/auth/components/common/AuthHeadline";
import { RegisterForm } from "../../src/features/auth/components/register/RegisterForm";
import { useAuthFormStore } from "../../src/features/auth/slices/authFormInputsStore";
import { useErrorModalStore } from "../../src/shared/components/error-modal/errorModalStore";
import { getApiErrorCode } from "../../src/utils/functions";

export default function Register() {
  const { t } = useTranslation();

  const email = useAuthFormStore((state) => state.email);
  const password = useAuthFormStore((state) => state.password);
  const repeatPassword = useAuthFormStore((state) => state.repeatPassword);
  const privacyPolicy = useAuthFormStore((state) => state.privacyPolicy);
  const resetInputs = useAuthFormStore((state) => state.resetInputValues);

  const setError = useErrorModalStore((state) => state.setError);

  useEffect(() => {
    resetInputs();
  }, []);

  async function registerHandler() {
    if (!privacyPolicy) {
      return setError({
        title: t("errors.occured"),
        description: t("auth.privacyPolicyInvalid"),
      });
    }

    const res = await signup(email, password, repeatPassword);

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
        return router.push("/auth");
    }
  }

  return (
    <KeyboardAvoidingView
      style={styles.root}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View>
        <AuthHeadline headlineText={t("auth.welcomeTo")} showAppName={true} />
        <RegisterForm onSubmit={registerHandler} />
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
