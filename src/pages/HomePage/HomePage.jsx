import React from 'react';

import SliderComponents from '../../components/SliderComponents/SliderComponents';
import TypeProduct from '../../components/TypeProduct/TypeProduct';
import ButtonComponent from '~/components/ButtonComponent/ButtonComponent';
import CardComponent from '~/components/CardComponent/CardComponent';
import * as ProductService from '~/Services/ProductService';

import classNames from 'classnames/bind';
import styles from './HomePage.module.scss';

import { WrapperTypeProduct } from './style';
import { allImages } from '../../assets/images/';
import { useQuery } from '@tanstack/react-query';

const cx = classNames.bind(styles);

const HomePage = () => {
    const itemsClothings = ['Quần dài', 'Quần ngắn', 'Áo kiểu', 'Áo ba lỗ', 'Đầm', 'Khác'];

    const fetchProductAll = async () => {
        const res = await ProductService.getAllProducts();
        return res;
    };

    const { isLoading, data: products } = useQuery({
        queryKey: ['products'],
        queryFn: fetchProductAll,
        retry: 3,
        retryDelay: 1000,
    });

    return (
        <>
            <div style={{ width: '1270px', margin: '0 auto' }}>
                <WrapperTypeProduct>
                    {itemsClothings.map((item) => {
                        return <TypeProduct key={item} name={item} />;
                    })}
                </WrapperTypeProduct>
            </div>
            <div className={cx('body')}>
                <div className={cx('container')}>
                    <SliderComponents arrImages={allImages} />
                    <div className={cx('item-container')}>
                        {products?.data
                            ?.sort(() => Math.random() - 0.5)
                            .map((product) => (
                                <CardComponent
                                    key={product._id}
                                    countInStock={product.countInStock}
                                    description={product.description}
                                    image={product.image}
                                    name={product.name}
                                    price={product.price}
                                    rating={product.rating}
                                    discount={product.discount}
                                    selled={product.selled}
                                    type={product.type}
                                />
                            ))}
                    </div>
                    <div className={cx('button-content')}>
                        <ButtonComponent
                            textButton="Xem thêm"
                            type="outline"
                            className={cx('button-border')}
                            styleTextButton={{ fontWeight: '500' }}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default HomePage;
