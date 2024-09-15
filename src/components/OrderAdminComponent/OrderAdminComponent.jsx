import React, { useEffect } from 'react';

import classNames from 'classnames/bind';
import styles from './OrderAdminComponent.module.scss';

import TableComponent from '../TableComponent/TableComponent';
import InputComponent from '../InputComponent/InputComponent';

import * as OrderService from '~/Services/OrderService';

import { Button, Space } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { convertIsPaid, convertPrice } from '../../ultils';
import { useSelector } from 'react-redux';
import { useQuery } from '@tanstack/react-query';
import { orderConstant } from '~/constant';
import PieChartComponent from '../PieChartComponent/PieChartComponent';

const cx = classNames.bind(styles);
const OrderAdmin = () => {
    const user = useSelector((state) => state?.user);

    const getAllOrder = async () => {
        const res = await OrderService.getAllOrder(user?.access_token);
        return res;
    };

    const queryOrder = useQuery({
        queryKey: ['order'],
        queryFn: getAllOrder,
    });

    const { isPending: isPendingOrderService, data: dataOrder } = queryOrder;

    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
            <div
                style={{
                    padding: 8,
                }}
                onKeyDown={(e) => e.stopPropagation()}
            >
                <InputComponent
                    // ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    // onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{
                        marginBottom: 8,
                        display: 'block',
                    }}
                />
                <Space>
                    <Button
                        type="primary"
                        // onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Search
                    </Button>
                    <Button
                        // onClick={() => clearFilters && handleReset(clearFilters)}
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
                // setTimeout(() => searchInput.current?.select(), 100);
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
            dataIndex: 'userName',
            sorter: (a, b) => a.userName.length - b.userName.length,
            ...getColumnSearchProps('userName'),
        },
        {
            title: 'Số điện thoại',
            dataIndex: 'phone',
            sorter: (a, b) => a.phone.length - b.phone.length,
            ...getColumnSearchProps('phone'),
        },
        {
            title: 'Đơn hàng',
            dataIndex: 'items',
            // Hiển thị tên các sản phẩm dưới dạng chuỗi
            render: (items) => items.map((item) => item.name).join(', '),
        },
        // {
        //     title: 'Tổng giá sản phẩm',
        //     dataIndex: 'items',
        //     // Tính tổng giá sản phẩm
        //     render: (items) => {
        //         const totalPrice = items.reduce((total, item) => total + item.price, 0);
        //         return convertPrice(totalPrice); // Format lại giá tiền
        //     },
        // },
        {
            title: 'Tổng số lượng sản phẩm',
            dataIndex: 'items',
            // Tính tổng số lượng sản phẩm
            render: (items) => {
                const totalAmount = items.reduce((total, item) => total + item.amount, 0);
                return totalAmount;
            },
        },
        {
            title: 'Tổng tiền',
            dataIndex: 'totalPrice',
            sorter: (a, b) => a.totalPrice - b.totalPrice,
            render: (totalPrice) => {
                // Format tổng tiền và thêm ký hiệu VND
                return convertPrice(totalPrice);
            },
        },
        {
            title: 'Thanh toán cho đơn hàng',
            dataIndex: 'isPaid',
            sorter: (a, b) => a.isPaid - b.isPaid,
            render: (isPaid) => {
                return convertIsPaid(isPaid);
            },
        },
        {
            title: 'Hình thức thanh toán',
            dataIndex: 'paymentMethod',
            sorter: (a, b) => a.paymentMethod.localeCompare(b.paymentMethod), // Sử dụng localeCompare để sắp xếp chuỗi
            render: (paymentMethod) => {
                return orderConstant.payment[paymentMethod] || 'Phương thức không xác định';
            },
        },
        {
            title: 'Loại vận chuyển',
            dataIndex: 'deliveryMethod',
            sorter: (a, b) => a.deliveryMethod.localeCompare(b.deliveryMethod), // Sử dụng localeCompare để sắp xếp chuỗi
            render: (deliveryMethod) => {
                return orderConstant.delivery[deliveryMethod] || 'Phương thức không xác định';
            },
        },
        {
            title: 'Thành Phố',
            dataIndex: 'city',
            sorter: (a, b) => a.city.length - b.city.length,
            ...getColumnSearchProps('city'),
        },
        {
            title: 'Địa chỉ',
            dataIndex: 'address',
            sorter: (a, b) => a.address.length - b.address.length,
            ...getColumnSearchProps('address'),
        },
    ];

    // Tạo data cho bảng từ dữ liệu dataOrder
    const dataTable = dataOrder?.data?.map((order) => {
        return {
            ...order,
            key: order?._id,
            totalPrice: order?.totalPrice,
            itemsPrice: order?.itemsPrice,
            paymentMethod: order?.paymentMethod,
            deliveryMethod: order?.deliveryMethod,
            isPaid: order?.isPaid,
            userName: order?.shippingAddress?.fullName,
            phone: order?.shippingAddress?.phone,
            city: order?.shippingAddress?.city,
            address: order?.shippingAddress?.address,
            // Lặp qua orderSelected để trả về thông tin tất cả các sản phẩm
            items: order?.orderSelected?.map((item) => ({
                name: item.name,
                amount: item.amount,
            })),
        };
    });

    return (
        <div>
            <h1 className={cx('wrapper-header')}>Quản lý đơn hàng </h1>
            <div style={{ height: 200, width: 300 }}>
                <PieChartComponent data={dataOrder?.data} />
            </div>
            <div className={cx('wrapper-table')}>
                <TableComponent
                    exportFileName={'Thông tin người dùng'}
                    columns={columns}
                    isPending={isPendingOrderService}
                    data={dataTable}
                />
            </div>
        </div>
    );
};

export default OrderAdmin;
