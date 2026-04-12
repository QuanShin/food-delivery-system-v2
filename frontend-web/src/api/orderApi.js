import axios from "axios";

const ORDER_BASE_URL = "http://localhost:8082/orders";

export const createOrder = async (payload) => {
  const response = await axios.post(ORDER_BASE_URL, payload);
  return response.data;
};

export const getAllOrders = async () => {
  const response = await axios.get(ORDER_BASE_URL);
  return response.data;
};