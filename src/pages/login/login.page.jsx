import React from "react";
import _ from "lodash";
import PropTypes from "prop-types";
import { Card, Input } from "antd";
import { FaFacebook, FaGoogle } from "react-icons/fa";
import { MdLocalPhone } from "react-icons/md";
import { FirebaseContext } from "../../firebase";
import { UserContext } from "../../contexts/user-context";

import AuthProviderCard from "./auth-provider-card/auth-provider-card";
import { CardContainer } from "../../components/shared/shared.styled";
import { createUserIfNotExist } from "../../utils/dao";

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
    fb.doSignInWithGoogle().then(({ user }) =>
      createUserIfNotExist(fb, user).then(() => history.push("/"))
    );
  };

  const handleFacebookClick = () => {
    fb.doSignInWithFacebook().then(({ user }) =>
      createUserIfNotExist(fb, user).then(() => history.push("/"))
    );
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
      <AuthProviderCard
        handleClick={handleFacebookClick}
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

LoginPage.propTypes = {
  history: PropTypes.object.isRequired,
};

export default ({ history }) => {
  return <LoginPage history={history} />;
};
