import { useTranslation } from "react-i18next";
import { AuthHeadline } from "../../src/features/auth/components/atoms/AuthHeadline";
import { RegisterForm } from "../../src/features/auth/components/organisms/RegisterForm";

export default function Register() {
  const { t } = useTranslation();

  return (
    <>
      <AuthHeadline headlineText={t("auth.welcomeTo")} shouldShowAppName={true} />
      <RegisterForm />
    </>
  );
}
