import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { Result } from "antd";
import CheckoutForm from "./checkout-form";
import styled from "styled-components";
import { Flex } from "../shared/shared.styled";
import { SelectedAnnounceContext } from "../../contexts/selected-announce-context";
import { withRouter, Redirect } from "react-router-dom";

const Root = styled(Flex)`
  height: 90vh;
`;

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe("pk_test_i34GMTECJAxkUY5XNRCpkC6100MfRrskEp");

export default withRouter(({ history }) => {
  const [isSuccessful, setIsSuccessful] = React.useState(false);
  const { selectedAnnounce } = React.useContext(SelectedAnnounceContext);

  React.useEffect(() => {
    if (!selectedAnnounce) {
      history.push("/");
    }
    // eslint-disable-next-line
  }, []);

  return (
    <>
      {selectedAnnounce ? (
        <Root align="center" justify="center">
          <Elements stripe={stripePromise}>
            {isSuccessful ? (
              <Result
                status="success"
                title="Le paiement a été effectuée avec succés!"
              />
            ) : (
              <CheckoutForm
                selectedAnnounce={selectedAnnounce}
                setIsSuccessful={setIsSuccessful}
              />
            )}
          </Elements>
        </Root>
      ) : (
        <Redirect to="/" />
      )}
    </>
  );
});
