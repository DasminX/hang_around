// import { useTranslation } from "react-i18next";
import OutlinedInput from "../../../../shared/ui/input/OutlinedInput";
import { memo } from "react";
import { usePlacesStore } from "../../slices/DashboardStore";
import { StyleSheet, View } from "react-native";
import { UnitButtons } from "../atoms/UnitButtons";

export const HowFarFormField = memo(() => {
  const howFar = usePlacesStore((state) => state.howFar);
  const setHowFar = usePlacesStore((state) => state.setHowFar);

  return (
    <View style={styles.root}>
      <OutlinedInput
        keyboardType="number-pad"
        placeholder="1"
        onChangeText={(distance: string) => setHowFar({ ...howFar, distance: +distance })}
        width="short"
      />
      <UnitButtons />
    </View>
  );
});

const styles = StyleSheet.create({
  root: {
    columnGap: 12,
    flexDirection: "row",
  },
});
