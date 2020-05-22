import React from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import styled from "styled-components";
import { Card, Button } from "antd";
import { UserContext } from "../../contexts/user-context";
import { saveContract, getContracts, updateContract } from "../../utils/dao";
import { FirebaseContext } from "../../firebase";

const SCard = styled(Card)`
  margin: 0 auto;
  width: 45rem;

  @media (max-width: 460px) {
    width: 100%;
  }
`;

const SCardElement = styled(CardElement)`
  padding: 1rem;
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.2);
`;

export default ({ setIsSuccessful, selectedAnnounce }) => {
  const { user } = React.useContext(UserContext);
  const fb = React.useContext(FirebaseContext);
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    // Block native form submission.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.
    const cardElement = elements.getElement(CardElement);

    // Use your card Element with other Stripe.js APIs
    const { error } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (error) {
      console.log("[error]", error);
    } else {
      getContracts(fb, selectedAnnounce.user.id, user.uid).then((res) => {
        if (!res.empty) {
          updateContract(fb, res.docs[0].id, selectedAnnounce.id).then(() => {
            setIsSuccessful(true);
          });
        } else {
          saveContract(
            fb,
            selectedAnnounce.user.id,
            user.uid,
            selectedAnnounce.id
          ).then(() => {
            setIsSuccessful(true);
          });
        }
      });
    }
  };

  return (
    <SCard>
      <form onSubmit={handleSubmit}>
        <SCardElement />
        <Button
          htmlType="submit"
          style={{ marginTop: "1rem" }}
          type="primary"
          block
          disabled={!stripe}
        >
          Payer {selectedAnnounce.prix}DH
        </Button>
      </form>
    </SCard>
  );
};
