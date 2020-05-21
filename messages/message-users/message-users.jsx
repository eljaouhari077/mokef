import React from "react";
import { Menu } from "antd";
import MessageUser from "./message-user/message-user";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import styled from "styled-components";

const SMenu = styled(Menu)`
  height: 100%;
  background-color: #fff;
  flex-basis: 20%;
`;

const MessageUsers = ({ areUsersVisible }) => {
  return (
    <>
      {areUsersVisible && (
        <SMenu>
          <SMenu.Item>
            <MessageUser />
          </SMenu.Item>
          <SMenu.Item>
            <MessageUser />
          </SMenu.Item>
          <SMenu.Item>
            <MessageUser />
          </SMenu.Item>
        </SMenu>
      )}
    </>
  );
};

export default MessageUsers;
