import axios from "axios";

const MENU_BASE_URL = "/menu";

export const getAllMenuItems = async () => {
  const response = await axios.get(MENU_BASE_URL);
  return response.data;
};

export const createMenuItem = async (payload) => {
  const response = await axios.post(MENU_BASE_URL, payload);
  return response.data;
};