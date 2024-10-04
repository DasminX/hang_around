import { VisitArgs } from "@dasminx/hang-around-common";
import { ScrollView } from "react-native";
import { Divider } from "react-native-paper";

import { Visit } from "./Visit";

export const VisitsList = ({ visits }: { visits: VisitArgs[] }) => {
  return (
    <ScrollView>
      {visits.map((visit, key, arr) => (
        <>
          <Visit key={visit.id} visit={visit} />
          {key !== arr.length - 1 && <Divider />}
        </>
      ))}
    </ScrollView>
  );
};
