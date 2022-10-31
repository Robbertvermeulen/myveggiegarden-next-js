import { createContext, useReducer } from "react";
import { gardenPlanReducer, initialState } from "../reducers/gardenPlanReducer";

export const GardenPlanEditorContext = createContext();

export const GardenPlanEditorContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(gardenPlanReducer, initialState);

  return (
    <GardenPlanEditorContext.Provider value={[state, dispatch]}>
      {children}
    </GardenPlanEditorContext.Provider>
  );
};
