import { Location } from "@dasminx/hang-around-common";
import * as ExpoLocation from "expo-location";
import { memo, ReactNode, useCallback, useEffect, useState } from "react";

import { usePlacesStore } from "../../../slices/PlacesStore";
import { ManualCoordsInputs } from "./ManualCoordsInputs";
import { Map } from "./Map";
import { MapPlaceholder } from "./MapPlaceholder";

export const LocationFormField = memo(() => {
  const [wasLoaded, setWasLoaded] = useState<boolean>(false);
  const [isLocalisationActivated, setIsLocalisationActivated] = useState(false);
  const [enterManually, setEnterManually] = useState(false);

  const setLocation = usePlacesStore((state) => state.setLocation);

  const onEnterManuallyPress = useCallback(() => {
    setEnterManually(true);
  }, []);

  const onChooseOnMap = useCallback(() => {
    setEnterManually(false);
  }, []);

  useEffect(() => {
    if (enterManually) return;
    (async () => {
      try {
        const permission = await ExpoLocation.requestForegroundPermissionsAsync();
        if (permission.granted) {
          const detectedLocation = (await ExpoLocation.getCurrentPositionAsync()).coords;
          const currentLocation = new Location([
            detectedLocation.latitude,
            detectedLocation.longitude,
          ]);
          setLocation(currentLocation);
          setIsLocalisationActivated(true);
        } else {
          setIsLocalisationActivated(false);
        }
      } catch (error) {
        setIsLocalisationActivated(false);
      } finally {
        if (!wasLoaded) {
          setWasLoaded(true);
        }
      }
    })();
  }, [enterManually]);

  let Outlet: ReactNode | null = null;

  if (wasLoaded) {
    if (enterManually) {
      Outlet = <ManualCoordsInputs onChooseOnMap={onChooseOnMap} />;
    } else if (isLocalisationActivated) {
      Outlet = <Map />;
    } else {
      Outlet = <MapPlaceholder onEnterManuallyPress={onEnterManuallyPress} />;
    }
  } else {
    Outlet = <MapPlaceholder onEnterManuallyPress={onEnterManuallyPress} />;
  }

  return <>{Outlet}</>;
});
