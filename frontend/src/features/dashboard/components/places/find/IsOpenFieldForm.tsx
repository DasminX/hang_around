import { memo } from "react";
import { Checkbox } from "react-native-paper";

import { usePlacesStore } from "../../../slices/PlacesStore";

export const IsOpenFieldForm = memo(() => {
  const isOpen = usePlacesStore((state) => state.isOpen);

  const setIsOpen = usePlacesStore((state) => state.setIsOpen);

  return (
    <Checkbox
      status={isOpen ? "checked" : "unchecked"}
      onPress={() => {
        setIsOpen(!isOpen);
      }}
    />
  );
});
