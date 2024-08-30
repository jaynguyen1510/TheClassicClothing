import React, { useEffect, useMemo, useState } from 'react';

import HeaderComponent from '~/components/HeaderComponent/HeaderComponent';
import ModalComponent from '~/components/ModalComponent/ModalComponent';
import InputComponent from '~/components/InputComponent/InputComponent';
import ButtonComponent from '~/components/ButtonComponent/ButtonComponent';

import * as UserService from '~/Services/UserService';
import * as message from '~/components/Message/Message';

import StepsOption from '~/components/StepsOption/StepsOption';

import { DeleteOutlined, PlusOutlined, MinusOutlined } from '@ant-design/icons';
import { Checkbox, Form } from 'antd';
import {
    WrapperCounterOrder,
    WrapperInfo,
    WrapperItemOrder,
    WrapperLeft,
    WrapperListOrder,
    WrapperRight,
    WrapperStyleHeader,
    WrapperTotal,
} from './style';
import { WrapperInputNumber } from '~/components/ProductDetailComponent/style';
import { useDispatch, useSelector } from 'react-redux';
import {
    decreaseAmount,
    increaseAmount,
    removeAllOrderProduct,
    removeOrderProduct,
    selectedOrderItem,
} from '~/redux/slides/orderSlide';
import { convertPrice } from '~/ultils';
import { useMutationCustomHook } from '~/hook/useMutationCustomHook';
import { LoadingComponent } from '~/components/LoadingComponent/LoadingComponent';
import { updateUser } from '~/redux/slides/userSlide';
import { useNavigate } from 'react-router-dom';
import { routes } from '~/routes';

