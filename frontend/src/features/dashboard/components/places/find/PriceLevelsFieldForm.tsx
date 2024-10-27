import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import RangeSlider from "rn-range-slider";

import { COLORS } from "../../../../../utils/colors";
import { usePlacesStore } from "../../../slices/PlacesStore";

export const PriceLevelsFieldForm = () => {
  const { t } = useTranslation();

  const [low, high] = usePlacesStore((state) => state.priceLevels);
  const setPriceLevels = usePlacesStore((state) => state.setPriceLevels);

  const handleValueChange = useCallback((lowValue: number, highValue: number) => {
    setPriceLevels([lowValue, highValue]);
  }, []);

  let rangeText = "";
  if (low === high) {
    rangeText = low === -1 ? t("common.unspecified") : "$".repeat(low + 1);
  } else {
    rangeText =
      (low === -1 ? t("common.unspecified") : "$".repeat(low + 1)) +
      " - " +
      (high === -1 ? t("common.unspecified") : "$".repeat(high + 1));
  }

  return (
    <View style={styles.container}>
      <Text style={styles.rangeText}>{rangeText}</Text>
      <RangeSlider
        style={styles.slider}
        min={-1}
        max={4}
        step={1}
        floatingLabel
        renderThumb={useCallback(
          () => (
            <View style={styles.thumb}>
              <Text style={styles.thumbText}>●</Text>
            </View>
          ),
          [],
        )}
        renderRail={useCallback(
          () => (
            <View style={styles.rail} />
          ),
          [],
        )}
        renderRailSelected={useCallback(
          () => (
            <View style={styles.railSelected} />
          ),
          [],
        )}
        renderLabel={useCallback(
          (value: number) => (
            <View style={styles.label}>
              <Text style={styles.labelText}>
                {value === -1 ? t("common.unspecified") : "$".repeat(value + 1)}
              </Text>
            </View>
          ),
          [],
        )}
        renderNotch={useCallback(
          () => (
            <View style={styles.notch} />
          ),
          [],
        )}
        onValueChanged={handleValueChange}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: "stretch",
    minWidth: "80%",
  },
  rangeText: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: "center",
  },
  slider: {
    marginVertical: 20,
  },
  thumb: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: COLORS.palette.orange,
    justifyContent: "center",
    alignItems: "center",
  },
  thumbText: {
    color: "#ffffff",
    fontSize: 18,
  },
  rail: {
    flex: 1,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#d3d3d3",
  },
  railSelected: {
    height: 4,
    backgroundColor: COLORS.palette.orange,
    borderRadius: 2,
  },
  label: {
    backgroundColor: COLORS.variants.blue,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
    alignItems: "center",
  },
  labelText: {
    color: "#ffffff",
    fontSize: 14,
  },
  notch: {
    width: 8,
    height: 8,
    backgroundColor: COLORS.variants.blue,
    transform: [{ rotate: "45deg" }],
  },
});
