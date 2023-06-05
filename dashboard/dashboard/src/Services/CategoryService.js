import axios from "axios";
import { API } from "../utils/apiUrl";

export const createCategory = async (data) => {
  const res = await axios.post(`${API}/api/v1/category`, data);
  return res.data;
};

export const getCategory = async () => {
  const res = await axios.get(`${API}/api/v1/category`);
  return res.data;
};
export const deleteCategory = async (id) => {
  const res = await axios.put(`${API}/api/v1/category/${id}`);
  return res.data;
};
