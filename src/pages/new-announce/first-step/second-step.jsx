import React from "react";
import { Card, Select, Button } from "antd";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import styled from "styled-components";

import CustomSelect from "../../../components/custom-input/custom-select";
import CustomInput from "../../../components/custom-input/custom-input";
import { cities } from "../../../data/cities";
import ImageUpload from "../../../components/image-upload/image-upload";
import { Flex } from "../../../components/shared/shared.styled";

const Next = styled(Button)`
  width: 100%;
  margin-top: 1rem;
`;

function SecondStep({ setCurrentStep, updateFormValues }) {
  const [imageFile, setImageFile] = React.useState(null);

  return (
    <Card style={{ width: "100%" }}>
      <Formik
        initialValues={{
          ville: cities[0],
          prix: "",
        }}
        validationSchema={Yup.object({
          prix: Yup.number()
            .moreThan(0, "Il faut un nombre supérieur a 0")
            .lessThan(10000, "Il ne faut pas dépasser 4 nombres")
            .required("Ce champ est obligatoire"),
        })}
        onSubmit={(values) => {
          updateFormValues({ ...values, imageFile });
          setCurrentStep(2);
        }}
      >
        {(props) => (
          <Flex as={Form} direction="column">
            <ImageUpload setImageFile={setImageFile} />
            <CustomSelect
              label="Ville"
              name="ville"
              onChange={(val) => props.setFieldValue("ville", val)}
            >
              {cities.map((city) => (
                <Select.Option key={city} value={city}>
                  {city}
                </Select.Option>
              ))}
            </CustomSelect>
            <CustomInput
              label="Prix"
              name="prix"
              type="number"
              min="0"
              max="10000"
            />
            <Next htmlType="submit" type="primary" style={{ width: "100%" }}>
              Suivant
            </Next>
          </Flex>
        )}
      </Formik>
    </Card>
  );
}

export default SecondStep;
