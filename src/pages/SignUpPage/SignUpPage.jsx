import React, { useEffect, useState } from 'react';

import classNames from 'classnames/bind';
import styles from './SignUpPages.module.scss';

import InputForm from '~/components/InputForm/InputForm';
import ButtonComponent from '~/components/ButtonComponent/ButtonComponent';
import Logo from '~/assets/images/TheClassic.png';
import * as UserService from '~/Services/UserService';
import * as Message from '~/components/Message/Message';

import { EyeInvisibleFilled, EyeFilled } from '@ant-design/icons';
import { Image } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useMutationCustomHook } from '~/hook/useMutationCustomHook';
import { LoadingComponent } from '~/components/LoadingComponent/LoadingComponent';

const cx = classNames.bind(styles);

const SignUpPage = ({ size = 40, backgroundColorButton = 'rgba(255,57, 69)', colorButton = '#fff' }) => {
    const [isShowPassword, setIsShowPassword] = useState(false);
    const [isShowConfPassword, setIsShowConfPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfPassword] = useState('');

    const mutation = useMutationCustomHook((data) => UserService.signUpUser(data));
    const { data, isPending } = mutation;

    const naviGate = useNavigate();
    useEffect(() => {
        if (data?.status === 'OK') {
            Message.success();
            handelNavigateLogin();
        } else if (data?.status === 'ERR') {
            Message.error();
        }
    }, [data]);

    const handelNavigateLogin = () => {
        naviGate('/sign-in');
    };

    const handleOnChangeEmail = (e) => {
        setEmail(e.target.value);
    };

    const handleOnChangePassword = (e) => {
        setPassword(e.target.value);
    };

    const handleOnChangeConfPassword = (e) => {
        setConfPassword(e.target.value);
    };
    const handleHomePage = () => {
        naviGate('/');
    };

    const handleSignUp = () => {
        mutation.mutate({ email, password, confirmPassword });
        console.log('submit', email, password, confirmPassword);
    };
    return (
        <div className={cx('wrapper-page')}>
            <div className={cx('wrapper-sign-page')}>
                <div className={cx('container-left')}>
                    <h1>Đăng ký tài khoản</h1>
                    <InputForm
                        className={cx('input-form')}
                        placeholder="abc@gmail.com"
                        value={email}
                        onChange={handleOnChangeEmail}
                    />

                    <div style={{ position: 'relative' }}>
                        <span
                            onClick={() => setIsShowPassword(!isShowPassword)}
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
                            value={password}
                            onChange={handleOnChangePassword}
                        />
                    </div>

                    <div style={{ position: 'relative' }}>
                        <span
                            onClick={() => setIsShowConfPassword(!isShowConfPassword)}
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
                            value={confirmPassword}
                            type={isShowConfPassword ? 'text' : 'password'}
                            onChange={handleOnChangeConfPassword}
                        />
                    </div>
                    {data?.status === 'ERR' && <span style={{ color: 'red' }}>{data?.message}</span>}
                    <LoadingComponent isPending={isPending}>
                        <ButtonComponent
                            onClick={handleSignUp}
                            disabled={!email.length || !password.length || !confirmPassword.length}
                            bordered={undefined}
                            size={size}
                            style={{
                                height: '48px',
                                width: '100%',
                                margin: '26px 0 10px',
                                border: 'none',
                                borderRadius: '4px',
                                backgroundColor:
                                    !email.length || !password.length || !confirmPassword.length
                                        ? '#ccc'
                                        : backgroundColorButton,
                                color: colorButton,
                            }}
                            textButton={'Đăng ký tài khoản'}
                        />
                    </LoadingComponent>

                    <p>
                        Bạn đã có tài khoản
                        <span className={cx('wrapper-text-light')} onClick={handelNavigateLogin}>
                            Đăng nhập
                        </span>
                    </p>
                </div>
                <div className={cx('container-right')}>
                    <Image
                        className={cx('logo-sign')}
                        onClick={handleHomePage}
                        preview={false}
                        src={Logo}
                        alt="image-logo"
                    />
                    <h4 className={cx('text-logo')}>Thỏa thức mua sắm cùng TheClassic</h4>
                </div>
            </div>
        </div>
    );
};

export default SignUpPage;
