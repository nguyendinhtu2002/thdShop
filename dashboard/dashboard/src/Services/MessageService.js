import axios from "axios";
import { API } from "../utils/apiUrl";
import { axiosJWT } from "./UserService";

export const getPay = async (access_token) => {
    const headers = {
        Authorization: `Bearer ${access_token}`,
    };
    const res = await axiosJWT.get(`${API}/api/v1/message`, {
        headers,
    });
    return res.data;
};

export const getDetilsPay = async (id, access_token) => {
    const headers = {
        Authorization: `Bearer ${access_token}`,
    };
    const res = await axiosJWT.get(`${API}/api/v1/message/${id}`, {
        headers,
    });
    return res.data;
};

export const updatePay = async (id, data,access_token) => {
    const headers = {
        Authorization: `Bearer ${access_token}`,
    };
    const res = await axios.put(`${API}/api/v1/message/${id}`, data, {
        headers,
    });
    return res.data;
};

export const deletePay = async (id) => {
    const res = await axios.delete(`${API}/api/v1/pay/${id}`);
    return res.data;
};
