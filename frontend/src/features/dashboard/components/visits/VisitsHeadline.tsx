import { ReactNode } from "react";
import { Headline, Text } from "react-native-paper";

import { COLORS } from "../../../../utils/colors";

export const VisitsHeadline = ({ children }: { children: ReactNode }) => {
  return (
    <Headline style={{ textAlign: "center", marginVertical: 24, color: COLORS.theme.white }}>
      <Text style={{ color: COLORS.palette.orange }}>{children}</Text>
    </Headline>
  );
};
