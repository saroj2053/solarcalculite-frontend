import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_API,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export const createProject = async data => {
  let response;
  const token = localStorage.getItem("token");
  try {
    response = await api.post("/projects", data, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    return error;
  }
  return response;
};

export const getProjects = async () => {
  let response;
  const token = localStorage.getItem("token");
  try {
    response = await api.get("/projects", {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    return error;
  }
  return response;
};

export const getSingleProject = async id => {
  let response;
  const token = localStorage.getItem("token");
  try {
    response = await api.get(`/projects/${id}`, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    return error;
  }
  return response;
};
export const updateProject = async (id, data) => {
  let response;
  const token = localStorage.getItem("token");
  try {
    response = await api.patch(`/projects/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    return error;
  }
  return response;
};

export const deleteProject = async id => {
  let response;
  const token = localStorage.getItem("token");
  try {
    response = await api.delete(`/projects/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    return error;
  }
  return response;
};

export const generateProjectReport = async id => {
  let response;
  const token = localStorage.getItem("token");
  try {
    response = await api.get(`/projects/${id}/generateReport`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    return error;
  }
  return response;
};
