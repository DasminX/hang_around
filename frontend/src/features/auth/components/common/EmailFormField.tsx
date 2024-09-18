import { memo } from "react";
import { useTranslation } from "react-i18next";

import OutlinedInput from "../../../../shared/ui/input/OutlinedInput";
import { useAuthFormStore } from "../../slices/authFormInputsStore";

export const EmailFormField = memo(() => {
  const { t } = useTranslation();

  const setEmail = useAuthFormStore((state) => state.setEmail);

  return (
    <OutlinedInput
      label={t("auth.email")}
      keyboardType="email-address"
      placeholder="user@example.com"
      autoCapitalize="none"
      onChangeText={(text) => setEmail(text)}
    />
  );
});