const OrderPage = () => {
    const formItems = [
        { label: 'Tên', name: 'name', message: 'Vui lòng nhập tên sản phẩm' },
        { label: 'Tỉnh/Thành', name: 'city', message: 'Vui lòng nhập Tỉnh/Thành ' },
        { label: 'Số điện thoại', name: 'phone', message: 'Vui lòng nhập phone' },
        { label: 'Địa chỉ', name: 'address', message: 'Vui lòng nhập địa chỉ ' },
    ];
    const order = useSelector((state) => state.order);
    const user = useSelector((state) => state.user);
    const [listCheckbox, setListCheckbox] = useState([]);
    const [currentStep, setCurrentStep] = useState(0);
    const [isPending, setIsPending] = useState(false);
    const [isOpenModelUpdateInformation, setIsOpenModelUpdateInformation] = useState(false);
    const [sateDetailsUsers, setSateDetailsUsers] = useState({
        address: '',
        name: '',
        phone: '',
        city: '',
    });
    const navigate = useNavigate();
    const [form] = Form.useForm();

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

    useEffect(() => {
        console.log('List Checkbox:', listCheckbox); // Kiểm tra giá trị của listCheckbox
        dispatch(selectedOrderItem({ listCheckbox }));
    }, [listCheckbox, dispatch]);

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

    const handleChangeCount = (type, idProduct, limited) => {
        if (type === 'increase') {
            if (!limited) {
                dispatch(increaseAmount({ idProduct }));
            }
        } else if (type === 'decrease') {
            if (!limited) {
                dispatch(decreaseAmount({ idProduct }));
            }
        }
    };
    const handleDeletedOrder = (idProduct) => {
        dispatch(removeOrderProduct({ idProduct }));
    };

    const handleDeleteAllProducts = () => {
        if (listCheckbox?.length > 1) {
            dispatch(removeAllOrderProduct({ listCheckbox }));
        }
    };

    const handleAddCart = () => {
        if (!order?.selectItemsOrder?.length) {
            message.error('Vui lòng chọn sản phẩm');
        } else if (!user?.address || !user?.phone || !user?.name || !user?.city) {
            setIsOpenModelUpdateInformation(true);
        } else {
            if (priceMemo < 400000) {
                // Đặt bước hiện tại là 3 nếu giá tạm tính < 400.000 VNĐ
                setCurrentStep(3);
            } else {
                setCurrentStep(2);
            }
            message.success('Đang xử lý đơn hàng, vui lòng đợi...');
            setIsPending(false);
            // Thực hiện chuyển hướng sau 3 giây
            setTimeout(() => {
                navigate(routes[2].path);
            }, 1500);
            setIsPending(true);

            // return clearTimeout()
        }
    };

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
    const { isPending: isLoading, data } = mutationUpdate;
    console.log('data', data);

    const handleUpdatedInfoUser = () => {
        // Gửi dữ liệu về server để update thông tin người dùng
        const { name, city, address, phone } = sateDetailsUsers;

        if (name && address && city && phone) {
            mutationUpdate.mutate(
                { id: user?.id, token: user?.access_token, ...sateDetailsUsers },
                {
                    onSuccess: async () => {
                        dispatch(updateUser({ name, city, address, phone }));
                        setIsOpenModelUpdateInformation(false);
                        message.success('Cập nhật thông tin thành công');
                        // Reload trang để lấy lại dữ liệu người dùng
                        window.location.reload();
                    },
                    onError: (error) => {
                        message.error('Cập nhật thông tin thất bại');
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

    const priceMemo = useMemo(() => {
        return order?.selectItemsOrder?.reduce((total, item) => {
            return total + item?.price * item?.amount;
        }, 0);
    }, [order]);

    const priceDiscountMemo = useMemo(() => {
        const result = order?.selectItemsOrder?.reduce((total, item) => {
            // Giả sử item.discount là tỷ lệ phần trăm (ví dụ: 10 cho 10%).
            const discountAmount = Number(item?.price * item?.amount * (item?.discount / 100));
            return total + discountAmount;
        }, 0);

        // Giới hạn mức giảm giá tối đa là 50.000 VNĐ
        const maxDiscount = 50000;
        return Math.min(result, maxDiscount) || 0;
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

    const resultPriceMemo = useMemo(() => {
        return Number(priceMemo + deliveryPriceMemo - priceDiscountMemo);
    }, [deliveryPriceMemo, priceMemo, priceDiscountMemo]);

    const deliveryPriceString =
        deliveryPriceMemo === 0 ? (
            <span style={{ color: 'rgba(0, 128, 0, 0.5)' }}>Miễn Phí</span>
        ) : (
            `${deliveryPriceMemo.toLocaleString()} VNĐ`
        );
    useEffect(() => {
        // Nếu giá tạm tính >= 400.000 VNĐ, thì bước hiện tại là 2
        // Nếu giá tạm tính < 400.000 VNĐ, và có sản phẩm đã chọn, thì bước hiện tại là 1
        // Nếu không có sản phẩm nào đã chọn và giá tạm tính = 0, thì bước hiện tại là 0
        setCurrentStep(priceMemo >= 400000 ? 2 : priceMemo > 0 ? 1 : 0);
    }, [priceMemo]);
    console.log('order', order);

    const itemDelivery = [
        {
            title: '35.000 VNĐ',
            description: order?.selectItemsOrder?.length ? ' ' : 'Hãy chọn sản phẩm',
        },
        {
            title: priceMemo >= 400000 ? 'Free ship' : '35.000 VNĐ',
            description: priceMemo >= 400000 ? '' : 'HĐ dưới 400.000 VNĐ',
        },
        {
            title: 'Xác nhận đơn hàng',
        },
    ];

    return (
        <>
            <HeaderComponent isHiddenSearch />

            <div style={{ background: '#f5f5fa', width: '100%', height: '100vh' }}>
                <div style={{ width: '1270px', margin: '0 auto', padding: '20px' }}>
                    <WrapperStyleHeader>
                        <StepsOption items={itemDelivery} current={currentStep} />
                    </WrapperStyleHeader>
                    <LoadingComponent isPending={isPending}>
                        <h3 style={{ fontSize: '15px', padding: '10px' }}>Giỏ hàng</h3>

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
                                        <DeleteOutlined
                                            style={{ cursor: 'pointer' }}
                                            onClick={handleDeleteAllProducts}
                                        />
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
                                                                handleChangeCount(
                                                                    'decrease',
                                                                    orderItem?.product,
                                                                    orderItem?.amount === 1,
                                                                )
                                                            }
                                                        >
                                                            <MinusOutlined
                                                                style={{ color: '#000', fontSize: '14px' }}
                                                            />
                                                        </button>
                                                        <WrapperInputNumber
                                                            defaultValue={orderItem?.amount}
                                                            value={orderItem?.amount}
                                                            min={1}
                                                            max={orderItem?.countInStock}
                                                        />
                                                        <button
                                                            style={{
                                                                border: 'none',
                                                                background: 'transparent',
                                                                cursor: 'pointer',
                                                            }}
                                                            onClick={() =>
                                                                handleChangeCount(
                                                                    'increase',
                                                                    orderItem?.product,
                                                                    orderItem?.amount === orderItem?.countInStock,
                                                                )
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
                                            <span
                                                style={{
                                                    color: 'rgba(128, 128, 128, 1)',
                                                    fontSize: '14px',
                                                    fontWeight: 'bold',
                                                }}
                                            >
                                                {priceDiscountMemo > 0
                                                    ? ` - ${convertPrice(priceDiscountMemo)}`
                                                    : convertPrice(priceDiscountMemo)}
                                            </span>
                                        </div>

                                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                            <span>Phí giao hàng</span>
                                            <span style={{ color: 'red', fontSize: '14px', fontWeight: 'bold' }}>
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
                                    onClick={handleAddCart}
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
                    </LoadingComponent>
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
        </>
    );
};

export default OrderPage;
