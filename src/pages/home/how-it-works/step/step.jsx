import React from "react";
import styled from "styled-components";
import { Flex } from "../../../../components/shared/shared.styled";

const Root = styled(Flex)`
  width: 25rem;
  text-align: center;
  margin: 1rem 0;
  > svg {
    width: 15rem;
    height: 15rem;
  }

  > h4 {
    color: var(--blue);
  }

  > span {
    color: var(--gray);
  }
`;

const Step = ({ Icon, title, description }) => {
  return (
    <Root direction="column" align="center" justify="center">
      <Icon />
      <h4>{title}</h4>
      <span>{description}</span>
    </Root>
  );
};

export default Step;
