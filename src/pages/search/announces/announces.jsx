import React from "react";
import styled from "styled-components";
import { List, Avatar } from "antd";
import { FaStar } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";

const SList = styled(List)`
  padding: 1rem;
  background-color: #fff;
  box-shadow: 0 2px 2px rgba(0, 0, 0, 0.2);
`;

const AnnouncesComp = ({ announces }) => {
  return (
    <SList
      itemLayout="vertical"
      dataSource={announces}
      renderItem={(announce) => (
        <List.Item
          actions={[
            <>
              <MdLocationOn />
              <span>{announce.ville}</span>
            </>,
            <>
              <FaStar color="#f1c40f" />
              <span>4.6</span>
            </>,
            <span>{announce.prix}DH</span>,
          ]}
        >
          <List.Item.Meta
            avatar={<Avatar src={announce.user.avatarURL} />}
            title={<span>{announce.user.fullName}</span>}
            description={`${announce.title.substr(0, 70)}${
              announce.title.length > 70 ? "..." : ""
            }`}
          />
        </List.Item>
      )}
    />
  );
};

export default AnnouncesComp;
