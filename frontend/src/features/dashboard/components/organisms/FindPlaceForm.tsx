import { StyleSheet, View } from "react-native";
import { useTranslation } from "react-i18next";

import VariantButton from "../../../../shared/ui/button/VariantButton";
import { HowFarFormField } from "../molecules/HowFarFormField";
import { LocationFormField } from "../molecules/LocationFormField";
import { MinRatingFormField } from "../molecules/MinRatingFormField";
import { TypesOfFoodFieldForm } from "../molecules/TypesOfFoodFieldForm";
import { Text } from "react-native-paper";

export const FindPlaceForm = ({ onSubmit }: { onSubmit: () => unknown }) => {
  const { t } = useTranslation();

  return (
    <View style={styles.form}>
      <Text>{t("dashboard.distance")}</Text>
      <HowFarFormField />
      <Text>{t("dashboard.coords")}</Text>
      <LocationFormField />
      <Text>{t("dashboard.minRating")}</Text>
      <MinRatingFormField />
      <TypesOfFoodFieldForm />
      <VariantButton variant="green" onPress={onSubmit}>
        {t("common.search")}{" "}
      </VariantButton>
    </View>
  );
};

const styles = StyleSheet.create({
  form: {
    alignItems: "center",
    marginTop: "10%",
    rowGap: 8,
  },
});
