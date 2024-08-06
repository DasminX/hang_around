import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import { useTranslation } from "react-i18next";

import VariantButton from "../../../../shared/components/button/VariantButton";
import { LabelChangeAuthMode } from "../atoms/LabelChangeAuthMode";
import { COLORS } from "../../../../utils/colors";
import { ForgotPasswordLink } from "../atoms/ForgotPasswordLink";
import { EmailFormField } from "../molecules/EmailFormField";
import { PasswordFormField } from "../molecules/PasswordFormField";

export const LoginForm = () => {
  const { t } = useTranslation();

  return (
    <View style={styles.form}>
      <Text variant="titleLarge">{t(`auth.login`)}</Text>
      <EmailFormField />
      <PasswordFormField />
      <VariantButton>{t("auth.login")}</VariantButton>
      <LabelChangeAuthMode
        text={`${t("auth.notHavingAccount")} ${t("auth.register")}`}
        path="register"
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
  modal: {
    width: "80%",
    height: "80%",
    alignSelf: "center",
    backgroundColor: COLORS.palette.orange + "dd",
  },
});
