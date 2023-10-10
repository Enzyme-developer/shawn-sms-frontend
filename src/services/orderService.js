import { apiClient, apiEventStream } from "./client";

export const getOrders = () => {
  return apiClient.get("/orders");
};

export const getCountries = () => {
  return apiClient.get("/smspool/countries");
};

export const getServices = () => {
  return apiClient.get("/smspool/services");
};

export const placeOrder = (data) => {
  return apiClient.post("/smspool/order", data);
};

export const eventStream = (endpoint) => {
  return apiEventStream.get(`/smspool/stream/${endpoint}`);
};
