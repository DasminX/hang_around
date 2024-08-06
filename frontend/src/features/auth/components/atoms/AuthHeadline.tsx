import { Headline, Text } from "react-native-paper";
import { COLORS } from "../../../../utils/colors";

export const AuthHeadline = ({
  headlineText,
  shouldShowAppName,
}: {
  headlineText: string;
  shouldShowAppName: boolean;
}) => {
  return (
    <Headline style={{ textAlign: "center", marginVertical: 24 }}>
      {headlineText}
      {shouldShowAppName && (
        <>
          <Text style={{ color: COLORS.palette.orange }}>HangAround</Text>
          <Text>!</Text>
        </>
      )}
    </Headline>
  );
};
