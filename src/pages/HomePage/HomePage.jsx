import React, { useEffect, useState } from 'react';

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
    const [loadingProduct, setLoadingProduct] = useState(false);
    const [limit, setLimit] = useState(5);
    const [buttonText, setButtonText] = useState('Xem thêm');
    const [typeProducts, setTypeProducts] = useState([]);

    const fetchProductAll = async (context) => {
        const limited = context?.queryKey && context?.queryKey[1];
        const search = (context?.queryKey && context?.queryKey[2]) || '';
        const res = await ProductService.getAllProducts(search, limited);

        return res;
    };
    const fetchAllTypeProducts = async () => {
        const res = await ProductService.getAllTypeProduct();
        if (res?.status === 'OK') {
            setTypeProducts(res?.data);
        }
    };
    useEffect(() => {
        fetchAllTypeProducts();
    }, []);

    const { isLoading, data: products } = useQuery({
        queryKey: ['products', limit, searchDebounce],
        queryFn: fetchProductAll,
        retry: 3,
        retryDelay: 1000,
        keepPreviousData: true,
    });

    const isDisabled = products?.total === products?.data?.length;
    const isDisabledTotalPages = products?.totalPages === 1;
    useEffect(() => {
        if (isDisabled || isDisabledTotalPages) {
            setButtonText('Vui lòng chờ xíu nhen');
            const timer = setTimeout(() => {
                setButtonText('Đã xem hết');
            }, 1000);
            // Clean up timer
            return () => clearTimeout(timer);
        } else {
            setButtonText('Xem thêm');
        }
    }, [isDisabled, isDisabledTotalPages]);

    return (
        <>
            <div style={{ width: '1270px', margin: '0 auto' }}>
                <WrapperTypeProduct>
                    {typeProducts?.map((item) => (
                        <TypeProduct key={item} name={item} />
                    ))}
                </WrapperTypeProduct>
            </div>
            <div className={cx('body')}>
                <div className={cx('container')}>
                    <SliderComponents arrImages={allImages} />
                    <LoadingComponent isPending={isLoading || loadingProduct}>
                        <div className={cx('item-container')}>
                            {products?.data
                                ?.sort(() => Math.random() - 0.5)
                                .map((product) => (
                                    <CardComponent
                                        id={product._id}
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
                            className={cx('button-border', { disabled: isDisabled || isDisabledTotalPages })}
                            textButton={buttonText}
                            type="outline"
                            styleTextButton={{ fontWeight: '500' }}
                            disabled={isDisabled || isDisabledTotalPages}
                            onClick={() => setLimit((prev) => prev + 5)}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default HomePage;
