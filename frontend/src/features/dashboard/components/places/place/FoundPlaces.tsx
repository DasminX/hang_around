import { PlaceArgs } from "@dasminx/hang-around-common";
import { useTranslation } from "react-i18next";
import { ScrollView, StyleSheet } from "react-native";
import { Headline } from "react-native-paper";

import { COLORS } from "../../../../../utils/colors";
import { FoundPlaceElement } from "./FoundPlaceElement";

export const FoundPlaces = ({ places }: { places: PlaceArgs[] }) => {
  const { t } = useTranslation();

  return (
    <ScrollView>
      <Headline style={styles.headline}>{t("dashboard.foundPlaces")}</Headline>
      {places.map((placeDetails) => (
        <FoundPlaceElement key={placeDetails.id} placeDetails={placeDetails} />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  headline: {
    color: COLORS.palette.orange,
    textAlign: "center",
    marginBottom: 16,
  },
});
