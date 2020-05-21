import React from "react";
import styled from "styled-components";

const Root = styled.div`
  padding: 1rem;
  background-color: #fbfbfa;
  margin: 1rem;
  width: 30rem;

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
