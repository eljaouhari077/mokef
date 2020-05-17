import React from "react";
import styled from "styled-components";
import { List, Avatar } from "antd";
import { FaStar } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";
import { withRouter } from "react-router-dom";

const SList = styled(List)`
  padding: 1rem;
  background-color: #fff;
  box-shadow: 0 2px 2px rgba(0, 0, 0, 0.2);
`;

const AnnouncesComp = ({ announces, history }) => {
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
          onClick={() => history.push(`/announce/${announce.id}`)}
          style={{ cursor: "pointer" }}
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

export default withRouter(AnnouncesComp);
