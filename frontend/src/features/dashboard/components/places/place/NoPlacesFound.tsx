import { router } from "expo-router";
import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";

import VariantButton from "../../../../../shared/ui/button/VariantButton";
import { COLORS } from "../../../../../utils/colors";

export const NoPlacesFound = () => {
  const { t } = useTranslation();

  return (
    <View style={styles.root}>
      <Text variant="headlineSmall" style={{ color: COLORS.palette.orange }}>
        {t("dashboard.notFound")}
      </Text>
      <VariantButton
        style={styles.button}
        onPress={() =>
          router.canGoBack() ? router.back() : router.replace("/dashboard/places/find")
        }
      >
        {t("common.goBack")}
      </VariantButton>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    height: 100,
    marginTop: 32,
    justifyContent: "space-evenly",
  },
  button: {
    marginTop: 48,
    alignSelf: "center",
  },
});
