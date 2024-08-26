/* style.js */
import styled from 'styled-components';

// Container for the entire page
export const Container = styled.div`
    font-family: Arial, sans-serif;
    max-width: 1200px;
    margin: auto;
    padding: 30px;
    border: 1px solid #e0e0e0;
    border-radius: 12px;
    background: #fafafa;
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);

    @media (max-width: 768px) {
        padding: 20px;
        max-width: 100%;
    }
`;

// Header section
export const Header = styled.header`
    display: flex;
    align-items: center;
    border-bottom: 3px solid #e0e0e0;
    padding-bottom: 15px;
    margin-bottom: 30px;

    @media (max-width: 768px) {
        flex-direction: column;
        text-align: center;
    }
`;

// Title for the page
export const Title = styled.h1`
    font-size: 28px;
    color: #333;
    flex: 1;
    margin: 0;

    @media (max-width: 768px) {
        font-size: 24px;
    }
`;

// Wrapper for the order details layout
export const OrderDetailsWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    padding: 10px;
    gap: 30px; // Increased gap between sections
`;

// Section for different parts of the order
export const Section = styled.section`
    flex: 1;
    min-width: 300px;
    margin-bottom: 20px; // Increased bottom margin for better spacing
    padding: 20px; // Increased padding for more space inside
    border: 1px solid #e0e0e0;
    border-radius: 12px; // Slightly increased border-radius for rounded corners
    background: #f9f9f9;

    @media (max-width: 768px) {
        padding: 20px;
    }
`;

// SubTitle for sections
export const SubTitle = styled.h2`
    font-size: 20px;
    color: #555;
    margin-bottom: 20px; // Increased margin for better spacing

    @media (max-width: 768px) {
        font-size: 18px;
    }
`;

// Row for details within sections
export const DetailsRow = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 12px 0;
    border-bottom: 1px solid #e0e0e0;

    @media (max-width: 768px) {
        flex-direction: column;
        padding: 10px 0;
    }
`;

// Label for detail rows
export const Label = styled.span`
    font-weight: 600;
    color: #444;
`;

// Value for detail rows
export const Value = styled.span`
    color: #666;
`;

// ListItem for each order item
export const ListItem = styled.div`
    display: flex;
    align-items: center;
    padding: 15px; // Increased padding for better spacing
    border: 1px solid #ddd;
    border-radius: 12px; // Slightly increased border-radius for rounded corners
    background: #fff;
    margin-bottom: 20px; // Increased bottom margin for better spacing
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

    @media (max-width: 768px) {
        flex-direction: column;
        align-items: flex-start;
    }
`;

// Image for each item
export const ItemImage = styled.img`
    width: 120px;
    height: 120px;
    margin-right: 20px;
    object-fit: cover;
    border-radius: 10px;

    @media (max-width: 768px) {
        width: 100px;
        height: 100px;
        margin-right: 15px;
    }
`;

// Details for each item
export const ItemDetails = styled.div`
    flex: 1;
`;

// Payment details section
export const PaymentDetails = styled.div`
    padding: 10px; // Increased padding for better spacing
    border: 1px solid #ddd;
    border-radius: 12px; // Slightly increased border-radius for rounded corners
    background: #fff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

    @media (max-width: 768px) {
        padding: 15px;
    }
`;
