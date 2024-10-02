import { VisitArgs } from "@dasminx/hang-around-common";
import { useTranslation } from "react-i18next";
import { ScrollView, StyleSheet } from "react-native";

import { Visit } from "./Visit";

export const VisitsList = ({ visits }: { visits: VisitArgs[] }) => {
  const { t } = useTranslation();

  return (
    <ScrollView>
      {visits.map((visit) => (
        <Visit key={visit.id} visit={visit} />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({});
