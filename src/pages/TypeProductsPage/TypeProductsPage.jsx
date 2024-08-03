import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './TypeProducts.module.scss';

import CardComponent from '~/components/CardComponent/CardComponent';
import NavBarComponent from '~/components/NavBarComponent/NavBarComponent';
import * as ProductService from '~/Services/ProductService';

import { Col, Pagination, Row } from 'antd';
import { useLocation } from 'react-router-dom';
import { LoadingComponent } from '~/components/LoadingComponent/LoadingComponent';

const cx = classNames.bind(styles);
const TypeProductsPage = () => {
    const [current, setCurrent] = useState(3);
    const [productType, setProductType] = useState([]);
    const [loadingProduct, setLoadingProduct] = useState(false);

    const { state } = useLocation();
    const onChange = (page) => {
        setCurrent(page);
    };

    const fetchProductTypes = async (type) => {
        setLoadingProduct(true);
        const res = await ProductService.getProductsTypes(type);
        if (res?.status === 'OK') {
            setLoadingProduct(false);
            setProductType(res?.data);
        } else {
            setLoadingProduct(false);
        }
    };
    useEffect(() => {
        if (state) {
            fetchProductTypes(state);
        }
    }, [state]);

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
                                {productType?.map((data) => (
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
                                current={current}
                                onChange={onChange}
                                total={100}
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
