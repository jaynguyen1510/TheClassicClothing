import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './ProfilePage.module.scss';
import InputForm from '~/components/InputForm/InputForm';
import ButtonComponent from '~/components/ButtonComponent/ButtonComponent';
import * as UserService from '~/Services/UserService';
import * as message from '~/components/Message/Message';
import { useDispatch, useSelector } from 'react-redux';
import { useMutationCustomHook } from '~/hook/useMutationCustomHook';
import { LoadingComponent } from '~/components/LoadingComponent/LoadingComponent';
import { updateUser } from '~/redux/slides/userSlide';
import { Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { getBase64 } from '~/ultils';
import { WrapperUploadFile } from './style';

const cx = classNames.bind(styles);

const ProfilePage = () => {
    const user = useSelector((state) => state.user);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [avatar, setAvatar] = useState('');

    const dispatch = useDispatch();
    const mutation = useMutationCustomHook((data) => {
        const { id, access_token, ...rests } = data;
        return UserService.updateUser(id, rests, access_token);
    });
    const { isPending, isSuccess, isError } = mutation;

    useEffect(() => {
        setName(user?.name || '');
        setEmail(user?.email || '');
        setPhone(user?.phone || '');
        setAddress(user?.address || '');
        setAvatar(user?.avatar || '');
    }, [user]);

    useEffect(() => {
        if (isSuccess) {
            message.success('Cập nhật thành công!');
            handleGetDetailsUser(user?.id, user?.access_token);
        } else if (isError) {
            message.error('Cập nhật thất bại!');
        }
    }, [isSuccess, isError]);

    const handleGetDetailsUser = async (id, token) => {
        const res = await UserService.getDetailsUser(id, token);
        dispatch(updateUser({ ...res?.data, access_token: token }));
    };

    const handleOnChange = (setter) => (e) => setter(e.target.value);

    const handleOnChangeAvatar = async ({ fileList }) => {
        const file = fileList[0];
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setAvatar(file.preview);
    };

    const handleUpdate = () => {
        mutation.mutate({
            id: user?.id,
            name,
            email,
            phone,
            address,
            avatar,
            access_token: user?.access_token,
        });
    };

    return (
        <div className={cx('wrapper-profile')}>
            <h1 className={cx('wrapper-headers')}>Thông tin người dùng</h1>
            <LoadingComponent isPending={isPending}>
                <div className={cx('wrapper-content-profile')}>
                    <div className={cx('wrapper-input')}>
                        <label className={cx('wrapper-label')}>Tên của bạn</label>
                        <InputForm
                            className={cx('input-form')}
                            placeholder="Vui lòng nhập tên của bạn"
                            value={name}
                            onChange={handleOnChange(setName)}
                        />
                    </div>
                    <div className={cx('wrapper-input')}>
                        <label className={cx('wrapper-label')}>Địa chỉ Email</label>
                        <InputForm
                            className={cx('input-form')}
                            placeholder="Vui lòng nhập Email của bạn"
                            value={email}
                            onChange={handleOnChange(setEmail)}
                        />
                    </div>
                    <div className={cx('wrapper-input')}>
                        <label className={cx('wrapper-label')}>SĐT</label>
                        <InputForm
                            className={cx('input-form')}
                            placeholder="Vui lòng nhập số điện thoại của bạn"
                            value={phone}
                            onChange={handleOnChange(setPhone)}
                        />
                    </div>
                    <div className={cx('wrapper-input')}>
                        <label className={cx('wrapper-label')}>Địa chỉ</label>
                        <InputForm
                            className={cx('input-form')}
                            placeholder="Vui lòng nhập địa chỉ của bạn"
                            value={address}
                            onChange={handleOnChange(setAddress)}
                        />
                    </div>
                    <div className={cx('wrapper-input')}>
                        <WrapperUploadFile onChange={handleOnChangeAvatar} maxCount={'1'}>
                            <Button icon={<UploadOutlined />}></Button>
                        </WrapperUploadFile>
                        <label className={cx('wrapper-label')}>Avatar</label>
                        {avatar && <img className={cx('avatar')} src={avatar} alt="avatar" />}
                    </div>
                    <ButtonComponent
                        onClick={handleUpdate}
                        size={40}
                        style={{
                            height: '30px',
                            width: 'fit-content',
                            border: '1px solid rgba(244, 186, 186, 1)',
                            borderRadius: '4px',
                            transition: 'border-color 0.3s ease',
                        }}
                        textButton={'Cập nhật '}
                        styleTextButton={{ color: 'rgba(244, 186, 186, 1)', fontSize: '10px', fontWeight: '700' }}
                    />
                </div>
            </LoadingComponent>
        </div>
    );
};

export default ProfilePage;
