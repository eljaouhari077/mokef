import React from "react";
import Img from "react-image";
import { Flex } from "../../../../components/shared/shared.styled";
import styled from "styled-components";
import { Rate } from "antd";

const Root = styled(Flex)`
  > img {
    height: 10rem;
    width: 10rem;
    object-fit: cover;
    border-radius: 50%;
    margin-bottom: 1rem;
  }

  > p {
    text-align: center;
  }
`;

const Testimonial = ({ person }) => {
  return (
    <Root direction="column" align="center">
      <Img src={person.img} />
      <p>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Non,
        reiciendis?
      </p>
      <Rate disabled defaultValue={4.5} allowHalf />
      <p style={{ color: "var(--blue)" }}>
        {person.name}, {person.job}
      </p>
    </Root>
  );
};

export default Testimonial;
