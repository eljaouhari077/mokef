import React from "react";
import { Modal } from "antd";

const DescriptionModal = ({ isVisible, handleModalClose }) => {
  return (
    <Modal visible={isVisible} onCancel={() => handleModalClose("description")}>
      <div>
        <h1>Testing</h1>
      </div>
    </Modal>
  );
};

export default DescriptionModal;
