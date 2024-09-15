import React, { useEffect, useState } from 'react';

import styles from './ReloadZaloPaySuccessPage.module.scss';
import classNames from 'classnames/bind';

import * as ZaloPayService from '~/Services/ZaloPayService';
import * as message from '../../components/Message/Message';
import * as OrderService from '~/Services/OrderService';

import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { removeAllOrderProduct } from '~/redux/slides/orderSlide';
import { routes } from '~/routes';
import { useMutationCustomHook } from '../../hook/useMutationCustomHook';
import { useQuery } from '@tanstack/react-query';
import { LoadingComponent } from '../../components/LoadingComponent/LoadingComponent';
import HeaderComponent from '../../components/HeaderComponent/HeaderComponent';

const cx = classNames.bind(styles);
const ReloadZaloPaySuccessPage = () => {
    const order = useSelector((state) => state.order);
    const user = useSelector((state) => state.user);
    // lấy app_trans_id từ đường dẫn URL
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const app_trans_id = queryParams.get('app_trans_id');

    const [delivery, setDelivery] = useState('fast');
    const [payment, setPayment] = useState('later_money');
    const [isOpenLoadingZalo, setIsOpenLoadingZalo] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const fetchZaloPaySuccess = async () => {
        if (!app_trans_id) throw new Error('Transaction ID is required');
        try {
            const response = await ZaloPayService.orderSuccess(app_trans_id);
            if (response.return_code === 1 && response.is_processing === false) {
                return response;
            } else if (response.return_code === 3 && response.is_processing === true) {
                localStorage.removeItem('zaloPay');
                message.error('Thanh toán cho đơn hàng thất bại');
                navigate(routes[2].path);
                throw new Error('Unexpected response data');
            }
        } catch (error) {
            throw new Error('Failed to fetch order details');
        }
    };

    const queryOrder = useQuery({
        queryKey: ['zalopay', app_trans_id],
        queryFn: fetchZaloPaySuccess,
        enabled: !!app_trans_id,
    });
    const { isPending: isPendingZaloPay } = queryOrder;

    const createOrder = (sendOrder) => {
        setIsOpenLoadingZalo(true);

        mutationZaloPaySuccess.mutate(
            {
                token: user?.access_token,
                orderSelected: sendOrder.orderSelected,
                fullName: sendOrder.fullName,
                address: sendOrder.address,
                phone: sendOrder.phone,
                city: sendOrder.city,
                paymentMethod: sendOrder.paymentMethod,
                deliveryMethod: sendOrder.deliveryMethod,
                itemsPrice: sendOrder.itemsPrice,
                shippingPrice: sendOrder.shippingPrice,
                totalPrice: sendOrder.totalPrice,
                user: sendOrder.user,
                isPaid: sendOrder.isPaid,
                email: sendOrder.email,
                app_trans_id: app_trans_id,
            },
            {
                onSuccess: () => {
                    dispatch(
                        removeAllOrderProduct({
                            listCheckbox: order.selectItemsOrder.map((item) => item.product),
                        }),
                    );
                    localStorage.removeItem('zaloPay');
                    message.success('Đặt hàng thành công');
                    navigate(routes[10].path, {
                        state: {
                            delivery: sendOrder.deliveryMethod,
                            payment: sendOrder.paymentMethod,
                            order: sendOrder.orderSelected,
                            resultPriceMemo: sendOrder.totalPrice,
                        },
                    });
                },
                onSettled: () => {
                    setIsOpenLoadingZalo(false);
                },
            },
        );
    };

    useEffect(() => {
        if (app_trans_id && user && order && payment && delivery) {
            const zaloPayData = localStorage.getItem('zaloPay');
            if (zaloPayData) {
                const sendOrder = JSON.parse(zaloPayData);
                if (
                    sendOrder?.orderSelected &&
                    sendOrder?.fullName &&
                    sendOrder?.address &&
                    sendOrder?.phone &&
                    sendOrder?.city &&
                    sendOrder?.email &&
                    sendOrder?.paymentMethod &&
                    sendOrder?.deliveryMethod &&
                    sendOrder?.itemsPrice != null &&
                    sendOrder?.shippingPrice != null &&
                    sendOrder?.totalPrice != null &&
                    sendOrder?.user &&
                    sendOrder?.isPaid != null
                ) {
                    createOrder(sendOrder); // Gọi hàm createOrder khi đủ điều kiện
                }
            }
        }
    }, [app_trans_id, user, order, payment, delivery]);

    const mutationZaloPaySuccess = useMutationCustomHook((data) => {
        const { token, ...rests } = data;

        // Kiểm tra nếu không có token hoặc một số thông tin quan trọng thì không tạo đơn hàng
        if (
            !token ||
            !rests.orderSelected ||
            !rests.fullName ||
            !rests.address ||
            !rests.phone ||
            !rests.city ||
            !rests.email ||
            !rests.paymentMethod ||
            !rests.deliveryMethod ||
            rests.itemsPrice == null ||
            rests.shippingPrice == null ||
            rests.totalPrice == null ||
            !rests.user ||
            rests.isPaid == null
        ) {
            console.error('Thiếu thông tin cần thiết để tạo đơn hàng');
            return Promise.reject('Dữ liệu không đầy đủ');
        }
        const res = OrderService.createOrder({ ...rests }, token);
        return res;
    });

    return (
        <>
            <HeaderComponent isHiddenCart isHiddenSearch />
            <LoadingComponent isPending={isPendingZaloPay || (isOpenLoadingZalo && app_trans_id)}>
                <div className={cx('loadingContainer')}>Vui lòng chờ để xác thực thông tin</div>
            </LoadingComponent>
        </>
    );
};

export default ReloadZaloPaySuccessPage;
