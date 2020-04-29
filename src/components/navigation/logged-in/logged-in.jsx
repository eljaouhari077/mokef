import React from "react";
import { NavList } from "../navigation.styled";
import { Link } from "react-router-dom";
import { FirebaseContext } from "../../../firebase";
import { UserContext } from "../../../contexts/user-context";
import { Button } from "antd";
import styled from "styled-components";

function LoggedIn() {
  const fb = React.useContext(FirebaseContext);
  const { setUser } = React.useContext(UserContext);

  const signOut = () => {
    fb.doSignOut();
    setUser({});
  };

  const LinkButton = styled(Button)`
    text-align: start;
    padding: 0;
  `;

  const Annonce = styled(Button)`
    margin-top: 0.5rem;
    text-align: start;
    width: 70%;
  `;

  return (
    <NavList>
      <Link to="/">Accueil</Link>
      <Link to="/profile">Profile</Link>
      <LinkButton type="link" onClick={signOut}>
        Sign Out
      </LinkButton>
      <Annonce type="primary">Nouvelle Annonce</Annonce>
    </NavList>
  );
}

export default LoggedIn;
