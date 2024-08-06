import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import { useTranslation } from "react-i18next";

import VariantButton from "../../../../shared/components/button/VariantButton";
import { LabelChangeAuthMode } from "../atoms/LabelChangeAuthMode";
import { COLORS } from "../../../../utils/colors";
import { EmailFormField } from "../molecules/EmailFormField";
import { PasswordFormField } from "../molecules/PasswordFormField";
import { RepeatPasswordFormField } from "../molecules/RepeatPasswordFormField";
import { PrivacyPolicyFormField } from "../molecules/PrivacyPolicyFormField";

export const RegisterForm = () => {
  const { t } = useTranslation();

  return (
    <View style={styles.form}>
      <Text variant="titleLarge">{t("auth.register")}</Text>
      <EmailFormField />
      <PasswordFormField />
      <RepeatPasswordFormField />
      <PrivacyPolicyFormField />
      <VariantButton>{t("auth.register")}</VariantButton>
      <LabelChangeAuthMode text={`${t("auth.havingAccount")} ${t("auth.login")}`} path="login" />
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
