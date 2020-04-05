import React from "react";
import { Card, List, Avatar } from "antd";
import Sabbath from "../../../assets/sabbath.jpg";
import { FaStar } from "react-icons/fa";
import { Flex } from "../../../components/shared/shared.styled";

const data = [
  {
    title: "Ant Design Title 1",
  },
  {
    title: "Ant Design Title 2",
  },
  {
    title: "Ant Design Title 3",
  },
  {
    title: "Ant Design Title 4",
  },
  {
    title: "Ant Design Title 4",
  },
  {
    title: "Ant Design Title 4",
  },
  {
    title: "Ant Design Title 4",
  },
  {
    title: "Ant Design Title 4",
  },
  {
    title: "Ant Design Title 4",
  },
  {
    title: "Ant Design Title 4",
  },
  {
    title: "Ant Design Title 4",
  },
  {
    title: "Ant Design Title 4",
  },
  {
    title: "Ant Design Title 4",
  },
  {
    title: "Ant Design Title 4",
  },
  {
    title: "Ant Design Title 4",
  },
  {
    title: "Ant Design Title 4",
  },
  {
    title: "Ant Design Title 4",
  },
  {
    title: "Ant Design Title 44",
  },
];

const Reviews = () => {
  return (
    <List
      pagination={{
        pageSize: 4,
      }}
      dataSource={data}
      renderItem={(item) => (
        <List.Item>
          <List.Item.Meta
            avatar={<Avatar src={Sabbath} />}
            title={
              <Flex justify="space-between">
                <span>{item.title}</span>
                <div>
                  <FaStar color="#f1c40f" />
                  <span>4.6</span>
                </div>
              </Flex>
            }
            description="Ant Design, a design language for background applications"
          />
        </List.Item>
      )}
    ></List>
  );
};

export default Reviews;
