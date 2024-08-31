/* import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import { useTranslation } from "react-i18next";

import VariantButton from "../../../../shared/ui/button/VariantButton";
import { PasswordFormField } from "../molecules/PasswordFormField";
import { RepeatPasswordFormField } from "../molecules/RepeatPasswordFormField";

export const ChangeForgottenPasswordForm = ({ onSubmit }: { onSubmit: () => void }) => {
  const { t } = useTranslation();

  return (
    <View style={styles.form}>
      <Text variant="titleLarge">{t(`auth.remindPassword`)}</Text>
      <PasswordFormField />
      <RepeatPasswordFormField />
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
 */
