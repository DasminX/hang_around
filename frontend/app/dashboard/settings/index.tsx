import { KeyboardAvoidingView, Platform, StyleSheet } from "react-native";
import { Text } from "react-native-paper";

export default function SettingsIndex() {
  return (
    <KeyboardAvoidingView
      style={styles.root}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <Text>elo</Text>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  root: {
    top: "10%",
    height: "65%",
    width: "90%",
    alignSelf: "center",
    justifyContent: "space-evenly",
  },
});
