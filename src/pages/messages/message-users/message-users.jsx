import React from "react";
import { Menu } from "antd";
import MessageUser from "./message-user/message-user";
import styled from "styled-components";

const SMenu = styled(Menu)`
  height: 100%;
  background-color: #fff;
  flex-basis: 20%;
`;

const MessageUsers = ({ areUsersVisible, contacts, setSelectedContact }) => {
  return (
    <>
      {areUsersVisible && (
        <>
          {contacts ? (
            <SMenu>
              {contacts.map((contact) => (
                <SMenu.Item
                  onClick={() => setSelectedContact(contact)}
                  key={contact.email}
                >
                  <MessageUser
                    name={contact.fullName}
                    avatar={contact.avatarURL}
                    isNew={contact.isNew}
                    contact={contact}
                  />
                </SMenu.Item>
              ))}
            </SMenu>
          ) : null}
        </>
      )}
    </>
  );
};

export default MessageUsers;
