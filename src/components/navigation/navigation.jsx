import React from "react";
import _ from "lodash";
import { MenuOutlined } from "@ant-design/icons";
import { withRouter } from "react-router-dom";
import { Drawer } from "antd";

import { ReactComponent as Logo } from "../../assets/logo.svg";
import { Root } from "./navigation.styled";
import { UserContext } from "../../contexts/user-context";
import LoggedIn from "./logged-in/logged-in";
import LoggedOut from "./logged-out/logged-out";

const Navigation = ({ location }) => {
  const { user } = React.useContext(UserContext);
  const [isDrawerVisible, setIsDrawerVisible] = React.useState(false);

  React.useEffect(() => {
    setIsDrawerVisible(false);
  }, [location]);

  const isLoggedIn = !_.isEmpty(user);

  React.useEffect(() => {}, []);

  return (
    <Root>
      <MenuOutlined onClick={() => setIsDrawerVisible(true)} />
      <Logo />

      <Drawer
        visible={isDrawerVisible}
        onClose={() => setIsDrawerVisible(false)}
        placement="left"
      >
        {isLoggedIn ? <LoggedIn /> : <LoggedOut />}
      </Drawer>
      <div />
    </Root>
  );
};

export default withRouter(Navigation);
