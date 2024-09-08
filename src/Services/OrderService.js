// import axios from "axios"
import { axiosJwt } from "./UserService"

export const createOrder = async (data, access_token) => {
    try {
        console.log("data: ", data);

        const res = await axiosJwt.post(`${process.env.REACT_APP_API_URL_BACKEND}/order/create`, data, {
            headers: {
                token: `Bearer ${access_token}`,
            },
        });
        return res.data;
    } catch (error) {
        console.error('Error updating product:', error);
    }
};
// localhost:3001/api/order/get-order-details/66791b4c1958e990a0e58633
export const getOrderByUserId = async (id, access_token) => {

    try {
        const res = await axiosJwt.get(`${process.env.REACT_APP_API_URL_BACKEND}/order/get-order-all/${id}`, {
            headers: {
                token: `Bearer ${access_token}`,
            },
        });
        return res.data;
    } catch (error) {
        console.error('Error updating product:', error);
    }
};

export const getDetailsOrder = async (id, access_token) => {
    try {
        const res = await axiosJwt.get(`${process.env.REACT_APP_API_URL_BACKEND}/order/get-details-order/${id}`, {
            headers: {
                token: `Bearer ${access_token}`,
            },
        });
        return res.data;

    } catch (error) {
        console.error('Error updating product:', error);
    }
};

export const cancelOrderDetails = async (id, orderItems, access_token) => {
    try {
        const res = await axiosJwt.delete(`${process.env.REACT_APP_API_URL_BACKEND}/order/cancel-order/${id}`, { data: orderItems }, {
            headers: {
                token: `Bearer ${access_token}`,
            },
        });
        return res.data;
    } catch (error) {
        console.error('Error cancelOrderDetails:', error);
    }
}