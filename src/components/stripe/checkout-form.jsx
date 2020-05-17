import React from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import styled from "styled-components";
import { Card, Button } from "antd";

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
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (error) {
      console.log("[error]", error);
    } else {
      setIsSuccessful(true);
      console.log("[PaymentMethod]", paymentMethod);
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
