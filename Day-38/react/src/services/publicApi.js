import axios from "axios";

const API_BASE_URL = "http://localhost:3000";

const publicApi = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const getExclusiveDeals = async (category = "pizza") => {
  const response = await publicApi.get("/exclusiveDeals");
  return response.data[category] || [];
};

export const getAllExclusiveDeals = async () => {
  const response = await publicApi.get("/exclusiveDeals");
  return response.data;
};

export const getCategories = async () => {
  const response = await publicApi.get("/categories");
  return response.data;
};

export const getRestaurants = async () => {
  const response = await publicApi.get("/restaurants");
  return response.data;
};

export const getAllKnowMoreAboutUs = async () => {
  const { data } = await publicApi.get("/knowMoreAboutUs");
  return data;
};

export const getStats = async () => {
  const response = await publicApi.get("/stats");
  return response.data;
};

export default publicApi;
