import React from 'react';

import HeaderComponent from '../../components/HeaderComponent/HeaderComponent';

import * as OrderService from '../../Services//OrderService';

import { LoadingComponent } from '../../components/LoadingComponent/LoadingComponent';
import {
    WrapperAllPrice,
    WrapperContentInfo,
    WrapperHeaderUser,
    WrapperInfoUser,
    TableHeader,
    TableRow,
    TableCell,
    WrapperStyleContent,
    WrapperLabel,
} from './style';
import { convertPrice } from '../../ultils';
import { orderConstant } from '../../constant';
import { useQuery } from '@tanstack/react-query';
import { useLocation, useParams } from 'react-router-dom';

const DetailsOrderPage = () => {
    const params = useParams();
    const location = useLocation();
    const { state } = location;

    const { id } = params;

    const fetchMyOrder = async () => {
        try {
            const response = await OrderService.getDetailsOrder(id, state?.access_token);
            return response.data; // Sử dụng dữ liệu từ API
        } catch (error) {
            throw new Error('Failed to fetch order details');
        }
    };

    const queryOrder = useQuery({
        queryKey: ['orders', id],
        queryFn: fetchMyOrder,
        enabled: !!id,
    });

    const { isLoading: isPendingOrder, data, error } = queryOrder;

    if (isPendingOrder) {
        return <LoadingComponent isPending={true} />;
    }

    if (error) {
        return <div>Không thể tải dữ liệu đơn hàng: {error.message}</div>;
    }

    if (!data) {
        return <div>Không có dữ liệu đơn hàng</div>;
    }

    const {
        shippingAddress = {},
        shippingPrice = 0,
        paymentMethod = '',
        deliveryMethod = '',
        isPaid = false,
        orderSelected = [],
        totalPrice = 0,
    } = data;
    const priceMemo = orderSelected.reduce((acc, item) => acc + (item.price ?? 0) * (item.amount ?? 0), 0);

    return (
        <>
            <HeaderComponent isHiddenCart isHiddenSearch />
            <LoadingComponent isPending={false}>
                <div style={{ width: '100%', height: '100vh', background: '#f5f5fa' }}>
                    <div style={{ width: '1270px', margin: '0 auto', height: 'auto' }}>
                        <h4>Chi tiết đơn hàng</h4>
                        <WrapperHeaderUser>
                            <WrapperInfoUser>
                                <WrapperLabel>Địa chỉ người nhận</WrapperLabel>
                                <WrapperContentInfo>
                                    <div className="name-info">{shippingAddress?.fullName}</div>
                                    <div className="address">
                                        <span>Địa chỉ: </span>
                                        {`${shippingAddress?.address} ${shippingAddress?.city}`}
                                    </div>
                                    <div className="phone-info">
                                        <span>Điện thoại: </span> {shippingAddress?.phone}
                                    </div>
                                </WrapperContentInfo>
                            </WrapperInfoUser>
                            <WrapperInfoUser>
                                <WrapperLabel>Hình thức giao hàng</WrapperLabel>
                                <WrapperContentInfo>
                                    <div className="delivery-info">
                                        <span className="name-delivery">{orderConstant.delivery[deliveryMethod]} </span>
                                        Giao hàng tiết kiệm
                                    </div>
                                    <div className="delivery-fee">
                                        <span>Phí giao hàng: </span> {convertPrice(shippingPrice)}
                                    </div>
                                </WrapperContentInfo>
                            </WrapperInfoUser>
                            <WrapperInfoUser>
                                <WrapperLabel>Hình thức thanh toán</WrapperLabel>
                                <WrapperContentInfo>
                                    <div className="payment-info">
                                        {orderConstant.payment[paymentMethod] || 'Chưa xác định'}
                                    </div>
                                    <div className="status-payment">{isPaid ? 'Đã thanh toán' : 'Chưa thanh toán'}</div>
                                </WrapperContentInfo>
                            </WrapperInfoUser>
                        </WrapperHeaderUser>
                        <WrapperStyleContent>
                            <TableHeader>
                                <div>Sản phẩm</div>
                                <TableCell>Giá</TableCell>
                                <TableCell>Số lượng</TableCell>
                                <TableCell>Giảm giá</TableCell>
                            </TableHeader>
                            {orderSelected.map((item, index) => {
                                // In thông tin item ra console
                                console.log('item', item);

                                // Trả về phần tử React TableRow
                                return (
                                    <TableRow key={index}>
                                        <TableCell>
                                            <img
                                                src={item?.image}
                                                alt={item?.name}
                                                style={{ width: '50px', height: '50px', marginRight: '10px' }}
                                            />
                                            {item?.name}
                                        </TableCell>
                                        <TableCell>{convertPrice(item?.price)}</TableCell>
                                        <TableCell>{item?.amount}</TableCell>
                                        <TableCell>
                                            {item?.discount
                                                ? convertPrice(((item.price ?? 0) * (item.discount ?? 0)) / 100)
                                                : '0 VND'}
                                        </TableCell>
                                    </TableRow>
                                );
                            })}

                            <WrapperAllPrice>
                                <TableCell>Tạm tính</TableCell>
                                <TableCell>{convertPrice(priceMemo)}</TableCell>
                            </WrapperAllPrice>
                            <WrapperAllPrice>
                                <TableCell>Phí vận chuyển</TableCell>
                                <TableCell>{convertPrice(shippingPrice)}</TableCell>
                            </WrapperAllPrice>
                            <WrapperAllPrice>
                                <TableCell>Tổng cộng</TableCell>
                                <TableCell>{convertPrice(totalPrice)}</TableCell>
                            </WrapperAllPrice>
                        </WrapperStyleContent>
                    </div>
                </div>
            </LoadingComponent>
        </>
    );
};

export default DetailsOrderPage;
