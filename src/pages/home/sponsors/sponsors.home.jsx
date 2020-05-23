import React from "react";
import { ReactComponent as Sponsor1 } from "../../../assets/sponsors/sponsor-1.svg";
import { ReactComponent as Sponsor2 } from "../../../assets/sponsors/sponsor-2.svg";
import { ReactComponent as Sponsor3 } from "../../../assets/sponsors/sponsor-3.svg";
import { ReactComponent as Sponsor4 } from "../../../assets/sponsors/sponsor-4.svg";
import styled from "styled-components";
import { Flex } from "../../../components/shared/shared.styled";

const Root = styled(Flex)`
  margin-bottom: 4rem;
`;

const Sponsor = styled(Sponsor1)`
  height: 10rem;
  width: 20rem;
  margin: 2rem 0;
`;

const Sponsors = () => {
  return (
    <Root justify="space-around" align="center" wrap="wrap">
      <Sponsor />
      <Sponsor as={Sponsor2} />
      <Sponsor as={Sponsor3} />
      <Sponsor as={Sponsor4} />
    </Root>
  );
};

export default Sponsors;
