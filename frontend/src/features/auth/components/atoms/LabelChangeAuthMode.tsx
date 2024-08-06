import { Link } from "expo-router";
import { Text } from "react-native-paper";
import { COLORS } from "../../../../utils/colors";

export const LabelChangeAuthMode = ({ text, path }: { text: string; path: string }) => {
  return (
    <Text variant="labelLarge">
      {text}{" "}
      <Text variant="bodyLarge">
        <Link style={{ color: COLORS.variants.blue }} replace href={`/auth/${path}`}>
          hej
        </Link>
      </Text>
    </Text>
  );
};
