// import { router } from "expo-router";
import { useTranslation } from "react-i18next";
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet } from "react-native";
import { Headline, Text } from "react-native-paper";

// import { findPlaces } from "../../src/features/dashboard/api/fetchers";
// import { FindPlaceForm } from "../../src/features/dashboard/components/organisms/FindPlaceForm";
// import { useErrorModalStore } from "../../src/shared/components/error-modal/errorModalStore";
import { COLORS } from "../../src/utils/colors";
// import { getApiErrorCode } from "../../src/utils/functions";

export default function PlaceView() {
  const { t } = useTranslation();

  // const _setError = useErrorModalStore((state) => state.setError);

  // const onSubmitHandler = async () => {};

  return (
    <ScrollView>
      <KeyboardAvoidingView
        style={styles.root}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <Text variant="headlineSmall" style={{ color: COLORS.palette.orange }}>
          {t("dashboard.notFound")}
        </Text>

        <Headline style={styles.headline}>{t("dashboard.searchedPlaces")}</Headline>
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
