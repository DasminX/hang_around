import { memo } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";
import { Checkbox, Text } from "react-native-paper";

import { COLORS } from "../../../../utils/colors";
import { useAuthFormStore } from "../../slices/authFormInputsStore";

export const PrivacyPolicyFormField = memo(() => {
  const { t } = useTranslation();

  const isPrivacyPolicy = useAuthFormStore((state) => state.privacyPolicy);
  const setPrivacyPolicy = useAuthFormStore((state) => state.setPrivacyPolicy);

  return (
    <View style={styles.policy}>
      <Checkbox
        status={isPrivacyPolicy ? "checked" : "unchecked"}
        onPress={() => {
          setPrivacyPolicy(!isPrivacyPolicy);
        }}
      />
      <Text style={{ color: COLORS.theme.white }}>{t("auth.privacyPolicy")}</Text>
    </View>
  );
});

const styles = StyleSheet.create({
  policy: {
    flexDirection: "row",
    alignItems: "center",
  },
});
