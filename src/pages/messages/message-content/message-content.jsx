import React from "react";
import styled from "styled-components";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  MessageOutlined,
} from "@ant-design/icons";
import { Flex } from "../../../components/shared/shared.styled";
import { Input, Button } from "antd";
import MSGs from "./msgs/msgs";
import { updateContractMessages } from "../../../utils/dao";
import { FirebaseContext } from "../../../firebase";
import { UserContext } from "../../../contexts/user-context";

const Root = styled(Flex)`
  height: 100%;
  background-color: #fff;
  flex-grow: 1;

  > div {
    width: 100%;
  }
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
  resize: none;
`;

const SButton = styled(Button)`
  margin: 1rem;
`;

const MessageContent = ({
  setAreUsersVisible,
  areUsersVisible,
  selectedContact,
}) => {
  const [message, setMessage] = React.useState("");
  const fb = React.useContext(FirebaseContext);
  const { user } = React.useContext(UserContext);

  const sendMessage = () => {
    updateContractMessages(fb, selectedContact.contractId, {
      userId: user.uid,
      content: message,
    }).then(() => setMessage(""));
  };

  return (
    <Root direction="column" align="flex-start" justify="space-between">
      {selectedContact && (
        <>
          <div>
            <MenuIcon
              as={areUsersVisible ? MenuFoldOutlined : MenuUnfoldOutlined}
              onClick={() => setAreUsersVisible(!areUsersVisible)}
            />
            <MSGs selectedContact={selectedContact} />
          </div>
          <MessageInput align="center">
            <STextArea
              rows={1}
              placeholder="Ecrivez un message..."
              onChange={(e) => setMessage(e.target.value)}
              value={message}
            />
            <SButton
              onClick={sendMessage}
              type="primary"
              shape="circle"
              disabled={!message.length}
              icon={<MessageOutlined />}
            />
          </MessageInput>
        </>
      )}
    </Root>
  );
};

export default MessageContent;
