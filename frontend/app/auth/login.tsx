import { Timestamp } from "@dasminx/hang-around-common";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { KeyboardAvoidingView, Platform, StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";

import { login } from "../../src/features/auth/api/fetchers";
import { AuthHeadline } from "../../src/features/auth/components/common/AuthHeadline";
import { EmailFormField } from "../../src/features/auth/components/common/EmailFormField";
import { PasswordFormField } from "../../src/features/auth/components/common/PasswordFormField";
import { TextWithLink } from "../../src/features/auth/components/common/TextWithLink";
import { ForgotPasswordLink } from "../../src/features/auth/components/login/ForgotPasswordLink";
import { useAuthFormStore } from "../../src/features/auth/slices/authFormInputsStore";
import { useErrorModalStore } from "../../src/shared/components/error-modal/errorModalStore";
import { Snackbar } from "../../src/shared/components/Snackbar";
import { useTokenStore } from "../../src/shared/slices/tokenStore";
import VariantButton from "../../src/shared/ui/button/VariantButton";
import { setAsyncStorageAuthTokenProps } from "../../src/utils/async-storage-helpers";
import { COLORS } from "../../src/utils/colors";
import { getApiErrorCode, isObjectWithAllProperties } from "../../src/utils/functions";

export default function Login() {
  const { t } = useTranslation();

  const searchParams = useLocalSearchParams();

  const [isLoading, setIsLoading] = useState(false);

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

  const onErrorTimeoutHandler = () => {
    router.setParams({ ...searchParams, error: "" });
  };

  return (
    <KeyboardAvoidingView
      style={styles.root}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      {searchParams.error && (
        <Snackbar
          onTimeout={onErrorTimeoutHandler}
          errorText={
            (Array.isArray(searchParams.error) ? searchParams.error[0] : searchParams.error) ?? ""
          }
        />
      )}
      <View>
        <AuthHeadline headlineText={t("auth.welcomeTo")} showAppName={true} />
        <View style={styles.form}>
          <Text style={styles.text} variant="titleLarge">
            {t(`auth.login`)}
          </Text>
          <EmailFormField />
          <PasswordFormField />
          <VariantButton
            loading={isLoading}
            onPress={async () => {
              if (isLoading) return;

              setIsLoading(true);
              await loginHandler();
              setIsLoading(false);
            }}
          >
            {t("auth.login")}
          </VariantButton>
          <View style={styles.links}>
            <TextWithLink
              text={t("auth.notHavingAccount")}
              link={{ path: "/auth/register", text: t("auth.register") }}
            />
            <ForgotPasswordLink />
          </View>
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
  links: {
    rowGap: 4,
    alignItems: "center",
  },
  text: {
    color: COLORS.theme.white,
  },
});
