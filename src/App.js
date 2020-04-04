import React from "react";
import { Route, Switch } from "react-router-dom";
import firebase from "firebase";

import Navigation from "./components/navigation/navigation";
import HomePage from "./pages/home/home.page";
import LoginPage from "./pages/login/login.page";
import SetupPage from "./pages/setup/setup.page";
import { FirebaseContext } from "./firebase";
import { UserContext } from "./contexts/user-context";
import PrivateRoute from "./components/private-route/PrivateRoute";

const App = () => {
  const fb = React.useContext(FirebaseContext);
  const { setUser } = React.useContext(UserContext);

  React.useEffect(() => {
    fb.onAuthStateChanged(setUser);
  }, []);

  return (
    <>
      <Navigation />
      <Switch>
        <PrivateRoute path="/" render={HomePage} exact />
        <Route path="/Login" render={LoginPage} />
        <Route path="/setup" render={SetupPage} />
      </Switch>
    </>
  );
};

export default App;
