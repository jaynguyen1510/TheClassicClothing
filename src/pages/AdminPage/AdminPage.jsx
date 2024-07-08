import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './AdminPage.module.scss';

import HeaderComponent from '~/components/HeaderComponent/HeaderComponent';
import AdminUser from '~/components/AdminUser/AdminUser';
import AdminProduct from '~/components/AdminProduct/AdminProduct';

import { Menu } from 'antd';
import { ProductFilled, UserOutlined } from '@ant-design/icons';
import { StyledLabel } from './style';

const cx = classNames.bind(styles);
const items = [
    {
        key: 'user',
        label: <StyledLabel>Người dùng</StyledLabel>,
        icon: (
            <UserOutlined
                style={{
                    color: 'rgba(255, 182, 193, 1)',
                }}
            />
        ),
    },
    {
        key: 'product',
        label: <StyledLabel>Sản phẩm</StyledLabel>,
        icon: (
            <ProductFilled
                style={{
                    color: 'rgba(255, 182, 193, 1)',
                }}
            />
        ),
    },
    {
        type: 'divider',
    },
];

const AdminPage = () => {
    const [keySelected, setKeySelected] = useState('');

    const renderPage = (key) => {
        switch (key) {
            case 'user':
                return <AdminUser />;
            case 'product':
                return <AdminProduct />;
            default:
                return <div>Default Page</div>;
        }
    };

    const handleOnClick = (e) => {
        setKeySelected(e.key);
    };

    return (
        <>
            <HeaderComponent isHiddenSearch isHiddenCart />
            <div style={{ display: 'flex' }}>
                <Menu
                    onClick={handleOnClick}
                    className={cx('wrapper-menu')}
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['sub1']}
                    mode="inline"
                    items={items}
                />
                <div className={cx('wrapper-page-admin')}>{renderPage(keySelected)}</div>
            </div>
        </>
    );
};

export default AdminPage;
