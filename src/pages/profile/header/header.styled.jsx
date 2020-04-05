import styled from "styled-components";
import Image from "react-image";

export const Root = styled.div`
  background-color: var(--dark-blue);
  padding: 2rem 1rem;
`;

export const SImage = styled(Image)`
  height: 11rem;
  width: 11rem;
  background-color: #fff;
  padding: 0.7rem;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 2rem;
`;

export const UserInfo = styled.div`
  color: #fff;

  > h3 {
    color: #fff;
    margin: 0;
    font-size: 2rem;
  }
  svg {
    font-size: 1.4rem;
  }
`;

export const Span = styled.span`
  margin-left: 0.6rem;
  position: relative;

  > span {
    position: absolute;
    bottom: 40%;
    left: 100%;
    font-size: 1rem;
  }
`;
