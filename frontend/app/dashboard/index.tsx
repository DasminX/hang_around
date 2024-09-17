import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet } from "react-native";
import { Headline } from "react-native-paper";
import { useTranslation } from "react-i18next";
import { COLORS } from "../../src/utils/colors";
import { useEffect } from "react";
import { FindPlaceForm } from "../../src/features/dashboard/components/organisms/FindPlaceForm";
import { usePlacesStore } from "../../src/features/dashboard/slices/PlacesStore";
import { findPlaces } from "../../src/features/dashboard/api/fetchers";
import { useTokenStore } from "../../src/shared/slices/tokenStore";
import { useErrorModalStore } from "../../src/shared/components/error-modal/errorModalStore";
import { getApiErrorCode } from "../../src/utils/functions";
import { router } from "expo-router";

export default function DashboardIndex() {
  const { t } = useTranslation();

  const token = useTokenStore((state) => state.token);
  const howFar = usePlacesStore((state) => state.howFar);
  const location = usePlacesStore((state) => state.location);
  const minRating = usePlacesStore((state) => state.minRating);
  const typesOfFood = usePlacesStore((state) => state.typesOfFood);

  const resetInputs = usePlacesStore((state) => state.resetPlacesCredentials);

  const setError = useErrorModalStore((state) => state.setError);

  useEffect(() => {
    resetInputs();
  }, []);

  const onSubmitHandler = async () => {
    const res = await findPlaces({ howFar, location, minRating, typesOfFood }, token);
    if (res instanceof Error) {
      return setError({
        title: t("errors.occured"),
        description: res.message,
      });
    }

    switch (res.status) {
      case "fail":
        return setError({
          title: t("errors.occured"),
          description: t(getApiErrorCode(res)),
        });
      case "ok":
        if (Array.isArray(res.data)) {
          router.push("/dashboard/place");
        }

        return setError({
          title: t("errors.occured"),
          description: t("errors.unknown"),
        });
    }
  };

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
