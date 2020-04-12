import React from "react";
import { Route, Switch } from "react-router-dom";

import Navigation from "./components/navigation/navigation";
import HomePage from "./pages/home/home.page";
import LoginPage from "./pages/login/login.page";
import SetupPage from "./pages/setup/setup.page";
import { FirebaseContext } from "./firebase";
import { UserContext } from "./contexts/user-context";
import PrivateRoute from "./components/private-route/PrivateRoute";
import ProfilePage from "./pages/profile/profile.page";

const App = () => {
  const fb = React.useContext(FirebaseContext);
  const { setUser } = React.useContext(UserContext);

  React.useEffect(() => {
    fb.onAuthStateChanged(setUser);
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <Navigation />
      <Switch>
        <PrivateRoute path="/" component={HomePage} exact />
        <PrivateRoute path="/profile" component={ProfilePage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/setup" component={SetupPage} />
      </Switch>
    </>
  );
};

export default App;
