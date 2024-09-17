import { Link } from "expo-router";
import { useTranslation } from "react-i18next";
import { Text } from "react-native-paper";

import { COLORS } from "../../../../utils/colors";

export const ForgotPasswordLink = () => {
  const { t } = useTranslation();
  return (
    <Text variant="labelLarge">
      {t("auth.forgotPassword")}{" "}
      <Text variant="bodyLarge">
        <Link
          replace={false}
          style={{ color: COLORS.variants.blue }}
          href={{
            pathname: "/auth/forgot-password",
          }}
        >
          {t(`common.clickHere`)}
        </Link>
      </Text>
    </Text>
  );
};
