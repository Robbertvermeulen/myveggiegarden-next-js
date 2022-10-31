import { createContext, useReducer } from "react";
import { useQuery, gql } from "@apollo/client";
import client from "../utils/apollo-client";
import { initialState, settingsReducer } from "../reducers/settingsReducer";

const SettingsContext = createContext();

const GET_PLANTS = gql`
  query PlantData {
    plants {
      nodes {
        plantId
        title
        plantData {
          plantIcon {
            mediaItemUrl
          }
        }
      }
    }
  }
`;

const SettingsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(settingsReducer, initialState);
  const { loading, error, data } = useQuery(GET_PLANTS, { client });

  if (!loading && !error && data) {
    // console.log(data);
    // console.log(
    //   data?.plants?.nodes?.map((node) => {
    //     const { plantIcon } = node.plantData;
    //     return {
    //       id: node.plantId,
    //       title: node.title,
    //       imageUrl: plantIcon.mediaItemUrl,
    //     };
    //   })
    // );
    // dispatch({
    //   type: "set_plants",
    //   payload: data?.plants?.nodes?.map((node) => {
    //     const { plantIcon } = node.plantData;
    //     return {
    //       id: node.plantId,
    //       title: node.title,
    //       imageUrl: plantIcon.mediaItemUrl,
    //     };
    //   }),
    // });
  }

  return (
    <SettingsContext.Provider value={[state, dispatch]}>
      {children}
    </SettingsContext.Provider>
  );
};

export { SettingsContext, SettingsProvider };
