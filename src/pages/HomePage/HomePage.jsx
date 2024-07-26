import React, { useEffect, useRef, useState } from 'react';

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
import { useSelector } from 'react-redux';
import { LoadingComponent } from '~/components/LoadingComponent/LoadingComponent';
import { useDebounceCustomHook } from '~/hook/useDebounceCustomHook';

const cx = classNames.bind(styles);

const HomePage = () => {
    const searchProduct = useSelector((state) => state?.product?.search);
    const searchDebounce = useDebounceCustomHook(searchProduct, 1000);
    const refSearch = useRef();
    const itemsClothings = ['Quần dài', 'Quần ngắn', 'Áo kiểu', 'Áo ba lỗ', 'Đầm', 'Khác'];
    const [stateProduct, setStateProduct] = useState([]);
    const [loadingProduct, setLoadingProduct] = useState(false);

    const fetchProductAll = async (search) => {
        let res = [];
        if (search.length > 0 || refSearch.current) {
            res = await ProductService.getAllProducts(search);
            setStateProduct(res?.data);
        } else {
            res = await ProductService.getAllProducts();
            return res;
        }
    };

    useEffect(() => {
        if (refSearch.current) {
            setLoadingProduct(true);
            fetchProductAll(searchDebounce);
        }
        refSearch.current = true;
        setLoadingProduct(false);
    }, [searchDebounce]);

    const { isLoading, data: products } = useQuery({
        queryKey: ['products'],
        queryFn: fetchProductAll,
        retry: 3,
        retryDelay: 1000,
    });

    useEffect(() => {
        if (products?.data?.length > 0) {
            setStateProduct(products?.data);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [products]);
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
                    <LoadingComponent isPending={isLoading || loadingProduct}>
                        <div className={cx('item-container')}>
                            {stateProduct
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
                    </LoadingComponent>
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
