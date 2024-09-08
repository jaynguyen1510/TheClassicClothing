import React from 'react';
import HeaderComponent from '~/components/HeaderComponent/HeaderComponent';
import {
    Label,
    WrapperInfo,
    WrapperContainer,
    WrapperValue,
    WrapperItemsInfo,
    TableHeader,
    TableRow,
    TableCell,
    WrapperContent,
    OrderTableWrapper,
    DeliveryInfoWrapper,
    TotalPriceWrapper,
} from './style';
import { LoadingComponent } from '~/components/LoadingComponent/LoadingComponent';
import { convertPrice } from '~/ultils';
import { useLocation } from 'react-router-dom';
import { orderConstant } from '~/constant';

const OrderSuccess = () => {
    const location = useLocation();
    const { state } = location;

    return (
        <>
            <HeaderComponent isHiddenSearch isHiddenCart />

            <LoadingComponent isPending={false}>
                <WrapperContainer>
                    <h4 style={{ color: 'rgba(0, 255, 0, 1)' }}>Đặt hàng thành công</h4>
                    <WrapperContent>
                        <OrderTableWrapper>
                            <WrapperItemsInfo>
                                <TableHeader>
                                    <TableCell>Hình ảnh</TableCell>
                                    <TableCell>Tên sản phẩm</TableCell>
                                    <TableCell>Giá</TableCell>
                                    <TableCell>Số lượng</TableCell>
                                </TableHeader>
                                {state?.order?.map((order, index) => (
                                    <TableRow key={index}>
                                        <TableCell>
                                            <img
                                                src={order?.image}
                                                style={{
                                                    width: '77px',
                                                    height: '77px',
                                                    objectFit: 'contain',
                                                }}
                                                alt="product"
                                            />
                                        </TableCell>
                                        <TableCell
                                            style={{
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis',
                                                whiteSpace: 'nowrap',
                                            }}
                                        >
                                            {order?.name}
                                        </TableCell>
                                        <TableCell>{convertPrice(order?.price)}</TableCell>
                                        <TableCell>{order?.amount}</TableCell>
                                    </TableRow>
                                ))}
                            </WrapperItemsInfo>
                        </OrderTableWrapper>
                        <DeliveryInfoWrapper>
                            <WrapperInfo>
                                <div>
                                    <Label>Phương thức giao hàng</Label>
                                    <WrapperValue>
                                        <div>
                                            <span style={{ color: '#ea8500', fontWeight: 'bold' }}>
                                                {orderConstant.delivery[state?.delivery]}
                                            </span>
                                            <span> Giao hàng tiết kiệm</span>
                                        </div>
                                    </WrapperValue>
                                </div>
                            </WrapperInfo>
                            <WrapperInfo>
                                <div>
                                    <Label>Phương thức thanh toán</Label>
                                    <WrapperValue>{orderConstant.payment[state?.payment]}</WrapperValue>
                                </div>
                            </WrapperInfo>
                            <WrapperInfo>
                                <div>
                                    <TotalPriceWrapper>
                                        <Label>Tổng tiền:</Label>
                                        <div style={{ color: 'red', fontWeight: 'bold', fontSize: '16px' }}>
                                            {convertPrice(state?.resultPriceMemo)}
                                        </div>
                                    </TotalPriceWrapper>
                                </div>
                            </WrapperInfo>
                        </DeliveryInfoWrapper>
                    </WrapperContent>
                </WrapperContainer>
            </LoadingComponent>
        </>
    );
};

export default OrderSuccess;
