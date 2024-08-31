/* import { useTranslation } from "react-i18next";
import { AuthHeadline } from "../../src/features/auth/components/atoms/AuthHeadline";
import { router } from "expo-router";
import { useEffect } from "react";
import { ChangeForgottenPasswordForm } from "../../src/features/auth/components/organisms/ChangeForgottenPasswordForm";
import { ErrorModal } from "../../src/shared/components/error-modal/ErrorModal";
import { KeyboardAvoidingView, Platform, StyleSheet } from "react-native";
import { useAuthFormStore } from "../../src/features/auth/slices/authFormInputsStore";
import { useErrorModalStore } from "../../src/shared/components/error-modal/errorModalStore";

export default function ChangeForgottenPassword() {
  const { t } = useTranslation();

  const password = useAuthFormStore((state) => state.password);
  const repeatPassword = useAuthFormStore((state) => state.repeatPassword);
  const resetInputs = useAuthFormStore((state) => state.resetInputValues);

  const setError = useErrorModalStore((state) => state.setError);

  
  useEffect(() => {
    return () => {
      resetInputs();
    };
  }, []);


  async function changeForgottenPasswordHandler() {
    const res = await changeForgottenPassword(password, repeatPassword);

    if (res instanceof Error) {
      return setError({
        title: t("errors.occured"),
        description: res.message,
      });
    }

    console.log(res);

    resetInputs();
    router.push("/auth/login");
  }

  return (
    <KeyboardAvoidingView
    style={styles.root}
    behavior={Platform.OS === "ios" ? "padding" : "height"}
  >
      <AuthHeadline headlineText={t("auth.changeForgottenPassword")} showAppName={false} />
      <ChangeForgottenPasswordForm  onSubmit={changeForgottenPasswordHandler}/>
    <ErrorModal />
  </KeyboardAvoidingView>
  );
}



const styles = StyleSheet.create({
  root: {
    top: "10%",
    height: "35%",
    width: "90%",
    alignSelf: "center",
    justifyContent: "space-between",
  },
});
 */
