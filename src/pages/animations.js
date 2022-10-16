import styled, { keyframes } from "styled-components";

const creation = keyframes`
  from {
    transform : scale(1.2);
    border-radius : 50%;
  }
  to {
    transform : scale(1.0);
    border-radius : 0%;
  }
`;

const StyledCell = styled.div`

`;

const SwappedCell = styled.div`
  animation: ${creation} 0.33s forwards;
  background-size: cover;
  user-select:none;
`;


export { StyledCell, SwappedCell };