import React from "react";
import { List, Avatar, Divider } from "antd";
import styled from "styled-components";
import { FaStar } from "react-icons/fa";
import { Flex } from "../../components/shared/shared.styled";
import { MdLocationOn } from "react-icons/md";
import { FirebaseContext } from "../../firebase";

import { getAllAnnounces, getUserFromRef } from "../../utils/dao";
import { getStorageFile } from "../../utils/storage";

const AdditionalInfo = styled.div`
  font-size: 1.1rem;
  color: #999;
`;

const SList = styled(List)`
  margin: 1rem;
  padding: 1rem;
  background-color: #fff;
  box-shadow: 0 2px 2px rgba(0, 0, 0, 0.2);
`;

function SearchPage() {
  const [announces, setAnnounces] = React.useState([]);
  const fb = React.useContext(FirebaseContext);

  React.useEffect(() => {
    getAnnounces();
    // eslint-disable-next-line
  }, []);

  const getAnnounces = async () => {
    const announcesRefs = await getAllAnnounces(fb);
    const allAnnounces = announcesRefs.docs.map((announce) => announce.data());
    const allAnnouncesWithUserData = await Promise.all(
      allAnnounces.map((announce) =>
        getUserFromRef(fb, announce.user).then((user) => ({
          ...announce,
          user: user.data(),
        }))
      )
    );

    const allAnnouncesWithUserDataAndImageURL = await Promise.all(
      allAnnouncesWithUserData.map((announce) =>
        getStorageFile(fb, announce.user.avatarURL).then((avatarURL) => ({
          ...announce,
          user: { ...announce.user, avatarURL },
        }))
      )
    );

    setAnnounces(allAnnouncesWithUserDataAndImageURL);
  };

  return (
    <>
      {announces.length > 0 && (
        <SList
          itemLayout="horizontal"
          dataSource={announces}
          renderItem={(announce) => (
            <List.Item>
              <List.Item.Meta
                avatar={
                  <div>
                    <Avatar src={announce.user.avatarURL} />
                  </div>
                }
                title={
                  <Flex justify="space-between">
                    <span>{announce.user.fullName}</span>
                    <AdditionalInfo>
                      <MdLocationOn />
                      <span>{announce.ville}</span>
                      <Divider type="vertical" />
                      <FaStar color="#f1c40f" />
                      <span>4.6</span>
                    </AdditionalInfo>
                  </Flex>
                }
                description={`${announce.title.substr(0, 70)}${
                  announce.title.length > 70 ? "..." : ""
                }`}
              />
            </List.Item>
          )}
        />
      )}
    </>
  );
}

export default SearchPage;
