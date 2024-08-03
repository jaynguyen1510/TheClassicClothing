import axios from "axios"
import { axiosJwt } from "./UserService"


export const getAllProducts = async (search, limited) => {
    let res = {}
    const searchProduct = search?.length > 0;
    if (searchProduct) {
        res = await axios.get(`${process.env.REACT_APP_API_URL_BACKEND}/products/get-all?filter=name&filter=${search}&limit=${limited}`)

    } else {
        res = await axios.get(`${process.env.REACT_APP_API_URL_BACKEND}/products/get-all?limit=${limited}`)
    }
    return res.data
}

export const getProductsTypes = async (type) => {
    let res = {}
    if (type) {
        res = await axios.get(`${process.env.REACT_APP_API_URL_BACKEND}/products/get-all?filter=type&filter=${type}`)
        return res.data
    }
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

export const deleteManyProduct = async (data, access_token) => {
    try {
        const res = await axiosJwt.post(`${process.env.REACT_APP_API_URL_BACKEND}/products/delete-many-product`, data, {
            headers: {
                token: `Bearer ${access_token}`,
            },
        });
        return res.data;
    } catch (error) {
        console.error('Error delete product:', error);
    }
};
export const getAllTypeProduct = async () => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL_BACKEND}/products/get-all-type`)
    return res.data
}