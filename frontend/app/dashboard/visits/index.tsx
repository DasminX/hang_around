import { VisitArgs } from "@dasminx/hang-around-common";
import { router } from "expo-router";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet } from "react-native";
import { Divider } from "react-native-paper";

import { getVisits } from "../../../src/features/dashboard/api/fetchers";
import { NoVisitsFound } from "../../../src/features/dashboard/components/visits/NoVisitsFound";
import { VisitsHeadline } from "../../../src/features/dashboard/components/visits/VisitsHeadline";
import { VisitsList } from "../../../src/features/dashboard/components/visits/VisitsList";
import { useVisitsStore } from "../../../src/features/dashboard/slices/VisitsStore";
import { useTokenStore } from "../../../src/shared/slices/tokenStore";

export default function VisitsIndex() {
  const { t } = useTranslation();

  const visits = useVisitsStore((state) => state.visits);
  const setVisits = useVisitsStore((state) => state.setVisits);

  const token = useTokenStore((state) => state.token);

  useEffect(() => {
    (async () => {
      const refreshed = await getVisits(token);
      if (!(refreshed instanceof Error)) {
        if (refreshed.status === "fail" && refreshed.error.httpCode === 401) {
          router.replace("/auth/login?error=SESSION_EXPIRED");
        } else if (refreshed.status === "ok") {
          setVisits(refreshed.data as VisitArgs[]);
        }
      }
    })();
  }, []);

  return (
    <KeyboardAvoidingView
      style={styles.root}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView>
        <VisitsHeadline>{t("visits.visitsList")}</VisitsHeadline>
        <Divider />
        {!visits?.length ? <NoVisitsFound /> : <VisitsList visits={visits} />}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    marginHorizontal: "auto",
    marginTop: 64,
    width: "90%",
  },
});
