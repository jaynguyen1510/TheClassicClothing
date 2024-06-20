import React from 'react';
import classNames from 'classnames/bind';
import styles from './ProductDetailPage.module.scss';
import ProductDetailComponent from '~/components/ProductDetailComponent/ProductDetailComponent';

const cx = classNames.bind(styles);

const ProductDetailPage = () => {
    return (
        <div className={cx('wrapper-product')}>
            <h5>Trang chủ</h5>
            <div className={cx('items-product')}>
                <ProductDetailComponent />
            </div>
        </div>
    );
};

export default ProductDetailPage;
