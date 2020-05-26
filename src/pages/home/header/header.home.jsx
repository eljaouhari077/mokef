import React from "react";
import styled from "styled-components";
import Jobs from "./jobs/jobs.header";
import Hero from "../../../assets/header.jpg";
import TabletBreakpoint from "../../../components/responsiveness/tablet_breakpoint";
import Search from "../search/search";

const Root = styled.div`
  background-color: var(--dark-blue);
  padding: 1rem;

  > h1 {
    color: #fff;
    text-align: center;
  }

  @media (min-height: 800px) {
    height: 60vh;
    background: linear-gradient(
        0deg,
        rgba(58, 129, 224, 1) 0%,
        rgba(53, 147, 255, 0.7) 20%,
        rgba(57, 148, 255, 0.5) 43%,
        rgba(58, 130, 225, 0.3) 85%
      ),
      url(${Hero}) top/cover no-repeat;
  }

  @media (min-width: 600px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    > * {
      margin: 2rem 0;
    }

    > h1 {
      font-size: 4.5rem;
      color: #fff;
    }

    > h2 {
      font-size: 4rem;
      color: #fff;
    }
  }
`;

const Header = () => {
  return (
    <Root>
      <h1>Nos services pour vos petits travaux</h1>
      <TabletBreakpoint>
        <Search />
        <h2>Les plus talentueux</h2>
      </TabletBreakpoint>
      <Jobs />
    </Root>
  );
};

export default Header;
