import React from 'react';
import classNames from 'classnames/bind';
import styles from './ProductDetailPage.module.scss';
import ProductDetailComponent from '~/components/ProductDetailComponent/ProductDetailComponent';
import { useNavigate, useParams } from 'react-router-dom';

const cx = classNames.bind(styles);

const ProductDetailPage = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const handleHomePage = () => {
        navigate('/');
    };
    return (
        <div className={cx('wrapper-product')}>
            <div className={cx('wrapper-home')}>
                <h5 className={cx('wrapper-text')} onClick={handleHomePage}>
                    Trang chủ
                </h5>
                <span className={cx('separator')}> {'>'} </span>
                <h5 className={cx('wrapper-text')}>Chi tiết sản phẩm</h5>
            </div>
            <div className={cx('items-product')}>
                <ProductDetailComponent idProduct={id} />
            </div>
        </div>
    );
};

export default ProductDetailPage;
