import React from 'react';
import classNames from 'classnames/bind';
import styles from './TypeProduct.module.scss';

const cx = classNames.bind(styles);
function TypeProduct({ name }) {
    return <div className={cx('wrapper-text')}>{name}</div>;
}

export default TypeProduct;
