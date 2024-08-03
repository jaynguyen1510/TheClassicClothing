import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ProductDetailComponent from '~/components/ProductDetailComponent/ProductDetailComponent';

const ProductsPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    return (
        <div style={{ height: '100vh', width: '100%', background: '#efefef' }}>
            <div style={{ width: '1270px', height: '100%', margin: '0 auto' }}>
                <h5>
                    <span style={{ cursor: 'pointer', fontWeight: 'bold' }} onClick={() => navigate('/order')}></span>
                </h5>
                <ProductDetailComponent idProduct={id} />
            </div>
        </div>
    );
};

export default ProductsPage;
