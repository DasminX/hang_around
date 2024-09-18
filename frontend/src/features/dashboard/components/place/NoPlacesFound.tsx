import { router } from "expo-router";
import { useTranslation } from "react-i18next";
import { View } from "react-native";
import { Text } from "react-native-paper";

import VariantButton from "../../../../shared/ui/button/VariantButton";
import { COLORS } from "../../../../utils/colors";

export const NoPlacesFound = () => {
  const { t } = useTranslation();

  return (
    <View>
      <Text variant="headlineSmall" style={{ color: COLORS.palette.orange }}>
        {t("dashboard.notFound")}
      </Text>
      <VariantButton
        onPress={() => (router.canGoBack() ? router.back() : router.replace("/dashboard"))}
      >
        {t("common.goBack")}
      </VariantButton>
    </View>
  );
};
