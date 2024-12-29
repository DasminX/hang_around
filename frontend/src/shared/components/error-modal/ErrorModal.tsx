import { memo } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet } from "react-native";
import { Dialog /* , type DialogProps */, Portal, Text } from "react-native-paper";

import { COLORS } from "../../../utils/colors";
import VariantButton from "../../ui/button/VariantButton";
import { useErrorModalStore } from "./errorModalStore";

export const ErrorModal = memo(() => {
  const { t } = useTranslation();

  const occured = useErrorModalStore((state) => state.occured);
  const description = useErrorModalStore((state) => state.description);
  const title = useErrorModalStore((state) => state.title);
  const setDefaultError = useErrorModalStore((state) => state.setDefaultError);

  return (
    <Portal>
      <Dialog
        visible={occured}
        dismissable={false}
        style={styles.dialog}
        /* onDismiss={setDefaultError} */
      >
        <Dialog.Title style={styles.center}>{title}</Dialog.Title>
        <Dialog.Content>
          <Text style={styles.center} variant="bodyMedium">
            {description}
          </Text>
        </Dialog.Content>
        <Dialog.Actions>
          <VariantButton style={styles.button} variant="green" onPress={setDefaultError}>
            {t("common.close")}
          </VariantButton>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
});

const styles = StyleSheet.create({
  dialog: {
    backgroundColor: COLORS.palette.black,
    borderColor: COLORS.palette.orange,
    borderWidth: 1,
  },
  center: {
    textAlign: "center",
    color: COLORS.theme.white,
  },
  button: {
    width: "50%",
    marginRight: "auto",
    marginLeft: "auto",
  },
});
