import { useTranslation } from "react-i18next";
import { AuthHeadline } from "../../src/features/auth/components/atoms/AuthHeadline";
import { ForgotPasswordForm } from "../../src/features/auth/components/organisms/ForgotPasswordForm";
import { useAuthFormStore } from "../../src/features/auth/slices/authFormInputsStore";
import { useEffect } from "react";
import { useErrorModalStore } from "../../src/shared/components/error-modal/errorModalStore";
import { router } from "expo-router";
import { KeyboardAvoidingView, Platform, StyleSheet, View } from "react-native";
import { forgotPassword } from "../../src/features/auth/api/fetchers";
import { getApiErrorCode } from "../../src/utils/functions";

export default function ForgotPassword() {
  const { t } = useTranslation();

  const email = useAuthFormStore((state) => state.email);
  const resetInputs = useAuthFormStore((state) => state.resetInputValues);

  const setError = useErrorModalStore((state) => state.setError);

  useEffect(() => {
    return () => resetInputs();
  }, []);

  async function forgotPasswordHandler() {
    const res = await forgotPassword(email);

    if (res instanceof Error) {
      return setError({
        title: t("errors.occured"),
        description: t("errors.internal"),
      });
    }

    switch (res.status) {
      case "fail":
        return setError({
          title: t("errors.occured"),
          description: t(getApiErrorCode(res)),
        });
      case "ok":
        return router.push("/auth/login");
    }
  }

  return (
    <KeyboardAvoidingView
      style={styles.root}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View>
        <AuthHeadline headlineText={t("auth.forgotPassword")} showAppName={false} />
        <ForgotPasswordForm onSubmit={forgotPasswordHandler} />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  root: {
    top: "10%",
    height: "35%",
    width: "90%",
    alignSelf: "center",
    justifyContent: "space-between",
  },
});
