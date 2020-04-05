import React from "react";
import _ from "lodash";
import { CardContainer, Flex } from "../../components/shared/shared.styled";
import { Card, Button, Radio } from "antd";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import CustomInput from "../../components/custom-input/custom-input";
import AvatarUpload from "../../components/avatar-upload/avatar-upload";
import { UserContext } from "../../contexts/user-context";
import { FirebaseContext } from "../../firebase";

import styled from "styled-components";
import { updateUserWithAdditionalInformations } from "../../utils/dao";

const RadioGroup = styled(Radio.Group)`
  width: 100%;
  margin-bottom: 1rem;
  text-align: center;
`;

const phoneRegExp = /(\+212|0)([ \-_/]*)(\d[ \-_/]*){9}/g;

const SetupPage = ({ history }) => {
  const fb = React.useContext(FirebaseContext);
  const { user, setUser } = React.useContext(UserContext);
  const [avatarFile, setAvatarFile] = React.useState(null);

  React.useEffect(() => {
    if (_.isEmpty(user)) return history.push("/");
    // eslint-disable-next-line
  }, []);

  return (
    <CardContainer>
      <Formik
        initialValues={{
          fullName: "",
          address: "",
          ville: "",
          phoneNumber: "",
          role: "freelancer",
          gender: "homme",
        }}
        validationSchema={Yup.object({
          fullName: Yup.string().required("Nom Complet est necessaire"),
          ville: Yup.string().required("Ville est necessaire"),
          phoneNumber: Yup.string().matches(
            phoneRegExp,
            "Numero doit etre valide"
          ),
        })}
        onSubmit={(val) => {
          if (avatarFile) {
            fb.storageRef(`/avatars/${avatarFile.uid}`)
              .put(avatarFile)
              .then(() => console.log("Uploaded successfully"))
              .catch((error) => console.error(error));
          }
          const data = {
            ...val,
            uid: user.uid,
            email: user.email,
            avatarURL: avatarFile ? `/avatars/${avatarFile.uid}` : null,
          };
          updateUserWithAdditionalInformations(fb, data).then(() => {
            setUser(data);
            history.push("/");
          });
        }}
      >
        {(formikProps) => (
          <Card>
            <Flex direction="column" justify="center" align="center">
              <AvatarUpload setAvatarFile={setAvatarFile} />
              <Form>
                <CustomInput name="fullName" type="text" label="Nom Complet" />
                <CustomInput name="address" type="text" label="Adresse" />
                <CustomInput name="ville" type="text" label="Ville" />
                {/* <CustomInput name="email" type="email" label="Addresse Email" /> */}
                <CustomInput
                  addonBefore="+212"
                  name="phoneNumber"
                  type="text"
                  label="Numero de telephone"
                />
                <RadioGroup
                  defaultValue="freelancer"
                  onChange={(e) => (formikProps.values.role = e.target.value)}
                  buttonStyle="solid"
                >
                  <Radio.Button value="freelancer">Freelancer</Radio.Button>
                  <Radio.Button value="client">Client</Radio.Button>
                </RadioGroup>
                <RadioGroup
                  defaultValue="homme"
                  onChange={(e) => (formikProps.values.gender = e.target.value)}
                  buttonStyle="solid"
                >
                  <Radio.Button value="homme">Homme</Radio.Button>
                  <Radio.Button value="femme">Femme</Radio.Button>
                </RadioGroup>
                <Button
                  htmlType="submit"
                  type="primary"
                  style={{ width: "100%" }}
                >
                  Confirmer
                </Button>
              </Form>
            </Flex>
          </Card>
        )}
      </Formik>
    </CardContainer>
  );
};

export default ({ history }) => {
  return <SetupPage history={history} />;
};
