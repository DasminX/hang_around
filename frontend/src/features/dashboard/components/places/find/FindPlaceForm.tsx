import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";

import VariantButton from "../../../../../shared/ui/button/VariantButton";
import { COLORS } from "../../../../../utils/colors";
import { HowFarFormField } from "./HowFarFormField";
import { LocationFormField } from "./LocationFormField";
import { MinRatingFormField } from "./MinRatingFormField";
import { OpenOnlyFieldForm } from "./OpenOnlyFieldForm";
import { PriceLevelsFieldForm } from "./PriceLevelsFieldForm";
import { TypesOfFoodFieldForm } from "./TypesOfFoodFieldForm";

export const FindPlaceForm = ({
  onSubmit,
  isLoading,
}: {
  onSubmit: () => unknown;
  isLoading: boolean;
}) => {
  const { t } = useTranslation();

  return (
    <View style={styles.form}>
      <Text style={styles.formText} variant="titleLarge">
        {t("dashboard.coords")}
      </Text>
      <LocationFormField />
      <Text style={styles.formText} variant="titleLarge">
        {t("dashboard.distance")}
      </Text>
      <HowFarFormField />
      <Text style={styles.formText} variant="titleLarge">
        {t("dashboard.minRating")}
      </Text>
      <MinRatingFormField />
      <TypesOfFoodFieldForm />
      <Text style={styles.formText} variant="titleLarge">
        {t("dashboard.openOnly")}
      </Text>
      <OpenOnlyFieldForm />
      <Text style={styles.formText} variant="titleLarge">
        {t("dashboard.priceLevels")}
      </Text>
      <PriceLevelsFieldForm />
      <VariantButton
        variant="green"
        onPress={onSubmit}
        style={styles.submitButton}
        loading={isLoading}
      >
        {t("common.search")}
      </VariantButton>
    </View>
  );
};

const styles = StyleSheet.create({
  form: {
    alignItems: "center",
    marginVertical: 16,
    rowGap: 8,
  },
  formText: {
    marginVertical: 8,
    color: COLORS.theme.white,
  },
  submitButton: {
    width: 200,
  },
});
