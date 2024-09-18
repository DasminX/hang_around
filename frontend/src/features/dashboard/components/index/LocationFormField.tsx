import { LocationVO } from "@dasminx/hang-around-common";
import { memo } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";

import OutlinedInput from "../../../../shared/ui/input/OutlinedInput";
import { usePlacesStore } from "../../slices/PlacesStore";

export const LocationFormField = memo(() => {
  const { t } = useTranslation();

  const location = usePlacesStore((state) => state.location);
  const setLocation = usePlacesStore((state) => state.setLocation);

  return (
    <View style={styles.root}>
      <View style={styles.input}>
        <Text>{t("dashboard.lat")}</Text>
        <OutlinedInput
          keyboardType="number-pad"
          placeholder="0"
          onChangeText={(lat: string) => setLocation(new LocationVO({ ...location, lat: +lat }))}
          width="short"
        />
      </View>
      <View style={styles.input}>
        <Text>{t("dashboard.lat")}</Text>
        <OutlinedInput
          keyboardType="number-pad"
          placeholder="0"
          onChangeText={(lng: string) => setLocation(new LocationVO({ ...location, lng: +lng }))}
          width="short"
        />
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  root: {
    flexDirection: "row",
    gap: 12,
    marginVertical: 6,
  },
  input: {
    marginVertical: 12,
    justifyContent: "center",
    alignItems: "center",
  },
});
