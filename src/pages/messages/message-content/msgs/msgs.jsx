import React from "react";
import CurrentUserMsg from "./current-user-msg/current-user-msg";
import OtherUserMsg from "./other-user-msg/other-user-msg";
import { Flex } from "../../../../components/shared/shared.styled";
import styled from "styled-components";

const Root = styled(Flex)`
  width: 100%;
  height: 74vh;
  overflow-x: auto;

  ::-webkit-scrollbar {
    width: 10px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: #888;
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`;

const MSGs = () => {
  return (
    <Root direction="column">
      <CurrentUserMsg />
      <CurrentUserMsg />
      <CurrentUserMsg />
      <OtherUserMsg />
      <OtherUserMsg />
      <OtherUserMsg />
      <CurrentUserMsg />
      <CurrentUserMsg />
      <OtherUserMsg />
      <OtherUserMsg />
      <OtherUserMsg />
      <OtherUserMsg />
      <OtherUserMsg />
      <OtherUserMsg />
      <OtherUserMsg />
      <CurrentUserMsg />
      <CurrentUserMsg />
      <CurrentUserMsg />
      <CurrentUserMsg />
      <CurrentUserMsg />
      <CurrentUserMsg />
      <CurrentUserMsg />
      <CurrentUserMsg />
    </Root>
  );
};

export default MSGs;
