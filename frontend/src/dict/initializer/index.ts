import AsyncStorage from "@react-native-async-storage/async-storage";
import i18n from "i18next";
import { useState } from "react";
import { initReactI18next } from "react-i18next";

import { APP_PREFERRED_LANG } from "../../utils/constants";
import * as resources from "../translations";

export const initializeI18N = (initialLang: string) => {
  i18n.use(initReactI18next).init({
    compatibilityJSON: "v3",
    resources: Object.entries(resources).reduce(
      (acc, [key, value]) => ({
        ...acc,
        [key]: {
          translation: value,
        },
      }),
      {},
    ),
    lng: initialLang,
  });
};

export const useAppTranslation = () => {
  const [loaded, setLoaded] = useState(false);

  (async () => {
    const prefferedLang = await AsyncStorage.getItem(APP_PREFERRED_LANG);
    initializeI18N(prefferedLang ?? "pl");
    setLoaded(true);
  })();

  return loaded;
};
