import { PlaceArgs, VisitArgs } from "@dasminx/hang-around-common";
import * as Linking from "expo-linking";
import { router } from "expo-router";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { ScrollView, StyleSheet, View } from "react-native";
import { Dialog, Icon, Portal, Surface, Text } from "react-native-paper";

import { useTokenStore } from "../../../../../shared/slices/tokenStore";
import VariantButton from "../../../../../shared/ui/button/VariantButton";
import { COLORS } from "../../../../../utils/colors";
import { createVisit } from "../../../api/fetchers";
import { useVisitsStore } from "../../../slices/VisitsStore";

export const FoundPlaceElement = ({ placeDetails }: { placeDetails: PlaceArgs }) => {
  const { t } = useTranslation();
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const storeVisits = useVisitsStore((state) => state.setVisits);

  const token = useTokenStore((state) => state.token);

  let priceTextColor = COLORS.palette.orange;
  if (placeDetails.priceLevel >= 0 && placeDetails.priceLevel <= 2) {
    priceTextColor = COLORS.variants.blue;
  } else if (placeDetails.priceLevel >= 3) {
    priceTextColor = COLORS.variants.red;
  }

  return (
    <ScrollView>
      <Surface style={styles.surface} elevation={1}>
        <View style={styles.innerSurface}>
          <Text variant="titleLarge" style={{ textAlign: "center", color: COLORS.theme.white }}>
            {placeDetails.name}
          </Text>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={{ color: COLORS.theme.white }}>
              {t("place.rating")}: {placeDetails.rating}{" "}
            </Text>
            {new Array(Math.round(placeDetails.rating)).fill(null).map((_, index) => (
              <Icon key={index} source={"star"} size={24} color={COLORS.palette.orange} />
            ))}
          </View>
          <View style={{ flexDirection: "row" }}>
            <Text style={{ color: COLORS.theme.white }}>
              {t("place.ratingCount")}:{" "}
              {isNaN(placeDetails.ratingCount) ? t("common.unspecified") : placeDetails.ratingCount}
            </Text>
          </View>

          <View style={styles.row}>
            <Text variant="labelMedium" style={{ color: COLORS.theme.white }}>
              {t(placeDetails.isAccessible ? "place.accessible" : "place.notAccessible")}
            </Text>
            <Icon
              size={24}
              source={placeDetails.isAccessible ? "wheelchair-accessibility" : "alert-box"}
              color={placeDetails.isAccessible ? COLORS.variants.green : COLORS.variants.red}
            />
          </View>
          <View style={styles.row}>
            <Text variant="labelMedium" style={{ color: COLORS.theme.white }}>
              {t("dashboard.priceLevels")}:{" "}
            </Text>
            <Text variant="bodySmall" style={{ color: priceTextColor }}>
              {placeDetails.priceLevel > 0
                ? t(`place.priceLevel_${placeDetails.priceLevel}`)
                : t("place.priceLevel_m1")}
            </Text>
          </View>
          <View>
            <VariantButton style={{ alignSelf: "center" }} onPress={() => setVisible(true)}>
              {t("visits.see")}
            </VariantButton>
          </View>
        </View>
      </Surface>
      <Portal>
        <Dialog
          style={{
            backgroundColor: COLORS.palette.black,
            borderColor: COLORS.palette.orange,
            borderWidth: 1,
          }}
          visible={visible}
          onDismiss={() => setVisible(false)}
        >
          <Dialog.Title style={{ color: COLORS.palette.orange, textAlign: "center" }}>
            {t("common.warning")}
          </Dialog.Title>
          <Dialog.Content>
            <Text style={{ textAlign: "center", color: COLORS.theme.white }} variant="bodyMedium">
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
                const { id: _, ratingCount: __, ...detailsWithoutId } = placeDetails;

                const newlyCreatedVisit = await createVisit(detailsWithoutId, token);
                if (!(newlyCreatedVisit instanceof Error)) {
                  if (
                    newlyCreatedVisit.status === "fail" &&
                    newlyCreatedVisit.error.httpCode === 401
                  ) {
                    return router.replace("/auth/login?error=SESSION_EXPIRED");
                  } else if (newlyCreatedVisit.status == "ok") {
                    storeVisits([newlyCreatedVisit.data as VisitArgs]);
                    Linking.openURL(placeDetails.mapsUri);
                    setVisible(false);
                  }
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
    maxWidth: "95%",
    width: 360,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    borderColor: COLORS.palette.orange,
    backgroundColor: COLORS.palette.black,
    borderWidth: 1,
  },
  innerSurface: {
    gap: 12,
  },
  row: {
    flexDirection: "row",
  },
});
