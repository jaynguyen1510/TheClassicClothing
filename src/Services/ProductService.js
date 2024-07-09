import axios from "axios"

export const getAllProducts = async (data) => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL_BACKEND}/products/get-all`, data)
    return res.data
}

export const createProducts = async (data) => {
    const res = await axios.post(`${process.env.REACT_APP_API_URL_BACKEND}/products/create-product`, data)
    return res.data
}