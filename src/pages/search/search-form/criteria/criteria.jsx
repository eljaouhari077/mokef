import React from "react";
import MinMax from "./min-max/min-max";
import styled from "styled-components";
import { Select } from "antd";

import { Flex } from "../../../../components/shared/shared.styled";
import { cities } from "../../../../data/cities";

const Root = styled(Flex)`
  margin-top: 1rem;
  flex-wrap: wrap;

  @media (max-width: 400px) {
    justify-content: center;
  }
`;

const Criteria = () => {
  return (
    <Root align="center" justify="space-between">
      <MinMax title="Price" min={0} max={10000} />
      <MinMax title="Rating" min={0} max={5} />
      <div>
        <span style={{ display: "block", color: "#fff" }}>Ville</span>
        <Select style={{ width: "18rem" }}>
          {cities.map((city) => (
            <Select.Option value={city} key={city}>
              {city}
            </Select.Option>
          ))}
        </Select>
      </div>
    </Root>
  );
};

export default Criteria;
