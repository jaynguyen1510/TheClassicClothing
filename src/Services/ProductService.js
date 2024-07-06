import axios from "axios"

export const getAllProducts = async (data) => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL_BACKEND}/products/get-all`, data)
    return res.data
}