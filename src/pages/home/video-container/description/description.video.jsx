import React from "react";
import Detail from "./detail/detail.description";
import styled from "styled-components";
import { Flex } from "../../../../components/shared/shared.styled";

const Root = styled(Flex)`
  flex-basis: 50%;

  > h4 {
    font-size: 2.2rem;
    color: var(--blue);
    margin: 0.5rem 0;
  }

  > span {
    color: var(--gray);
  }

  @media (min-width: 600px) {
    margin-left: 2rem;
  }
`;

const Description = () => {
  return (
    <Root direction="column">
      <h4>La vie simplifiée</h4>
      <span>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Perferendis
        labore excepturi maxime rerum pariatur tempore nisi magni quidem cum?
        Sequi.
      </span>
      <Detail />
      <Detail />
      <Detail />
    </Root>
  );
};

export default Description;
