import React from "react";
import { MenuOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { Drawer } from "antd";

import { ReactComponent as Logo } from "../../assets/logo.svg";
import { Root, NavList } from "./navigation.styled";

const Navigation = () => {
  const [isDrawerVisible, setIsDrawerVisible] = React.useState(false);

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
        <NavList>
          <Link to="/">Accueil</Link>
          <Link to="/login">Connexion</Link>
        </NavList>
      </Drawer>
    </Root>
  );
};

export default Navigation;
