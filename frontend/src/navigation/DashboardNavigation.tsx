import { Tabs } from "expo-router";
import { useTranslation } from "react-i18next";
import { Icon, Text } from "react-native-paper";

import { COLORS } from "../utils/colors";

export default function DashboardNavigation() {
  const { t } = useTranslation();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: COLORS.palette.black,
          borderTopWidth: 2,
          borderTopColor: COLORS.palette.orange,
        },
        sceneStyle: {
          backgroundColor: COLORS.palette.black,
        },
      }}
      initialRouteName="places/find"
    >
      <Tabs.Screen
        name="places/find"
        options={{
          tabBarLabel: ({ focused }) => (
            <Text variant="bodySmall" style={{ color: focused ? COLORS.palette.orange : "white" }}>
              {t("dashboard.findPlace")}
            </Text>
          ),
          tabBarIcon: ({ focused }) => (
            <Icon
              size={24}
              source={"text-search"}
              color={focused ? COLORS.palette.orange : "white"}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="places/place"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="visits/index"
        options={{
          tabBarLabel: ({ focused }) => (
            <Text variant="bodySmall" style={{ color: focused ? COLORS.palette.orange : "white" }}>
              {t("dashboard.visits")}
            </Text>
          ),
          tabBarIcon: ({ focused }) => (
            <Icon
              size={24}
              source={"format-list-bulleted"}
              color={focused ? COLORS.palette.orange : "white"}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="settings/index"
        options={{
          tabBarLabel: ({ focused }) => (
            <Text variant="bodySmall" style={{ color: focused ? COLORS.palette.orange : "white" }}>
              {t("dashboard.settings")}
            </Text>
          ),
          tabBarIcon: ({ focused }) => (
            <Icon size={24} source={"cog"} color={focused ? COLORS.palette.orange : "white"} />
          ),
        }}
      />
    </Tabs>
  );
}
