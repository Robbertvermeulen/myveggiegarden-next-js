import { gql } from "@apollo/client";
import client from "./apollo-client";

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
  return data && data.gardenPlan;
};
