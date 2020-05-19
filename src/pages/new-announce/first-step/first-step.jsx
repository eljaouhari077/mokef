import React from "react";
import { Card, Select, Button } from "antd";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import styled from "styled-components";

import CustomSelect from "../../../components/custom-input/custom-select";
import CustomInput from "../../../components/custom-input/custom-input";
import { jobs } from "../../../data/jobs";

const Next = styled(Button)`
  width: 100%;
  margin-top: 1rem;
`;

function FirstStep({ setCurrentStep, updateFormValues }) {
  return (
    <Card>
      <Formik
        initialValues={{
          title: "",
          category: jobs[0],
        }}
        validationSchema={Yup.object({
          title: Yup.string()
            .max(100, "Il ne faut pas dépasser 100 caractére")
            .required("Ce champ est obligatoire"),
        })}
        onSubmit={(values) => {
          updateFormValues(values);
          setCurrentStep(1);
        }}
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
              {jobs.map((job) => (
                <Select.Option key={job.name} value={job.name}>
                  {job.name}
                </Select.Option>
              ))}
            </CustomSelect>
            <Next htmlType="submit" type="primary" style={{ width: "100%" }}>
              Suivant
            </Next>
          </Form>
        )}
      </Formik>
    </Card>
  );
}

export default FirstStep;
