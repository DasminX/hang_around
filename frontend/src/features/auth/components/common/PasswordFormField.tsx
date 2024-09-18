import { memo } from "react";
import { useTranslation } from "react-i18next";

import OutlinedInput from "../../../../shared/ui/input/OutlinedInput";
import { useAuthFormStore } from "../../slices/authFormInputsStore";

export const PasswordFormField = memo(() => {
  const { t } = useTranslation();

  const setPassword = useAuthFormStore((state) => state.setPassword);

  return (
    <OutlinedInput
      secureTextEntry={true}
      label={t("auth.password")}
      onChangeText={(text) => setPassword(text)}
    />
  );
});
