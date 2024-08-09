import React, { useState } from 'react';

import classNames from 'classnames/bind';
import styles from './ProductDetailComponent.module.scss';

import imageSmall from '~/assets/images/ao-day.png';
import ButtonComponent from '../ButtonComponent/ButtonComponent';
import * as ProductService from '~/Services/ProductService';

import { WrapperInputNumber } from './style';
import { Col, Image, Rate, Row } from 'antd';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';
import { useQuery } from '@tanstack/react-query';
import { LoadingComponent } from '../LoadingComponent/LoadingComponent';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { routes } from '~/routes';
import { addOrderProduct } from '~/redux/slides/orderSlide';

const cx = classNames.bind(styles);

const images = [imageSmall, imageSmall, imageSmall, imageSmall, imageSmall, imageSmall];

const ProductDetailComponent = ({
    idProduct,
    size = 40,
    backgroundColorButton = 'rgba(255,57, 69)',
    colorButton = '#fff',
}) => {
    const [quantityProduct, setQuantityProduct] = useState(1);
    const location = useLocation();
    const user = useSelector((state) => state.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleLogin = () => {
        navigate(routes[4].path, { state: location?.pathname });
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
    const handleAddProduct = () => {
        if (!user?.id) {
            setTimeout(() => {
                alert('Vui lòng đăng nhập để mua hàng');
                navigate(routes[4].path, { state: location?.pathname });
            }, 300);
        } else {
            // navigate(routes[1].path);
            // {
            //     name: { type: String, required: true },
            //     amount: { type: Number, required: true },
            //     image: { type: String, required: true },
            //     price: { type: Number, required: true },
            //     product: {
            //         type: mongoose.Schema.Types.ObjectId,
            //         ref: "Product",
            //         required: true
            //     },
            // },
            dispatch(
                addOrderProduct({
                    orderItems: {
                        name: productDetails?.name,
                        amount: quantityProduct,
                        image: productDetails?.image,
                        price: productDetails?.price,
                        product: productDetails?._id,
                    },
                }),
            );
        }
    };

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
                        <span className={cx('text-sell')}> | Đã bán 1000+ , Kho {productDetails?.countInStock} </span>
                    </div>
                    <div className={cx('product-price')}>
                        <h1 className={cx('text-price')}>{productDetails?.price?.toLocaleString()} VNĐ</h1>
                    </div>
                    <div>
                        <span onClick={!user?.address ? handleLogin : undefined}>
                            {user?.address ? (
                                <>
                                    <span className={cx('label')}>Giao đến </span>
                                    <span className={cx('address')}>{user.address}</span>
                                </>
                            ) : (
                                <span className={cx('address')}> Đăng nhập để có địa chỉ </span>
                            )}
                        </span>
                        -<span className={cx('change-address')}> Đổi địa chỉ</span>
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
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 12px' }}>
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
                        </div>
                    </div>
                </Col>
            </Row>
        </LoadingComponent>
    );
};

export default ProductDetailComponent;
