import { TYPE_OF_FOOD_ARRAY } from "@dasminx/hang-around-common";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { FlatList, Modal, ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { Checkbox, Chip, Text } from "react-native-paper";

import VariantButton from "../../../../../shared/ui/button/VariantButton";
import { COLORS } from "../../../../../utils/colors";
import { usePlacesStore } from "../../../slices/PlacesStore";

export const TypesOfFoodFieldForm = () => {
  const { t } = useTranslation();

  const [isModalVisible, setIsModalVisible] = useState(false);

  const typesOfFood = usePlacesStore((state) => state.typesOfFood);
  const setTypesOfFood = usePlacesStore((state) => state.setTypesOfFood);

  const toggleItem = (value: (typeof TYPE_OF_FOOD_ARRAY)[number]) => {
    let newTypesOfFood: (typeof TYPE_OF_FOOD_ARRAY)[number][];
    if (!typesOfFood) {
      newTypesOfFood = [value];
    } else {
      newTypesOfFood = typesOfFood.includes(value)
        ? typesOfFood.filter((type) => type !== value)
        : [...typesOfFood, value];
    }
    setTypesOfFood(newTypesOfFood);
  };

  return (
    <ScrollView contentContainerStyle={styles.root}>
      <VariantButton style={styles.button} onPress={() => setIsModalVisible(true)} variant="blue">
        {t("dashboard.typeOfFood")}
      </VariantButton>
      <Modal
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <FlatList
              data={TYPE_OF_FOOD_ARRAY.slice().sort((a, b) =>
                t(`types_of_food.${a}`).localeCompare(t(`types_of_food.${b}`)),
              )}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => toggleItem(item)} style={styles.itemContainer}>
                  <Checkbox
                    color={COLORS.palette.orange}
                    status={typesOfFood?.includes(item) ? "checked" : "unchecked"}
                  />
                  <Text
                    style={[
                      styles.itemText,
                      typesOfFood?.includes(item) && { color: COLORS.palette.orange },
                    ]}
                  >
                    {t(`types_of_food.${item}`)}
                  </Text>
                </TouchableOpacity>
              )}
            />
            <VariantButton
              style={styles.button}
              onPress={() => setIsModalVisible(false)}
              variant="blue"
            >
              {t("common.close")}
            </VariantButton>
          </View>
        </View>
      </Modal>
      {Array.isArray(typesOfFood) && typesOfFood.length > 0 && (
        <ScrollView
          style={styles.chipsContainer}
          horizontal
          contentContainerStyle={styles.chipsContainerContent}
        >
          {typesOfFood
            .slice()
            .sort((a, b) => t(`types_of_food.${a}`).localeCompare(t(`types_of_food.${b}`)))
            .map((item) => (
              <React.Fragment key={item}>
                <Chip
                  mode="outlined"
                  style={styles.chip}
                  textStyle={{ color: COLORS.palette.orange }}
                >
                  {t(`types_of_food.${item}`)}
                </Chip>
              </React.Fragment>
            ))}
        </ScrollView>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  root: {
    rowGap: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    width: 300,
    maxWidth: "90%",
    height: "80%",
    backgroundColor: COLORS.palette.black,
    borderWidth: 1,
    borderColor: COLORS.palette.orange,
    borderRadius: 8,
    padding: 20,
    elevation: 5,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 6,
  },
  itemText: {
    marginLeft: 10,
    fontSize: 16,
  },
  chipsContainer: {
    marginHorizontal: "auto",
    minWidth: 200,
    maxWidth: 300,
  },
  chipsContainerContent: {
    gap: 8,
  },
  chip: {
    backgroundColor: COLORS.palette.black,
    borderColor: COLORS.palette.orange,
  },
  button: {
    marginHorizontal: "auto",
  },
});
