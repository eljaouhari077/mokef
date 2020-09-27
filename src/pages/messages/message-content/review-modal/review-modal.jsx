import React from "react";
import { Modal, Input, Rate, message } from "antd";
import styled from "styled-components";
import { Flex } from "../../../../components/shared/shared.styled";
import { addReview } from "../../../../utils/dao";
import { FirebaseContext } from "../../../../firebase";
import { UserContext } from "../../../../contexts/user-context";

const STextArea = styled(Input.TextArea)`
  background-color: #f5f5f5;
  border: 0;
  margin: 0.5rem;
  flex: 1;
  resize: none;
`;

const ReviewModal = ({ isVisible, setIsVisible, selectedContact }) => {
  const [rating, setRating] = React.useState(null);
  const [review, setReview] = React.useState("");
  const fb = React.useContext(FirebaseContext);
  const { user } = React.useContext(UserContext);

  const handleReviewAdd = () => {
    addReview(fb, selectedContact.userId, {
      userId: user.uid,
      review,
      rating,
    }).then(() => {
      fb.contractsCollection()
        .doc(selectedContact.contractId)
        .update({ didAddReview: true });
      message.success("l'avis a été ajouté!");
      setIsVisible(false);
    });
  };

  return (
    <Modal
      onCancel={() => setIsVisible(false)}
      onOk={handleReviewAdd}
      visible={isVisible}
      closable={false}
      okButtonProps={{
        disabled: !rating || !review.length,
      }}
    >
      <Flex align="center" direction="column">
        <STextArea
          placeholder="Ajoutez un avis..."
          value={review}
          onChange={(e) => setReview(e.target.value)}
        />
        <Rate
          allowHalf
          allowClear
          onChange={(e) => setRating(e)}
          value={rating}
        />
      </Flex>
    </Modal>
  );
};

export default ReviewModal;
