import styled from "styled-components";

export const CardContainer = styled.div`
  width: 300px;
  height: 90vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0 auto;
`;

export const Flex = styled.div`
  display: flex;
  flex-direction: ${props => props.direction};
  justify-content: ${props => props.justify};
  align-items: ${props => props.align};
`;
