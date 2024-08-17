import { Radio } from "antd";
import styled from "styled-components";

export const WrapperLeft = styled.div`
  width: 910px;
  margin: 20px auto;
`;

export const WrapperInfo = styled.div`
  padding: 20px;
  background: #fdfdfd;
  border: 1px solid #dcdcdc;
  border-radius: 10px;
  margin-bottom: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
`;

export const Label = styled.span`
  font-size: 15px;
  color: #1a1a1a;
  font-weight: 600;
  margin-bottom: 10px;
  display: block;
`;

export const WrapperRadio = styled(Radio.Group)`
  margin-top: 12px;
  background: #f7f9fc;
  border: 1px solid #bcd1e1;
  width: 100%;
  border-radius: 8px;
  padding: 18px;
  display: flex;
  flex-direction: column;
  gap: 14px;

  .ant-radio-wrapper {
    font-size: 14px;
    color: #333;
  }

  .ant-radio-wrapper span {
    font-weight: 600;
  }
`;

export const WrapperRight = styled.div`
  width: 320px;
  margin-left: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
  padding: 20px;
  background: #ffffff;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
`;

export const WrapperTotal = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background: #ffffff;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  font-weight: 600;
  font-size: 16px;
  color: #1a1a1a;
`;
