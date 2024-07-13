import axios from "axios"
import { axiosJwt } from "./UserService"


export const getAllProducts = async (data) => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL_BACKEND}/products/get-all`, data)
    return res.data
}

export const createProducts = async (data) => {
    const res = await axios.post(`${process.env.REACT_APP_API_URL_BACKEND}/products/create-product`, data)
    return res.data
}

export const getDetailsProduct = async (id) => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL_BACKEND}/products/get-details/${id}`)
    return res.data
}

export const updateProduct = async (id, data, access_token) => {
    try {
        const res = await axiosJwt.put(`${process.env.REACT_APP_API_URL_BACKEND}/products/update/${id}`, data, {
            headers: {
                token: `Bearer ${access_token}`,
            },
        });
        return res.data;
    } catch (error) {
        console.error('Error updating product:', error);
    }
};
export const deleteProduct = async (id, access_token) => {
    try {
        const res = await axiosJwt.delete(`${process.env.REACT_APP_API_URL_BACKEND}/products/delete/${id}`, {
            headers: {
                token: `Bearer ${access_token}`,
            },
        });
        return res.data;
    } catch (error) {
        console.error('Error delete product:', error);
    }
};