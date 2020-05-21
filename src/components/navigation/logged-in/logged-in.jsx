import React from "react";
import { NavList } from "../navigation.styled";
import { Link } from "react-router-dom";
import { FirebaseContext } from "../../../firebase";
import { UserContext } from "../../../contexts/user-context";
import { Button } from "antd";
import styled from "styled-components";

const LinkButton = styled(Button)`
  text-align: start;
  padding: 0;
`;

const Annonce = styled(Link)`
  margin-top: 0.5rem;
`;

function LoggedIn() {
  const fb = React.useContext(FirebaseContext);
  const { setUser } = React.useContext(UserContext);

  const signOut = () => {
    fb.doSignOut();
    setUser({});
  };

  return (
    <NavList>
      <Link to="/">Accueil</Link>
      <Link to="/profile">Profile</Link>
      <Link to="/messages">Messages</Link>
      <LinkButton type="link" onClick={signOut}>
        Deconnexion
      </LinkButton>
      <Annonce to="/announce/new">
        <Button type="primary">Nouvelle Annonce</Button>
      </Annonce>
    </NavList>
  );
}

export default LoggedIn;
