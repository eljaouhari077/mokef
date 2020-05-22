import React from "react";
import _ from "lodash";
import { Card, Button, Input, message } from "antd";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import styled from "styled-components";

import { UserContext } from "../../../contexts/user-context";
import CustomInput from "../../../components/custom-input/custom-input";
import { FirebaseContext } from "../../../firebase";
import { saveAnnounce } from "../../../utils/dao";
import { withRouter } from "react-router-dom";
import { addStorageFile } from "../../../utils/storage";

const Next = styled(Button)`
  width: 100%;
  margin-top: 1rem;
`;

const STextArea = styled(Input.TextArea)`
  background-color: #f5f5f5;
  border: 0;
`;

function ThirdStep({ formValues, history }) {
  const fb = React.useContext(FirebaseContext);
  const { user } = React.useContext(UserContext);

  return (
    <Card>
      <Formik
        initialValues={{
          description: "",
        }}
        validationSchema={Yup.object({
          description: Yup.string()
            .min(20, "Il faut au moins 20 caractéres")
            .max(500, "Il ne faut pas dépasser 500 caractéres")
            .required("Ce champ est obligatoire"),
        })}
        onSubmit={(values) => {
          if (formValues.imageFile) {
            addStorageFile(
              fb,
              `/announces/${formValues.imageFile.uid}`,
              formValues.imageFile
            ).catch((error) => console.error(error));
          }
          const announce = {
            ..._.omit(formValues, "imageFile"),
            ...values,
            user: fb.usersCollection().doc(user.uid),
            imageURL: formValues.imageFile
              ? `/announces/${formValues.imageFile.uid}`
              : null,
          };
          saveAnnounce(fb, announce)
            .then(() => {
              message.success("l'annonce a été créée avec succès!");
              history.push("/");
            })
            .catch((error) => {
              console.error(error);
              message.error(
                "Une erreur s'est produite lors de la création de l'annonce"
              );
            });
        }}
      >
        {(props) => (
          <Form>
            <CustomInput
              label="Description"
              name="description"
              type="text"
              asElement={STextArea}
              style={{ resize: "none" }}
              autoSize={{ minRows: 6, maxRows: 20 }}
            />
            <Next htmlType="submit" type="primary" style={{ width: "100%" }}>
              Suivant
            </Next>
          </Form>
        )}
      </Formik>
    </Card>
  );
}

export default withRouter(ThirdStep);
