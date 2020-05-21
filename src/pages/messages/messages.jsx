import React from "react";
import MessageUsers from "./message-users/message-users";
import { Flex } from "../../components/shared/shared.styled";
import styled from "styled-components";
import MessageContent from "./message-content/message-content";

const Root = styled(Flex)`
  max-width: 1050px;
  height: 85vh;
  margin: 2rem auto;
`;

const MessagesPage = () => {
  const [areUsersVisible, setAreUsersVisible] = React.useState(true);

  return (
    <Root>
      <MessageUsers areUsersVisible={areUsersVisible} />
      <MessageContent
        setAreUsersVisible={setAreUsersVisible}
        areUsersVisible={areUsersVisible}
      />
    </Root>
  );
};

export default MessagesPage;
