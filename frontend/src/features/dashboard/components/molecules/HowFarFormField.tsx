// import { useTranslation } from "react-i18next";
import OutlinedInput from "../../../../shared/ui/input/OutlinedInput";
import { memo, useState } from "react";
import { usePlacesStore } from "../../slices/DashboardStore";
import { SegmentedButtons } from "react-native-paper";
import { StyleSheet, View } from "react-native";

export const HowFarFormField = memo(() => {
  // const { t } = useTranslation();
  const [segmentValue, setSegmentValue] = useState<string>("m");

  const howFar = usePlacesStore((state) => state.howFar);
  const setHowFar = usePlacesStore((state) => state.setHowFar);

  return (
    <View style={styles.root}>
      <OutlinedInput
        keyboardType="number-pad"
        placeholder=""
        onChangeText={(distance: string) => setHowFar({ ...howFar, distance: +distance })}
        style={styles.distance}
      />
      <SegmentedButtons
        buttons={[
          { value: "m", label: "m" },
          { value: "yd", label: "yd" },
        ]}
        value={segmentValue}
        onValueChange={(value: string) => {
          setSegmentValue(value);
        }}
        style={styles.unit}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  root: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: "auto",
    gap: 12,
  },
  distance: {
    width: "10%",
    maxWidth: 105,
    minWidth: 70,
  },
  unit: {
    width: "10%",
    maxWidth: 105,
    minWidth: 70,
  },
});
