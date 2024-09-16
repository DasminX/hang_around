import OutlinedInput from "../../../../shared/ui/input/OutlinedInput";
import { memo } from "react";
import { usePlacesStore } from "../../slices/DashboardStore";

export const MinRatingFormField = memo(() => {
  const setMinRating = usePlacesStore((state) => state.setMinRating);

  return (
    <OutlinedInput
      keyboardType="number-pad"
      placeholder="1"
      onChangeText={(minRating: string) => setMinRating(parseFloat(minRating))}
      width="short"
    />
  );
});
