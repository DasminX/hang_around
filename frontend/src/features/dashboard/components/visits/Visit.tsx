import { VisitArgs } from "@dasminx/hang-around-common";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { ScrollView, StyleSheet, View } from "react-native";
import { Dialog, Icon, Portal, Surface, Text } from "react-native-paper";

import VariantButton from "../../../../shared/ui/button/VariantButton";
import { COLORS } from "../../../../utils/colors";

// TODO change placesArgs to models common
export const Visit = ({ visit }: { visit: VisitArgs }) => {
  const { t } = useTranslation();
  const [visible, setVisible] = useState(false);

  // TODO display image, priceLevel, paymentOptions, navigate button instead of visit button
  return (
    <ScrollView>
      <Surface style={styles.surface} elevation={1}>
        <Text variant="titleLarge" style={{ textAlign: "center" }}>
          {visit.name}
        </Text>
        <View style={{ flexDirection: "row" }}>
          <Text>
            {t("place.rating")}: {visit.rating}{" "}
          </Text>
          {new Array(Math.round(visit.rating)).fill(null).map((_, index) => (
            <Icon key={index} source={"star"} size={24} color={COLORS.palette.orange} />
          ))}
        </View>

        <View style={styles.accessible}>
          <Icon
            size={24}
            source={visit.isAccessible ? "wheelchair-accessibility" : "alert-box"}
            color={visit.isAccessible ? COLORS.variants.green : COLORS.variants.red}
          />
          <Text variant="labelMedium">
            {t(visit.isAccessible ? "place.accessible" : "place.notAccessible")}
          </Text>
        </View>
        <View>
          <VariantButton onPress={() => setVisible(true)}>{t("place.visit")}</VariantButton>
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
              {t("place.wannaVisit")}
            </Text>
          </Dialog.Content>
          <Dialog.Actions style={{ flexDirection: "column" }}>
            <VariantButton variant="red" onPress={() => setVisible(false)}>
              {t("common.cancel")}
            </VariantButton>
            <VariantButton /* TODO if clicked add to VisitedPlacesStore (doesnt exist yet) */
              variant="green"
            >
              {t("place.visit")}
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
    paddingHorizontal: 16,
    paddingVertical: 32,
    gap: 16,
    alignItems: "center",
    justifyContent: "center",
    maxWidth: "95%",
    width: 360,
    borderRadius: 16,
    borderColor: COLORS.palette.orange,
    borderWidth: 1,
  },
  accessible: {
    flexDirection: "row",
  },
});
