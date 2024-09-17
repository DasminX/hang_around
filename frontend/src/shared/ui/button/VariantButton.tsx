import { StyleSheet } from "react-native";
import { Button, type ButtonProps } from "react-native-paper";

import { COLORS } from "../../../utils/colors";

interface VariantButtonProps extends ButtonProps {
  variant?: keyof typeof COLORS.variants;
}

export default function VariantButton(props: VariantButtonProps) {
  return (
    <Button
      buttonColor={COLORS.variants[props.variant ?? "blue"]}
      textColor="white"
      uppercase
      {...props}
      style={StyleSheet.compose(styles.button, props.style)}
    >
      {props.children}
    </Button>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 150,
    minWidth: "30%",
    maxWidth: "80%",
    marginVertical: 12,
    marginHorizontal: 8,
  },
});
