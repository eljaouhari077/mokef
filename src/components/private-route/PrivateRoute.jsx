import React from "react";
import _ from "lodash";
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

export default PrivateRoute;
