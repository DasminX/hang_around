import React, { useState } from "react";
import { Modal, View, TouchableOpacity, StyleSheet, FlatList, ScrollView } from "react-native";
import { Checkbox, Chip, Text } from "react-native-paper";
import VariantButton from "../../../../shared/ui/button/VariantButton";
import { useTranslation } from "react-i18next";
import { TYPE_OF_FOOD_ARRAY } from "@dasminx/hang-around-common";
import { COLORS } from "../../../../utils/colors";

export const TypesOfFoodFieldForm = () => {
  const { t } = useTranslation();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const toggleItem = (value: string) => {
    setSelectedItems((prev) =>
      prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value],
    );
  };

  return (
    <ScrollView>
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
                    status={selectedItems.includes(item) ? "checked" : "unchecked"}
                  />
                  <Text
                    style={[
                      styles.itemText,
                      selectedItems.includes(item) && { color: COLORS.palette.orange },
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
              variant="green"
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
        {selectedItems.length > 0 &&
          selectedItems.map((item) => (
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
