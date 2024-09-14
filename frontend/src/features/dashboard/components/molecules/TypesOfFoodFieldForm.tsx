import React, { useState } from "react";
import { Modal, View, Text, TouchableOpacity, StyleSheet, FlatList } from "react-native";
import { Checkbox, Chip } from "react-native-paper";
import VariantButton from "../../../../shared/ui/button/VariantButton";
import { useTranslation } from "react-i18next";

const options = ["Kebab", "Pizza", "Burger", "Sushi"];

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
    <View>
      <VariantButton onPress={() => setIsModalVisible(true)} variant="blue">
        {t("dashboard.selectFoods")}
      </VariantButton>

      <Modal
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <FlatList
              data={options}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => toggleItem(item)} style={styles.itemContainer}>
                  <Checkbox status={selectedItems.includes(item) ? "unchecked" : "checked"} />
                  <Text style={styles.itemText}>{item}</Text>
                </TouchableOpacity>
              )}
            />
            <VariantButton onPress={() => setIsModalVisible(false)} variant="blue">
              {t("common.close")}
            </VariantButton>
          </View>
        </View>
      </Modal>

      <View style={styles.chips}>
        {selectedItems.length > 0 &&
          selectedItems.map((item) => <Chip style={styles.chipsItem}>{item}</Chip>)}
      </View>
    </View>
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
    backgroundColor: "white",
    borderRadius: 8,
    padding: 20,
    elevation: 5,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
  },
  itemText: {
    marginLeft: 10,
    fontSize: 16,
  },
  chips: {
    flexDirection: "row",
    gap: 10,
    flexWrap: "wrap",
  },
  chipsItem: {
    flexBasis: "30%",
    minWidth: 80,
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
  },
});
