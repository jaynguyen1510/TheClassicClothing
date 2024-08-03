import React from 'react';
import classNames from 'classnames/bind';
import styles from './TypeProduct.module.scss';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);
function TypeProduct({ name }) {
    const navigate = useNavigate(); // create navigation

    // handle navigate products
    const handleNavigateTypes = (typeName) => () => {
        const cleanedTypeName = typeName
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '') // Loại bỏ các dấu thanh và dấu phụ
            .toLowerCase() // Chuyển đổi thành chữ thường
            .replace(/\s+/g, '_'); // Thay thế khoảng trắng bằng dấu gạch dưới
        navigate(`/products/${cleanedTypeName}`, { state: typeName });
    };

    return (
        <div className={cx('wrapper-text')} onClick={handleNavigateTypes(name)}>
            {name}
        </div>
    );
}

export default TypeProduct;
