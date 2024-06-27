import React, { useState } from 'react';

import classNames from 'classnames/bind';
import styles from './SignUpPages.module.scss';

import InputForm from '~/components/InputForm/InputForm';
import ButtonComponent from '~/components/ButtonComponent/ButtonComponent';

import { EyeInvisibleFilled, EyeFilled } from '@ant-design/icons';
import { Image } from 'antd';
import Logo from '~/assets/images/TheClassic.png';
const cx = classNames.bind(styles);
const SignUpPage = ({ size = 40, backgroundColorButton = 'rgba(255,57, 69)', colorButton = '#fff' }) => {
    const [isShowPassword, setIsShowPassword] = useState(false);
    const [isShowConfPassword, setIsShowConfPassword] = useState(false);
    return (
        <div className={cx('wrapper-page')}>
            <div className={cx('wrapper-sign-page')}>
                <div className={cx('container-left')}>
                    <h1>Xin chào</h1>
                    <p>Đăng nhập hoặc tạo tài khoản</p>
                    <InputForm className={cx('input-form')} placeholder="abc@gmail.com" />

                    <div style={{ position: 'relative' }}>
                        <span
                            style={{
                                zIndex: 10,
                                position: 'absolute',
                                top: '4px',
                                right: '8px',
                            }}
                        >
                            {isShowPassword ? <EyeFilled /> : <EyeInvisibleFilled />}
                        </span>
                        <InputForm
                            className={cx('input-form')}
                            placeholder="Nhập mật khẩu"
                            type={isShowPassword ? 'text' : 'password'}
                        />
                    </div>

                    <div style={{ position: 'relative' }}>
                        <span
                            style={{
                                zIndex: 10,
                                position: 'absolute',
                                top: '4px',
                                right: '8px',
                            }}
                        >
                            {isShowConfPassword ? <EyeFilled /> : <EyeInvisibleFilled />}
                        </span>

                        <InputForm
                            className={cx('input-form')}
                            placeholder="Nhập lại mật khẩu"
                            type={isShowConfPassword ? 'text' : 'password'}
                        />
                    </div>

                    <ButtonComponent
                        bordered={undefined}
                        size={size}
                        style={{
                            height: '48px',
                            width: '100%',
                            margin: '26px 0 10px',
                            border: 'none',
                            borderRadius: '4px',
                            backgroundColor: backgroundColorButton,
                            color: colorButton,
                        }}
                        textButton={'Đăng ký tài khoản'}
                    />

                    <p>
                        Bạn đã có tài khoản
                        <span className={cx('wrapper-text-light')}>Đăng nhập</span>
                    </p>
                </div>
                <div className={cx('container-right')}>
                    <Image className={cx('logo-sign')} preview={false} src={Logo} alt="image-logo" />
                    <h4>Thỏa thức mua sắm cùng TheClassic</h4>
                </div>
            </div>
        </div>
    );
};

export default SignUpPage;
