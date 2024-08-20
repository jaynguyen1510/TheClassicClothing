import { Radio } from "antd";
import styled from "styled-components";

export const WrapperLeft = styled.div`
  width: 910px;
  margin: 20px auto;

  @media (max-width: 1200px) {
    width: 80%;
  }

  @media (max-width: 992px) {
    width: 100%;
    margin: 10px auto;
  }
`;

export const WrapperInfo = styled.div`
  padding: 20px;
  background: #fdfdfd;
  border: 1px solid #dcdcdc;
  border-radius: 10px;
  margin-bottom: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);

  @media (max-width: 768px) {
    padding: 15px;
    margin-bottom: 12px;
  }
`;

export const Label = styled.span`
  font-size: 15px;
  color: #1a1a1a;
  font-weight: 600;
  margin-bottom: 10px;
  display: block;

  @media (max-width: 768px) {
    font-size: 14px;
    margin-bottom: 8px;
  }
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

  @media (max-width: 768px) {
    padding: 12px;
    gap: 10px;
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

  @media (max-width: 1200px) {
    width: 280px;
  }

  @media (max-width: 992px) {
    width: 100%;
    margin-left: 0;
    padding: 15px;
  }
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

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    padding: 15px;
    font-size: 14px;
  }
`;
