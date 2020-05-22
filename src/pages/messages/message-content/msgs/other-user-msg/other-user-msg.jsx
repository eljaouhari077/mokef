import React from "react";
import styled from "styled-components";

const Root = styled.div`
  padding: 1rem;
  background-color: #00a8ff;
  margin: 1rem;
  max-width: 35rem;
  align-self: flex-end;
  border-radius: 0.4rem;

  > p {
    margin: 0;
  }
`;

const OtherUserMsg = ({ content }) => {
  return (
    <Root>
      <p>{content}</p>
    </Root>
  );
};

export default OtherUserMsg;
