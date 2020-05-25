import React from "react";
import _ from "lodash";
import PropTypes from "prop-types";
import { FaFacebook, FaGoogle } from "react-icons/fa";
import { FirebaseContext } from "../../firebase";
import { UserContext } from "../../contexts/user-context";

import AuthProviderCard from "./auth-provider-card/auth-provider-card";
import { CardContainer } from "../../components/shared/shared.styled";
import { createUserIfNotExist } from "../../utils/dao";

const LoginPage = ({ history }) => {
  const fb = React.useContext(FirebaseContext);
  const { user } = React.useContext(UserContext);

  React.useEffect(() => {
    if (!_.isEmpty(user)) {
      history.push("/");
    }
    // eslint-disable-next-line
  }, [user]);

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
    </CardContainer>
  );
};

LoginPage.propTypes = {
  history: PropTypes.object.isRequired,
};

export default ({ history }) => {
  return <LoginPage history={history} />;
};
