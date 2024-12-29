import { Stack } from "expo-router";
import { useTranslation } from "react-i18next";

import { COLORS } from "../utils/colors";

export const AuthNavigation = () => {
  const { t } = useTranslation();

  return (
    <Stack
      initialRouteName="login"
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: COLORS.palette.black },
      }}
    >
      <Stack.Screen name="login" />
      <Stack.Screen name="register" />
      <Stack.Screen
        name="forgot-password"
        options={{
          headerShown: true,
          headerStyle: { backgroundColor: COLORS.palette.black },
          headerTitleStyle: {
            color: COLORS.palette.orange,
          },
          headerTintColor: COLORS.palette.orange,
          headerTitle: t("common.goBack"),
        }}
      />
      {/* <Stack.Screen name="change-forgotten-password" /> */}
    </Stack>
  );
};
