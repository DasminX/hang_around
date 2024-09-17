import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";

import VariantButton from "../../../../shared/ui/button/VariantButton";
import { COLORS } from "../../../../utils/colors";
import { TextWithLink } from "../atoms/TextWithLink";
import { EmailFormField } from "../molecules/EmailFormField";
import { PasswordFormField } from "../molecules/PasswordFormField";
import { PrivacyPolicyFormField } from "../molecules/PrivacyPolicyFormField";
import { RepeatPasswordFormField } from "../molecules/RepeatPasswordFormField";

export const RegisterForm = ({ onSubmit }: { onSubmit: () => unknown }) => {
  const { t } = useTranslation();

  return (
    <View style={styles.form}>
      <Text variant="titleLarge">{t("auth.register")}</Text>
      <EmailFormField />
      <PasswordFormField />
      <RepeatPasswordFormField />
      <PrivacyPolicyFormField />
      <VariantButton onPress={onSubmit}>{t("auth.register")}</VariantButton>
      <TextWithLink
        text={t("auth.havingAccount")}
        link={{ path: "/auth/login", text: t("auth.login") }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
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
