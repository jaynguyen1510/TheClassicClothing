import React from 'react';
import SliderComponents from '../../components/SliderComponents/SliderComponents';
import TypeProduct from '../../components/TypeProduct/TypeProduct';
import { WrapperTypeProduct } from './style';
import { allImages } from '../../assets/images/';
import CartComponent from '../../components/CartComponent/CartComponent';
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
            <div
                id="container"
                style={{ backgroundColor: 'rgba(244, 186, 186, 0.5)', padding: '0 120px', height: '1000px' }}
            >
                <SliderComponents arrImages={allImages} />
                <div style={{ marginTop: '20px', display: 'flex', alignItems: 'center', gap: '20px' }}>
                    <CartComponent />
                </div>
            </div>
        </>
    );
};

export default HomePage;
