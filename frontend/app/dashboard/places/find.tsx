import { router } from "expo-router";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet } from "react-native";
import { Headline } from "react-native-paper";

import { findPlaces } from "../../../src/features/dashboard/api/fetchers";
import { FindPlaceForm } from "../../../src/features/dashboard/components/places/find/FindPlaceForm";
import { useFoundPlaceStore } from "../../../src/features/dashboard/slices/FoundPlaceStore";
import { usePlacesStore } from "../../../src/features/dashboard/slices/PlacesStore";
import { useErrorModalStore } from "../../../src/shared/components/error-modal/errorModalStore";
import { useTokenStore } from "../../../src/shared/slices/tokenStore";
import { COLORS } from "../../../src/utils/colors";
import { getApiErrorCode } from "../../../src/utils/functions";

export default function FindPlaceIndex() {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const token = useTokenStore((state) => state.token);
  const howFar = usePlacesStore((state) => state.howFar);
  const location = usePlacesStore((state) => state.location);
  const minRating = usePlacesStore((state) => state.minRating);
  const typesOfFood = usePlacesStore((state) => state.typesOfFood);
  const priceLevels = usePlacesStore((state) => state.priceLevels);
  const isOpen = usePlacesStore((state) => state.isOpen);

  const resetInputs = usePlacesStore((state) => state.resetPlacesCredentials);

  const setError = useErrorModalStore((state) => state.setError);

  const setPlaces = useFoundPlaceStore((state) => state.setPlaces);

  useEffect(() => {
    resetInputs();
  }, []);

  const onSubmitHandler = async () => {
    setIsLoading(true);
    const res = await findPlaces(
      { howFar, location, minRating, typesOfFood, priceLevels, isOpen },
      token,
    );
    if (res instanceof Error) {
      return setError({
        title: t("errors.occured"),
        description: res.message,
      });
    }

    setIsLoading(false);
    switch (res.status) {
      case "fail":
        return setError({
          title: t("errors.occured"),
          description: t(getApiErrorCode(res)),
        });
      case "ok":
        if (Array.isArray(res.data)) {
          setPlaces(res.data);
          return router.push("/dashboard/places/place");
        }

        return setError({
          title: t("errors.occured"),
          description: t("errors.unknown"),
        });
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.root}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView style={styles.scrollView}>
        <Headline style={styles.headline}>{t("dashboard.findPlace")}</Headline>
        <FindPlaceForm onSubmit={onSubmitHandler} isLoading={isLoading} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    marginTop: 64,
    marginBottom: 32,
  },
  scrollView: {
    flex: 1,
  },
  headline: {
    color: COLORS.palette.orange,
    textAlign: "center",
  },
});
