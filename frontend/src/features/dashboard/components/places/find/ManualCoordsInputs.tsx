import { Location } from "@dasminx/hang-around-common";
import { memo } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";

import VariantButton from "../../../../../shared/ui/button/VariantButton";
import OutlinedInput from "../../../../../shared/ui/input/OutlinedInput";
import { usePlacesStore } from "../../../slices/PlacesStore";

export const ManualCoordsInputs = memo(({ onChooseOnMap }: { onChooseOnMap: () => void }) => {
  const { t } = useTranslation();
  const location = usePlacesStore((state) => state.location);
  const setLocation = usePlacesStore((state) => state.setLocation);

  return (
    <View style={styles.root}>
      <View style={styles.inputContainer}>
        <View style={styles.input}>
          <Text>{t("dashboard.lat")}</Text>
          <OutlinedInput
            keyboardType="number-pad"
            placeholder="0"
            onChangeText={(lat: string) => setLocation(new Location({ ...location, lat: +lat }))}
            width="short"
          />
        </View>
        <View style={styles.input}>
          <Text>{t("dashboard.lat")}</Text>
          <OutlinedInput
            keyboardType="number-pad"
            placeholder="0"
            onChangeText={(lng: string) => setLocation(new Location({ ...location, lng: +lng }))}
            width="short"
          />
        </View>
      </View>
      <VariantButton style={styles.button} onPress={onChooseOnMap}>
        {t("place.chooseOnMap")}
      </VariantButton>
    </View>
  );
});

const styles = StyleSheet.create({
  root: {
    rowGap: 16,
  },
  inputContainer: {
    flexDirection: "row",
    gap: 12,
    marginVertical: 6,
    width: "50%",
    marginHorizontal: "auto",
  },
  input: {
    marginVertical: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    width: 200,
    maxWidth: "80%",
  },
});
