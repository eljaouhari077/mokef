import React from "react";
import _ from "lodash";
import { Steps, Card, Input } from "antd";
import { FaFacebook, FaGoogle } from "react-icons/fa";
import { MdLocalPhone } from "react-icons/md";
import { FirebaseContext } from "../../firebase";
import { UserContext } from "../../contexts/user-context";

import AuthProviderCard from "./auth-provider-card/auth-provider-card";
import { CardContainer } from "../../components/shared/shared.styled";
import { SSteps } from "./login.styled";

const { Step } = Steps;

const LoginPage = ({ history }) => {
  const [isPhoneSignUp, setIsPhoneSignUp] = React.useState(false);
  const [phoneInput, setPhoneInput] = React.useState("");
  const fb = React.useContext(FirebaseContext);
  const { user } = React.useContext(UserContext);

  React.useEffect(() => {
    if (!_.isEmpty(user)) {
      history.push("/");
    } else {
      fb.initRecaptcha();
    }
    // eslint-disable-next-line
  }, [user]);

  const handlePhoneClick = () => {
    setIsPhoneSignUp(true);
  };

  const handleGoogleClick = () => {
    fb.doSignInWithGoogle()
      .then(({ user }) =>
        fb
          .usersCollection()
          .doc(user.uid)
          .set({ email: user.email }, { merge: true })
          .then(() => history.push("/"))
      )
      .catch((error) => console.error(error));
  };

  const displayPhoneLogin = () => {
    if (isPhoneSignUp) {
      return (
        <Card>
          <Input.Search
            addonBefore="+212"
            enterButton="Go"
            type="tel"
            value={phoneInput}
            onChange={(e) => setPhoneInput(e.target.value)}
            onSearch={() => console.log(phoneInput)}
          />
        </Card>
      );
    } else {
      return (
        <AuthProviderCard
          handleClick={handlePhoneClick}
          Icon={MdLocalPhone}
          iconColor="#000"
          content="Connexion avec Telephone"
        />
      );
    }
  };

  return (
    <CardContainer>
      <SSteps size="small" direction="horizontal">
        <Step />
        <Step />
      </SSteps>

      <AuthProviderCard
        Icon={FaFacebook}
        iconColor="#3b5998"
        content="Connexion avec Facebook"
      />
      <AuthProviderCard
        handleClick={handleGoogleClick}
        Icon={FaGoogle}
        iconColor="#e74c3c"
        content="Connexion avec Google"
      />
      {displayPhoneLogin()}
      <div id="recaptcha-container"></div>
    </CardContainer>
  );
};

export default ({ history }) => {
  return <LoginPage history={history} />;
};
