import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import { useTranslation } from "react-i18next";

import VariantButton from "../../../../shared/ui/button/VariantButton";
import { ForgotPasswordLink } from "../atoms/ForgotPasswordLink";
import { EmailFormField } from "../molecules/EmailFormField";
import { PasswordFormField } from "../molecules/PasswordFormField";
import { TextWithLink } from "../atoms/TextWithLink";

export const LoginForm = ({ onSubmit }: { onSubmit: () => unknown }) => {
  const { t } = useTranslation();

  return (
    <View style={styles.form}>
      <Text variant="titleLarge">{t(`auth.login`)}</Text>
      <EmailFormField />
      <PasswordFormField />
      <VariantButton onPress={onSubmit}>{t("auth.login")}</VariantButton>
      <TextWithLink
        text={t("auth.notHavingAccount")}
        link={{ path: "/auth/register", text: t("auth.register") }}
      />
      <ForgotPasswordLink />
    </View>
  );
};

const styles = StyleSheet.create({
  form: {
    justifyContent: "center",
    alignItems: "center",
  },
});
