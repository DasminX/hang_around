import { Stack } from "expo-router";

import { COLORS } from "../utils/colors";

export const DashboardNavigation = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: COLORS.palette.black },
      }}
      initialRouteName="index"
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="place" />
    </Stack>
  );
};
