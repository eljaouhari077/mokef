import React from "react";
import CurrentUserMsg from "./current-user-msg/current-user-msg";
import OtherUserMsg from "./other-user-msg/other-user-msg";
import { Flex } from "../../../../components/shared/shared.styled";
import { UserContext } from "../../../../contexts/user-context.js";
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

const MSGs = ({ selectedContact }) => {
  const { user } = React.useContext(UserContext);
  const chatRef = React.useRef(null);

  React.useEffect(() => {
    chatRef.current.scrollTop = chatRef.current.scrollHeight;
  }, [selectedContact]);

  return (
    <Root direction="column" ref={chatRef}>
      {selectedContact.messages.map((msg, idx) =>
        msg.userId === user.uid ? (
          <CurrentUserMsg content={msg.content} key={idx} />
        ) : (
          <OtherUserMsg content={msg.content} key={idx} />
        )
      )}
    </Root>
  );
};

export default MSGs;
