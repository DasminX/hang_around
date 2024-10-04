import { VisitArgs } from "@dasminx/hang-around-common";
import * as Linking from "expo-linking";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { ScrollView, StyleSheet, View } from "react-native";
import { Dialog, Portal, Surface, Text } from "react-native-paper";

import VariantButton from "../../../../shared/ui/button/VariantButton";
import { COLORS } from "../../../../utils/colors";

export const Visit = ({ visit }: { visit: VisitArgs }) => {
  const { t } = useTranslation();
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  // TODO display image, priceLevel, paymentOptions, navigate button instead of visit button
  return (
    <ScrollView>
      <Surface style={styles.surface} elevation={1}>
        <Text variant="titleLarge" style={{ textAlign: "center" }}>
          {visit.name}
        </Text>
        <Text variant="bodyLarge">
          {t("visits.visitedAt")}:{" "}
          <Text variant="labelLarge" style={{ color: COLORS.palette.orange }}>
            {new Date(visit.happenedAt).toLocaleString()}
          </Text>
        </Text>
        <View>
          <VariantButton onPress={() => setVisible(true)}>{t("visits.seeOnMap")}</VariantButton>
        </View>
      </Surface>
      <Portal>
        <Dialog
          style={{ backgroundColor: COLORS.palette.black }}
          visible={visible}
          onDismiss={() => setVisible(false)}
        >
          <Dialog.Title style={{ color: COLORS.palette.orange, textAlign: "center" }}>
            {t("common.warning")}
          </Dialog.Title>
          <Dialog.Content>
            <Text style={{ textAlign: "center" }} variant="bodyMedium">
              {t("visits.leavingApp")}
            </Text>
          </Dialog.Content>
          <Dialog.Actions style={{ flexDirection: "column" }}>
            <VariantButton variant="red" onPress={() => setVisible(false)}>
              {t("common.cancel")}
            </VariantButton>
            <VariantButton
              variant="green"
              loading={loading}
              onPress={async () => {
                setLoading(true);
                Linking.openURL(visit.mapsUri as string);
                setVisible(false);
                setLoading(false);
              }}
            >
              {t("visits.see")}
            </VariantButton>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  surface: {
    marginVertical: 16,
    marginHorizontal: "auto",
    paddingHorizontal: 8,
    paddingVertical: 16,
    gap: 8,
    alignItems: "center",
    justifyContent: "center",
    maxWidth: "85%",
    width: 360,
    borderRadius: 8,
    borderColor: COLORS.palette.orange,
    borderWidth: 1,
  },
});
