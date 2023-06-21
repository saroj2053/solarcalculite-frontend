import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_API,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export const signin = async data => {
  let response;
  try {
    response = await api.post("/auth/signin", data);
    storeUserInLocalStorage(response.data);
  } catch (error) {
    return error;
  }
  return response;
};

export const signup = async data => {
  let response;
  try {
    response = await api.post("/auth/signup", data);
    storeUserInLocalStorage(response.data);
  } catch (error) {
    return error;
  }

  return response;
};

export const signout = async () => {
  let response;
  try {
    response = await api.post("/auth/signout");
  } catch (error) {
    return error;
  }

  return response;
};

export const profile = async () => {
  let response;
  const token = localStorage.getItem("token");
  try {
    response = await api.get(`/user/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    return error;
  }
  return response;
};

export const updateProfile = async data => {
  let response;
  const token = localStorage.getItem("token");
  try {
    response = await api.patch(`/user/profile/update`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    return error;
  }
  return response;
};

export const deleteProfile = async () => {
  let response;
  const token = localStorage.getItem("token");
  try {
    response = await api.get(`/user/profile/delete`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    return error;
  }
  return response;
};

export const updatePassword = async data => {
  let response;
  const token = localStorage.getItem("token");
  try {
    response = await api.patch(`/user/profile/password/update`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    return error;
  }
  return response;
};

const storeUserInLocalStorage = data => {
  localStorage.setItem("token", data.token);
  localStorage.setItem("user", JSON.stringify(data.user));
};
