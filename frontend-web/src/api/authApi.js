import axios from "axios";

const AUTH_BASE_URL = "http://localhost:8080/auth";

export const registerUser = async (payload) => {
  const response = await axios.post(`${AUTH_BASE_URL}/register`, payload);
  return response.data;
};

export const loginUser = async (payload) => {
  const response = await axios.post(`${AUTH_BASE_URL}/login`, payload);
  return response.data;
};

export const getCurrentUser = async (token) => {
  const response = await axios.get(`${AUTH_BASE_URL}/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};