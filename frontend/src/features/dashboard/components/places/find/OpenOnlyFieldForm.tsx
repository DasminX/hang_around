import { memo } from "react";
import { Checkbox } from "react-native-paper";

import { usePlacesStore } from "../../../slices/PlacesStore";

export const OpenOnlyFieldForm = memo(() => {
  const openOnly = usePlacesStore((state) => state.openOnly);

  const setOpenOnly = usePlacesStore((state) => state.setOpenOnly);

  return (
    <Checkbox
      status={openOnly ? "checked" : "unchecked"}
      onPress={() => {
        setOpenOnly(!openOnly);
      }}
    />
  );
});
