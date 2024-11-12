import { PlaceArgs, VisitArgs } from "@dasminx/hang-around-common";
import * as Linking from "expo-linking";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { ScrollView, StyleSheet, View } from "react-native";
import { Dialog, Icon, Portal, Surface, Text } from "react-native-paper";

import { useTokenStore } from "../../../../../shared/slices/tokenStore";
import VariantButton from "../../../../../shared/ui/button/VariantButton";
import { COLORS } from "../../../../../utils/colors";
import { createVisit } from "../../../api/fetchers";
import { useVisitsStore } from "../../../slices/VisitsStore";

// TODO change placesArgs to models common
export const FoundPlaceElement = ({ placeDetails }: { placeDetails: PlaceArgs }) => {
  const { t } = useTranslation();
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const storeVisits = useVisitsStore((state) => state.setVisits);

  const token = useTokenStore((state) => state.token);

  // TODO  paymentOptions, navigate button instead of visit button
  return (
    <ScrollView>
      <Surface style={styles.surface} elevation={1}>
        <Text variant="titleLarge" style={{ textAlign: "center" }}>
          {placeDetails.name}
        </Text>
        <View style={{ flexDirection: "row" }}>
          <Text>
            {t("place.rating")}: {placeDetails.rating}{" "}
          </Text>
          {new Array(Math.round(placeDetails.rating)).fill(null).map((_, index) => (
            <Icon key={index} source={"star"} size={24} color={COLORS.palette.orange} />
          ))}
        </View>

        <View style={styles.accessible}>
          <Icon
            size={24}
            source={placeDetails.isAccessible ? "wheelchair-accessibility" : "alert-box"}
            color={placeDetails.isAccessible ? COLORS.variants.green : COLORS.variants.red}
          />
          <Text variant="labelMedium">
            {t(placeDetails.isAccessible ? "place.accessible" : "place.notAccessible")}
          </Text>
        </View>
        {/* TODO */}
        <View style={styles.accessible}>
          <Text variant="labelMedium">
            {placeDetails.priceLevel > 0 ? "$".repeat(placeDetails.priceLevel) : "no $"}
          </Text>
        </View>
        {/* /TODO */}
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
            <VariantButton
              variant="green"
              loading={loading}
              onPress={async () => {
                setLoading(true);
                const { id: _, ...detailsWithoutId } = placeDetails;

                const newlyCreatedVisit = await createVisit(detailsWithoutId, token);
                if (!(newlyCreatedVisit instanceof Error) && newlyCreatedVisit.status == "ok") {
                  storeVisits(newlyCreatedVisit.data as VisitArgs);
                  /* TODO store in Async Storage also */
                  Linking.openURL(placeDetails.mapsUri);
                  setVisible(false);
                }
                setLoading(false);
              }}
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
