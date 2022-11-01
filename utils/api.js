import { gql } from "@apollo/client";
import client from "./apollo-client";
import axios from "axios";
import { getAuthTokenFromLocalStorage } from "./auth";

export const getAuthToken = async (username, password) => {
  const response = await axios.post(
    process.env.NEXT_PUBLIC_WORDPRESS_API_URI + "/wp-json/jwt-auth/v1/token",
    { username, password }
  );
  return response?.data?.token || false;
};

export const validateAuthToken = async (authToken) => {
  const headers = {
    Authorization: `Bearer ${authToken}`,
  };
  const response = await axios.post(
    process.env.NEXT_PUBLIC_WORDPRESS_API_URI +
      "/wp-json/jwt-auth/v1/token/validate",
    {},
    headers
  );
  return (response.status && response.status === 200) || false;
};

export const updateGardenPlan = async (data) => {
  const authToken = getAuthTokenFromLocalStorage();
  if (!authToken) return false;
  const headers = {
    Authorization: `Bearer ${authToken}`,
  };
  const response = await axios.post(
    process.env.NEXT_PUBLIC_WORDPRESS_API_URI + "/wp-json/",
    data,
    headers
  );
  return response?.data || false;
};

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
