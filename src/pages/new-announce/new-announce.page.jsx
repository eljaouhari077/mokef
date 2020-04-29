import React from "react";
import { Steps } from "antd";
import styled from "styled-components";
import { Flex } from "../../components/shared/shared.styled";
import FirstStep from "./first-step/first-step";
import ThirdStep from "./first-step/third-step";
import SecondStep from "./first-step/second-step";

const { Step } = Steps;

const Root = styled(Flex)`
  width: 30rem;
  margin: 0 auto;
  height: 90vh;
`;

const Heading = styled.h2`
  color: var(--gray);
  font-weight: 700;
`;

const SSteps = styled(Steps)`
  margin: 1rem 0;
`;

function NewAnnouncePage() {
  const [currentStep, setCurrentStep] = React.useState(0);
  const [formValues, setFormValues] = React.useState({});

  const updateFormValues = (values) => {
    setFormValues({ ...formValues, ...values });
  };

  const displayForm = () => {
    switch (currentStep) {
      case 0:
        return (
          <FirstStep
            setCurrentStep={setCurrentStep}
            updateFormValues={updateFormValues}
          />
        );
      case 1:
        return (
          <SecondStep
            setCurrentStep={setCurrentStep}
            updateFormValues={updateFormValues}
          />
        );
      case 2:
        return <ThirdStep formValues={formValues} />;
      default:
        break;
    }
  };

  return (
    <Root direction="column" justify="center" align="center">
      <Heading className="secondary">Ajoutez votre annonce</Heading>
      <SSteps current={currentStep}>
        <Step></Step>
        <Step></Step>
        <Step></Step>
      </SSteps>
      {displayForm()}
    </Root>
  );
}

export default NewAnnouncePage;
