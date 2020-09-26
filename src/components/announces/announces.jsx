import React from "react";
import styled from "styled-components";
import { List, Avatar } from "antd";
import { FaStar } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";
import { withRouter } from "react-router-dom";
import lodash from "lodash";

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

const AnnouncesComp = ({ announces, history, isHome, isLoading }) => {
  const [announcesToShow, setAnnouncesToShow] = React.useState([]);

  React.useEffect(() => {
    setAnnouncesToShow(
      lodash.orderBy(announces, ["avgReviews", "totalReviwes"], ["desc", "desc"]).filter((a, idx) => idx < 3)
    );
  }, [announces]);

  return (
    <SList
      loading={isLoading}
      pagination={{
        pageSize: 10,
      }}
      itemLayout="vertical"
      dataSource={isHome ? announcesToShow : announces}
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
                {announce.avgReviews.toFixed(1)}{" "}
                <span>({announce.totalReviews})</span>
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
