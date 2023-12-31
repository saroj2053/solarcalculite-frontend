import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_API,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export const createProduct = async data => {
  let response;
  try {
    response = await api.post("/products", data);
  } catch (error) {
    return error;
  }

  return response;
};
export const updateProduct = async (id, data) => {
  let response;
  try {
    response = await api.put(`/products/${id}`, data);
  } catch (error) {
    return error;
  }

  return response;
};

export const deleteProduct = async id => {
  let response;
  try {
    response = await api.delete(`/products/${id}`);
  } catch (error) {
    return error;
  }
  return response;
};

export const getProductReportData = async id => {
  let response;
  try {
    response = await api.get(`/products/${id}/report`);
  } catch (error) {
    return error;
  }
  return response;
};

export const getElectricityDataForProduct = async id => {
  let response;
  const token = localStorage.getItem("token");
  try {
    response = await api.get(`/products/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    return error;
  }
  return response;
};
