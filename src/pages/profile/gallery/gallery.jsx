import React from "react";
import GalleryItem from "./gallery-item/gallery-item";
import styled from "styled-components";
import ImagePreview from "../../../components/image-preview/image-preview";
import { Empty } from "antd";

const Root = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
  grid-gap: 2rem;
`;

const Gallery = ({ gallery }) => {
  const [isPreviewVisible, setIsPreviewVisible] = React.useState(false);
  const [selectedImage, setSelectedImage] = React.useState(null);

  const handlePreview = (img) => {
    setSelectedImage(img);
    setIsPreviewVisible(true);
  };

  return (
    <>
      <Root>
        {!gallery ? <Empty /> : gallery.map((item) => (
          <GalleryItem
            key={item}
            handlePreview={handlePreview}
            imageURL={item}
          />
        ))}
      </Root>
      <ImagePreview
        isVisible={isPreviewVisible}
        setIsVisible={setIsPreviewVisible}
        previewImage={selectedImage}
      />
    </>
  );
};

export default Gallery;
