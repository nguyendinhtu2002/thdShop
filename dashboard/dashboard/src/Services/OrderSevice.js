import axios from "axios"
import { API } from "../utils/apiUrl"



export const getPay = async (data) => {
    const res = await axios.get(`${API}/api/v1/pay`)
    return res.data
}

export const getDetilsPay = async(id)=>{
    const res = await axios.get(`${API}/api/v1/pay/${id}`)
    return res.data
}

export const updatePay = async(id,data)=>{
    const res = await axios.put(`${API}/api/v1/pay/${id}`,data)
    return res.data
}

export const deletePay = async(id)=>{
    const res = await axios.delete(`${API}/api/v1/pay/${id}`)
    return res.data
}