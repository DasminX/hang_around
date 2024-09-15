import { useState } from "react";
import { Text, TouchableOpacity, StyleSheet, View } from "react-native";
import { COLORS } from "../../../../utils/colors";

export const UnitButtons = () => {
  const [segmentValue, setSegmentValue] = useState<string>("m");

  return (
    <View style={styles.segmentContainer}>
      <TouchableOpacity
        style={[styles.segmentButton, styles.leftButton]}
        onPress={() => setSegmentValue("m")}
        activeOpacity={1}
      >
        <Text
          style={[styles.text, { color: segmentValue === "m" ? COLORS.palette.orange : "white" }]}
        >
          m
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.segmentButton, styles.rightButton]}
        onPress={() => setSegmentValue("yd")}
        activeOpacity={1}
      >
        <Text
          style={[styles.text, { color: segmentValue === "yd" ? COLORS.palette.orange : "white" }]}
        >
          yd
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
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
