import { Location } from "@dasminx/hang-around-common";
import { memo } from "react";
import { StyleSheet } from "react-native";
import MapView, { MapPressEvent, Marker } from "react-native-maps";

import { usePlacesStore } from "../../../slices/PlacesStore";

export const Map = memo(() => {
  const location = usePlacesStore((state) => state.location);
  const setLocation = usePlacesStore((state) => state.setLocation);

  const handleMapPress = (e: MapPressEvent) => {
    const coords = new Location([
      e.nativeEvent.coordinate.latitude,
      e.nativeEvent.coordinate.longitude,
    ]);
    setLocation(coords);
  };

  if (!location) return null;

  /* TODO naprawic mapke - cos nie dziala (nie zaznacza markera i nie dziala onPress) */
  return (
    <MapView
      style={styles.map}
      initialRegion={{
        latitude: Array.isArray(location) ? location[0] : location.lat,
        longitude: Array.isArray(location) ? location[1] : location.lng,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      }}
      loadingEnabled
      showsUserLocation
      showsCompass
      onPress={handleMapPress}
    >
      {location && (
        <Marker
          pinColor="red"
          coordinate={{
            latitude: Array.isArray(location) ? location[0] : location.lat,
            longitude: Array.isArray(location) ? location[1] : location.lng,
          }}
        />
      )}
    </MapView>
  );
});

const styles = StyleSheet.create({
  map: {
    width: 250,
    maxWidth: "90%",
    height: "auto",
    aspectRatio: "1/1",
  },
});
