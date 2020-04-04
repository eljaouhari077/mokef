import React from "react";
import _ from "lodash";
import { CardContainer, Flex } from "../../components/shared/shared.styled";
import { Card, Button } from "antd";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import CustomInput from "../../components/custom-input/custom-input";
import AvatarUpload from "../../components/avatar-upload/avatar-upload";
import { UserContext } from "../../contexts/user-context";

const phoneRegExp = /(\+212|0)([ \-_/]*)(\d[ \-_/]*){9}/g;

const SetupPage = ({ history }) => {
  const { user } = React.useContext(UserContext);
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
          email: "",
          phoneNumber: "",
        }}
        validationSchema={Yup.object({
          fullName: Yup.string().required("Nom Complet est necessaire"),
          ville: Yup.string().required("Ville est necessaire"),
          email: Yup.string().email("Doit etre un email valide"),
          phoneNumber: Yup.string().matches(
            phoneRegExp,
            "Numero doit etre valide"
          ),
        })}
        onSubmit={(val) => {
          console.log({
            ...val,
            avatarFile,
          });
        }}
      >
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
      </Formik>
    </CardContainer>
  );
};

export default ({ history }) => {
  return <SetupPage history={history} />;
};
