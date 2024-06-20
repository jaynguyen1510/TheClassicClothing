import { Col, Pagination, Row } from 'antd';
import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './TypeProducts.module.scss';
import CardComponent from '~/components/CardComponent/CardComponent';
import NavBarComponent from '~/components/NavBarComponent/NavBarComponent';

const cx = classNames.bind(styles);
const TypeProductsPage = () => {
    const [current, setCurrent] = useState(3);
    const onChange = (page) => {
        setCurrent(page);
    };
    return (
        <div className={cx('wrapper-fragment')}>
            <Row className={cx('row-items')}>
                <Col span={4} className={cx('items-bar')}>
                    <NavBarComponent />
                </Col>
                <Col span={20}>
                    <Col className={cx('items-product')}>
                        <CardComponent />
                        <CardComponent />
                        <CardComponent />
                        <CardComponent />
                        <CardComponent />
                        <CardComponent />
                        <CardComponent />
                        <CardComponent />
                    </Col>
                    <Pagination current={current} onChange={onChange} total={100} className={cx('items-pagination')} />;
                </Col>
            </Row>
        </div>
    );
};

export default TypeProductsPage;
