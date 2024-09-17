import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";

import VariantButton from "../../../../shared/ui/button/VariantButton";
import { HowFarFormField } from "../molecules/HowFarFormField";
import { LocationFormField } from "../molecules/LocationFormField";
import { MinRatingFormField } from "../molecules/MinRatingFormField";
import { TypesOfFoodFieldForm } from "../molecules/TypesOfFoodFieldForm";

export const FindPlaceForm = ({ onSubmit }: { onSubmit: () => unknown }) => {
  const { t } = useTranslation();

  return (
    <View style={styles.form}>
      <Text variant="titleLarge">{t("dashboard.distance")}</Text>
      <HowFarFormField />
      <Text variant="titleLarge">{t("dashboard.coords")}</Text>
      <LocationFormField />
      <Text variant="titleLarge">{t("dashboard.minRating")}</Text>
      <MinRatingFormField />
      <TypesOfFoodFieldForm />
      <VariantButton variant="green" onPress={onSubmit} style={styles.submitButton}>
        {t("common.search")}
      </VariantButton>
    </View>
  );
};

const styles = StyleSheet.create({
  form: {
    alignItems: "center",
    marginVertical: 16,
    rowGap: 4,
  },
  submitButton: {
    marginVertical: 4,
    width: 200,
  },
});
