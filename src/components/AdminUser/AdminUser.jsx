import React, { useEffect, useRef, useState } from 'react';

import classNames from 'classnames/bind';
import styles from './AdminUser.module.scss';

import TableComponent from '../TableComponent/TableComponent';
import ModalComponent from '../ModalComponent/ModalComponent';
import DrawerComponent from '../DrawerComponent/DrawerComponent';
import InputComponent from '../InputComponent/InputComponent';

import * as UserService from '~/Services/UserService';
import * as message from '~/components/Message/Message';

import { Button, Form, Space } from 'antd';
import { PlusOutlined, DeleteOutlined, EditOutlined, SearchOutlined } from '@ant-design/icons';
import { LoadingComponent } from '../LoadingComponent/LoadingComponent';
import { WrapperUploadFile } from './style';
import { getBase64 } from '~/ultils';
import { useSelector } from 'react-redux';
import { useQuery } from '@tanstack/react-query';
import { useMutationCustomHook } from '~/hook/useMutationCustomHook';

const cx = classNames.bind(styles);
const AdminUser = () => {
    const formItems = [
        { label: 'Tên sản phẩm', name: 'name', message: 'Vui lòng nhập tên sản phẩm' },
        { label: 'Địa chỉ Email', name: 'email', message: 'Vui lòng nhập email' },
        { label: 'Số điện thoại', name: 'phone', message: 'Vui lòng nhập phone' },
    ];

    const [isOpenModelDeleted, setIsOpenModelDeleted] = useState(false);
    const [isOpenDrawer, setIsOpenDrawer] = useState(false);
    const [rowSelected, setRowSelected] = useState('');
    const [isPendingUpdate, setIsPendingUpdate] = useState(false);

    const searchInput = useRef(null);

    const getAllUsers = async () => {
        const res = await UserService.getAllUser();
        return res;
    };
    const user = useSelector((state) => state?.user);

    const queryUser = useQuery({
        queryKey: ['users'],
        queryFn: getAllUsers,
    });
    const { isPending: isPendingUsers, data: users } = queryUser;
    const [sateUsers, setSateUser] = useState({
        name: '',
        email: '',
        phone: '',
        isAdmin: false,
    });

    const [sateDetailsUsers, setSateDetailsUsers] = useState({
        name: '',
        email: '',
        phone: '',
        isAdmin: false,
    });

    const [form] = Form.useForm();

    const mutationUpdate = useMutationCustomHook(async (data) => {
        const { id, token, ...rests } = data;
        const res = await UserService.updateUser(id, { ...rests }, token);
        return res;
    });

    const mutationDeleted = useMutationCustomHook((data) => {
        const { id, token } = data;
        const res = UserService.deleteUser(id, token);
        return res;
    });

    const getDetailsUser = async (rowSelected) => {
        const res = await UserService.getDetailsUser(rowSelected);
        if (res?.data) {
            setSateDetailsUsers({
                name: res?.data?.name,
                email: res?.data?.email,
                phone: res?.data?.phone,
                isAdmin: res?.data?.isAdmin,
            });
        }
        setIsPendingUpdate(false);
    };

    useEffect(() => {
        form.setFieldsValue(sateDetailsUsers);
    }, [form, sateDetailsUsers]);

    useEffect(() => {
        if (rowSelected) {
            setIsPendingUpdate(true);

            getDetailsUser(rowSelected);
        }
    }, [rowSelected]);

    const handleDetailsProducts = () => {
        setIsOpenDrawer(true);
    };

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
            title: 'Tên người dùng',
            dataIndex: 'name',
            sorter: (a, b) => a.name.length - b.name.length,
            ...getColumnSearchProps('name'),
        },
        {
            title: 'Địa chỉ Email',
            dataIndex: 'email',
            sorter: (a, b) => a.email.length - b.email.length,
            ...getColumnSearchProps('email'),
        },
        {
            title: 'Admin',
            dataIndex: 'isAdmin',
            filters: [
                {
                    text: 'True',
                    value: true,
                },
                {
                    text: 'False',
                    value: false,
                },
            ],
        },
        {
            title: 'Số điện thoại',
            dataIndex: 'phone',
            sorter: (a, b) => a.phone.length - b.phone.length,
            ...getColumnSearchProps('phone'),
        },
        {
            title: 'Action',
            key: 'action',
            render: renderAction,
        },
    ];
    const dataTable = users?.data?.map((user) => ({
        ...user,
        key: user._id,
        isAdmin: user.isAdmin ? 'TRUE' : 'FALSE',
    }));

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

    const handleCancelDeleted = () => {
        setIsOpenModelDeleted(false);
    };
    const handleDeletedUser = () => {
        console.log('Deleting:', rowSelected);
        mutationDeleted.mutate(
            { id: rowSelected, token: user?.access_token },
            {
                onSettled: () => {
                    queryUser.refetch();
                },
            },
        );
    };

    const handleCloseDrawer = () => {
        setIsOpenDrawer(false);
        setSateDetailsUsers({
            name: '',
            email: '',
            phone: '',
            isAdmin: false,
        });
        form.resetFields();
    };

    const onUpdateUser = () => {
        mutationUpdate.mutate(
            { id: rowSelected, token: user?.access_token, ...sateDetailsUsers },
            {
                onSettled: () => {
                    queryUser.refetch();
                },
            },
        );
    };

    const handleOnChangeDetailsUser = (e, name) => {
        setSateDetailsUsers({ ...sateDetailsUsers, [name]: e.target.value });
    };

    const handleImageUser = async ({ fileList }) => {
        const file = fileList[0];
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setSateUser({
            ...sateUsers,
            image: file.preview,
        });
    };

    const handleImageDetails = async ({ fileList }) => {
        const file = fileList[0];
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setSateDetailsUsers({
            ...sateDetailsUsers,
            image: file.preview,
        });
    };

    return (
        <div>
            <h1 className={cx('wrapper-header')}>Quản lý thông tin người dùng </h1>
            <div className={cx('wrapper-table')}>
                <TableComponent
                    columns={columns}
                    isPending={isPendingUsers}
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

            <DrawerComponent
                title="Chi tiết người dùng"
                isOpen={isOpenDrawer}
                onCancel={handleCloseDrawer}
                onClose={() => setIsOpenDrawer(false)}
                width="80%"
            >
                <LoadingComponent isPending={isPendingUpdate || isPendingUpdated}>
                    <Form
                        name="EditUserForm"
                        labelCol={{ span: 3 }}
                        wrapperCol={{ span: 22 }}
                        onFinish={onUpdateUser}
                        autoComplete="on"
                        form={form}
                    >
                        {formItems.map(({ label, name, message }) => (
                            <Form.Item key={name} label={label} name={name} rules={[{ required: true, message }]}>
                                <InputComponent
                                    value={sateDetailsUsers[name]}
                                    onChange={(e) => handleOnChangeDetailsUser(e, name)}
                                />
                            </Form.Item>
                        ))}
                        {/* <Form.Item
                            label="Hình ảnh"
                            name="image"
                            rules={[{ required: true, message: 'Vui lòng chọn ảnh' }]}
                        >
                            <WrapperUploadFile onChange={handleImageDetails} maxCount={'1'}>
                                <Button>Select file</Button>
                                {sateDetailsUsers?.image && (
                                    <img className={cx('sate-users')} src={sateDetailsUsers?.image} alt="avatar" />
                                )}
                            </WrapperUploadFile>
                        </Form.Item> */}
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
                title="Xóa người dùng"
                open={isOpenModelDeleted}
                className={cx('modal-product')}
                onCancel={handleCancelDeleted}
                onOk={handleDeletedUser}
            >
                <LoadingComponent isPending={isPendingDeleted}>
                    <div>Do you want delete this users ???</div>
                </LoadingComponent>
            </ModalComponent>
        </div>
    );
};

export default AdminUser;
