import styled from "styled-components";

export const WrapperStyleHeader = styled.div`
  background: rgb(255, 255, 255);
  padding: 9px 16px;
  border-radius: 4px;
  display: flex;
  align-items: center;

  span {
    color: rgb(36, 36, 36);
    font-size: 13px;
    font-weight: 400;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    span {
      font-size: 12px;
    }
  }
`;

export const WrapperLeft = styled.div`
  width: 100%;
  max-width: 910px;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const WrapperListOrder = styled.div``;

export const WrapperItemOrder = styled.div`
  display: flex;
  align-items: center;
  padding: 9px 16px;
  background: #fff;
  margin-top: 12px;
  border: 1px solid #f5f5f5;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const WrapperPriceDiscount = styled.span`
  color: #999;
  font-size: 12px;
  text-decoration: line-through;
  margin-left: 4px;
`;

export const WrapperCounterOrder = styled.div`
  display: flex;
  align-items: center;
  width: 84px;
  border: 1px solid #ccc;
  border-radius: 4px;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const WrapperRight = styled.div`
  width: 100%;
  max-width: 320px;
  display: flex;
  flex-direction: column;
  margin-left: 20px;
  gap: 10px;
  align-items: flex-start;

  @media (max-width: 768px) {
    width: 100%;
    margin-left: 0;
  }
`;

export const WrapperInfo = styled.div`
  padding: 17px 20px;
  border-bottom: 1px solid #f5f5f5;
  background: #fff;
  border-top-right-radius: 6px;
  border-top-left-radius: 6px;
  width: 100%;

  @media (max-width: 768px) {
    padding: 10px;
  }
`;

export const WrapperTotal = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 17px 20px;
  background: #fff;
  border-bottom-right-radius: 6px;
  border-bottom-left-radius: 6px;

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 10px;
  }
`;
