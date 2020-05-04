import styled from "styled-components";
import { Flex } from "../../components/shared/shared.styled";
import Image from "react-image";
import { Divider } from "antd";

export const AnnounceInfo = styled(Flex)`
  padding: 1rem;

  > button {
    text-align: center;
    width: 30rem;
    margin-bottom: 1rem;
    align-self: center;
  }
`;

export const SImage = styled(Image)`
  width: 100%;
  height: 20rem;
  object-fit: cover;
`;

export const AdditionalInfo = styled(Flex)`
  width: 100%;
  margin-top: 1rem;
`;

export const SDivider = styled(Divider)`
  height: 2rem;
  background: #ddd;
`;
