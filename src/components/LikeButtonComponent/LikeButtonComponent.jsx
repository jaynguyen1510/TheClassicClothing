import React from 'react';
import { LikeButtonWrapper } from './style';

const LikeButtonComponent = ({ dataHref }) => {
    return (
        <LikeButtonWrapper>
            <div
                className="fb-like"
                data-href={dataHref}
                data-width=""
                data-layout="standard" // Đặt layout tiêu chuẩn hoặc chỉnh theo nhu cầu (standard, box_count, button_count, button)
                data-action="like" // Hành động khi nhấn (like, recommend)
                data-size="large" // Kích thước nút like (small, large)
                data-share="true" // Bật nút chia sẻ
            ></div>
        </LikeButtonWrapper>
    );
};

export default LikeButtonComponent;
