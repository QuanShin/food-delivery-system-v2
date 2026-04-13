import axios from "axios";

const DELIVERY_BASE_URL = "/deliveries";

export const getAllDeliveries = async () => {
  const response = await axios.get(DELIVERY_BASE_URL);
  return response.data;
};

export const getDeliveryById = async (id) => {
  const response = await axios.get(`${DELIVERY_BASE_URL}/${id}`);
  return response.data;
};

export const createDelivery = async (payload) => {
  const response = await axios.post(DELIVERY_BASE_URL, payload);
  return response.data;
};

export const updateDeliveryStatus = async (id, payload) => {
  const response = await axios.patch(`${DELIVERY_BASE_URL}/${id}/status`, payload);
  return response.data;
};