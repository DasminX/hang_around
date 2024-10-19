import { VisitArgs } from "@dasminx/hang-around-common";
import React from "react";
import { ScrollView } from "react-native";
import { Divider } from "react-native-paper";

import { Visit } from "./Visit";

export const VisitsList = ({ visits }: { visits: VisitArgs[] }) => {
  return (
    <ScrollView>
      {visits.map((visit, idx, arr) => (
        <React.Fragment key={visit.id}>
          <Visit visit={visit} />
          {idx !== arr.length - 1 && <Divider />}
        </React.Fragment>
      ))}
    </ScrollView>
  );
};
