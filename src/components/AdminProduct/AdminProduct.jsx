import React from 'react';
import classNames from 'classnames/bind';
import styles from './AdminProduct.module.scss';

import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import TableComponent from '../TableComponent/TableComponent';

const cx = classNames.bind(styles);
const AdminProduct = () => {
    return (
        <div>
            <h1 className={cx('wrapper-header')}>Quản lý thông tin đơn hàng </h1>
            <div className={cx('wrapper-content')}>
                <Button className={cx('wrapper-button')}>
                    <PlusOutlined className={cx('wrapper-icon')} />
                </Button>
                <div className={cx('wrapper-table')}>
                    <TableComponent />
                </div>
            </div>
        </div>
    );
};

export default AdminProduct;
