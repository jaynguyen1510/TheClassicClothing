import React, { useEffect, useRef, useState } from 'react';

import classNames from 'classnames/bind';
import styles from './AdminProduct.module.scss';

import TableComponent from '../TableComponent/TableComponent';
import InputComponent from '../InputComponent/InputComponent';
import DrawerComponent from '../DrawerComponent/DrawerComponent';
import ModalComponent from '../ModalComponent/ModalComponent';

import * as ProductService from '~/Services/ProductService';
import * as message from '~/components/Message/Message';

import { Button, Form, Space } from 'antd';
import { PlusOutlined, DeleteOutlined, EditOutlined, SearchOutlined } from '@ant-design/icons';
import { getBase64 } from '~/ultils';
import { WrapperUploadFile } from './style';
import { useMutationCustomHook } from '~/hook/useMutationCustomHook';
import { LoadingComponent } from '../LoadingComponent/LoadingComponent';
import { useQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux';

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
    const [isOpenModelDeleted, setIsOpenModelDeleted] = useState(false);
    const [isOpenDrawer, setIsOpenDrawer] = useState(false);
    const [rowSelected, setRowSelected] = useState('');
    const [isPendingUpdate, setIsPendingUpdate] = useState(false);

    const searchInput = useRef(null);

    const getAllProducts = async () => {
        const res = await ProductService.getAllProducts();
        return res;
    };
    const user = useSelector((state) => state?.user);

    const queryProduct = useQuery({
        queryKey: ['products'],
        queryFn: getAllProducts,
    });
    const { isPending: isPendingProduct, data: products } = queryProduct;
    const [sateProducts, setSateProducts] = useState({
        name: '',
        type: '',
        price: '',
        image: '',
        rating: '',
        description: '',
        countInStock: '',
    });

    const [sateDetailsProducts, setSateDetailsProducts] = useState({
        name: '',
        type: '',
        price: '',
        image: '',
        rating: '',
        description: '',
        countInStock: '',
    });

    const [form] = Form.useForm();

    const mutation = useMutationCustomHook(async (data) => {
        const { name, type, price, description, image, countInStock, rating } = data;
        const res = await ProductService.createProducts({
            name,
            rating,
            type,
            countInStock,
            price,
            description,
            image,
        });
        return res;
    });

    const mutationUpdate = useMutationCustomHook(async (data) => {
        const { id, token, ...rests } = data;
        const res = await ProductService.updateProduct(id, { ...rests }, token);
        return res;
    });

    const mutationDeleted = useMutationCustomHook((data) => {
        const { id, token } = data;
        const res = ProductService.deleteProduct(id, token);
        return res;
    });

    const getDetailsProduct = async (rowSelected) => {
        const res = await ProductService.getDetailsProduct(rowSelected);
        if (res?.data) {
            setSateDetailsProducts({
                name: res?.data?.name,
                type: res?.data?.type,
                price: res?.data?.price,
                image: res?.data?.image,
                rating: res?.data?.rating,
                description: res?.data?.description,
                countInStock: res?.data?.countInStock,
            });
        }
        setIsPendingUpdate(false);
    };

    useEffect(() => {
        form.setFieldsValue(sateDetailsProducts);
    }, [form, sateDetailsProducts]);

    useEffect(() => {
        if (rowSelected) {
            setIsPendingUpdate(true);

            getDetailsProduct(rowSelected);
        }
    }, [rowSelected]);

    const handleDetailsProducts = () => {
        setIsOpenDrawer(true);
    };

    const { data, isPending, isSuccess, isError } = mutation;
    const {
        data: dataUpdated,
        isPending: isPendingUpdated,
        isSuccess: isSuccessUpdated,
        isError: isErrorUpdated,
    } = mutationUpdate;
    const {
        data: dataDeleted,
        isPending: isPendingDeleted,
        isSuccess: isSuccessDeleted,
        isError: isErrorDeleted,
    } = mutationDeleted;

    const renderAction = () => {
        return (
            <div>
                <DeleteOutlined
                    style={{ color: 'red', fontSize: '25px', cursor: 'pointer' }}
                    onClick={() => setIsOpenModelDeleted(true)}
                />
                <EditOutlined
                    style={{ color: 'orange', fontSize: '25px', cursor: 'pointer' }}
                    onClick={handleDetailsProducts}
                />
            </div>
        );
    };
    const handleSearch = (selectedKeys, confirm) => {
        confirm();
    };
    const handleReset = (clearFilters) => {
        clearFilters();
    };
    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
            <div
                style={{
                    padding: 8,
                }}
                onKeyDown={(e) => e.stopPropagation()}
            >
                <InputComponent
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{
                        marginBottom: 8,
                        display: 'block',
                    }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => clearFilters && handleReset(clearFilters)}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Reset
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            close();
                        }}
                    >
                        close
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered) => (
            <SearchOutlined
                style={{
                    color: filtered ? '#1677ff' : undefined,
                }}
            />
        ),
        onFilter: (value, record) => record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownOpenChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },
        // render: (text) =>
        //     searchedColumn === dataIndex ? (
        //         <Highlighter
        //             highlightStyle={{
        //                 backgroundColor: '#ffc069',
        //                 padding: 0,
        //             }}
        //             searchWords={[searchText]}
        //             autoEscape
        //             textToHighlight={text ? text.toString() : ''}
        //         />
        //     ) : (
        //         text
        //     ),
    });

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            sorter: (a, b) => a.name.length - b.name.length,
            ...getColumnSearchProps('name'),
        },
        {
            title: 'Price',
            dataIndex: 'price',
            sorter: (a, b) => a.price - b.price,
            filters: [
                {
                    text: 'Lớn hơn hoặc bằng 50000',
                    value: '>=',
                },
                {
                    text: 'Nhỏ hơn hoặc bằng 50000',
                    value: '<=',
                },
            ],
            onFilter: (value, record) => {
                if (value === '>=') {
                    return record.price >= 50000;
                } else if (value === '<=') {
                    return record.price <= 50000;
                }
            },
        },
        {
            title: 'Rating',
            dataIndex: 'rating',
            sorter: (a, b) => a.rating - b.rating,
            filters: [
                {
                    text: 'Lớn hơn hoặc bằng 3',
                    value: '>=',
                },
                {
                    text: 'Nhỏ hơn hoặc bằng 3',
                    value: '<=',
                },
            ],
            onFilter: (value, record) => {
                if (value === '>=') {
                    return record.rating >= 3;
                } else if (value === '<=') {
                    return record.rating <= 3;
                }
            },
        },
        {
            title: 'Type',
            dataIndex: 'type',
            sorter: (a, b) => a.type - b.type,
            ...getColumnSearchProps('type'),
        },
        {
            title: 'Action',
            dataIndex: 'action',
            // eslint-disable-next-line jsx-a11y/anchor-is-valid
            render: renderAction,
        },
    ];
    const dataTable = products?.data?.map((product) => ({
        ...product,
        key: product._id,
    }));

    useEffect(() => {
        if (isSuccess && data?.status === 'OK') {
            message.success();
            handleCancel();
        } else if (isError) {
            message.error();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isSuccess, isError]);

    useEffect(() => {
        if (isSuccessDeleted && dataDeleted?.status === 'OK') {
            message.success();
            handleCancelDeleted();
        } else if (isErrorDeleted) {
            message.error();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isSuccessDeleted, isErrorDeleted]);

    useEffect(() => {
        if (isSuccessUpdated && dataUpdated?.status === 'OK') {
            message.success();
            handleCloseDrawer();
        } else if (isErrorUpdated) {
            message.error();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isSuccessUpdated, isErrorUpdated]);

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
        form.resetFields();
    };
    const handleCancelDeleted = () => {
        setIsOpenModelDeleted(false);
    };
    const handleDeletedProduct = () => {
        console.log('Deleting:', rowSelected);
        mutationDeleted.mutate(
            { id: rowSelected, token: user?.access_token },
            {
                onSettled: () => {
                    queryProduct.refetch();
                },
            },
        );
    };

    const handleCloseDrawer = () => {
        setIsOpenDrawer(false);
        setSateDetailsProducts({
            name: '',
            type: '',
            price: '',
            image: '',
            rating: '',
            description: '',
            countInStock: '',
        });
        form.resetFields();
    };

    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOnFinishProducts = () => {
        mutation.mutate(sateProducts, {
            onSettled: () => {
                queryProduct.refetch();
            },
        });
    };
    const onUpdateProducts = () => {
        mutationUpdate.mutate(
            { id: rowSelected, token: user?.access_token, ...sateDetailsProducts },
            {
                onSettled: () => {
                    queryProduct.refetch();
                },
            },
        );
    };

    const handleOnChangeProduct = (e, name) => {
        setSateProducts({ ...sateProducts, [name]: e.target.value });
    };

    const handleOnChangeDetailsProduct = (e, name) => {
        setSateDetailsProducts({ ...sateDetailsProducts, [name]: e.target.value });
    };

    const handleImageProduct = async ({ fileList }) => {
        const file = fileList[0];
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setSateProducts({
            ...sateProducts,
            image: file.preview,
        });
    };

    const handleImageDetails = async ({ fileList }) => {
        const file = fileList[0];
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setSateDetailsProducts({
            ...sateDetailsProducts,
            image: file.preview,
        });
    };

    return (
        <div>
            <h1 className={cx('wrapper-header')}>Quản lý thông tin sản phẩm</h1>
            <div className={cx('wrapper-content')}>
                <Button className={cx('wrapper-button')} onClick={showModal}>
                    <PlusOutlined className={cx('wrapper-icon')} />
                </Button>
            </div>
            <div className={cx('wrapper-table')}>
                <TableComponent
                    columns={columns}
                    isPending={isPendingProduct}
                    data={dataTable}
                    onRow={(record, rowIndex) => {
                        return {
                            onClick: (event) => {
                                setRowSelected(record._id);
                            },
                        };
                    }}
                />
            </div>
            <ModalComponent
                forceRender
                title="Thêm sản phẩm mới"
                open={isModalOpen}
                className={cx('modal-product')}
                onCancel={handleCancel}
                footer={null}
            >
                <LoadingComponent isPending={isPending}>
                    <Form
                        name="AddProduct"
                        labelCol={{ span: 6 }}
                        wrapperCol={{ span: 18 }}
                        style={{ maxWidth: 600 }}
                        onFinish={handleOnFinishProducts}
                        autoComplete="on"
                        form={form}
                    >
                        {formItems.map(({ label, name, message }) => (
                            <Form.Item key={name} label={label} name={name} rules={[{ required: true, message }]}>
                                <InputComponent
                                    value={sateProducts[name]}
                                    onChange={(e) => handleOnChangeProduct(e, name)}
                                />
                            </Form.Item>
                        ))}
                        <Form.Item
                            label="Hình ảnh"
                            name="image"
                            rules={[{ required: true, message: 'Vui lòng chọn ảnh sản phẩm' }]}
                        >
                            <WrapperUploadFile onChange={handleImageProduct} maxCount={'1'}>
                                <Button>Select file</Button>
                                {sateProducts?.image && (
                                    <img className={cx('sate-products')} src={sateProducts?.image} alt="avatar" />
                                )}
                            </WrapperUploadFile>
                        </Form.Item>
                        <Form.Item wrapperCol={{ offset: 20, span: 16 }}>
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>
                </LoadingComponent>
            </ModalComponent>
            <DrawerComponent
                title="Chi tiết sản phẩm"
                isOpen={isOpenDrawer}
                onCancel={handleCloseDrawer}
                onClose={() => setIsOpenDrawer(false)}
                width="80%"
            >
                <LoadingComponent isPending={isPendingUpdate || isPendingUpdated}>
                    <Form
                        name="EditProductsForm"
                        labelCol={{ span: 3 }}
                        wrapperCol={{ span: 22 }}
                        onFinish={onUpdateProducts}
                        autoComplete="on"
                        form={form}
                    >
                        {formItems.map(({ label, name, message }) => (
                            <Form.Item key={name} label={label} name={name} rules={[{ required: true, message }]}>
                                <InputComponent
                                    value={sateDetailsProducts[name]}
                                    onChange={(e) => handleOnChangeDetailsProduct(e, name)}
                                />
                            </Form.Item>
                        ))}
                        <Form.Item
                            label="Hình ảnh"
                            name="image"
                            rules={[{ required: true, message: 'Vui lòng chọn ảnh sản phẩm' }]}
                        >
                            <WrapperUploadFile onChange={handleImageDetails} maxCount={'1'}>
                                <Button>Select file</Button>
                                {sateDetailsProducts?.image && (
                                    <img
                                        className={cx('sate-products')}
                                        src={sateDetailsProducts?.image}
                                        alt="avatar"
                                    />
                                )}
                            </WrapperUploadFile>
                        </Form.Item>
                        <Form.Item wrapperCol={{ offset: 20, span: 16 }}>
                            <Button type="primary" htmlType="submit">
                                Update
                            </Button>
                        </Form.Item>
                    </Form>
                </LoadingComponent>
            </DrawerComponent>
            <ModalComponent
                forceRender
                title="Xóa sản phẩm"
                open={isOpenModelDeleted}
                className={cx('modal-product')}
                onCancel={handleCancelDeleted}
                onOk={handleDeletedProduct}
            >
                <LoadingComponent isPending={isPendingDeleted}>
                    <div>Do you want delete this products ???</div>
                </LoadingComponent>
            </ModalComponent>
        </div>
    );
};

export default AdminProduct;
