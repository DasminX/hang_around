import { useRouter } from "expo-router";
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View } from "react-native";
import { Button, Headline, Text } from "react-native-paper";
import { resetAsyncStorageAuthTokenProps } from "../../src/utils/async-storage-helpers";
import { useTokenStore } from "../../src/shared/slices/tokenStore";
import { useTranslation } from "react-i18next";
import { COLORS } from "../../src/utils/colors";
import { useCallback, useState } from "react";
import { FindPlaceForm } from "../../src/features/dashboard/components/organisms/FindPlaceForm";

export default function DashboardIndex() {
  const router = useRouter();
  const { t } = useTranslation();

  const [wasSearching, setWasSearching] = useState<boolean>(false);
  // const [isLoading, setIsLoading] = useState<boolean>(false);

  const resetTokenCredentials = useTokenStore((state) => state.resetTokenCredentials);

  const onSubmitHandler = useCallback(async () => {
    setWasSearching(true);
  }, []);

  return (
    /* TODO */
    <ScrollView>
      <KeyboardAvoidingView
        style={styles.root}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <Headline style={styles.headline}>{t("dashboard.findPlace")}</Headline>
        <FindPlaceForm onSubmit={onSubmitHandler} />
        <View>
          {wasSearching && (
            <Text variant="headlineSmall" style={{ color: COLORS.palette.orange }}>
              {t("dashboard.notFound")}
            </Text>
          )}
          <Button onPress={() => router.replace("/auth/login")}>wróc do auth</Button>
          <Button
            onPress={() => {
              resetAsyncStorageAuthTokenProps();
              resetTokenCredentials();
              router.replace("/auth/login");
            }}
          >
            reset async storage
          </Button>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    marginVertical: 80,
    alignItems: "center",
  },
  headline: {
    color: COLORS.palette.orange,
  },
});
