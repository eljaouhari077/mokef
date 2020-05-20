import styled from "styled-components";
import { Flex } from "../../components/shared/shared.styled";
import Image from "react-image";
import { Divider } from "antd";

export const AnnounceInfo = styled(Flex)`
  padding: 1rem;
  max-width: 1050px;
  margin: 0 auto;

  > button {
    text-align: center;
    width: 30rem;
    margin-bottom: 1rem;
    align-self: center;
  }
`;

export const SImage = styled(Image)`
  width: 100%;
  max-height: 20rem;
  object-fit: cover;
  cursor: pointer;

  @media (min-width: 500px) {
    max-height: 40rem;
  }
`;

export const AdditionalInfo = styled(Flex)`
  width: 100%;
  margin-top: 1rem;
`;

export const SDivider = styled(Divider)`
  height: 2rem;
  background: #ddd;
`;
