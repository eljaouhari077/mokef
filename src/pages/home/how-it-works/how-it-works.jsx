import React from "react";
import Step from "./step/step";
import { ReactComponent as Search } from "../../../assets/search.svg";
import { ReactComponent as SearchHuman } from "../../../assets/human_search.svg";
import { ReactComponent as Conversation } from "../../../assets/conversation.svg";
import styled from "styled-components";
import { Flex } from "../../../components/shared/shared.styled";

const Root = styled.div`
  margin: 1rem 0;
  > h2 {
    text-align: center;
    color: var(--blue);
  }
`;

const HowItWorks = () => {
  return (
    <Root>
      <h2>Comment ça marche</h2>
      <Flex align="center" justify="space-around" wrap="wrap">
        <Step
          Icon={Search}
          title="Demandez un service"
          description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis, debitis."
        />
        <Step
          Icon={SearchHuman}
          title="Choisissez votre jobeur"
          description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis, debitis."
        />
        <Step
          Icon={Conversation}
          title="Souriez, c'est fait!"
          description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis, debitis."
        />
      </Flex>
    </Root>
  );
};

export default HowItWorks;
