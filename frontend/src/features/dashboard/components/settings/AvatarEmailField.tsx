import { StyleSheet, View } from "react-native";
import { Avatar, Text } from "react-native-paper";

import { useTokenStore } from "../../../../shared/slices/tokenStore";
import { COLORS } from "../../../../utils/colors";

export const AvatarEmailField = () => {
  const email = useTokenStore((state) => state.email);

  return (
    <View style={styles.root}>
      <Avatar.Icon size={48} icon="account" color={COLORS.palette.orange} style={styles.avatar} />
      <Text variant="titleSmall" style={styles.text}>
        {email}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 24,
    paddingHorizontal: 6,
    paddingVertical: 8,
  },
  avatar: {
    backgroundColor: COLORS.palette.black,
    borderColor: COLORS.palette.orange,
    borderWidth: 2,
  },
  text: {
    color: COLORS.theme.white,
    textAlign: "center",
  },
});
