import React from "react";
import Img from "react-image";
import styled from "styled-components";

const SImg = styled(Img)`
  width: 100%;
  height: 15rem;
  object-fit: cover;
  cursor: pointer;
`;

const GalleryItem = ({ handlePreview, imageURL }) => {
  return <SImg onClick={() => handlePreview(imageURL)} src={imageURL} />;
};

export default GalleryItem;
