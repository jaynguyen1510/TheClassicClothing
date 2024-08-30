import React, { useEffect } from 'react';

import HeaderComponent from '~/components/HeaderComponent/HeaderComponent';
import ButtonComponent from '~/components/ButtonComponent/ButtonComponent';

import * as OrderService from '~/Services/OrderService';
import { useQuery } from '@tanstack/react-query';
import { LoadingComponent } from '~/components/LoadingComponent/LoadingComponent';
import { useSelector } from 'react-redux';
import {
    Container,
    Header,
    Title,
    OrderDetailsWrapper,
    Section,
    SubTitle,
    DetailsRow,
    Label,
    Value,
    ListItem,
    ItemImage,
    ItemDetails,
    PaymentDetails,
} from './style'; // Import styled components
import { convertPrice } from '~/ultils';
import { orderConstant } from '~/constant';
import { useNavigate } from 'react-router-dom';
import { routes } from '~/routes';
import { useMutationCustomHook } from '~/hook/useMutationCustomHook';
import { message } from 'antd';

const MyOrderPage = ({ idProduct, size = 40, backgroundColorButton = 'rgba(255,57, 69)', colorButton = '#fff' }) => {
    const user = useSelector((state) => state.user);
    const navigate = useNavigate();

    const fetchMyOrder = async () => {
        try {
            const response = await OrderService.getOrderByUserId(user?.id, user?.access_token);
            return response;
        } catch (error) {
            throw new Error('Failed to fetch order details');
        }
    };

    const queryOrder = useQuery({
        queryKey: ['orders'],
        queryFn: fetchMyOrder,
        enabled: !!(user?.id && user?.access_token),
    });

    const { isPending: isPendingOrder, data } = queryOrder;
    console.log('data', data);

    const handleDetailsOrder = (id) => {
        navigate(`${routes[12].path.replace(':id', id)}`, {
            state: {
                access_token: user?.access_token,
            },
        });
    };

    const mutation = useMutationCustomHook(async (data) => {
        const { id, access_token, orderItems } = data;
        console.log('Sending data:', orderItems);
        const res = await OrderService.cancelOrderDetails(id, orderItems, access_token);
        return res;
    });

    const handleRemoveProduct = (order) => {
        console.log('order', order);
        mutation.mutate(
            { id: order?._id, access_token: user?.access_token, orderItems: order?.orderSelected },
            {
                onSuccess: () => {
                    queryOrder.refetch();
                },
            },
        );
    };

    const {
        isPending: isPendingCancelOrder,
        isSuccess: isSuccessCancel,
        isError: isErrorCancel,
        data: dataCancelOrder,
    } = mutation;

    useEffect(() => {
        if (isSuccessCancel && dataCancelOrder?.status === 'OK') {
            message.success('Hủy đơn hàng thành công');
        } else if (isErrorCancel && dataCancelOrder?.status === 'ERR') {
            message.error('Hủy đơn hàng thất bại');
        }
    }, [isSuccessCancel, isErrorCancel]);

    return (
        <>
            <HeaderComponent isHiddenSearch isHiddenCart />
            <LoadingComponent isPending={isPendingOrder || isPendingCancelOrder}>
                <Container>
                    <Header>
                        <Title>Chi tiết hóa đơn</Title>
                    </Header>
                    {data?.data?.length > 0 ? (
                        data.data.map((order, index) => {
                            const totalPrice = order?.orderSelected?.reduce(
                                (total, item) => total + item.price * item.amount,
                                0,
                            );

                            const totalDiscount = order.orderSelected?.reduce(
                                (total, item) => total + (item.discount || 0) / 100,
                                0,
                            );
                            const finalPrice = totalPrice * totalDiscount;

                            return (
                                <OrderDetailsWrapper key={index}>
                                    {/* Chi tiết sản phẩm */}
                                    <Section>
                                        <SubTitle>Sản phẩm</SubTitle>
                                        {order.orderSelected?.map((item) => (
                                            <ListItem key={item._id}>
                                                <ItemImage src={item.image} alt={item.name} />
                                                <ItemDetails>
                                                    <DetailsRow>
                                                        <Label>Tên: </Label>
                                                        <Value> {item.name}</Value>
                                                    </DetailsRow>
                                                    <DetailsRow>
                                                        <Label>Số lượng :</Label>
                                                        <Value>{item.amount}</Value>
                                                    </DetailsRow>
                                                    <DetailsRow>
                                                        <Label>Giá sản phẩm:</Label>
                                                        <Value>{convertPrice(item.price)}</Value>
                                                    </DetailsRow>
                                                </ItemDetails>
                                            </ListItem>
                                        ))}
                                    </Section>

                                    {/* Thông tin người dùng */}
                                    <Section>
                                        <SubTitle>Thông tin </SubTitle>
                                        <DetailsRow>
                                            <Label>Tên :</Label>
                                            <Value>{order.shippingAddress?.fullName}</Value>
                                        </DetailsRow>
                                        <DetailsRow>
                                            <Label>Địa chỉ :</Label>
                                            <Value>{`${order.shippingAddress?.address}, ${order.shippingAddress?.city}`}</Value>
                                        </DetailsRow>
                                        <DetailsRow>
                                            <Label>Số điện thoại :</Label>
                                            <Value>{order.shippingAddress?.phone}</Value>
                                        </DetailsRow>
                                    </Section>

                                    {/* Thông tin thanh toán */}
                                    <PaymentDetails>
                                        <SubTitle> Thanh toán</SubTitle>
                                        <DetailsRow>
                                            <Label>Thanh toán bằng :</Label>
                                            <Value>{orderConstant.payment[order.paymentMethod]}</Value>
                                        </DetailsRow>
                                        <DetailsRow>
                                            <Label>Giá sản phẩm :</Label>
                                            <Value>{convertPrice(order.itemsPrice)}</Value>
                                        </DetailsRow>
                                        <DetailsRow>
                                            <Label>Giảm giá :</Label>
                                            <Value>{convertPrice(finalPrice)}</Value>
                                        </DetailsRow>
                                        <DetailsRow>
                                            <Label>Tiền vận chuyển :</Label>
                                            <Value>{convertPrice(order.shippingPrice)}</Value>
                                        </DetailsRow>
                                        <DetailsRow>
                                            <Label>Tổng cộng :</Label>
                                            <Value style={{ color: 'red', fontSize: '24px' }}>
                                                {convertPrice(order.totalPrice)}
                                            </Value>
                                        </DetailsRow>
                                    </PaymentDetails>
                                    <ButtonComponent
                                        bordered={undefined}
                                        size={size}
                                        style={{
                                            height: '48px',
                                            width: '220px',
                                            border: 'none',
                                            borderRadius: '4px',
                                            backgroundColor: backgroundColorButton,
                                            color: colorButton,
                                        }}
                                        onClick={() => handleRemoveProduct(order)}
                                        textButton={'Hủy đơn hàng'}
                                    />
                                    <ButtonComponent
                                        bordered={undefined}
                                        size={size}
                                        style={{
                                            height: '48px',
                                            width: '220px',
                                            border: '1px solid rgb(13, 92, 182)',
                                            borderRadius: '4px',
                                            fontSize: '15px',
                                            fontWeight: '700',
                                            backgroundColor: '#fff',
                                            color: 'rgb(13,92,182)',
                                        }}
                                        onClick={() => handleDetailsOrder(order?._id)}
                                        textButton={'Chi tiết đơn hàng '}
                                    />
                                </OrderDetailsWrapper>
                            );
                        })
                    ) : (
                        <p>Không có đơn hàng nào</p>
                    )}
                </Container>
            </LoadingComponent>
        </>
    );
};

export default MyOrderPage;
