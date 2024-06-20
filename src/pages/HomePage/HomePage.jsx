import React from 'react';
import SliderComponents from '../../components/SliderComponents/SliderComponents';
import TypeProduct from '../../components/TypeProduct/TypeProduct';
import { WrapperTypeProduct } from './style';
import { allImages } from '../../assets/images/';
import NavBarComponent from '~/components/NavBarComponent/NavBarComponent';
import classNames from 'classnames/bind';
import styles from './HomePage.module.scss';
import ButtonComponent from '~/components/ButtonComponent/ButtonComponent';
import CardComponent from '~/components/CardComponent/CardComponent';

const cx = classNames.bind(styles);

const HomePage = () => {
    // console.log(allImages);

    const itemsClothings = ['Quần dài', 'Quần ngắn', 'Áo kiểu', 'Áo ba lỗ', 'Đầm', 'Khác'];
    return (
        <>
            <div style={{ padding: '0 120px' }}>
                <WrapperTypeProduct>
                    {itemsClothings.map((item) => {
                        return <TypeProduct key={item} name={item} />;
                    })}
                </WrapperTypeProduct>
            </div>
            <div className={cx('container')}>
                <SliderComponents arrImages={allImages} />
                <div className={cx('item-container')}>
                    <CardComponent />
                    <CardComponent />
                    <CardComponent />
                </div>
                <div className={cx('button-content')}>
                    <ButtonComponent
                        textButton="Xem thêm"
                        type="outline"
                        className={cx('button-border')}
                        styleTextButton={{ fontWeight: '500' }}
                    />
                </div>
                <NavBarComponent />
            </div>
        </>
    );
};

export default HomePage;
