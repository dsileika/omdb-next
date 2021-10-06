import React, { useState } from "react";
import { createContext, useContext } from "react";
import { getItems } from "utils/localStorage";

const AppContext = createContext();

export function AppWrapper({ children }) {
  const [favoriteItems, setFavoriteItems] = useState(getItems() || []);

  let sharedState = {
    favoriteItems: favoriteItems || [],
    setFavoriteItems: () => {
      setFavoriteItems(getItems());
    },
  };

  return (
    <AppContext.Provider value={sharedState}>{children}</AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
