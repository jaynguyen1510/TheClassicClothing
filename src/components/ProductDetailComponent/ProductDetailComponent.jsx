import React from 'react';

import classNames from 'classnames/bind';
import styles from './ProductDetailComponent.module.scss';

import { Col, Image, Row } from 'antd';
import { StarFilled, PlusOutlined, MinusOutlined } from '@ant-design/icons';

import imageProduct from '~/assets/images/quan-short-biker.png';
import imageSmall from '~/assets/images/ao-day.png';
import { WrapperInputNumber } from './style';
import ButtonComponent from '../ButtonComponent/ButtonComponent';

const cx = classNames.bind(styles);

const images = [imageSmall, imageSmall, imageSmall, imageSmall, imageSmall, imageSmall];
const stars = [1, 2, 3];

const ProductDetailComponent = ({ size = 40, backgroundColorButton = 'rgba(255,57, 69)', colorButton = '#fff' }) => {
    const handleChange = () => {};

    return (
        <Row className={cx('wrapper-images')}>
            <Col span={10} style={{ border: '1px solid #e5e5e5', paddingRight: '8px' }}>
                <Image src={imageProduct} alt="image product" preview={false} />
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
                    <span className={cx('content')}>Quần Short Biker - Dáng ngắn Thun gân [Sẵn Hàng] </span>
                </div>
                <div>
                    {stars.map((index) => (
                        <StarFilled key={index} className={cx('start-icon')} />
                    ))}
                    <span className={cx('text-sell')}> | Đã bán 1000+ </span>
                </div>
                <div className={cx('product-price')}>
                    <h1 className={cx('text-price')}>200.000VNĐ</h1>
                </div>
                <div>
                    <span>Giao đến</span>
                    <span className={cx('address')}> Trung chánh Hóc Môn ,Tp HCM</span> -
                    <span className={cx('change-address')}>Đổi địa chỉ</span>
                    <div className={cx('wrapper-info')}>
                        <div style={{ marginBottom: '12px', marginLeft: '10px' }}>số lượng</div>
                        <div className={cx('wrapper-quality')}>
                            <button className={cx('icon-button')}>
                                <MinusOutlined className={cx('icon-min')} />
                            </button>
                            <WrapperInputNumber defaultValue={3} onChange={handleChange} size="small" />
                            <button className={cx('icon-button')}>
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
                            textButton={'Mua '}
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
                            textButton={'Mua trả sau '}
                        />
                    </div>
                </div>
            </Col>
        </Row>
    );
};

export default ProductDetailComponent;
