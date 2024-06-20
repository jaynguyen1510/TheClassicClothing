import React from 'react';

import { Badge, Col } from 'antd';
import { WrapperHeader, WrapperHeaderAccount, WrapperHeaderSmall, WrapperTextHeader } from './style';
import { UserOutlined, CaretDownOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import ButtonInputSearch from '../ButtonInputSearch/ButtonInputSearch';

function HeaderComponent() {
    return (
        <div>
            <WrapperHeader>
                <Col span={6}>
                    <WrapperTextHeader>The Classics</WrapperTextHeader>
                </Col>
                <Col span={12}>
                    <ButtonInputSearch
                        size="large"
                        bordered={false}
                        textButton="Search"
                        placeholder="Enter the clothes you are looking for"
                        // onSearch={onSearch}
                    />
                </Col>
                <Col span={6} style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                    <WrapperHeaderAccount>
                        <UserOutlined style={{ fontSize: '30px' }} />
                        <div>
                            <WrapperHeaderSmall>Login/register</WrapperHeaderSmall>
                            <div>
                                <WrapperHeaderSmall>Account</WrapperHeaderSmall>
                                <CaretDownOutlined />
                            </div>
                        </div>
                    </WrapperHeaderAccount>
                    <div>
                        <Badge count={4} size="small">
                            <ShoppingCartOutlined style={{ fontSize: '30px', color: '#000' }} />
                        </Badge>
                        <WrapperHeaderSmall>cart</WrapperHeaderSmall>
                    </div>
                </Col>
            </WrapperHeader>
        </div>
    );
}

export default HeaderComponent;
