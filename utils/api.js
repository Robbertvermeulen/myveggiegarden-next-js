import { gql } from "@apollo/client";
import client from "./apollo-client";

export const getAllPlants = async () => {
  const { data } = await client.query({
    query: gql`
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
    `,
  });
  return data?.plants?.nodes;
};

export const getGardenPlanById = async (id) => {
  const { data } = await client.query({
    query: gql`
        query GardenPlan {
          gardenPlan(id: "${id}", idType: DATABASE_ID) {
            title
            planDetails {
              actualLength
              actualWidth
              location {
                city
                country
              }
            }
            planning
          }
        }
      `,
  });
  return data?.gardenPlan;
};
