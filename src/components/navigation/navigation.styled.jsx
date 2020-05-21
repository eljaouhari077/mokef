import styled from "styled-components";
import { Link } from "react-router-dom";

export const Root = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.2rem 2.5rem;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.15);
  background-color: #fff;

  > span {
    color: #3c88e4;
  }

  > svg:nth-child(2) {
    width: 8rem;
    height: 3rem;
  }
`;

export const NavList = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  > a {
    font-size: 1.6rem;
    margin: 0.5rem 0;
  }
`;

export const SLink = styled(Link)`
  color: var(--blue);
  cursor: pointer;
`;
