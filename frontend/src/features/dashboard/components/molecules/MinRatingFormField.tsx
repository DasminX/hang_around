import { useTranslation } from "react-i18next";
import OutlinedInput from "../../../../shared/ui/input/OutlinedInput";
import { memo } from "react";
import { usePlacesStore } from "../../slices/DashboardStore";

export const MinRatingFormField = memo(() => {
  const { t } = useTranslation();

  const setMinRating = usePlacesStore((state) => state.setMinRating);

  return (
    <OutlinedInput
      label={t("dashboard.lat")}
      keyboardType="number-pad"
      placeholder=""
      onChangeText={(minRating: string) => setMinRating(parseFloat(minRating))}
      width="short"
    />
  );
});
