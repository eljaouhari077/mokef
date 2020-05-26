import React from "react";
import _ from "lodash";
import { MenuOutlined, SearchOutlined } from "@ant-design/icons";
import { withRouter } from "react-router-dom";
import { Drawer } from "antd";

import { ReactComponent as Logo } from "../../assets/logo.svg";
import { Root } from "./navigation.styled";
import { UserContext } from "../../contexts/user-context";
import LoggedIn from "./logged-in/logged-in";
import LoggedOut from "./logged-out/logged-out";
import PhoneBreakpoint from "../responsiveness/phone_breakpoint";

const Navigation = ({ location, history }) => {
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
      <div>
        <PhoneBreakpoint>
          <SearchOutlined
            onClick={() => history.push("/search")}
            style={{ color: "var(--blue)" }}
          />
        </PhoneBreakpoint>
      </div>
    </Root>
  );
};

export default withRouter(Navigation);
