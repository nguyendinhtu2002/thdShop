import axios from "axios"
import { API } from "../utils/apiURL"

import jwt_decode from "jwt-decode";

export const loginUser = async (data) => {
    const res = await axios.post(`${API}/api/v1/users/login`, data)
    return res.data
}

export const getDetailsUser = async (id, access_token) => {
    const res = await axios.get(`${API}/api/v1/users/${id}`, {
        headers: {
            Authorization: `Bearer ${access_token}`,
        }
    },)
    return res.data

}
export const logoutUser = async () => {
    const res = await axios.post(`${API}/api/v1/users/logout`)
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token")
    return res.data
}

export const registerUser = async (data) => {
    const res = await axios.post(`${API}/api/v1/users/register`, data)
    return res.data
}