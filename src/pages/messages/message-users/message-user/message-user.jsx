import React from "react";
import { Avatar } from "antd";
import styled from "styled-components";

const Root = styled.div``;

const SAvatar = styled(Avatar)`
  margin-right: 1rem;
`;

const MessageUser = ({ name, avatar }) => {
  return (
    <Root>
      <SAvatar src={avatar} />
      <span>{name}</span>
    </Root>
  );
};

export default MessageUser;
