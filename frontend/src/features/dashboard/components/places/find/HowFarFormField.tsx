import { memo } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Text } from "react-native-paper";

import OutlinedInput from "../../../../../shared/ui/input/OutlinedInput";
import { COLORS } from "../../../../../utils/colors";
import { usePlacesStore } from "../../../slices/PlacesStore";

export const HowFarFormField = memo(() => {
  const howFar = usePlacesStore((state) => state.howFar);
  const setHowFar = usePlacesStore((state) => state.setHowFar);

  return (
    <View style={styles.root}>
      <OutlinedInput
        keyboardType="number-pad"
        placeholder="1000"
        onChangeText={(distance: string) => setHowFar({ ...howFar, distance: +distance })}
        width="short"
      />
      <View style={styles.segmentContainer}>
        <TouchableOpacity
          style={[styles.segmentButton, styles.leftButton]}
          onPress={() => setHowFar({ ...howFar, unit: "m" })}
          activeOpacity={1}
        >
          <Text
            style={[styles.text, { color: howFar.unit === "m" ? COLORS.palette.orange : "white" }]}
          >
            m
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.segmentButton, styles.rightButton]}
          onPress={() => setHowFar({ ...howFar, unit: "yd" })}
          activeOpacity={1}
        >
          <Text
            style={[styles.text, { color: howFar.unit === "yd" ? COLORS.palette.orange : "white" }]}
          >
            yd
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  root: {
    columnGap: 12,
    flexDirection: "row",
  },
  segmentContainer: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  segmentButton: {
    borderColor: COLORS.palette.orange,
    paddingVertical: 12,
    paddingHorizontal: 24,
    backgroundColor: COLORS.palette.black, // Default button color
    color: COLORS.palette.orange,
  },
  leftButton: {
    borderLeftWidth: 1,
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderRightWidth: 1,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  rightButton: {
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
  text: {
    fontWeight: "700",
  },
});
