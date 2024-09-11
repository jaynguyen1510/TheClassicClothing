// Styled-component cho wrapper chứa Like button
import styled from 'styled-components';

export const LikeButtonWrapper = styled.div`
    margin-top: 10px;

    @media (max-width: 768px) {
        margin-top: 8px;
    }

    @media (max-width: 480px) {
        margin-top: 6px;
    }
`;