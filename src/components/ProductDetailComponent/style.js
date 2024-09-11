import { InputNumber } from "antd";
import styled from "styled-components";

export const WrapperInputNumber = styled(InputNumber)`
    &.ant-input-number-sm {
        width: 60px;
        border-top: none;
        border-bottom: none;
    }
    .ant-input-number-handler-wrap {
        display: none;
    }

    @media (max-width: 768px) {
        &.ant-input-number-sm {
            width: 50px; /* Hoặc giá trị khác phù hợp với màn hình nhỏ hơn */
        }
    }

    @media (max-width: 480px) {
        &.ant-input-number-sm {
            width: 40px; /* Hoặc giá trị khác phù hợp với màn hình rất nhỏ */
        }
    }
`;
export const ButtonWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px;

    @media (max-width: 768px) {
        flex-direction: column;
        gap: 8px;
    }
`;