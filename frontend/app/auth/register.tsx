import { router } from "expo-router";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { KeyboardAvoidingView, Platform, StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";

import { signup } from "../../src/features/auth/api/fetchers";
import { AuthHeadline } from "../../src/features/auth/components/common/AuthHeadline";
import { EmailFormField } from "../../src/features/auth/components/common/EmailFormField";
import { PasswordFormField } from "../../src/features/auth/components/common/PasswordFormField";
import { TextWithLink } from "../../src/features/auth/components/common/TextWithLink";
import { PrivacyPolicyFormField } from "../../src/features/auth/components/register/PrivacyPolicyFormField";
import { RepeatPasswordFormField } from "../../src/features/auth/components/register/RepeatPasswordFormField";
import { useAuthFormStore } from "../../src/features/auth/slices/authFormInputsStore";
import { useErrorModalStore } from "../../src/shared/components/error-modal/errorModalStore";
import VariantButton from "../../src/shared/ui/button/VariantButton";
import { COLORS } from "../../src/utils/colors";
import { getApiErrorCode } from "../../src/utils/functions";

export default function Register() {
  const { t } = useTranslation();

  const [isLoading, setIsLoading] = useState(false);

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
        <View style={styles.form}>
          <Text style={{ color: COLORS.theme.white }} variant="titleLarge">
            {t("auth.register")}
          </Text>
          <EmailFormField />
          <PasswordFormField />
          <RepeatPasswordFormField />
          <PrivacyPolicyFormField />
          <VariantButton
            loading={isLoading}
            onPress={async () => {
              if (isLoading) return;

              setIsLoading(true);
              await registerHandler();
              setIsLoading(false);
            }}
          >
            {t("auth.register")}
          </VariantButton>
          <TextWithLink
            text={t("auth.havingAccount")}
            link={{ path: "/auth/login", text: t("auth.login") }}
          />
        </View>
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
  form: {
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    width: "80%",
    height: "80%",
    alignSelf: "center",
    backgroundColor: COLORS.palette.orange + "dd",
  },
});
