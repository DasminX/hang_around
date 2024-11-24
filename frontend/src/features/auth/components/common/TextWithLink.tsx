import { Href, Link } from "expo-router";
import { Text } from "react-native-paper";

import { COLORS } from "../../../../utils/colors";

type TextWithLinkProps = {
  text: string;
  link: {
    path: Href;
    text: string;
  };
};

export const TextWithLink = ({ text, link }: TextWithLinkProps) => {
  return (
    <Text variant="labelLarge" style={{ color: COLORS.theme.white }}>
      {text}{" "}
      <Text variant="bodyLarge">
        <Link style={{ color: COLORS.variants.blue }} replace href={link.path}>
          {link.text}
        </Link>
      </Text>
    </Text>
  );
};
