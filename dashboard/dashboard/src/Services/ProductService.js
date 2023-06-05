import axios from "axios";
import { API } from "../utils/apiUrl";

export const getAll = async () => {
  const res = await axios.get(`${API}/api/v1/product`);
  return res.data;
};

export const createProduct = async (data) => {
  const res = await axios.post(`${API}/api/v1/product`, data);
  return res.data;
};

export const getDetilsProduct = async (id) => {
  const res = await axios.get(`${API}/api/v1/product/${id}`);
  return res.data;
};

export const updateProduct = async (id, data) => {
  const res = await axios.put(`${API}/api/v1/product/${id}`, data);
  return res.data;
};

export const deleteProduct = async (id) => {
  const res = await axios.delete(`${API}/api/v1/product/${id}`);
  return res.data;
}