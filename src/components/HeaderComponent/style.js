import { Row } from "antd";
import styled from "styled-components";

export const WrapperHeader = styled(Row)`
  width: 1270px;
  padding: 10px 0;
  align-items: center;
  gap: 16px;
  flex-wrap: nowrap;
  background-color: rgba(255, 182, 193, 1)
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

