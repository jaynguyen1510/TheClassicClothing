import React, { useEffect, useMemo, useState } from 'react';

import HeaderComponent from '~/components/HeaderComponent/HeaderComponent';
import ModalComponent from '~/components/ModalComponent/ModalComponent';
import InputComponent from '~/components/InputComponent/InputComponent';
import ButtonComponent from '~/components/ButtonComponent/ButtonComponent';

import * as UserService from '~/Services/UserService';
import * as OrderService from '~/Services/OrderService';
import * as message from '~/components/Message/Message';

import { Form, Radio } from 'antd';
import { Label, WrapperInfo, WrapperLeft, WrapperRadio, WrapperRight, WrapperTotal } from './style';
import { useDispatch, useSelector } from 'react-redux';
import { convertPrice } from '~/ultils';
import { useMutationCustomHook } from '~/hook/useMutationCustomHook';
import { LoadingComponent } from '~/components/LoadingComponent/LoadingComponent';
import { updateUser } from '~/redux/slides/userSlide';
import { useNavigate } from 'react-router-dom';
import { routes } from '~/routes';
import { removeAllOrderProduct } from '~/redux/slides/orderSlide';

const PayMentPage = () => {
    const formItems = [
        { label: 'Tên', name: 'name', message: 'Vui lòng nhập tên sản phẩm' },
        { label: 'Tỉnh/Thành', name: 'city', message: 'Vui lòng nhập Tỉnh/Thành ' },
        { label: 'Số điện thoại', name: 'phone', message: 'Vui lòng nhập phone' },
        { label: 'Địa chỉ', name: 'address', message: 'Vui lòng nhập địa chỉ ' },
    ];
    const user = useSelector((state) => state.user);
    const order = useSelector((state) => state.order);

    const [delivery, setDelivery] = useState('fast');
    const [payment, setPayment] = useState('later_money');
    const [isOpenModelUpdateInformation, setIsOpenModelUpdateInformation] = useState(false);
    const [sateDetailsUsers, setSateDetailsUsers] = useState({
        address: '',
        name: '',
        phone: '',
        city: '',
    });
    const [form] = Form.useForm();

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        form.setFieldsValue(sateDetailsUsers);
    }, [form, sateDetailsUsers]);

    useEffect(() => {
        if (isOpenModelUpdateInformation) {
            setSateDetailsUsers({
                city: user?.city,
                name: user?.name,
                address: user?.address,
                phone: user?.phone,
            });
        }
    }, [isOpenModelUpdateInformation]);

    const handleCancelUpdate = () => {
        setSateDetailsUsers({
            name: '',
            email: '',
            phone: '',
            city: '',
            isAdmin: false,
        });
        form.resetFields();
        setIsOpenModelUpdateInformation(false);
    };

    const mutationUpdate = useMutationCustomHook(async (data) => {
        const { id, token, ...rests } = data;
        const res = await UserService.updateUser(id, { ...rests }, token);
        return res;
    });

    const mutationAddOrder = useMutationCustomHook(async (data) => {
        const { token, ...rests } = data;
        const res = await OrderService.createOrder({ ...rests }, token);
        return res;
    });
    const handleAddOrder = () => {
        if (
            user?.access_token &&
            order?.selectItemsOrder &&
            user?.name &&
            user?.address &&
            user?.phone &&
            user?.city &&
            priceMemo &&
            user?.id
        ) {
            mutationAddOrder.mutate(
                {
                    token: user?.access_token,
                    orderSelected: order?.selectItemsOrder,
                    fullName: user?.name,
                    address: user?.address,
                    phone: user?.phone,
                    city: user?.city,
                    paymentMethod: payment,
                    itemsPrice: priceMemo,
                    shippingPrice: deliveryPriceMemo,
                    totalPrice: resultPriceMemo,
                    user: user?.id,
                },
                {
                    onSuccess: () => {
                        dispatch(
                            removeAllOrderProduct({
                                listCheckbox: order?.selectItemsOrder.map((item) => item?.product),
                            }),
                        );
                        message.success('Đặt hàng thành công');
                        navigate(routes[10].path, {
                            state: {
                                delivery,
                                payment,
                                order: order?.selectItemsOrder,
                                resultPriceMemo: resultPriceMemo,
                            },
                        });
                    },
                },
            );
        } else {
            message.error('Đặt hàng thất bại');
        }
    };

    const { isPending: isLoading, data } = mutationUpdate;

    const { isPending: isLoadingOrder, data: dataOrder } = mutationAddOrder;

    const handleUpdatedInfoUser = () => {
        // Gửi dữ liệu về server để update thông tin người dùng
        const { name, city, address, phone } = sateDetailsUsers;

        if (name && address && city && phone) {
            mutationUpdate.mutate(
                { id: user?.id, token: user?.access_token, ...sateDetailsUsers },
                {
                    onSuccess: () => {
                        dispatch(updateUser({ name, city, address, phone }));
                        setIsOpenModelUpdateInformation(false);
                        message.success('Cập nhật thông tin thành công');
                    },
                },
            );
        }
    };

    const handleChangeAddress = () => {
        setIsOpenModelUpdateInformation(true);
    };

    const handleOnChangeDetailsUser = (e, name) => {
        setSateDetailsUsers({ ...sateDetailsUsers, [name]: e.target.value });
    };

    const handleDelivery = (e) => {
        setDelivery(e.target.value);
    };
    const handlePayment = (e) => {
        setPayment(e.target.value);
    };

    const priceMemo = useMemo(() => {
        const total = order?.selectItemsOrder?.reduce((total, item) => {
            return total + item?.price * item?.amount;
        }, 0);
        console.log(' priceMemo:', total);
        return total;
    }, [order]);

    const priceDiscountMemo = useMemo(() => {
        const result = order?.selectItemsOrder?.reduce((total, item) => {
            // Giả sử item.discount là tỷ lệ phần trăm (ví dụ: 10 cho 10%).
            const discountAmount = Number(item?.price * item?.amount * (item?.discount / 100));
            return total + discountAmount;
        }, 0);
        if (Number(result)) {
            return result;
        }
        return 0;
    }, [order]);

    const deliveryPriceMemo = useMemo(() => {
        if (priceMemo === 0) {
            // Khi chưa chọn sản phẩm, phí giao hàng là miễn phí
            return 0;
        } else {
            // Miễn phí giao hàng nếu giá tạm tính >= 400.000 VNĐ
            return priceMemo >= 400000 ? 0 : 35000;
        }
    }, [priceMemo]);

    const deliveryPriceString = deliveryPriceMemo === 0 ? 'Miễn Phí' : `${deliveryPriceMemo.toLocaleString()} VNĐ`;

    const resultPriceMemo = useMemo(() => {
        return Number(priceMemo + deliveryPriceMemo + priceDiscountMemo);
    }, [deliveryPriceMemo, priceMemo, priceDiscountMemo]);

    return (
        <>
            <HeaderComponent isHiddenSearch />

            <LoadingComponent isPending={isLoadingOrder}>
                <div style={{ background: '#f5f5fa', width: '100%', height: '100vh' }}>
                    <div style={{ width: '1270px', margin: '0 auto', padding: '20px' }}>
                        <h3>Giao hàng</h3>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <WrapperLeft>
                                <WrapperInfo>
                                    <div>
                                        <Label>Chọn phương thức giao hàng</Label>
                                        <WrapperRadio onChange={handleDelivery} value={delivery}>
                                            <Radio value="fast">
                                                <span style={{ color: '#ea8500', fontWeight: 'bold' }}> FAST </span>{' '}
                                                Giao hàng tiết kiệm
                                            </Radio>
                                            <Radio value="viettel_post">
                                                <span style={{ color: '#ea8500', fontWeight: 'bold' }}>
                                                    Viettel Post
                                                </span>
                                                Giao hàng tiết kiệm
                                            </Radio>
                                        </WrapperRadio>
                                    </div>
                                </WrapperInfo>
                                <WrapperInfo>
                                    <div>
                                        <Label>Chọn phương thức thanh toán</Label>
                                        <WrapperRadio onChange={handlePayment} value={payment}>
                                            <Radio value="later_money" style={{ color: '#ea8500', fontWeight: 'bold' }}>
                                                Thanh toán tiền mặt khi nhận hàng
                                            </Radio>
                                            <Radio value="paypal" style={{ color: '#ea8500', fontWeight: 'bold' }}>
                                                Thanh toán tiền bằng PayPal
                                            </Radio>
                                        </WrapperRadio>
                                    </div>
                                </WrapperInfo>
                            </WrapperLeft>
                            <WrapperRight>
                                <div style={{ width: '100%', fontSize: '16px' }}>
                                    <WrapperInfo>
                                        <div style={{ fontSize: '13px' }}>
                                            <span>Địa chỉ: </span>
                                            <span
                                                style={{ color: 'red', cursor: 'pointer' }}
                                            >{`${user?.address}, ${user?.city}`}</span>
                                            <span
                                                onClick={handleChangeAddress}
                                                style={{ color: 'blue', cursor: 'pointer' }}
                                            >
                                                Thay đổi
                                            </span>
                                        </div>
                                    </WrapperInfo>
                                    <WrapperInfo>
                                        <div
                                            style={{
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                marginBottom: '8px',
                                            }}
                                        >
                                            <span>Tạm tính</span>
                                            <span style={{ color: '#000', fontSize: '14px', fontWeight: 'bold' }}>
                                                {convertPrice(priceMemo)}
                                            </span>
                                        </div>
                                        <div
                                            style={{
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                marginBottom: '8px',
                                            }}
                                        >
                                            <span>Giảm giá</span>
                                            <span style={{ color: '#000', fontSize: '14px', fontWeight: 'bold' }}>
                                                {`${priceDiscountMemo} %`}
                                            </span>
                                        </div>

                                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                            <span>Phí giao hàng</span>
                                            <span style={{ color: '#000', fontSize: '14px', fontWeight: 'bold' }}>
                                                {deliveryPriceString}
                                            </span>
                                        </div>
                                    </WrapperInfo>
                                    <WrapperTotal>
                                        <span>Tổng tiền</span>
                                        <span
                                            style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}
                                        >
                                            <span style={{ color: 'rgb(254,56,52)', fontSize: '24px' }}>
                                                {convertPrice(resultPriceMemo)}
                                            </span>
                                            <span style={{ color: '#000', fontSize: '11px' }}>
                                                (Đã bao gồm VAT nếu có)
                                            </span>
                                        </span>
                                    </WrapperTotal>
                                </div>
                                <ButtonComponent
                                    size={40}
                                    onClick={handleAddOrder}
                                    styleButton={{
                                        background: 'rgba(244, 186, 186, 0.5)',
                                        height: '48px',
                                        width: '320px',
                                        border: 'none',
                                        borderRadius: '4px',
                                        fontSize: '15px',
                                        fontWeight: '700',
                                    }}
                                    textButton={'Mua hàng'}
                                    styleTextButton={{
                                        color: 'rgba(255, 182, 193, 1)',
                                        fontSize: '15px',
                                        fontWeight: 'bold',
                                    }}
                                />
                            </WrapperRight>
                        </div>
                    </div>
                </div>
                <ModalComponent
                    forceRender
                    title="Cập nhật thông tin giao hàng"
                    open={isOpenModelUpdateInformation}
                    onCancel={handleCancelUpdate}
                    onOk={handleUpdatedInfoUser}
                >
                    <LoadingComponent isPending={isLoading}>
                        <Form
                            name="EditUserForm"
                            labelCol={{ span: 6 }}
                            wrapperCol={{ span: 20 }}
                            // onFinish={onUpdateUser}
                            autoComplete="on"
                            form={form}
                        >
                            {formItems.map(({ label, name, message }) => (
                                <Form.Item key={name} label={label} name={name} rules={[{ required: true, message }]}>
                                    <InputComponent
                                        value={sateDetailsUsers[name]}
                                        onChange={(e) => handleOnChangeDetailsUser(e, name)}
                                    />
                                </Form.Item>
                            ))}
                        </Form>
                    </LoadingComponent>
                </ModalComponent>
            </LoadingComponent>
        </>
    );
};

export default PayMentPage;
