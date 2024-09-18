import { Headline, Text } from "react-native-paper";

import { COLORS } from "../../../../utils/colors";

type AuthHeadlineProps = {
  headlineText: string;
  showAppName: boolean;
};

export const AuthHeadline = ({ headlineText, showAppName }: AuthHeadlineProps) => {
  return (
    <Headline style={{ textAlign: "center", marginVertical: 24 }}>
      {headlineText}
      {showAppName && <Text style={{ color: COLORS.palette.orange }}>HangAround!</Text>}
    </Headline>
  );
};
