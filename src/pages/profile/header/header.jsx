import React from "react";

import Avatar from "../../../assets/sabbath.jpg";
import { Flex } from "../../../components/shared/shared.styled";
import { MdLocationOn } from "react-icons/md";
import { FaUserAlt } from "react-icons/fa";
import { Rate } from "antd";
import { SImage, Root, UserInfo, Span } from "./header.styled";

const Header = () => {
  return (
    <Root>
      <Flex justify="center" align="center">
        <SImage src={Avatar} alt="Avatar" />
        <UserInfo>
          <h3>John Doe</h3>
          <Flex align="baseline">
            <Rate disabled defaultValue={4.5} allowHalf={true} />
            <Span>
              4.6 <span>(211)</span>
            </Span>
          </Flex>
          <div>
            <MdLocationOn />
            <Span>Agadir</Span>
          </div>
          <div>
            <FaUserAlt />
            <Span>Membre depuis 1h</Span>
          </div>
        </UserInfo>
      </Flex>
    </Root>
  );
};

export default Header;
