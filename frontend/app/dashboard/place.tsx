// import { router } from "expo-router";
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet } from "react-native";

// import { findPlaces } from "../../src/features/dashboard/api/fetchers";
// import { FindPlaceForm } from "../../src/features/dashboard/components/organisms/FindPlaceForm";
// import { useErrorModalStore } from "../../src/shared/components/error-modal/errorModalStore";
import { FoundPlaces } from "../../src/features/dashboard/components/place/FoundPlaces";
import { NoPlacesFound } from "../../src/features/dashboard/components/place/NoPlacesFound";
import { useFoundPlaceStore } from "../../src/features/dashboard/slices/FoundPlaceStore";

export default function PlaceView() {
  const places = useFoundPlaceStore((state) => state.places);

  // const _setError = useErrorModalStore((state) => state.setError);

  // const onSubmitHandler = async () => {};

  console.log(places);
  return (
    <ScrollView>
      <KeyboardAvoidingView
        style={styles.root}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        {!places?.length ? <NoPlacesFound /> : <FoundPlaces places={places} />}
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
});
