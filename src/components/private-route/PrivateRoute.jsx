import React from "react";
import _ from "lodash";
import PropTypes from "prop-types";
import { UserContext } from "../../contexts/user-context";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ Component, ...rest }) => {
  const { user } = React.useContext(UserContext);

  const routeRender = () => {
    if (!user) return null;

    if (!_.isEmpty(user)) {
      if (user.fullName) {
        return <Route component={Component} {...rest} />;
      } else {
        return <Redirect to="/setup" />;
      }
    } else {
      return <Redirect to="/login" />;
    }
  };

  return routeRender();
};

PrivateRoute.propTypes = {
  Component: PropTypes.elementType.isRequired,
};

export default PrivateRoute;
