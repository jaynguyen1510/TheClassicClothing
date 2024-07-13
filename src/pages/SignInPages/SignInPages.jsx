import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './SignInPages.module.scss';
import * as UserService from '~/Services/UserService';

import InputForm from '~/components/InputForm/InputForm';
import ButtonComponent from '~/components/ButtonComponent/ButtonComponent';
import Logo from '~/assets/images/TheClassic.png';

import { jwtDecode } from 'jwt-decode';
import { routes } from '~/routes/index';
import { Image } from 'antd';
import { EyeInvisibleFilled, EyeFilled } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useMutationCustomHook } from '~/hook/useMutationCustomHook';
import { LoadingComponent } from '~/components/LoadingComponent/LoadingComponent';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '~/redux/slides/userSlide';

const cx = classNames.bind(styles);
const SignInPages = ({ size = 40, backgroundColorButton = 'rgba(255,57, 69)', colorButton = '#fff' }) => {
    const [isShowPassword, setIsShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);

    const mutation = useMutationCustomHook((data) => UserService.loginUser(data));
    const { data, isPending, isSuccess } = mutation;

    const naviGate = useNavigate();

    useEffect(() => {
        if (isSuccess && data?.access_token) {
            naviGate(routes[0].path);
            localStorage.setItem('access_token', JSON.stringify(data?.access_token));
            if (data?.access_token) {
                const decoded = jwtDecode(data?.access_token);
                if (decoded?.id) {
                    handelGetDetailsUser(decoded?.id, data?.access_token);
                }
            }
        }
    }, [isSuccess, user]);

    const handelGetDetailsUser = async (id, token) => {
        const res = await UserService.getDetailsUser(id, token);
        dispatch(updateUser({ ...res?.data, access_token: token }));
    };

    const handleOnChangeEmail = (e) => {
        setEmail(e.target.value);
    };

    const handleOnChangePassword = (e) => {
        setPassword(e.target.value);
    };

    const handelNavigateRegister = () => {
        naviGate('/sign-up');
    };
    const handleHomePage = () => {
        naviGate('/');
    };
    const handleSignIn = () => {
        try {
            mutation.mutate({ email, password });
        } catch (error) {
            console.error('An error occurred while signing in:', error);
            // Handle the error here, such as displaying an error message
        }
    };

    return (
        <div className={cx('wrapper-page')}>
            <div className={cx('wrapper-sign-page')}>
                <div className={cx('container-left')}>
                    <h1>Đăng nhập</h1>
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
                    {data?.status === 'ERR' && <span style={{ color: 'red' }}>{data?.message}</span>}
                    <LoadingComponent isPending={isPending}>
                        <ButtonComponent
                            bordered={undefined}
                            onClick={handleSignIn}
                            disabled={!email.length || !password.length}
                            size={size}
                            style={{
                                height: '48px',
                                width: '100%',
                                margin: '26px 0 10px',
                                border: 'none',
                                borderRadius: '4px',
                                backgroundColor: !email.length || !password.length ? '#ccc' : backgroundColorButton,
                                color: colorButton,
                            }}
                            textButton={'Đăng nhập'}
                        />
                    </LoadingComponent>
                    <p>
                        <span className={cx('wrapper-text-light')}>Quên mặt khẩu</span>{' '}
                    </p>
                    <p>
                        Chưa có tài khoản
                        <span className={cx('wrapper-text-light')} onClick={handelNavigateRegister}>
                            Tạo tài khoản
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

export default SignInPages;
