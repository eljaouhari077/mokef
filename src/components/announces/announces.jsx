import React from "react";
import styled from "styled-components";
import { List, Avatar } from "antd";
import { FaStar } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";
import { withRouter } from "react-router-dom";

const SList = styled(List)`
  width: 100%;
  padding: 1rem;
  background-color: #fff;
  box-shadow: 0 2px 2px rgba(0, 0, 0, 0.2);
`;

const Span = styled.span`
  margin-left: 0.6rem;
  position: relative;

  > span {
    position: absolute;
    bottom: 40%;
    left: 100%;
    font-size: 1rem;
  }
`;

const AnnouncesComp = ({ announces, history }) => {
  const getAverageAndTotalReviews = (usr) => {
    if (usr.reviews) {
      let total = 0;
      for (let i = 0; i < usr.reviews.length; i++) {
        total += usr.reviews[i].rating;
      }
      return {
        avgReviews: total / usr.reviews.length,
        totalReviews: usr.reviews.length,
      };
    } else {
      return {
        avgReviews: 0,
        totalReviews: 0,
      };
    }
  };

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
              <Span>
                {getAverageAndTotalReviews(announce.user).avgReviews}{" "}
                <span>
                  ({getAverageAndTotalReviews(announce.user).totalReviews})
                </span>
              </Span>
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
