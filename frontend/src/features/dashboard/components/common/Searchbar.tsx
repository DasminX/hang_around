import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Searchbar as Search } from "react-native-paper";

export const Searchbar = ({
  onSearchHandler,
}: {
  onSearchHandler: (searchValue: string) => void;
}) => {
  const { t } = useTranslation();
  const [searchValue, setSearchValue] = useState<string>("");

  useEffect(() => {
    setSearchValue("");
  }, []);

  return (
    <Search
      placeholder={t("dashboard.search")}
      value={searchValue}
      onIconPress={useCallback(() => {
        onSearchHandler(searchValue);
      }, [])}
      onChangeText={useCallback((value: string) => {
        setSearchValue(value);
      }, [])}
    />
  );
};
