import styled from "styled-components";

export const WrapperHeaderUser = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 20px;
  padding: 10px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  border: 1px solid #f5f5f5;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

export const WrapperInfoUser = styled.div`
  .name-info {
    font-size: 16px;
    color: #ee4d2d; /* Màu đỏ đặc trưng của Shopee */
    font-weight: 700;
    text-transform: capitalize;
    margin-bottom: 5px;
  }

  .address, .phone-info, .delivery-info, .delivery-fee, .payment-info {
    color: rgba(0, 0, 0, 0.65);
    font-size: 14px;
    margin-top: 4px;
    line-height: 1.4;
  }

  .name-delivery {
    color: #ee4d2d;
    font-weight: 700;
    text-transform: capitalize;
    font-size: 14px;
  }

  .status-payment {
    margin-top: 6px;
    color: #ee4d2d;
    font-size: 14px;
  }
`;

export const WrapperLabel = styled.div`
  color: #333;
  font-size: 14px;
  text-transform: capitalize;
  margin-bottom: 10px;
  font-weight: 700;
`;

export const WrapperContentInfo = styled.div`
  cursor: pointer ;
  height: auto;
  width: 100%;
  max-width: 360px;
  background-color: #fff;
  border-radius: 8px;
  padding: 15px;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.1);
  border: 1px solid #f5f5f5;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  }

  @media (max-width: 768px) {
    max-width: 100%;
    padding: 10px;
  }
`;

export const WrapperStyleContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-top: 20px;
  background-color: #fff;
  border-radius: 8px;
  padding: 15px;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.1);
  border: 1px solid #f5f5f5;

  @media (max-width: 768px) {
    gap: 10px;
    margin-top: 15px;
  }
`;

export const TableHeader = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  font-weight: 700;
  color: #333;
  padding-bottom: 10px;
  border-bottom: 2px solid #f5f5f5;
  margin-bottom: 10px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    grid-gap: 10px;
    font-size: 13px;
    text-align: center;
  }
`;

export const TableRow = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #f5f5f5;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    grid-gap: 10px;
  }
`;

export const TableCell = styled.div`
  font-size: 14px;
  color: #333;
  text-align: right;

  &:first-child {
    text-align: left;
  }

  @media (max-width: 768px) {
    font-size: 13px;
    text-align: center;

    &:first-child {
      text-align: left;
    }
  }
`;

export const WrapperAllPrice = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  margin-top: 20px;
  padding-top: 10px;
  border-top: 1px solid #f5f5f5;
  font-size: 14px;
  color: #333;
  font-weight: 600;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    font-size: 13px;
  }
`;
