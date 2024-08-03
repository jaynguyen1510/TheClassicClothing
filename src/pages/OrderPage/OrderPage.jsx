import React from 'react';
import { DeleteOutlined, PlusOutlined, MinusOutlined } from '@ant-design/icons';
import { Checkbox } from 'antd';
import {
    WrapperCounterOrder,
    WrapperInfo,
    WrapperItemOrder,
    WrapperLeft,
    WrapperListOrder,
    WrapperPriceDiscount,
    WrapperRight,
    WrapperStyleHeader,
    WrapperTotal,
} from './style';
import { WrapperInputNumber } from '~/components/ProductDetailComponent/style';
import ButtonComponent from '~/components/ButtonComponent/ButtonComponent';

const OrderPage = ({ count = 1 }) => {
    const onChange = (e) => {
        console.log(`onChange = ${e.target.value}`);
    };

    const handleChangeCount = () => {};
    const handleOnchangeCheckAll = () => {};

    return (
        <div style={{ background: '#f5f5fa', width: '100%', height: '100vh' }}>
            <div style={{ width: '1270px', margin: '0 auto', padding: '20px' }}>
                <h3>Giỏ hàng</h3>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <WrapperLeft>
                        <WrapperStyleHeader>
                            <span style={{ display: 'flex', alignItems: 'center', width: '390px' }}>
                                <Checkbox onChange={handleOnchangeCheckAll} />
                                <span style={{ marginLeft: '8px' }}> Tất cả ({count} sản phẩm) </span>
                            </span>
                            <div style={{ display: 'flex', flex: 1, justifyContent: 'space-between' }}>
                                <span>Đơn giá</span>
                                <span>Số lượng</span>
                                <span>Thành tiền</span>
                                <DeleteOutlined style={{ cursor: 'pointer' }} />
                            </div>
                        </WrapperStyleHeader>
                        <WrapperListOrder>
                            <WrapperItemOrder>
                                <div style={{ display: 'flex', alignItems: 'center', width: '390px' }}>
                                    <Checkbox onChange={onChange} />
                                    <img
                                        src="https://via.placeholder.com/150"
                                        style={{
                                            width: '77px',
                                            height: '77px',
                                            objectFit: 'contain',
                                            marginLeft: '8px',
                                        }}
                                        alt="product"
                                    />
                                    <div style={{ marginLeft: '8px' }}>Tên sản phẩm</div>
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
                                        <span style={{ fontSize: '13px', color: '#242424' }}>211</span>
                                        <WrapperPriceDiscount>230</WrapperPriceDiscount>
                                    </div>
                                    <WrapperCounterOrder>
                                        <button
                                            style={{ border: 'none', background: 'transparent', cursor: 'pointer' }}
                                        >
                                            <MinusOutlined style={{ color: '#000', fontSize: '14px' }} />
                                        </button>
                                        <WrapperInputNumber onChange={onChange} defaultValue={1} />
                                        <button
                                            style={{ border: 'none', background: 'transparent', cursor: 'pointer' }}
                                        >
                                            <PlusOutlined style={{ color: '#000', fontSize: '14px' }} />
                                        </button>
                                    </WrapperCounterOrder>
                                    <span style={{ color: 'rgb(255,66,78)', fontSize: '13px' }}>211</span>
                                    <DeleteOutlined style={{ cursor: 'pointer' }} />
                                </div>
                            </WrapperItemOrder>
                        </WrapperListOrder>
                    </WrapperLeft>
                    <WrapperRight>
                        <div style={{ width: '100%' }}>
                            <WrapperInfo>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                                    <span>Tạm tính</span>
                                    <span style={{ color: '#000', fontSize: '14px', fontWeight: 'bold' }}>0 VND</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                                    <span>Giảm giá</span>
                                    <span style={{ color: '#000', fontSize: '14px', fontWeight: 'bold' }}>0 VND</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                                    <span>Thuế</span>
                                    <span style={{ color: '#000', fontSize: '14px', fontWeight: 'bold' }}>0 VND</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <span>Phí giao hàng</span>
                                    <span style={{ color: '#000', fontSize: '14px', fontWeight: 'bold' }}>0 VND</span>
                                </div>
                            </WrapperInfo>
                            <WrapperTotal>
                                <span>Tổng tiền</span>
                                <span style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                                    <span style={{ color: 'rgb(254,56,52)', fontSize: '24px' }}>0 VND</span>
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
    );
};

export default OrderPage;
