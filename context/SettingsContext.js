import { createContext, useEffect, useReducer } from "react";
import { initialState, settingsReducer } from "../reducers/settingsReducer";
import { getAllPlants } from "../utils/api";

const SettingsContext = createContext();

const SettingsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(settingsReducer, initialState);

  useEffect(() => {
    (async () => {
      const plants = await getAllPlants();
      if (plants) {
        dispatch({
          type: "set_plants",
          payload: plants.map((plant) => {
            const { plantIcon } = plant.plantData;
            return {
              id: plant.plantId,
              name: plant.title,
              imageUrl: plantIcon.mediaItemUrl,
            };
          }),
        });
      }
    })();
  }, []);

  return (
    <SettingsContext.Provider value={[state, dispatch]}>
      {children}
    </SettingsContext.Provider>
  );
};

export { SettingsContext, SettingsProvider };
