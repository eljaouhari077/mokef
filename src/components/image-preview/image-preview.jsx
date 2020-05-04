import React from "react";
import { Modal } from "antd";
import styled from "styled-components";

const SModal = styled(Modal)`
  .ant-modal-body {
    padding: 0;
  }
`;

function ImagePreview({ isVisible, setIsVisible, previewImage }) {
  const handleCancel = () => setIsVisible(false);

  return (
    <SModal visible={isVisible} footer={null} onCancel={handleCancel}>
      <img alt="preview" style={{ width: "100%" }} src={previewImage} />
    </SModal>
  );
}

export default ImagePreview;
