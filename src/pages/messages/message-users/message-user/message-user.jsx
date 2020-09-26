import React from "react";
import { Avatar, Tag } from "antd";
import styled from "styled-components";
import { FirebaseContext } from "../../../../firebase";

const Root = styled.div``;

const SAvatar = styled(Avatar)`
  margin-right: 1rem;
`;

const MessageUser = ({ name, avatar, isNew, contact }) => {
  const fb = React.useContext(FirebaseContext);

  const removeNew = () => {
    if (isNew) {
      fb.contractsCollection().doc(contact.contractId).update({ isNew: false });
    }
  }


  return (
    <Root onClick={removeNew}>
      <SAvatar src={avatar} />
      <span>{name}</span>
      {isNew && <Tag style={{ marginLeft: '.3rem'}} color="red">New</Tag>}
    </Root>
  );
};

export default MessageUser;
