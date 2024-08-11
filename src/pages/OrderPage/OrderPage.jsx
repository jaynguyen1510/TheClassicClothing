import HeaderComponent from '~/components/HeaderComponent/HeaderComponent';
import React, { useMemo, useState } from 'react';
import { DeleteOutlined, PlusOutlined, MinusOutlined } from '@ant-design/icons';
import { Checkbox } from 'antd';
import {
    WrapperCounterOrder,
    WrapperInfo,
    WrapperItemOrder,
    WrapperLeft,
    WrapperListOrder,
    // WrapperPriceDiscount,
    WrapperRight,
    WrapperStyleHeader,
    WrapperTotal,
} from './style';
import { WrapperInputNumber } from '~/components/ProductDetailComponent/style';
import ButtonComponent from '~/components/ButtonComponent/ButtonComponent';
import { useDispatch, useSelector } from 'react-redux';
import { decreaseAmount, increaseAmount, removeAllOrderProduct, removeOrderProduct } from '~/redux/slides/orderSlide';
import { convertPrice } from '~/ultils';

const OrderPage = () => {
    const order = useSelector((state) => state.order);

    const [listCheckbox, setListCheckbox] = useState([]);
    const dispatch = useDispatch();

    const onChange = (e) => {
        const checkList = listCheckbox.includes(e.target.value);
        if (checkList) {
            const newCheckBox = listCheckbox.filter((items) => items !== e.target.value);
            setListCheckbox(newCheckBox);
        } else {
            setListCheckbox([...listCheckbox, e.target.value]);
        }
    };

    const handleChangeCount = (type, idProduct) => {
        if (type === 'increase') {
            dispatch(increaseAmount({ idProduct }));
        } else if (type === 'decrease') {
            dispatch(decreaseAmount({ idProduct }));
        }
    };
    const handleDeletedOrder = (idProduct) => {
        dispatch(removeOrderProduct({ idProduct }));
    };
    const handleOnchangeCheckAll = (e) => {
        if (e.target.checked) {
            const listCheckAll = [];
            order?.orderItems?.forEach((item) => {
                listCheckAll.push(item?.product);
            });
            setListCheckbox(listCheckAll); // Đặt giá trị của ListCheckAll vào state
        } else {
            setListCheckbox([]);
        }
    };
    const handleDeleteAllProducts = () => {
        if (listCheckbox?.length > 1) {
            dispatch(removeAllOrderProduct({ listCheckbox }));
        }
    };
    const priceMemo = useMemo(() => {
        return order?.orderItems?.reduce((total, item) => {
            const result = total + item?.price * item?.amount;
            return Number(result);
        }, 0);
    }, [order]);

    const priceDiscountMemo = useMemo(() => {
        const result = order?.orderItems?.reduce((total, item) => {
            // Giả sử item.discount là tỷ lệ phần trăm (ví dụ: 10 cho 10%).
            const discountAmount = Number(item?.price * item?.amount * (item?.discount / 100));
            return Number(total + discountAmount);
        }, 0);
        if (Number(result)) {
            return result;
        }
        return 0;
    }, [order]);

    const deliveryPriceMemo = useMemo(() => {
        if (priceMemo < 400000) {
            return Number(35000);
        } else {
            return 0;
        }
    }, [priceMemo]);
    const resultPriceMemo = useMemo(() => {
        return Number(priceMemo + deliveryPriceMemo + priceDiscountMemo);
    }, [deliveryPriceMemo, priceMemo, priceDiscountMemo]);

    const deliveryPriceString = deliveryPriceMemo === 0 ? 'Miễn Phí' : `${deliveryPriceMemo.toLocaleString()} VNĐ`;

    return (
        <>
            <HeaderComponent isHiddenSearch />
            <div style={{ background: '#f5f5fa', width: '100%', height: '100vh' }}>
                <div style={{ width: '1270px', margin: '0 auto', padding: '20px' }}>
                    <h3>Giỏ hàng</h3>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <WrapperLeft>
                            <WrapperStyleHeader>
                                <span style={{ display: 'flex', alignItems: 'center', width: '390px' }}>
                                    <Checkbox
                                        onChange={handleOnchangeCheckAll}
                                        value={order?.product}
                                        checked={listCheckbox?.length === order?.orderItems?.length}
                                    />
                                    <span style={{ marginLeft: '8px' }}>
                                        Tất cả ({order?.orderItems?.length} sản phẩm)
                                    </span>
                                </span>
                                <div style={{ display: 'flex', flex: 1, justifyContent: 'space-between' }}>
                                    <span>Đơn giá</span>
                                    <span>Số lượng</span>
                                    <span>Thành tiền</span>
                                    <DeleteOutlined style={{ cursor: 'pointer' }} onClick={handleDeleteAllProducts} />
                                </div>
                            </WrapperStyleHeader>
                            <WrapperListOrder>
                                {order?.orderItems?.map((orderItem, index) => {
                                    return (
                                        <WrapperItemOrder key={index}>
                                            <div style={{ display: 'flex', alignItems: 'center', width: '390px' }}>
                                                <Checkbox
                                                    onChange={onChange}
                                                    value={orderItem?.product}
                                                    checked={listCheckbox?.includes(orderItem?.product)}
                                                />
                                                <img
                                                    src={orderItem?.image}
                                                    style={{
                                                        width: '77px',
                                                        height: '77px',
                                                        objectFit: 'contain',
                                                        marginLeft: '8px',
                                                    }}
                                                    alt="product"
                                                />
                                                <div
                                                    style={{
                                                        marginLeft: '8px',
                                                        width: '260px',
                                                        overflow: 'hidden',
                                                        textOverflow: 'ellipsis',
                                                        whiteSpace: 'nowrap',
                                                    }}
                                                >
                                                    {orderItem?.name}
                                                </div>
                                            </div>
                                            <div
                                                style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    flex: 1,
                                                    justifyContent: 'space-between',
                                                }}
                                            >
                                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                                    <span style={{ fontSize: '13px', color: '#242424' }}>
                                                        {convertPrice(orderItem?.price)}
                                                    </span>
                                                    {/* <WrapperPriceDiscount>{orderItem?.amount}</WrapperPriceDiscount> */}
                                                </div>
                                                <WrapperCounterOrder>
                                                    <button
                                                        style={{
                                                            border: 'none',
                                                            background: 'transparent',
                                                            cursor: 'pointer',
                                                        }}
                                                        onClick={() =>
                                                            handleChangeCount('decrease', orderItem?.product)
                                                        }
                                                    >
                                                        <MinusOutlined style={{ color: '#000', fontSize: '14px' }} />
                                                    </button>
                                                    <WrapperInputNumber
                                                        defaultValue={orderItem?.amount}
                                                        value={orderItem?.amount}
                                                    />
                                                    <button
                                                        style={{
                                                            border: 'none',
                                                            background: 'transparent',
                                                            cursor: 'pointer',
                                                        }}
                                                        onClick={() =>
                                                            handleChangeCount('increase', orderItem?.product)
                                                        }
                                                    >
                                                        <PlusOutlined style={{ color: '#000', fontSize: '14px' }} />
                                                    </button>
                                                </WrapperCounterOrder>
                                                <span style={{ color: 'rgb(255,66,78)', fontSize: '13px' }}>
                                                    {convertPrice(orderItem?.price * orderItem?.amount)}
                                                </span>
                                                <DeleteOutlined
                                                    style={{ cursor: 'pointer' }}
                                                    onClick={() => handleDeletedOrder(orderItem?.product)}
                                                />
                                            </div>
                                        </WrapperItemOrder>
                                    );
                                })}
                            </WrapperListOrder>
                        </WrapperLeft>
                        <WrapperRight>
                            <div style={{ width: '100%' }}>
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
                                    <span style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                                        <span style={{ color: 'rgb(254,56,52)', fontSize: '24px' }}>
                                            {convertPrice(resultPriceMemo)}
                                        </span>
                                        <span style={{ color: '#000', fontSize: '11px' }}>(Đã bao gồm VAT nếu có)</span>
                                    </span>
                                </WrapperTotal>
                            </div>
                            <ButtonComponent
                                size={40}
                                styleButton={{
                                    background: 'rgba(244, 186, 186, 0.5)',
                                    height: '48px',
                                    width: '220px',
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
        </>
    );
};

export default OrderPage;
