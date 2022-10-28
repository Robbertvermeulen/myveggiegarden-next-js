import { createContext, useReducer } from "react";
import { initialState, settingsReducer } from "../reducers/settingsReducer";
const SettingsContext = createContext();

const SettingsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(settingsReducer, initialState);
  return (
    <SettingsContext.Provider value={[state, dispatch]}>
      {children}
    </SettingsContext.Provider>
  );
};

export { SettingsContext, SettingsProvider };
