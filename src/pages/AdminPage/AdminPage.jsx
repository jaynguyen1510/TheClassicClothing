import React, { useState } from 'react';

import { Menu } from 'antd';
import { ProductFilled, UserOutlined } from '@ant-design/icons';
import HeaderComponent from '~/components/HeaderComponent/HeaderComponent';
const items = [
    {
        key: 'sub1',
        label: 'Người dùng',
        icon: <UserOutlined />,
        children: [
            {
                key: '1',
                label: 'Option 1',
            },
            {
                key: '2',
                label: 'Option 2',
            },
            {
                key: '3',
                label: 'Option 3',
            },
            {
                key: '4',
                label: 'Option 4',
            },
        ],
    },
    {
        key: 'sub2',
        label: 'Sản phảm',
        icon: <ProductFilled />,
        children: [
            {
                key: '5',
                label: 'Option 5',
            },
            {
                key: '6',
                label: 'Option 6',
            },
            {
                key: 'sub3',
                label: 'Submenu',
                children: [
                    {
                        key: '7',
                        label: 'Option 7',
                    },
                    {
                        key: '8',
                        label: 'Option 8',
                    },
                ],
            },
        ],
    },
    {
        type: 'divider',
    },
];
const AdminPage = () => {
    const [keySelected, setKeySelected] = useState('');

    const handleOnClick = (e) => {
        setKeySelected(e.key);
    };
    return (
        <>
            <HeaderComponent isHiddenSearch isHiddenCart />
            <div style={{ display: 'flex' }}>
                <Menu
                    onClick={handleOnClick}
                    style={{
                        width: 256,
                    }}
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['sub1']}
                    mode="inline"
                    items={items}
                />
                <div style={{ flex: '1' }}>{keySelected === '6' && <span>{keySelected}</span>}</div>
            </div>
        </>
    );
};

export default AdminPage;
