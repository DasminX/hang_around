import { KeyboardAvoidingView, Platform, StyleSheet } from "react-native";
import { Divider } from "react-native-paper";

import { LangChangeField } from "../../../src/features/dashboard/components/settings/LangChangeField";

export default function SettingsIndex() {
  return (
    <KeyboardAvoidingView
      style={styles.root}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <LangChangeField />
      <Divider />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    marginHorizontal: "auto",
    marginTop: 64,
    width: "90%",
  },
});
