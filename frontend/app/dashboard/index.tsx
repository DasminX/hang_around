import { useRouter } from "expo-router";
import { View } from "react-native";
import { Button, Text } from "react-native-paper";
import { resetAsyncStorageAuthTokenProps } from "../../src/utils/async-storage-helpers";
import { useTokenStore } from "../../src/shared/slices/tokenStore";

export default function DashboardIndex() {
  const router = useRouter();

  const resetTokenCredentials = useTokenStore((state) => state.resetTokenCredentials);

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text style={{ backgroundColor: "red" }}>DUPA</Text>
      <Button onPress={() => router.replace("/auth/login")}>wróc do auth</Button>
      <Button
        onPress={() => {
          resetAsyncStorageAuthTokenProps();
          resetTokenCredentials();
          router.replace("/auth/login");
        }}
      >
        reset async storage
      </Button>
    </View>
  );
}
