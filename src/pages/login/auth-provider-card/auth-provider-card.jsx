import React from "react";
import { Card } from "antd";
import PropTypes from "prop-types";

import styled from "styled-components";

const SCard = styled(Card)`
  margin-bottom: 2rem;
  border-radius: 0.8rem;
  box-shadow: 2px 5px 7px rgba(0, 0, 0, 0.15);
  > div {
    padding: 2.5rem 1rem;
    display: flex;
    justify-content: center;
    align-items: center;

    > svg {
      font-size: 2rem;
      margin-right: 1rem;
    }

    > h4 {
      font-size: 1.6rem;
      margin: 0;
      width: 20rem;
    }
  }
`;

const AuthProviderCard = (props) => {
  return (
    <SCard onClick={() => props.handleClick()}>
      <props.Icon style={{ color: props.iconColor }} />
      <h4>{props.content}</h4>
    </SCard>
  );
};

AuthProviderCard.propTypes = {
  Icon: PropTypes.elementType.isRequired,
  iconColor: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
};

export default AuthProviderCard;
