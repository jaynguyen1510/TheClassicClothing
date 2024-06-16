import React from 'react';

import styles from './CartComponent.module.scss';
import classNames from 'classnames/bind';

import { StyleNameProduct, WrapperCardStyle, WrapperDiscountText, WrapperPriceText, WrapperReportText } from './style';
import { StarFilled } from '@ant-design/icons';
import imgOffice from '~/assets/images/office.png';

const cx = classNames.bind(styles);

const CartComponent = () => {
    return (
        <WrapperCardStyle
            hoverable
            className={cx('cartComponent')}
            cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
        >
            <img src={imgOffice} alt="office" className={cx('office-img')} />
            <StyleNameProduct>Quần ngắn</StyleNameProduct>
            <WrapperReportText>
                <span style={{ marginRight: '4px' }}>
                    <span>4.96</span>
                    <StarFilled style={{ fontSize: '12px', color: 'yellow' }} />
                </span>
                <span>| đã bán 1000</span>
            </WrapperReportText>
            <WrapperPriceText>
                650.000
                <WrapperDiscountText>-5%</WrapperDiscountText>
            </WrapperPriceText>
        </WrapperCardStyle>
    );
};

export default CartComponent;
