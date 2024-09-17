import { TYPE_OF_FOOD_ARRAY } from "@dasminx/hang-around-common";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { FlatList, Modal, ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { Checkbox, Chip, Text } from "react-native-paper";

import VariantButton from "../../../../shared/ui/button/VariantButton";
import { COLORS } from "../../../../utils/colors";
import { usePlacesStore } from "../../slices/PlacesStore";

export const TypesOfFoodFieldForm = () => {
  const { t } = useTranslation();

  const [isModalVisible, setIsModalVisible] = useState(false);

  const typesOfFood = usePlacesStore((state) => state.typesOfFood);
  const setTypesOfFood = usePlacesStore((state) => state.setTypesOfFood);

  const toggleItem = (value: (typeof TYPE_OF_FOOD_ARRAY)[number]) => {
    setTypesOfFood([...typesOfFood, value]);
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
              data={TYPE_OF_FOOD_ARRAY}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => toggleItem(item)} style={styles.itemContainer}>
                  <Checkbox
                    color={COLORS.palette.orange}
                    status={typesOfFood.includes(item) ? "checked" : "unchecked"}
                  />
                  <Text
                    style={[
                      styles.itemText,
                      typesOfFood.includes(item) && { color: COLORS.palette.orange },
                    ]}
                  >
                    {item}
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

      <ScrollView
        style={styles.chipsContainer}
        horizontal
        contentContainerStyle={styles.chipsContainerContent}
      >
        {typesOfFood.length > 0 &&
          typesOfFood.map((item) => (
            <Chip
              key={item}
              mode="outlined"
              style={styles.chip}
              textStyle={{ color: COLORS.palette.orange }}
            >
              {item}
            </Chip>
          ))}
      </ScrollView>
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
