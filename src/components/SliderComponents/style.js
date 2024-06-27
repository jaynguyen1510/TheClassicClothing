import Slider from 'react-slick';
import styled from 'styled-components';

export const StyledSlider = styled(Slider)`
    & .slick-arrow.slick-prev {
        left: 5px;
        top: 50%;
        z-index: 10;
        &::before {
            font-size: 40px;
            color: #fff;
        }
    }
    & .slick-arrow.slick-next {
        right: 25px;
        top: 50%;
        z-index: 10;
        &::before {
            font-size: 40px;
            color: #fff;
        }
    }
    & .slick-dots {
        z-index: 10;
        bottom: -2px !important;
        li {
            button {
                &::before {
                    color: rgba(255, 228, 228 , 1);
                }
            }
        }
        li.active {
            button {
                &::before {
                    color: #fff;
                }
            }
        }
    }
`;
