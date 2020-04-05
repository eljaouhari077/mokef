import React from "react";
import { Card } from "antd";

import { FaPlus, FaMinus } from "react-icons/fa";

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

const ExpandableCard = ({ title, titleIcon, children }) => {
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
      extra={displayExpandIcon()}
    >
      {children}
    </SCard>
  );
};

export default ExpandableCard;
