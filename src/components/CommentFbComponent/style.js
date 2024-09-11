// Styled-component cho wrapper chứa Facebook comments
import styled from 'styled-components';
export const CommentWrapper = styled.div`
    padding: 10px 10px;
    margin: -10px -25px 0;
    width: 1220px;
    @media (max-width: 768px) {
        margin: -8px -10px 0;
    }

    @media (max-width: 480px) {
        margin: -6px -8px 0;
    }
`;