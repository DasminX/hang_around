import { Redirect, useNavigationContainerRef } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator } from "react-native";

export default function FakeRootIndexForLoggedInRedirectPurpose() {
  const navigation = useNavigationContainerRef();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!navigation?.isReady) return;

    setReady(true);
  }, [navigation?.isReady]);

  if (ready) return <Redirect href="/dashboard/places/find" />;
  return <ActivityIndicator />;
}
