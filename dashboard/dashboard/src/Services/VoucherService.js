import axios from "axios";
import { API } from "../utils/apiUrl";
import { axiosJWT } from "./UserService";

export const createVoucher = async (data, access_token) => {
    const headers = {
        Authorization: `Bearer ${access_token}`,
    };
    const res = await axiosJWT.post(`${API}/api/v1/voucher/create`, data, {
        headers,
    });
    return res.data;
};

export const getPay = async (access_token) => {
    const headers = {
        Authorization: `Bearer ${access_token}`,
    };
    const res = await axiosJWT.get(`${API}/api/v1/voucher`, {
        headers,
    });
    return res.data;
};

export const getDetilsPay = async (data, access_token) => {
    const headers = {
        Authorization: `Bearer ${access_token}`,
    };
    const res = await axiosJWT.get(`${API}/api/v1/voucher/details/code`,data, {
        headers,
    });
    return res.data;
};

export const updatePay = async (code, data,access_token) => {
    const headers = {
        Authorization: `Bearer ${access_token}`,
    };
    const res = await axios.put(`${API}/api/v1/voucher/update/${code}`, data, {
        headers,
    });
    return res.data;
};

export const deletePay = async (id) => {
    const res = await axios.delete(`${API}/api/v1/pay/${id}`);
    return res.data;
};
