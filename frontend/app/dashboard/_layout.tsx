import { useFocusEffect } from "expo-router";
import { useCallback } from "react";

import { useFoundPlaceStore } from "../../src/features/dashboard/slices/FoundPlaceStore";
import { usePlacesStore } from "../../src/features/dashboard/slices/PlacesStore";
import { useVisitsStore } from "../../src/features/dashboard/slices/VisitsStore";
import DashboardNavigation from "../../src/navigation/DashboardNavigation";
import { withAuth } from "../../src/shared/hoc/withAuth";

function DasboardLayout() {
  const resetPlacesCredentials = usePlacesStore((state) => state.resetPlacesCredentials);
  const resetVisits = useVisitsStore((state) => state.resetVisits);
  const resetPlaces = useFoundPlaceStore((state) => state.resetPlaces);

  useFocusEffect(
    useCallback(() => {
      return () => {
        resetVisits();
        resetPlacesCredentials();
        resetPlaces();
      };
    }, []),
  );
  return <DashboardNavigation />;
}

export default withAuth(DasboardLayout);
