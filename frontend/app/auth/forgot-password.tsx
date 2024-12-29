import { router } from "expo-router";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { KeyboardAvoidingView, Platform, StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";

import { forgotPassword } from "../../src/features/auth/api/fetchers";
import { AuthHeadline } from "../../src/features/auth/components/common/AuthHeadline";
import { EmailFormField } from "../../src/features/auth/components/common/EmailFormField";
import { useAuthFormStore } from "../../src/features/auth/slices/authFormInputsStore";
import { useErrorModalStore } from "../../src/shared/components/error-modal/errorModalStore";
import VariantButton from "../../src/shared/ui/button/VariantButton";
import { COLORS } from "../../src/utils/colors";
import { getApiErrorCode } from "../../src/utils/functions";

export default function ForgotPassword() {
  const { t } = useTranslation();

  const email = useAuthFormStore((state) => state.email);
  const resetInputs = useAuthFormStore((state) => state.resetInputValues);

  const setError = useErrorModalStore((state) => state.setError);

  useEffect(() => {
    resetInputs();
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
        <View style={styles.form}>
          <Text style={styles.text} variant="titleLarge">
            {t(`auth.remindPassword`)}
          </Text>
          <EmailFormField />
          <VariantButton onPress={forgotPasswordHandler}>{t("common.send")}</VariantButton>
        </View>
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
  form: {
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: COLORS.theme.white,
  },
});
