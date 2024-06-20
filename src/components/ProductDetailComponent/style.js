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
    
`