import { ONE_MINUTE, VisitArgs } from "@dasminx/hang-around-common";
import { useEffect, useState } from "react";
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
  const [visits, setVisits] = useState<VisitArgs[] | null>(null);

  const storedVisits = useVisitsStore((state) => state.visits);
  const storeVisits = useVisitsStore((state) => state.setVisits);
  const refreshedAt = useVisitsStore((state) => state.refreshedAt);

  const token = useTokenStore((state) => state.token);

  /* TODO read from Async Storage also */
  useEffect(() => {
    if (Date.now() >= refreshedAt + ONE_MINUTE) {
      (async () => {
        const refreshed = await getVisits(token);
        if (!(refreshed instanceof Error) && refreshed.status == "ok") {
          storeVisits(refreshed.data as VisitArgs[]);
        } else {
          setVisits(storedVisits);
        }
      })();
    } else {
      setVisits(storedVisits);
    }
  }, [storedVisits, visits]);

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
