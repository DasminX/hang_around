import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet } from "react-native";
import { Headline } from "react-native-paper";
import { useTranslation } from "react-i18next";
import { COLORS } from "../../src/utils/colors";
import { useCallback } from "react";
import { FindPlaceForm } from "../../src/features/dashboard/components/organisms/FindPlaceForm";

export default function DashboardIndex() {
  const { t } = useTranslation();

  const onSubmitHandler = useCallback(async () => {}, []);

  return (
    <ScrollView>
      <KeyboardAvoidingView
        style={styles.root}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <Headline style={styles.headline}>{t("dashboard.findPlace")}</Headline>
        <FindPlaceForm onSubmit={onSubmitHandler} />
        {/* {wasSearching && (
            <Text variant="headlineSmall" style={{ color: COLORS.palette.orange }}>
              {t("dashboard.notFound")}
            </Text>
          )} */}
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
