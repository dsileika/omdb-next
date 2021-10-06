import React, { useState } from "react";
import { createContext, useContext } from "react";
import { getItemsFromStorage } from "utils/localStorage";

const AppContext = createContext();

export function AppWrapper({ children }) {
  const [watchListItemsCount, setWatchListItemsCount] = useState(
    getItemsFromStorage().length || 0,
  );

  let sharedState = {
    watchListItemsCount:
      watchListItemsCount || getItemsFromStorage().length || 0,
    updateWatchListItemsCount: () => {
      setWatchListItemsCount(getItemsFromStorage().length || 0);
    },
  };

  return (
    <AppContext.Provider value={sharedState}>{children}</AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
