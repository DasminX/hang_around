import { Location } from "@dasminx/hang-around-common";
import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import React from "react";
import { StyleSheet } from "react-native";
import MapView, { Circle, MapPressEvent, Marker, PROVIDER_GOOGLE } from "react-native-maps";

import { COLORS } from "../../../../../utils/colors";
import { usePlacesStore } from "../../../slices/PlacesStore";

export const Map = () => {
  const [mapKey, setMapKey] = useState(Math.random().toString());

  const location = usePlacesStore((state) => state.location);
  const setLocation = usePlacesStore((state) => state.setLocation);
  const howFar = usePlacesStore((state) => state.howFar);

  useFocusEffect(
    useCallback(() => {
      setMapKey(Math.random().toString());

      return () => {
        setMapKey(Math.random().toString());
      };
    }, []),
  );

  const onMapPress = (e: MapPressEvent) => {
    const coords = new Location([
      e.nativeEvent.coordinate.latitude,
      e.nativeEvent.coordinate.longitude,
    ]);
    setLocation(coords);
  };

  if (!location) return null;

  return (
    <MapView
      style={styles.map}
      initialRegion={{
        latitude: Array.isArray(location) ? location[0] : location.lat,
        longitude: Array.isArray(location) ? location[1] : location.lng,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      }}
      key={mapKey}
      loadingEnabled
      showsUserLocation
      showsCompass
      provider={PROVIDER_GOOGLE}
      onPress={onMapPress}
      loadingBackgroundColor={COLORS.palette.black}
      loadingIndicatorColor={COLORS.palette.orange}
    >
      {location && (
        <>
          <Marker
            pinColor="red"
            coordinate={{
              latitude: Array.isArray(location) ? location[0] : location.lat,
              longitude: Array.isArray(location) ? location[1] : location.lng,
            }}
          />
          <Circle
            center={{
              latitude: Array.isArray(location) ? location[0] : location.lat,
              longitude: Array.isArray(location) ? location[1] : location.lng,
            }}
            radius={howFar.unit === "yd" ? howFar.distance * 0.9144 : howFar.distance}
            strokeWidth={1}
            strokeColor="rgba(0, 0, 255, 0.5)"
            fillColor="rgba(0, 0, 255, 0.2)"
          />
        </>
      )}
    </MapView>
  );
};

const styles = StyleSheet.create({
  map: {
    width: 250,
    maxWidth: "90%",
    height: "auto",
    aspectRatio: "1/1",
  },
});
