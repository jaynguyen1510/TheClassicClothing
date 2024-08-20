import styled from 'styled-components';
import { InputNumber } from 'antd';

// Container for the whole page
export const WrapperContainer = styled.div`
  max-width: 1270px;
  margin: 0 auto;
  padding: 20px;
  background: #f5f5fa;
`;

// Container for the order information
export const WrapperInfo = styled.div`
  padding: 20px;
  background: #ffffff;
  border: 1px solid #dcdcdc;
  border-radius: 8px;
  margin-bottom: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

// Container for items info with table style
export const WrapperItemsInfo = styled.div`
  margin-top: 16px;
  border: 1px solid #dcdcdc;
  border-radius: 8px;
  background: #ffffff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

// Table header style
export const TableHeader = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr 1fr 1fr;
  padding: 10px;
  background: #f5f5f5;
  font-weight: bold;
  border-bottom: 1px solid #dcdcdc;
  text-align: left;
`;

// Table row style
export const TableRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr 1fr 1fr;
  padding: 10px;
  border-bottom: 1px solid #dcdcdc;
  align-items: center;
`;

// Table cell style
export const TableCell = styled.div`
  display: flex;
  align-items: center;
  overflow: hidden;
`;

// Styled component for values inside information blocks
export const WrapperValue = styled.div`
  background: rgba(244, 186, 186, 0.5);
  border: 1px solid rgba(244, 186, 186, 1);
  font-size: 15px;
  padding: 10px;
  border-radius: 6px;
  margin-top: 4px;
  color: #333;
`;

// Label for section titles
export const Label = styled.span`
  font-size: 16px;
  color: #333;
  font-weight: 600;
  margin-bottom: 8px;
  display: block;
`;

// Container for items and delivery info
export const WrapperContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
  }
`;

// Container for the order table
export const OrderTableWrapper = styled.div`
  flex: 2;
  margin-right: 16px;
`;

// Container for delivery info
export const DeliveryInfoWrapper = styled.div`
  flex: 1;
`;

// Styled component for the total price section
export const TotalPriceWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px;
  background: #ffffff;
  border: 1px solid #dcdcdc;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  font-weight: bold;
  font-size: 18px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

// Counter for orders
export const WrapperCounterOrder = styled.div`
  display: flex;
  align-items: center;
  width: 84px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

// Styled input number
export const WrapperInputNumber = styled(InputNumber)`
  &.ant-input-number-sm {
    width: 60px;
    border-top: none;
    border-bottom: none;
  }
  .ant-input-number-handler-wrap {
    display: none;
  }
`;
