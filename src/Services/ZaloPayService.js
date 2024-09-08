import axios from 'axios';

export const createZaloPayPayment = async (orderDetails) => {

    try {
        const res = await axios.post(`${process.env.REACT_APP_API_ZALO_BACKEND}/zalopay/create-zalopay-payment`, orderDetails);
        // console.log('Kết quả từ API:', res.data);
        return res.data;
    } catch (error) {
        console.error('Lỗi khi tạo thanh toán ZaloPay:', error);
        throw new Error('Lỗi khi tạo thanh toán ZaloPay');
    }
};

export const orderSuccess = async (app_trans_id) => {
    console.log("app_trans_id", app_trans_id);
    try {
        const res = await axios.post(`${process.env.REACT_APP_API_ZALO_BACKEND}/zalopay/order-success/${app_trans_id}`);
        return res.data;
    } catch (error) {
        console.error('Lỗi khi kiểm tra đơn hàng:', error);
        throw new Error('Lỗi khi kiểm tra đơn hàng');
    }
};

