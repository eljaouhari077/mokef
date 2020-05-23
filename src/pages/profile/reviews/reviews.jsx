import React from "react";
import { List, Avatar, Empty } from "antd";
import { FaStar } from "react-icons/fa";
import { Flex } from "../../../components/shared/shared.styled";

const Reviews = ({ reviews }) => {
  return (
    <>
      {reviews.length ? (
        <List
          pagination={{
            pageSize: 4,
          }}
          dataSource={reviews}
          renderItem={(review) => (
            <List.Item>
              <List.Item.Meta
                avatar={<Avatar src={review.avatarURL} />}
                title={
                  <Flex justify="space-between">
                    <span>{review.fullName}</span>
                    <div>
                      <FaStar color="#f1c40f" />
                      <span>{review.review.rating}</span>
                    </div>
                  </Flex>
                }
                description={review.review.review}
              />
            </List.Item>
          )}
        ></List>
      ) : (
        <Empty />
      )}
    </>
  );
};

export default Reviews;
