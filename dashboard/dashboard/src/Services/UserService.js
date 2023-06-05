import axios from "axios";
import { API } from "../utils/apiUrl";

export const loginUser = async (data) => {
  const res = await axios.post(`${API}/api/v1/users/login/admin`, data);
  return res.data;
};

export const getDetailsUser = async (id, access_token) => {
  const res = await axios.get(`${API}/api/v1/users/${id}`);
  return res.data;
};
export const logoutUser = async () => {
  const res = await axios.post(`${API}/api/v1/users/logout`);
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
  localStorage.removeItem("persist:root")
  return res.data;
};

export const registerUser = async (data) => {
  const res = await axios.post(`${API}/api/v1/users/register`, data);
  return res.data;
};

export const getAll = async () => {
  const res = await axios.get(`${API}/api/v1/users/getAll`);
  return res.data;
};

export const updateUser = async (id, data) => {
  const res = await axios.put(`${API}/api/v1/users/${id}`, data);
  return res.data;
};

export const deleteUser = async (id) => {
  const res = await axios.delete(`${API}/api/v1/users/${id}`);
  return res.data;
};
