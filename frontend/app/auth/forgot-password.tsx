import { useTranslation } from "react-i18next";
import { AuthHeadline } from "../../src/features/auth/components/atoms/AuthHeadline";
import { ForgotPasswordForm } from "../../src/features/auth/components/organisms/ForgotPasswordForm";

export default function ForgotPassword() {
  const { t } = useTranslation();

  return (
    <>
      <AuthHeadline headlineText={t("auth.remindPassword")} shouldShowAppName={false} />
      <ForgotPasswordForm />
    </>
  );
}
