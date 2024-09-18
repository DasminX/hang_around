import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";

import VariantButton from "../../../../shared/ui/button/VariantButton";
import { EmailFormField } from "../common/EmailFormField";
import { PasswordFormField } from "../common/PasswordFormField";
import { TextWithLink } from "../common/TextWithLink";
import { ForgotPasswordLink } from "../forgot-password/ForgotPasswordLink";

export const LoginForm = ({ onSubmit }: { onSubmit: () => unknown }) => {
  const { t } = useTranslation();

  return (
    <View style={styles.form}>
      <Text variant="titleLarge">{t(`auth.login`)}</Text>
      <EmailFormField />
      <PasswordFormField />
      <VariantButton onPress={onSubmit}>{t("auth.login")}</VariantButton>
      <View style={styles.links}>
        <TextWithLink
          text={t("auth.notHavingAccount")}
          link={{ path: "/auth/register", text: t("auth.register") }}
        />
        <ForgotPasswordLink />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  form: {
    justifyContent: "center",
    alignItems: "center",
  },
  links: {
    rowGap: 4,
    alignItems: "center",
  },
});
