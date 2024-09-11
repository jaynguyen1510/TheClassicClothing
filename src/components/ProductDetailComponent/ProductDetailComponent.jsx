import React, { useEffect, useMemo, useState } from 'react';

import classNames from 'classnames/bind';
import styles from './ProductDetailComponent.module.scss';

import imageSmall from '~/assets/images/ao-day.png';
import ButtonComponent from '../ButtonComponent/ButtonComponent';
import LikeButtonComponent from '../LikeButtonComponent/LikeButtonComponent';
import CommentFbComponent from '../CommentFbComponent/CommentFbComponent';
import * as ProductService from '~/Services/ProductService';

import { ButtonWrapper, WrapperInputNumber } from './style';
import { Col, Image, message, Rate, Row } from 'antd';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';
import { useQuery } from '@tanstack/react-query';
import { LoadingComponent } from '../LoadingComponent/LoadingComponent';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { routes } from '~/routes';
import { addOrderProduct, resetOrder } from '~/redux/slides/orderSlide';
import { convertPrice, initFacebookSDK } from '~/ultils';

const cx = classNames.bind(styles);

const images = [imageSmall, imageSmall, imageSmall, imageSmall, imageSmall, imageSmall];

const ProductDetailComponent = ({
    idProduct,
    size = 40,
    backgroundColorButton = 'rgba(255,57, 69)',
    colorButton = '#fff',
}) => {
    const [quantityProduct, setQuantityProduct] = useState(1);
    const [errorLimitOrder, setErrorLimitOrder] = useState(false);
    const location = useLocation();
    const user = useSelector((state) => state.user);
    const order = useSelector((state) => state.order);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    // const memoCurrentLink = useMemo(() => {
    //     const link = process.env.REACT_APP_IS_LOCAL ? ;
    // },[])

    const fetchDetailsProduct = async (context) => {
        const id = context?.queryKey && context?.queryKey[1];
        if (id) {
            const res = await ProductService.getDetailsProduct(id);
            return res.data;
        }
    };

    const { isLoading, data: productDetails } = useQuery({
        queryKey: ['products-details', idProduct],
        queryFn: fetchDetailsProduct,
        enabled: !!idProduct,
    });
    const handleLogin = () => {
        navigate(routes[5].path, { state: location?.pathname });
    };
    const handleChangeAddress = () => {
        navigate(routes[7].path);
    };
    const handleChange = (value) => {
        setQuantityProduct(Number(value));
    };

    const handleChangeCount = (type) => {
        if (type === 'decrease') {
            if (quantityProduct > 1) {
                setQuantityProduct(quantityProduct - 1);
            }
        } else if (type === 'increase') {
            if (quantityProduct < 20) {
                setQuantityProduct(quantityProduct + 1);
            }
        }
    };

    useEffect(() => {
        const orderRedux = order?.orderItems?.find((item) => item.product === productDetails?._id);
        if (
            orderRedux?.amount + quantityProduct <= orderRedux?.countInStock ||
            (!orderRedux && productDetails?.countInStock > 0)
        ) {
            setErrorLimitOrder(false);
        } else if (productDetails?.countInStock === 0) {
            setErrorLimitOrder(true);
        }
    }, [quantityProduct]);

    useEffect(() => {
        initFacebookSDK();
    }, []);

    const handleAddProduct = () => {
        if (!user?.id) {
            setTimeout(() => {
                message.error('Vui lòng đăng nhập để mua hàng');
                navigate(routes[5].path, { state: location?.pathname });
            }, 300);
        } else {
            const orderRedux = order?.orderItems?.find((item) => item.product === productDetails?._id);

            if (
                orderRedux?.amount + quantityProduct <= orderRedux?.countInStock ||
                (!orderRedux && productDetails?.countInStock > 0)
            ) {
                dispatch(
                    addOrderProduct({
                        orderItems: {
                            name: productDetails?.name,
                            amount: quantityProduct,
                            image: productDetails?.image,
                            price: productDetails?.price,
                            product: productDetails?._id,
                            discount: productDetails?.discount,
                            countInStock: productDetails?.countInStock,
                        },
                    }),
                );
            } else {
                setErrorLimitOrder(true);
            }
        }
    };
    useEffect(() => {
        if (order?.isSuccessOrder) {
            message.success('Đã thêm vào giỏ hàng thành công');
            dispatch(resetOrder()); // Reset lại trạng thái sau khi hiển thị thông báo
        }
    }, [order?.isSuccessOrder, dispatch]);

    const stars = productDetails?.rating;
    // console.log('order bring together', productDetails, user);

    return (
        <LoadingComponent isPending={isLoading}>
            <Row className={cx('wrapper-images')}>
                <Col span={10} style={{ border: '1px solid #e5e5e5', paddingRight: '8px' }}>
                    <Image src={productDetails?.image} alt="image product" preview={false} />
                    <Row className={cx('items')}>
                        {images.map((image, index) => (
                            <Col span={4} className={cx('wrapper-item')} key={index}>
                                <Image
                                    className={cx('item-image')}
                                    src={image}
                                    alt={`image small ${index + 1}`}
                                    preview={false}
                                />
                            </Col>
                        ))}
                    </Row>
                </Col>
                <Col span={14} style={{ paddingLeft: '10px' }}>
                    <div className={cx('wrapper-content')}>
                        <span className={cx('content')}>
                            [{productDetails?.description}] , {productDetails?.name}
                        </span>
                    </div>
                    <div>
                        <Rate allowHalf defaultValue={stars} value={stars} />
                        <span className={cx('text-sell')}>
                            | Đã bán {productDetails?.selled} , Kho {productDetails?.countInStock}
                        </span>
                    </div>
                    <div className={cx('product-price')}>
                        <h1 className={cx('text-price')}>{convertPrice(productDetails?.price)}</h1>
                    </div>
                    <div>
                        <span style={{ padding: '10px' }}>
                            {user?.address ? (
                                <>
                                    <span className={cx('label')}>Giao đến </span>
                                    <span className={cx('address')}>
                                        {user?.address} , {user?.city}
                                    </span>
                                </>
                            ) : (
                                <span className={cx('address')} onClick={!user?.address ? handleLogin : undefined}>
                                    Vui lòng Cập nhật địa chỉ
                                </span>
                            )}
                        </span>
                        <span
                            className={cx('change-address')}
                            onClick={user?.address ? handleChangeAddress : undefined}
                        >
                            Đổi địa chỉ
                        </span>
                        <LikeButtonComponent
                            dataHref={
                                process.env.REACT_APP_IS_LOCAL
                                    ? 'https://developers.facebook.com/docs/plugins/'
                                    : window.location.href
                            }
                        />
                        <div className={cx('wrapper-info')}>
                            <div style={{ marginBottom: '12px', marginLeft: '10px' }}>số lượng</div>
                            <div className={cx('wrapper-quality')}>
                                <button className={cx('icon-button')} onClick={() => handleChangeCount('decrease')}>
                                    <MinusOutlined className={cx('icon-min')} />
                                </button>
                                <WrapperInputNumber value={quantityProduct} onChange={handleChange} size="small" />
                                <button className={cx('icon-button')} onClick={() => handleChangeCount('increase')}>
                                    <PlusOutlined className={cx('icon-plus')} />
                                </button>
                            </div>
                        </div>
                        <ButtonWrapper
                            style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 12px' }}
                        >
                            <div>
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
                                    onClick={handleAddProduct}
                                    textButton={'Mua'}
                                />
                                {errorLimitOrder && <div style={{ color: 'red' }}>Sản phẩm hết hàng</div>}
                            </div>
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
                                onClick={handleAddProduct}
                                textButton={'Mua trả sau '}
                            />
                        </ButtonWrapper>
                    </div>
                </Col>
                <CommentFbComponent
                    dataHref={
                        process.env.REACT_APP_IS_LOCAL
                            ? 'https://developers.facebook.com/docs/plugins/comments#configurator'
                            : window.location.href
                    }
                    width="1240"
                />
            </Row>
        </LoadingComponent>
    );
};

export default ProductDetailComponent;
