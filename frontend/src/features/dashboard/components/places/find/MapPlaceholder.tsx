import { memo } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";

import VariantButton from "../../../../../shared/ui/button/VariantButton";
import { COLORS } from "../../../../../utils/colors";

export const MapPlaceholder = memo(
  ({ onEnterManuallyPress }: { onEnterManuallyPress: () => void }) => {
    const { t } = useTranslation();

    return (
      <View style={styles.mapPlaceholder}>
        <Text variant="headlineSmall" style={styles.mapPlaceholderText}>
          {t("place.localisationRequired")}
        </Text>
        <VariantButton onPress={onEnterManuallyPress}>
          {t("place.enterLocalisationManually")}
        </VariantButton>
      </View>
    );
  },
);

const styles = StyleSheet.create({
  mapPlaceholder: {
    width: 250,
    maxWidth: "90%",
    aspectRatio: "1/1",
    height: "auto",
    borderWidth: 1,
    borderColor: COLORS.palette.orange,
    borderRadius: 16,
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  mapPlaceholderText: {
    color: COLORS.palette.orange,
    textAlign: "center",
  },
});
