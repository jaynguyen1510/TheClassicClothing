import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './HeaderComponent.module.scss';
import * as UserService from '~/Services/UserService';

import { Badge, Col, Popover } from 'antd';
import { WrapperHeader, WrapperHeaderAccount, WrapperHeaderSmall, WrapperTextHeader } from './style';
import { UserOutlined, CaretDownOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import ButtonInputSearch from '../ButtonInputSearch/ButtonInputSearch';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { resetUser } from '~/redux/slides/userSlide';
import { LoadingComponent } from '../LoadingComponent/LoadingComponent';

const cx = classNames.bind(styles);

function HeaderComponent() {
    const naviGate = useNavigate();
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const [isPending, setIsPending] = useState(false);

    const handelNavigateLogin = () => {
        naviGate('/sign-in');
    };
    const handleProfileUser = () => {
        naviGate('/profile-user');
    };

    const handleLogOut = async () => {
        setIsPending(true);
        localStorage.removeItem('access_token');
        await UserService.logOutUser();
        dispatch(resetUser());
        setIsPending(false);
    };

    const content = (
        <div>
            <p className={cx('wrapper-content-popup')} onClick={handleLogOut}>
                Đăng xuất
            </p>
            <p className={cx('wrapper-content-popup')} onClick={handleProfileUser}>
                Thông tin người dùng
            </p>
        </div>
    );

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
                    <LoadingComponent isPending={isPending}>
                        <WrapperHeaderAccount>
                            {user ? (
                                <img className={cx('avatar')} src={user?.avatar} alt="avatar" />
                            ) : (
                                <UserOutlined style={{ fontSize: '30px' }} />
                            )}
                            {user?.access_token ? (
                                <>
                                    <Popover content={content} trigger="click">
                                        <div style={{ cursor: 'pointer' }}>{user?.name || user?.email || 'User'}</div>
                                    </Popover>
                                </>
                            ) : (
                                <div onClick={handelNavigateLogin} style={{ cursor: 'pointer' }}>
                                    <WrapperHeaderSmall>Login/register</WrapperHeaderSmall>
                                    <div>
                                        <WrapperHeaderSmall>Account</WrapperHeaderSmall>
                                        <CaretDownOutlined />
                                    </div>
                                </div>
                            )}
                        </WrapperHeaderAccount>
                    </LoadingComponent>
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
