// import axios from "axios"

import axios from "axios";


export const getConfig = async () => {
    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL_BACKEND}/payment/config`)
        return res.data;
    } catch (error) {
        console.error('Error updating product:', error);
    }
};
// export const getOrderByUserId = async (id, access_token) => {
//     try {
//         const res = await axiosJwt.get(`${process.env.REACT_APP_API_URL_BACKEND}/order/get-order-all/${id}`, {
//             headers: {
//                 token: `Bearer ${access_token}`,
//             },
//         });
//         return res.data;
//     } catch (error) {
//         console.error('Error updating product:', error);
//     }
// };

// export const getDetailsOrder = async (id, access_token) => {
//     try {
//         const res = await axiosJwt.get(`${process.env.REACT_APP_API_URL_BACKEND}/order/get-details-order/${id}`, {
//             headers: {
//                 token: `Bearer ${access_token}`,
//             },
//         });
//         return res.data;

//     } catch (error) {
//         console.error('Error updating product:', error);
//     }
// };

// export const cancelOrderDetails = async (id, orderItems, access_token) => {
//     try {
//         console.log('Token being sent:', access_token);
//         const res = await axiosJwt.delete(`${process.env.REACT_APP_API_URL_BACKEND}/order/cancel-order/${id}`, { data: orderItems }, {
//             headers: {
//                 token: `Bearer ${access_token}`,
//             },
//         });
//         return res.data;
//     } catch (error) {
//         console.error('Error cancelOrderDetails:', error);
//     }
// }