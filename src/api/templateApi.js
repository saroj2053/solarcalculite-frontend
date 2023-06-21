import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_API,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export const getTemplates = async () => {
  let response;
  try {
    response = await api.get("/templateProducts");
  } catch (error) {
    return error;
  }
  return response;
};
