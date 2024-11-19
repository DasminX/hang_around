import { /* ONE_MINUTE, */ VisitArgs } from "@dasminx/hang-around-common";
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

  const storedVisits = useVisitsStore((state) => state.visits);
  const storeVisits = useVisitsStore((state) => state.setVisits);
  const resetVisits = useVisitsStore((state) => state.resetVisits);

  const token = useTokenStore((state) => state.token);

  useEffect(() => {
    (async () => {
      const refreshed = await getVisits(token);
      if (!(refreshed instanceof Error) && refreshed.status == "ok") {
        storeVisits(refreshed.data as VisitArgs[]);
      }
    })();

    return () => resetVisits();
  }, []);

  return (
    <KeyboardAvoidingView
      style={styles.root}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView>
        <VisitsHeadline>{t("visits.visitsList")}</VisitsHeadline>
        <Divider />
        {!storedVisits?.length ? <NoVisitsFound /> : <VisitsList visits={storedVisits} />}
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
