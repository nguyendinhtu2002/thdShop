import axios from "axios";
import { API } from "../utils/apiUrl";
import { axiosJWT } from "./UserService";

export const getAll = async () => {
  const res = await axios.get(`${API}/api/v1/product`);
  return res.data;
};

export const createProduct = async (data, access_token) => {
  const res = await axiosJWT.post(`${API}/api/v1/product/create`, data, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
  return res.data;
};

export const getDetilsProduct = async (id) => {
  const res = await axios.get(`${API}/api/v1/product/detail/${id}`);
  return res.data;
};

export const updateProduct = async (id, data, access_token) => {
  const res = await axiosJWT.put(`${API}/api/v1/product//update/${id}`, data, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
  return res.data;
};

export const deleteProduct = async (id, access_token) => {
  const res = await axiosJWT.delete(`${API}/api/v1/product/delete/${id}`, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
  return res.data;
};
