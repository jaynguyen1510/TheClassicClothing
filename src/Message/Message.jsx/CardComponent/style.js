import { Card } from "antd";
import styled from "styled-components";

export const WrapperCardStyle = styled(Card)`
    width: 200px;
    & img {
        height:200px;
        width:200px;
    },
    position: relative;
`


export const StyleNameProduct = styled.div`
    font-weight: 400;
    font-size: 12px;
    line-height: 16px;
    color: rgb(56, 56, 61);
`;

export const WrapperReportText = styled.div`
    font-size: 11px;
    color: rgb(120, 120, 137);
    display-item: center; 
    margin: 6px 0 0px;
`;

export const WrapperPriceText = styled.div`
    font-size: 16px;
    color: rgb(255, 66, 78);
    font-weight: 500;
    margin: 8px 0;
`;

export const WrapperDiscountText = styled.span`
    font-size: 12px;
    color: rgb(255, 66, 78);
    font-weight: 500;
`;
