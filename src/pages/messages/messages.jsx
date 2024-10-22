import React from "react";
import lodash from "lodash";
import MessageUsers from "./message-users/message-users";
import { Flex } from "../../components/shared/shared.styled";
import styled from "styled-components";
import MessageContent from "./message-content/message-content";
import { getUserContracts, getUser } from "../../utils/dao";
import { UserContext } from "../../contexts/user-context.js";
import { FirebaseContext } from "../../firebase";
import { getStorageFile } from "../../utils/storage";

const Root = styled(Flex)`
  max-width: 1050px;
  height: 85vh;
  margin: 2rem auto;
`;

const MessagesPage = () => {
  const [areUsersVisible, setAreUsersVisible] = React.useState(true);
  const [contacts, setContacts] = React.useState(null);
  const [selectedContact, setSelectedContact] = React.useState(null);
  const { user } = React.useContext(UserContext);
  const fb = React.useContext(FirebaseContext);

  const getContacts = (type, otherType) =>
    getUserContracts(fb, user.uid, type).then((res) =>
      Promise.all(
        res.docs.map((doc) =>
          getUser(fb, doc.data()[otherType]).then((usr) => {
            if (usr.data().avatarURL) {
              return getStorageFile(fb, usr.data().avatarURL).then((img) => ({
                ...usr.data(),
                messages: doc.data().messages,
                contracts: doc.data().contracts,
                isNew: doc.data().isNew,
                avatarURL: img,
                contractId: doc.id,
                userId: usr.id,
                canAddReview: type === "clientId" ? true : false,
                didAddReview: doc.data().didAddReview,
              }));
            } else {
              return {
                ...usr.data(),
                messages: doc.data().messages,
                contracts: doc.data().contracts,
                isNew: doc.data().isNew,
                contractId: doc.id,
                userId: usr.id,
                canAddReview: type === "clientId" ? true : false,
                didAddReview: doc.data().didAddReview,
              };
            }
          })
        )
      )
    );

  React.useEffect(() => {
    fb.contractsCollection().onSnapshot(() => {
      Promise.all([
        getContacts("ownerId", "clientId"),
        getContacts("clientId", "ownerId"),
      ]).then(([owner, client]) => {
        setContacts(lodash.uniqBy([...owner, ...client], 'userId'));
      });
    });
    // eslint-disable-next-line
  }, []);

  React.useEffect(() => {
    if (selectedContact) {
      setSelectedContact(
        contacts.find((val) => val.contractId === selectedContact.contractId)
      );
    }
    // eslint-disable-next-line
  }, [contacts]);

  return (
    <Root>
      <MessageUsers
        areUsersVisible={areUsersVisible}
        setSelectedContact={setSelectedContact}
        contacts={contacts}
      />
      <MessageContent
        setAreUsersVisible={setAreUsersVisible}
        areUsersVisible={areUsersVisible}
        selectedContact={selectedContact}
      />
    </Root>
  );
};

export default MessagesPage;
