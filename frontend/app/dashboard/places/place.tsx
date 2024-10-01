// import { router } from "expo-router";
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet } from "react-native";

import { FoundPlaces } from "../../../src/features/dashboard/components/places/place/FoundPlaces";
import { NoPlacesFound } from "../../../src/features/dashboard/components/places/place/NoPlacesFound";
import { useFoundPlaceStore } from "../../../src/features/dashboard/slices/FoundPlaceStore";

export default function PlaceView() {
  const places = useFoundPlaceStore((state) => state.places);

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
