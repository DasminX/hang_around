import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View } from "react-native";
import { Divider } from "react-native-paper";

import { signOut } from "../../../src/features/auth/api/fetchers";
import { LangChangeField } from "../../../src/features/dashboard/components/settings/LangChangeField";
import { useTokenStore } from "../../../src/shared/slices/tokenStore";
import VariantButton from "../../../src/shared/ui/button/VariantButton";
import { AUTH_TOKEN, AUTH_TOKEN_EXP } from "../../../src/utils/constants";

export default function SettingsIndex() {
  const { t } = useTranslation();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const resetTokenCredentials = useTokenStore((state) => state.resetTokenCredentials);

  const logoutHandler = async () => {
    setIsLoggingOut(true);

    try {
      await signOut();
      await AsyncStorage.multiRemove([AUTH_TOKEN, AUTH_TOKEN_EXP]);
      resetTokenCredentials();
      router.push("/auth/login");
    } catch (_err) {
      /* empty */
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.root}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView>
        <LangChangeField />
        <Divider />
        {/* More later */}
      </ScrollView>
      <View style={styles.logoutArea}>
        <VariantButton
          variant="red"
          style={styles.logoutButton}
          onPress={logoutHandler}
          loading={isLoggingOut}
        >
          {t("settings.logout")}
        </VariantButton>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    marginHorizontal: "auto",
    marginTop: 64,
    width: "90%",
  },
  logoutArea: {
    height: "10%",
    marginVertical: 24,
  },
  logoutButton: {
    marginHorizontal: "auto",
  },
});
