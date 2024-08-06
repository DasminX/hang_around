import { useTranslation } from "react-i18next";
import { AuthHeadline } from "../../src/features/auth/components/atoms/AuthHeadline";

export default function ChangeForgottenPassword() {
  const { t } = useTranslation();

  return (
    <>
      <AuthHeadline headlineText={t("auth.changeForgottenPassword")} shouldShowAppName={false} />
      <ChangeForgottenPassword />
    </>
  );
}
