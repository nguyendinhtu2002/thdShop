import axios from "axios";
import { API } from "../utils/apiUrl";

export const axiosJWT = axios.create();

export const loginUser = async (data) => {
  const res = await axios.post(`${API}/api/v1/users/login/admin`, data, {
    withCredentials: true,
  });
  return res.data;
};

export const getDetailsUser = async (id, access_token) => {
  const headers = {
    Authorization: `Bearer ${access_token}`,
  };
  const res = await axiosJWT.get(`${API}/api/v1/users/${id}`, {
    headers,
  });
  return res.data;
};
export const logoutUser = async () => {
  const res = await axios.post(`${API}/api/v1/users/logout`);
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
  localStorage.removeItem("persist:root");
  return res.data;
};

export const registerUser = async (data) => {
  const res = await axios.post(`${API}/api/v1/users/register`, data);
  return res.data;
};

export const getAll = async (access_token) => {
  const headers = {
    Authorization: `Bearer ${access_token}`,
  };
  const res = await axiosJWT.get(`${API}/api/v1/users`, {
    headers,
  });
  return res.data;
};

export const updateUser = async (id, data, access_token) => {
  const headers = {
    Authorization: `Bearer ${access_token}`,
  };
  const res = await axiosJWT.put(
    `${API}/api/v1/users/updateAdmin/${id}`,
    data,
    {
      headers,
    }
  );
  return res.data;
};
export const refreshToken = async (token) => {
  const res = await axios.post(`${API}/api/v1/users/refresh_token`, {
    token: token,
  });

  const newAccessToken = res.data.access_token;
  localStorage.setItem("access_token", JSON.stringify(newAccessToken));
  return res.data;
};

export const deleteUser = async (id,access_token) => {
  const headers = {
    Authorization: `Bearer ${access_token}`,
  };
  const res = await axios.delete(`${API}/api/v1/users/${id}`, {
    headers,
  });
  return res.data;
};
