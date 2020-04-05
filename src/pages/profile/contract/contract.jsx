import React from "react";
import Image from "react-image";
import { Card } from "antd";
import Cover from "../../../assets/sabbath.jpg";

const Contract = () => {
  return (
    <Card style={{ margin: "1.5rem 0" }} cover={<Image src={Cover} />}>
      <Card.Meta description="Lorem ipsum, dolor sit amet consectetur adipisicing elit" />
    </Card>
  );
};

export default Contract;
