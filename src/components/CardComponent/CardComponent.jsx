import React from 'react';

import styles from './CardComponent.module.scss';
import classNames from 'classnames/bind';
import imgOffice from '~/assets/images/office.png';

import { StyleNameProduct, WrapperCardStyle, WrapperDiscountText, WrapperPriceText, WrapperReportText } from './style';
import { StarFilled } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

const CardComponent = ({ id, countInStock, description, image, name, price, rating, type, selled, discount }) => {
    const navigate = useNavigate();
    const handleDetailsProduct = (id) => {
        navigate(`/product-detail/${id}`);
    };

    return (
        <WrapperCardStyle
            hoverable
            className={cx('cartComponent')}
            cover={<img alt="example" src={image} onClick={() => handleDetailsProduct(id)} />}
        >
            <img src={imgOffice} alt="office" className={cx('office-img')} />

            <div className={cx('wrapper-text-content')}>
                <StyleNameProduct className={cx('text-content')}>{name}</StyleNameProduct>
            </div>
            <WrapperReportText>
                <span style={{ marginRight: '4px' }}>
                    <span>{rating}</span>
                    <StarFilled style={{ fontSize: '12px', color: 'yellow' }} />
                </span>
                <span>| đã bán {selled || 10000}</span>
            </WrapperReportText>
            <WrapperPriceText>
                <span className={cx('text-price')}>{price.toLocaleString()} VNĐ</span>
                <WrapperDiscountText>sale - {discount || 5}%</WrapperDiscountText>
            </WrapperPriceText>
        </WrapperCardStyle>
    );
};

export default CardComponent;
