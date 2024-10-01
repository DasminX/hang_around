import { useTranslation } from "react-i18next";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Text } from "react-native-paper";

const LANGS = {
  pl: "🇵🇱",
  en: "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
};

export const LangChangeField = () => {
  const { i18n, t } = useTranslation();

  const changeLangHandler = (lang: keyof typeof LANGS) => i18n.changeLanguage(lang);

  return (
    <View style={styles.root}>
      <Text variant="titleMedium">{t("settings.change_lang")}:</Text>
      <View style={styles.flagsContainer}>
        {Object.entries(LANGS).map(([lang, flag]) => {
          if (i18n.resolvedLanguage === lang) return;

          return (
            <TouchableOpacity
              activeOpacity={1}
              key={lang}
              onPress={() => changeLangHandler(lang as keyof typeof LANGS)}
            >
              <Text style={styles.flag}>{flag}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 6,
    paddingVertical: 8,
    width: "100%",
  },
  flagsContainer: {
    justifyContent: "center",
    alignItems: "center",
  },

  flag: {
    fontSize: 32,
  },
});
