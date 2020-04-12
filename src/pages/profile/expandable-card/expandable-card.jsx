import React from "react";
import { Card } from "antd";
import PropTypes from "prop-types";

import { FaPlus, FaMinus, FaRegEdit } from "react-icons/fa";

import styled from "styled-components";
import { Flex } from "../../../components/shared/shared.styled";

const SCard = styled(Card)`
  margin: 1rem;
  > div.ant-card-body {
    display: ${({ styled }) => (styled.isExpanded ? "block" : "none")};
  }
`;

const Spacing = styled.div`
  > * {
    cursor: pointer;
    margin: 0 0.5rem;
  }
`;

const PlusIcon = styled(FaPlus)`
  font-size: 1.3rem;
`;
const MinusIcon = styled(FaMinus)`
  font-size: 1.3rem;
`;

const ExpandableCard = ({
  isOwnProfile,
  title,
  titleIcon,
  children,
  openModal,
  showEdit,
}) => {
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
      styled={{ isExpanded }}
      title={
        <Flex align="center">
          {titleIcon}
          <span style={{ marginLeft: "1rem" }}>{title}</span>
        </Flex>
      }
      extra={
        <Spacing>
          {isOwnProfile && showEdit && (
            <FaRegEdit onClick={() => openModal()} />
          )}
          {displayExpandIcon()}
        </Spacing>
      }
    >
      {children}
    </SCard>
  );
};

ExpandableCard.propTypes = {
  isOwnProfile: PropTypes.bool,
  title: PropTypes.string.isRequired,
  titleIcon: PropTypes.element.isRequired,
  children: PropTypes.node.isRequired,
  openModal: PropTypes.func,
  showEdit: PropTypes.bool,
};

ExpandableCard.defaultProps = {
  isOwnProfile: false,
  showEdit: false,
};

export default ExpandableCard;
