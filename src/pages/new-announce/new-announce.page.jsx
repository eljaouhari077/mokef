import React from "react";
import { Card, Steps, Select, Button } from "antd";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import styled from "styled-components";
import { Flex } from "../../components/shared/shared.styled";
import CustomInput from "../../components/custom-input/custom-input";
import CustomSelect from "../../components/custom-input/custom-select";

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

const Next = styled(Button)`
  width: 100%;
  margin-top: 1rem;
`;

const SSteps = styled(Steps)`
  margin: 1rem 0;
`;

function NewAnnouncePage() {
  return (
    <Root direction="column" justify="center" align="center">
      <Heading className="secondary">Ajoutez votre annonce</Heading>
      <SSteps>
        <Step></Step>
        <Step></Step>
        <Step></Step>
      </SSteps>
      <Card>
        <Formik
          initialValues={{
            title: "",
            category: "baker",
          }}
          validationSchema={Yup.object({
            title: Yup.string()
              .max(100, "Il ne faut pas dépasser 100 caractére")
              .required("Ce champ est obligatoire"),
          })}
          onSubmit={(values) => console.log(values)}
        >
          {(props) => (
            <Form>
              <CustomInput
                label="Titre de la profession"
                name="title"
                type="text"
                placeholder="Je vais"
              />
              <CustomSelect
                label="Catégorie"
                name="category"
                onChange={(val) => props.setFieldValue("category", val)}
              >
                <Select.Option value="baker">Baker</Select.Option>
                <Select.Option value="2">Val 2</Select.Option>
                <Select.Option value="3">Val 3</Select.Option>
              </CustomSelect>
              <Next htmlType="submit" type="primary" style={{ width: "100%" }}>
                Suivant
              </Next>
            </Form>
          )}
        </Formik>
      </Card>
    </Root>
  );
}

export default NewAnnouncePage;
