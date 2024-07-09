import React, { useEffect, useState } from 'react';

import classNames from 'classnames/bind';
import styles from './AdminProduct.module.scss';

import TableComponent from '../TableComponent/TableComponent';
import InputComponent from '../InputComponent/InputComponent';
import * as ProductService from '~/Services/ProductService';
import * as message from '~/components/Message/Message';

import { Button, Form, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { getBase64 } from '~/ultils';
import { WrapperUploadFile } from './style';
import { useMutationCustomHook } from '~/hook/useMutationCustomHook';
import { LoadingComponent } from '../LoadingComponent/LoadingComponent';

const cx = classNames.bind(styles);

const AdminProduct = () => {
    const formItems = [
        { label: 'Tên sản phẩm', name: 'name', message: 'Vui lòng nhập tên sản phẩm' },
        { label: 'Type', name: 'type', message: 'Vui lòng nhập type' },
        { label: 'Price', name: 'price', message: 'Vui lòng nhập price' },
        { label: 'rating', name: 'rating', message: 'Vui lòng nhập rating' },
        { label: 'CountInStock', name: 'countInStock', message: 'Vui lòng nhập countInStock' },
        { label: 'Description', name: 'description', message: 'Vui lòng nhập description' },
    ];

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [sateProducts, setSateProducts] = useState({
        name: '',
        type: '',
        price: '',
        image: '',
        rating: '',
        description: '',
        countInStock: '',
    });

    const mutation = useMutationCustomHook((data) => {
        const { name, type, price, description, image, countInStock, rating } = data;
        const res = ProductService.createProducts({ name, rating, type, countInStock, price, description, image });
        return res;
    });

    const { data, isPending, isSuccess, isError } = mutation;

    useEffect(() => {
        if (isSuccess && data?.status === 'OK') {
            message.success();
            handleCancel();
        } else if (isError) {
            message.error();
        }
    }, [isSuccess]);

    const handleCancel = () => {
        setIsModalOpen(false);
        setSateProducts({
            name: '',
            type: '',
            price: '',
            image: '',
            rating: '',
            description: '',
            countInStock: '',
        });
    };

    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOnFinish = () => {
        mutation.mutate(sateProducts);
    };
    const handleOnChange = (e, name) => {
        setSateProducts({ ...sateProducts, [name]: e.target.value });
    };

    const handleImage = async ({ fileList }) => {
        const file = fileList[0];
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setSateProducts({
            ...sateProducts,
            image: file.preview,
        });
    };

    return (
        <div>
            <h1 className={cx('wrapper-header')}>Quản lý thông tin đơn hàng</h1>
            <div className={cx('wrapper-content')}>
                <Button className={cx('wrapper-button')} onClick={showModal}>
                    <PlusOutlined className={cx('wrapper-icon')} />
                </Button>
                <div className={cx('wrapper-table')}>
                    <TableComponent />
                </div>
                <Modal
                    title="Thêm sản phẩm mới"
                    open={isModalOpen}
                    className={cx('modal-product')}
                    onCancel={handleCancel}
                >
                    <LoadingComponent isPending={isPending}>
                        <Form
                            name="AddProduct"
                            labelCol={{ span: 8 }}
                            wrapperCol={{ span: 16 }}
                            style={{ maxWidth: 600 }}
                            onFinish={handleOnFinish}
                            autoComplete="off"
                        >
                            {formItems.map(({ label, name, message }) => (
                                <Form.Item key={name} label={label} name={name} rules={[{ required: true, message }]}>
                                    <InputComponent
                                        value={sateProducts[name]}
                                        onChange={(e) => handleOnChange(e, name)}
                                    />
                                </Form.Item>
                            ))}
                            <Form.Item
                                label="Hình ảnh"
                                name="image"
                                rules={[{ required: true, message: 'Vui lòng chọn ảnh sản phẩm' }]}
                            >
                                <WrapperUploadFile onChange={handleImage} maxCount={'1'}>
                                    <Button>Select file</Button>
                                    {sateProducts?.image && (
                                        <img className={cx('sate-products')} src={sateProducts?.image} alt="avatar" />
                                    )}
                                </WrapperUploadFile>
                            </Form.Item>
                            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                                <Button type="primary" htmlType="submit">
                                    Submit
                                </Button>
                            </Form.Item>
                            ;
                        </Form>
                    </LoadingComponent>
                </Modal>
            </div>
        </div>
    );
};

export default AdminProduct;
