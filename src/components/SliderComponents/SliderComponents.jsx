import React from 'react';

import { Image } from 'antd';
import { StyledSlider } from './style';

function SliderComponents({ arrImages, width = '100%', height = '550px' }) {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
    };

    return (
        <StyledSlider {...settings}>
            {arrImages.map((image, index) => (
                <Image key={index} src={image} alt={`slide ${index}`} preview={false} width={width} height={height} />
            ))}
        </StyledSlider>
    );
}

export default SliderComponents;
