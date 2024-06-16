import { Row } from "antd";
import styled from "styled-components";

export const WrapperHeader = styled(Row)`
  padding: 10px 120px;
  background: #fdf4f3;
  align-items: center;
  gap: 16px;
  flex-wrap: nowrap;
`;

export const WrapperTextHeader = styled.span`
  margin-left: 8px;
  font-size: 24px;
  align-items: center;
  color: #000;
`;

export const WrapperHeaderAccount = styled.div`
  display: flex;
  align-items: center;
  color: #000;
  gap: 10px; 
`;
export const WrapperHeaderSmall = styled.span`
  font-size: 12px;
  color: #000;
  white-space: nowrap;
`;

