import { StyleSheet } from "react-native";
import { TextInput, type TextInputProps } from "react-native-paper";

import { COLORS } from "../../../utils/colors";

interface OutlinedInputProps extends TextInputProps {
  width?: "long" | "short";
}

export default function OutlinedInput(props: OutlinedInputProps) {
  return (
    <TextInput
      mode="outlined"
      style={[styles.input, styles[props.width || "long"]]}
      placeholderTextColor={"gray"}
      activeOutlineColor={COLORS.palette.orange}
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    width: 300,
    maxWidth: "80%",
    marginVertical: 8,
  },
  short: {
    width: 80,
  },
  long: {
    width: 300,
  },
});
