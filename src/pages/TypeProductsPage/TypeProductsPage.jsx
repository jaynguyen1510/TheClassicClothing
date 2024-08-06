import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './TypeProducts.module.scss';

import CardComponent from '~/components/CardComponent/CardComponent';
import NavBarComponent from '~/components/NavBarComponent/NavBarComponent';
import * as ProductService from '~/Services/ProductService';

import { Col, Pagination, Row } from 'antd';
import { useLocation } from 'react-router-dom';
import { LoadingComponent } from '~/components/LoadingComponent/LoadingComponent';
import { useSelector } from 'react-redux';
import { useDebounceCustomHook } from '~/hook/useDebounceCustomHook';

const cx = classNames.bind(styles);
const TypeProductsPage = () => {
    const searchProductType = useSelector((state) => state?.product?.search);
    const searchDebounce = useDebounceCustomHook(searchProductType, 1000);
    const [productType, setProductType] = useState([]);
    const [loadingProduct, setLoadingProduct] = useState(false);
    const [paginate, setPaginate] = useState({
        page: 0,
        limit: 10,
        total: 1,
    });

    const { state } = useLocation();
    const onChange = (current, pageSize) => {
        setPaginate({ ...paginate, page: current - 1, limit: pageSize });
    };

    const fetchProductTypes = async (type, page, limit) => {
        setLoadingProduct(true);
        const res = await ProductService.getProductsTypes(type, page, limit);
        if (res?.status === 'OK') {
            setLoadingProduct(false);
            setProductType(res?.data);
            setPaginate({ ...paginate, total: res?.totalPages });
        } else {
            setLoadingProduct(false);
        }
    };
    useEffect(() => {
        if (state) {
            fetchProductTypes(state, paginate.page, paginate.limit);
        }
    }, [state, paginate.page, paginate.limit]);

    return (
        <LoadingComponent isPending={loadingProduct}>
            <div className={cx('body')}>
                <div className={cx('wrapper-fragment')}>
                    <Row className={cx('row-items')}>
                        <Col span={4} className={cx('items-bar')}>
                            <NavBarComponent />
                        </Col>
                        <Col
                            span={20}
                            style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
                        >
                            <div className={cx('items-product')}>
                                {productType
                                    ?.filter((product) => {
                                        if (searchDebounce === '') {
                                            return true; // Trả về true để giữ lại tất cả sản phẩm khi searchDebounce rỗng
                                        } else if (
                                            product?.name?.toLowerCase().includes(searchDebounce?.toLowerCase())
                                        ) {
                                            return true; // Giữ lại sản phẩm nếu tên sản phẩm chứa searchDebounce
                                        }

                                        return false; // Bỏ qua sản phẩm nếu không khớp
                                    })
                                    ?.map((data) => (
                                        <CardComponent
                                            id={data._id}
                                            key={data._id}
                                            countInStock={data.countInStock}
                                            description={data.description}
                                            image={data.image}
                                            name={data.name}
                                            price={data.price}
                                            rating={data.rating}
                                            discount={data.discount}
                                            selled={data.selled}
                                            type={data.type}
                                        />
                                    ))}
                            </div>
                            <Pagination
                                defaultCurrent={paginate.page + 1}
                                onChange={onChange}
                                total={paginate?.total}
                                // total={paginate.total}
                                className={cx('items-pagination')}
                            />
                        </Col>
                    </Row>
                </div>
            </div>
        </LoadingComponent>
    );
};

export default TypeProductsPage;
