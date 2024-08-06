import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import { useTranslation } from "react-i18next";

import VariantButton from "../../../../shared/components/button/VariantButton";
import { COLORS } from "../../../../utils/colors";
import { EmailFormField } from "../molecules/EmailFormField";

export const ForgotPasswordForm = () => {
  const { t } = useTranslation();

  return (
    <View style={styles.form}>
      <Text variant="titleLarge">{t(`auth.remindPassword`)}</Text>
      <EmailFormField />

      <VariantButton>{t("auth.remindPassword")}</VariantButton>
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
