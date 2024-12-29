import { useState } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";
import { Icon, Snackbar as Snack, Text } from "react-native-paper";

import { COLORS } from "../../utils/colors";

export const Snackbar = ({
  onTimeout,
  errorText,
}: {
  onTimeout: () => void;
  errorText: string;
}) => {
  const [isVisible, setIsVisible] = useState(true);

  const { t } = useTranslation();

  return (
    <View>
      <Snack
        style={styles.snackbar}
        visible={isVisible}
        onDismiss={() => {
          setIsVisible(false);
          onTimeout();
        }}
        duration={5000}
      >
        <View style={styles.innerSnackbar}>
          <Icon size={24} source={"alert-box"} color={COLORS.variants.red} />
          <View style={styles.snackbarTextWrapper}>
            <Text variant="labelLarge" style={styles.snackbarText} ellipsizeMode="tail">
              {t(`auth.${errorText}`)}
            </Text>
          </View>
          <Icon size={24} source={"alert-box"} color={COLORS.variants.red} />
        </View>
      </Snack>
    </View>
  );
};

const styles = StyleSheet.create({
  snackbar: {
    backgroundColor: COLORS.palette.black,
    borderColor: COLORS.variants.red,
    borderWidth: 2,
    borderRadius: 6,
  },
  innerSnackbar: {
    flexDirection: "row",
    width: "100%",
    flexWrap: "nowrap",
    justifyContent: "space-between",
    alignItems: "center",
  },
  snackbarTextWrapper: {
    flex: 1,
    flexShrink: 1,
    marginHorizontal: 8,
  },
  snackbarText: {
    color: COLORS.theme.white,
    textAlign: "center",
  },
});
