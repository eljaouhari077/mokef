import React from "react";
import _ from "lodash";
import { MenuOutlined } from "@ant-design/icons";
import { Link, withRouter } from "react-router-dom";
import { Drawer } from "antd";

import { ReactComponent as Logo } from "../../assets/logo.svg";
import { Root, NavList } from "./navigation.styled";
import { UserContext } from "../../contexts/user-context";
import { FirebaseContext } from "../../firebase";

const Navigation = ({ location }) => {
  const fb = React.useContext(FirebaseContext);
  const { user, setUser } = React.useContext(UserContext);
  const [isDrawerVisible, setIsDrawerVisible] = React.useState(false);

  React.useEffect(() => {
    setIsDrawerVisible(false);
  }, [location]);

  const isLoggedIn = () => !_.isEmpty(user);

  const signOut = () => {
    fb.doSignOut();
    setUser({});
  };

  return (
    <Root>
      <MenuOutlined onClick={() => setIsDrawerVisible(true)} />
      <Logo />
      <div />

      <Drawer
        visible={isDrawerVisible}
        onClose={() => setIsDrawerVisible(false)}
        placement="left"
      >
        {isLoggedIn ? (
          <NavList>
            <Link to="/">Accueil</Link>
            <Link to="/profile">Profile</Link>
            <a onClick={signOut}>Sign Out</a>
          </NavList>
        ) : (
          <NavList>
            <Link to="/login">Connexion</Link>
          </NavList>
        )}
      </Drawer>
    </Root>
  );
};

export default withRouter(Navigation);
