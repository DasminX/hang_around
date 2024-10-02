import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";

import { COLORS } from "../../../../utils/colors";

export const NoVisitsFound = () => {
  const { t } = useTranslation();

  return (
    <View style={styles.root}>
      <Text variant="headlineSmall" style={{ color: COLORS.palette.orange, textAlign: "center" }}>
        {t("visits.notFound")}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    height: 100,
    justifyContent: "space-evenly",
  },
});
