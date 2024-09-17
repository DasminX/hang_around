import { Stack } from "expo-router";

import { COLORS } from "../utils/colors";

export const AuthNavigation = () => (
  <Stack
    initialRouteName="login"
    screenOptions={{
      headerShown: false,
      contentStyle: { backgroundColor: COLORS.palette.black },
    }}
  >
    <Stack.Screen name="login" />
    <Stack.Screen name="register" />
    <Stack.Screen name="forgot-password" />
    {/* <Stack.Screen name="change-forgotten-password" /> */}
  </Stack>
);
