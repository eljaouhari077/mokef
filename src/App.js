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
import NewAnnouncePage from "./pages/new-announce/new-announce.page";
import AnnouncePage from "./pages/announce/announce.page";
import SearchPage from "./pages/search/search.page";

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
        <Route path="/" exact component={HomePage} />
        <PrivateRoute path="/profile" exact component={ProfilePage} />
        <Route path="/login" exact component={LoginPage} />
        <Route path="/setup" exact component={SetupPage} />
        <PrivateRoute path="/announce/new" exact component={NewAnnouncePage} />
        <PrivateRoute path="/announce/:id" exact component={AnnouncePage} />
        <PrivateRoute path="/search" exact component={SearchPage} />
      </Switch>
    </>
  );
};

export default App;
