import { useTranslation } from "react-i18next";
import OutlinedInput from "../../../../shared/ui/input/OutlinedInput";
import { memo } from "react";
import { usePlacesStore } from "../../slices/DashboardStore";

export const LocationFormField = memo(() => {
  const { t } = useTranslation();

  const location = usePlacesStore((state) => state.location);
  const setLocation = usePlacesStore((state) => state.setLocation);

  return (
    <>
      <OutlinedInput
        label={t("dashboard.lat")}
        keyboardType="number-pad"
        placeholder=""
        onChangeText={(lat: string) => setLocation({ ...location, lat: parseFloat(lat) })}
      />
      <OutlinedInput
        label={t("dashboard.lng")}
        keyboardType="number-pad"
        placeholder=""
        onChangeText={(lng: string) => setLocation({ ...location, lng: parseFloat(lng) })}
      />
    </>
  );
});
