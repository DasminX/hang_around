import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";

import VariantButton from "../../../../shared/ui/button/VariantButton";
import { EmailFormField } from "../common/EmailFormField";

export const ForgotPasswordForm = ({ onSubmit }: { onSubmit: () => void }) => {
  const { t } = useTranslation();

  return (
    <View style={styles.form}>
      <Text variant="titleLarge">{t(`auth.remindPassword`)}</Text>
      <EmailFormField />
      <VariantButton onPress={onSubmit}>{t("common.send")}</VariantButton>
    </View>
  );
};

const styles = StyleSheet.create({
  form: {
    justifyContent: "center",
    alignItems: "center",
  },
});
