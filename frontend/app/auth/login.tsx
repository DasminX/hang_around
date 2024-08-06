import { useTranslation } from "react-i18next";
import { AuthHeadline } from "../../src/features/auth/components/atoms/AuthHeadline";
import { LoginForm } from "../../src/features/auth/components/organisms/LoginForm";

export default function Login() {
  const { t } = useTranslation();

  return (
    <>
      <AuthHeadline headlineText={t("auth.loginTo")} shouldShowAppName={true} />
      <LoginForm />
    </>
  );
}
