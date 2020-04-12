import React from "react";
import { Modal, Input, message } from "antd";
import PropTypes from "prop-types";

import { updateUserWithAdditionalInformations } from "../../../utils/dao";
import { UserContext } from "../../../contexts/user-context";
import { FirebaseContext } from "../../../firebase";

const DescriptionModal = ({ isVisible, closeModal }) => {
  const { user } = React.useContext(UserContext);
  const fb = React.useContext(FirebaseContext);
  const [description, setDescription] = React.useState("");

  React.useEffect(() => {
    if (user.profile.description) {
      setDescription(user.profile.description);
    }
    // eslint-disable-next-line
  }, []);

  const updateDescription = () => {
    const data = {
      uid: user.uid,
      "profile.description": description,
    };
    updateUserWithAdditionalInformations(fb, data)
      .then(() => {
        message.success("La description a été mise a jour!", 10);
        closeModal();
      })
      .catch((error) => console.error(error));
  };

  return (
    <Modal
      visible={isVisible}
      closable={false}
      onCancel={() => closeModal()}
      onOk={updateDescription}
      okButtonProps={{
        disabled: description.length > 500,
      }}
    >
      <Input.TextArea
        rows={8}
        placeholder="description..."
        onChange={(e) => setDescription(e.target.value)}
        value={description}
      />
    </Modal>
  );
};

DescriptionModal.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
};

export default DescriptionModal;
