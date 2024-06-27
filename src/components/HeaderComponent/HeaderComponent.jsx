import React from 'react';
import classNames from 'classnames/bind';
import styles from './HeaderComponent.module.scss';

import { Badge, Col } from 'antd';
import { WrapperHeader, WrapperHeaderAccount, WrapperHeaderSmall, WrapperTextHeader } from './style';
import { UserOutlined, CaretDownOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import ButtonInputSearch from '../ButtonInputSearch/ButtonInputSearch';

const cx = classNames.bind(styles);
function HeaderComponent() {
    return (
        <div className={cx('wrapper-header')}>
            <WrapperHeader>
                <Col span={5}>
                    <WrapperTextHeader>The Classics</WrapperTextHeader>
                </Col>
                <Col span={13}>
                    <ButtonInputSearch
                        size="large"
                        bordered={false}
                        textButton="Search"
                        placeholder="Enter the clothes you are looking for"
                        // onSearch={onSearch}
                    />
                </Col>
                <Col span={6} style={{ display: 'flex', gap: '54px', alignItems: 'center' }}>
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
