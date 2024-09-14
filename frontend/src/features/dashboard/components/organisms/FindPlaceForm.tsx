import { StyleSheet, View } from "react-native";
import { useTranslation } from "react-i18next";

import VariantButton from "../../../../shared/ui/button/VariantButton";
import { HowFarFormField } from "../molecules/HowFarFormField";
import { LocationFormField } from "../molecules/LocationFormField";
import { MinRatingFormField } from "../molecules/MinRatingFormField";
import { TypesOfFoodFieldForm } from "../molecules/TypesOfFoodFieldForm";

export const FindPlaceForm = ({ onSubmit }: { onSubmit: () => unknown }) => {
  const { t } = useTranslation();

  return (
    <View style={styles.form}>
      <HowFarFormField />
      <LocationFormField />
      <MinRatingFormField />
      <TypesOfFoodFieldForm />
      <VariantButton onPress={onSubmit}>{t("common.send")} </VariantButton>
    </View>
  );
};

const styles = StyleSheet.create({
  form: {
    width: "80%",
    flex: 1,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
  },
});
