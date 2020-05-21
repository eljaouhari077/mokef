import React from "react";
import styled from "styled-components";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  MessageOutlined,
} from "@ant-design/icons";
import { Flex } from "../../../components/shared/shared.styled";
import { Input } from "antd";
import MSGs from "./msgs/msgs";

const Root = styled(Flex)`
  height: 100%;
  background-color: #fff;
  flex-grow: 1;
`;

const MenuIcon = styled(MenuFoldOutlined)`
  padding: 1rem;
  font-size: 2rem;
  cursor: pointer;
`;

const MessageInput = styled(Flex)`
  width: 100%;
`;

const STextArea = styled(Input.TextArea)`
  background-color: #f5f5f5;
  border: 0;
  margin: 0.5rem;
  flex: 1;
`;

const MessageIcon = styled(MessageOutlined)`
  color: var(--blue);
  font-size: 2.5rem;
  padding: 0.5rem;
`;

const MessageContent = ({ setAreUsersVisible, areUsersVisible }) => {
  return (
    <Root direction="column" align="flex-start" justify="space-between">
      <div>
        <MenuIcon
          as={areUsersVisible ? MenuFoldOutlined : MenuUnfoldOutlined}
          onClick={() => setAreUsersVisible(!areUsersVisible)}
        />
        <MSGs />
      </div>
      <MessageInput align="center">
        <STextArea rows={1} placeholder="Ecrivez un message..." />
        <MessageIcon />
      </MessageInput>
    </Root>
  );
};

export default MessageContent;
