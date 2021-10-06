import React from "react";
import { createContext, useContext } from "react";
import { getItems } from "utils/localStorage";

const AppContext = createContext();

export function AppWrapper({ children }) {
  let sharedState = {
    favoriteItems: getItems(),
  };

  return (
    <AppContext.Provider value={sharedState}>{children}</AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
