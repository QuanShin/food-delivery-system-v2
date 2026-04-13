import axios from "axios";

const AUTH_BASE_URL = "/auth";

export const registerUser = async (payload) => {
  const response = await axios.post(`${AUTH_BASE_URL}/register`, payload);
  return response.data;
};

export const loginUser = async (payload) => {
  const response = await axios.post(`${AUTH_BASE_URL}/login`, payload);
  return response.data;
};

export const getCurrentUser = async (token) => {
  const response = await axios.get(`${AUTH_BASE_URL}/profile`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const getProfile = async (token) => {
  return getCurrentUser(token);
};

export const getAuthHealth = async () => {
  const response = await axios.get(`${AUTH_BASE_URL}/health`);
  return response.data;
};