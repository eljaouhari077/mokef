import React from "react";
import styled from "styled-components";

const Root = styled.div`
  padding: 1rem;
  background-color: #fafafa;
  margin: 1rem;
  max-width: 35rem;
  border-radius: 0.4rem;

  > p {
    margin: 0;
  }
`;

const CurrentUserMsg = () => {
  return (
    <Root>
      <p>CurrentUserMsg test test etstst test test stest</p>
    </Root>
  );
};

export default CurrentUserMsg;
