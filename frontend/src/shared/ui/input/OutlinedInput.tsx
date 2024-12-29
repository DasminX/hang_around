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
      contentStyle={{ color: COLORS.theme.white }}
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
    backgroundColor: COLORS.palette.black,
  },
  short: {
    width: 80,
  },
  long: {
    width: 300,
  },
});
