import React from "react";
import { Card, Space } from "antd";

import { FaPlus, FaMinus, FaRegEdit } from "react-icons/fa";

import styled from "styled-components";
import { Flex } from "../../../components/shared/shared.styled";

const SCard = styled(Card)`
  margin: 1rem;
  > div.ant-card-body {
    display: ${({ isExpanded }) => (isExpanded ? "block" : "none")};
  }
`;

const PlusIcon = styled(FaPlus)`
  font-size: 1.3rem;
`;
const MinusIcon = styled(FaMinus)`
  font-size: 1.3rem;
`;

const ExpandableCard = ({ isOwnProfile, title, titleIcon, children }) => {
  const [isExpanded, setIsExpanded] = React.useState(false);

  const displayExpandIcon = () => {
    if (isExpanded) {
      return <MinusIcon onClick={() => setIsExpanded(false)} />;
    } else {
      return <PlusIcon onClick={() => setIsExpanded(true)} />;
    }
  };

  return (
    <SCard
      isExpanded={isExpanded}
      title={
        <Flex align="center">
          {titleIcon}
          <span style={{ marginLeft: "1rem" }}>{title}</span>
        </Flex>
      }
      extra={
        <Space size="middle">
          {isOwnProfile ? <FaRegEdit /> : null}
          {displayExpandIcon()}
        </Space>
      }
    >
      {children}
    </SCard>
  );
};

export default ExpandableCard;
