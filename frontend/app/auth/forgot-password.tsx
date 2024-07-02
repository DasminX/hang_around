import { AuthContainer } from "../../src/features/auth/containers/AuthContainer";
import { AUTH_MODE_ENUM } from "../../src/features/auth/utils/enums";

export default function ForgotPassword() {
  return <AuthContainer mode={AUTH_MODE_ENUM.FORGOT_PASSWORD} />;
}
