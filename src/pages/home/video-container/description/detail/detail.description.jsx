import React from "react";
import { CheckCircleFilled } from "@ant-design/icons";
import styled from "styled-components";
import { Flex } from "../../../../../components/shared/shared.styled";

const Root = styled(Flex)`
  margin: 1rem 0;
  margin-left: 3rem;
  > span {
    margin-right: 1rem;
    > svg {
      fill: var(--blue);
      font-size: 4rem;
    }
  }

  > div {
    > h4 {
      color: var(--blue);
      margin: 0;
    }

    > span {
      color: var(--gray);
      font-size: 1.4rem;
    }
  }
`;

const Detail = () => {
  return (
    <Root align="center">
      <CheckCircleFilled />
      <div>
        <h4>Lorem ipsum dolor sit.</h4>
        <span>Lorem ipsum dolor sit amet, consectetur Lorem.</span>
      </div>
    </Root>
  );
};

export default Detail;
